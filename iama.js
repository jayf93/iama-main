// will init this as a jQuery function
if (jQuery) jQuery.fn.animateForm = function(props = {}) {
    props.container = this.selector; // init it with the selector

    if (!props.project || !props.flow) throw new Error('ERROR: iama needs a project ID and Flow ID to continue.')
    return new AnimateForm(props); // Pass to the AnimateForm Constructor to create the form
};

// TODO:
// - Consider moving the data attribute onto each button - or allowing that capability so that buttons can have individual parameters (ie one stage is 'restart', other is 'continue' OR 'end')
// - Consider only fading out the inner of the animateMessage - will look cleaner if only the inner is fading instead of hte whole object
// - Add ability to drop pure HTML onto a message instead of text
// - Add an input box capability in place of buttons on messages
// - Pass the event into the trigger callback so that it can be manipulated - (useful for type checking with an input box)

// primary class for the animateForm function
class AnimateForm {
  constructor(props){
    this.container = props.container || "#iama"; // primary container
    this.pathObj = props.pathObj || false; // object with path parameters
    this.start = props.start || 'a'; // primary path
    this.triggerCallback = props.triggerCallback || this.triggerCallback; // callback function which can be instantiated to pull back data
    this.triggerEnd = props.triggerEnd || this.triggerEnd; // callback function which is triggered when the flow ends
    this.triggerPath = props.triggerPath || this.triggerPath; // callback function which is triggered when on new flow render
    this.dataObj = {}; // object where all of the options selected are stored
    this.events = new Events();
    this.history = props.history || []; // store the previous message to be used for going back - can be started with history
    this.session = this.getSession(props.project); // sessionID for the user journey
    this.project = props.project; // project ID for the flow created with IAMA
    this.flowId = props.flow; // flow that corresponds to the project
    this.user = this.getUser(); // retrieves or creates a user for this device
    this.pixelF; // unassigned pixel frame
    this.init(); // initialises the function
  }

  generateRandomId(len = 30){ // generates a random id for the user or session ID for tracking
    var dec2hex = dec => {
    	return ('0' + dec.toString(16).substr(-2))
    }
    let arr = new Uint8Array((len || 30) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }
  getSession(project){ // checks if there is a session against this, otherwise creates a session
    return sessionStorage.getItem(`iama-${project}`) || this.generateRandomId();
  }
  getUser(){ // checks if there is a lime user, otherwise creates one
    let user = localStorage.getItem('iama-user'); // check if the user cookie exists
    if (!user) { // if no user, create one
      user = this.generateRandomId();
      localStorage.setItem('iama-user', user)
    }
    return user;
  }

  initPixel(){ // initialises the pixel object
    this.pixelF = document.createElement('iframe');
    this.pixelF.style.display = "none";
    this.pixelF.src = `https://7yax6waadk.execute-api.ap-southeast-2.amazonaws.com/default/iama-pixel/${this.project}?u=${this.user}&s=${this.session}&t=init&q=init&v=init`;
    document.body.appendChild(this.pixelF);
  }
  logPixelEvent(data){ // logs all event callbacks and data to pixel
    // build up the pixel url
    let pixelUrl = `https://7yax6waadk.execute-api.ap-southeast-2.amazonaws.com/default/iama-pixel/${this.project}
?u=${encodeURIComponent(this.user)}
&s=${encodeURIComponent(this.session)}
&t=${encodeURIComponent(data.stage)}
&v=${encodeURIComponent(data.value)}
&q=${encodeURIComponent(data.stage)}`; //build the pixel URL

    this.pixelF.src = pixelUrl;
  }

  switchPath(data, props = {}){ // routes the logic to the appropriate paths
    if (!data.path || data.path === "undefined" || data.end) return this.triggerEnd(this.dataObj); // will trigger an end of path callback

    let path = this.pathObj[data.path][0]; // the path from the action
    console.log(path);
    let m = new AnimateMessage(Object.assign(path, { previous: data.path }), data.path).render(); // render the path
    // $(this.container).html(m); // add it to the form
    $(this.container).hide().html(m).fadeIn();
    if (!props.previous) this.history.push(Object.assign(path, { path: data.path })); //if not a back action, push this to history
    if (this.history && this.history.length > 1) { // this makes sure the back button isnt show on the About You options
      $('.animate-message-inner').append(this.insertBackButton(path, data)); // add the back button
      $('.lime-back-btn-container').click(e => this.handleBack(e)); // add listeners to the back button
    }

    this.initListeners() // reinitialise the event listeners to be able to action clicks
    this.events.emit(data.path); // leave this at the end to ensure optimal ability to mutate events
  }

  insertBackButton(p, d){
    return `<div class="lime-back-btn-container"><span class="lime-path-back">back</span></div>`; // returns the back button element
  }

  handleBack(e){
    this.history.pop(); // pop the latest option out of the history
    let path = this.getPrevious(); // get the object of the previous path from aF
    console.log(path)
    this.handleSidebarReverse(path); // function to remove the options in the sidebar to match the step back
    let p = this.history[this.history.length - 1];
    this.switchPath(this.history[this.history.length - 1], { previous: true }); // switches path, and also passes the previous boolean

  }
  handleSidebarReverse(path){
    $(`[data-step="${path.path}"]`).fadeOut('normal', function(){ $(this).remove() });
  }

  getPathObj(){
    let _this = this;
    return new Promise(function(resolve, reject) {
      if (_this.pathObj) resolve(_this.pathObj);
      else $.get(`https://7yax6waadk.execute-api.ap-southeast-2.amazonaws.com/default/iama-flow-retrieve/${_this.project}/${_this.flowId}`, v => {
        resolve(v && v.result ? JSON.parse(v.result) : {});
      })
    });
  }

  init(){ // initialises the function
    this.getPathObj() // grab the local or remote path file
    .then(path => {
      console.log(path)
      this.pathObj = path;
      let initMsg = path[this.start][0] // intial path is loaded
      let a = new AnimateMessage(initMsg, this.start).render() // initial path is rendered
      $(this.container).hide().html(a).fadeIn(); // add it to the form
      this.history.push(Object.assign(initMsg, { path: this.start }))
      this.initListeners() // initialise the event listeners to be able to action clicks
      this.initPixel();
    })
  }
  triggerCallback(){ // trigger a callback when a button is clicked
    // this is to be overwritten with a function via the options
  }
  triggerPath(){ // trigger during a path transition
    // this is to be overwritten with a function via the options
  }
  triggerEnd(){ // trigger a callback when the path reaches an end
    // this is to be overwritten with a function via the options
  }
  getPrevious(){
      return this.history[this.history.length-1]
  }
  initListeners(){ // intiialises the listeners for the clicks
    if ($('.animate-message-action-button')) $('.animate-message-action-button').off().click(e => this.manageRoutes(e)) // reset the on-click listeners
    if ($('.animate-message-action-input')) {
      $('.animate-message-action-input').off().on('keypress', e => e.which === 13 ? this.manageRoutes(e) : null)
      $('.animate-message-action-input').focus();
    }
    if ($('.animate-message-action-select')) $('.animate-message-action-select').off().change(e => $(e.target).data($(e.target).find(':selected').data()) && this.manageRoutes(e));

    if ($('.tab_main')) { // used for the multi-button template
      $('.tab_main').off().on('click', e => {
        let $el = $(e.target).hasClass('tab_main') ? $(e.target) : $(e.target).parent();
        $('.tab_main').removeClass('w--current')
        $el.addClass('w--current');
        $('.w-tab-pane').css('opacity', 0).removeClass('w--tab-active').hide();
        let data = $el.data('w-tab')
        $(`.w-tab-pane[data-w-tab="${data}"]`).css('opacity', 1).addClass('w--tab-active').show();
      })
    }
  }
  manageRoutes(e){
    let $el = $(e.target),
        data = $el.data(); // define the target and its data object

    data.value = data.value || data.text || $el.val(); // assign a data value if one is not present
    this.logPixelEvent(data); // log the callback data for tracking
    this.updateSidebar(data);
    this.switchPath(data); // switch the path for the next message;
    this.triggerCallback(data); // fire the callback to the user;
    this.dataObj[data.stage] = data.value;
  }
  updateSidebar(data){
    $(`
    <div class="row iama-sidebar-row" data-step="${data.currentpath}" data-rn="${$('.iama-sidebar-row').length}">
      <div class="col-sm-2 no-padding">
        <div class="lime-section-container">
          <div class="lime-section lime-ball"></div>
        </div>
      </div>
      <div class="col-sm-10 no-padding pr-4">
        <span class="lime-section-text lime-breadcrumb active">${data.message}</span>
        <div class="mb-3">
          <span>
            <b>${data.value}</b>
          </span>
        </div>
      </div>
    </div>`).hide().appendTo('#iama-sidebar-text').fadeIn();
  }
}

// secondary constructor to create messages
class AnimateMessage {
  constructor(props, path){
    this.message = props.message || "Message"; // main question text
    this.buttons = props.buttons || []; // question buttons array
    this.props = props || {};
    this.currentPath = path;
    this.template_type = props.template_type || 'button';
    this.data = props.data ? Object.assign(props.data, { message: props.message }) : {}; // additional data to put into refs for callbacks
  }
  addButtons(buttons = [], data = {}){ // adds buttons to the message
    let html = "<table class=\"animate-message-buttons-container\"><tbody><tr>" // initial html for the button container
    let width = buttons.length > 1 ? "50%" : "100%";
    buttons.forEach(button => { // iterate through the buttons array
      if (button.type === "web_url") { // action if the button should link to a URL instead of a path
        html+= `<td class="animate-message-td" width=${width}><a href="${button.url}"><div><button class="button animate-message-action-button" data-currentPath="${this.currentPath}" data-text="${button.text}" data-path="${button.path}" ${this.returnDataParams(data)}>${button.text}</button></div></a></td>` // url button template
      } else {
        html+= `<td class="animate-message-td" width=${width}><div><button class="button animate-message-action-button" data-currentPath="${this.currentPath}" data-text="${button.text}" data-path="${button.path}" ${this.returnDataParams(data)}>${button.text}</button></div></td>` // primary button template
      }

    })
    html+= "</tr></tbody></table>" // end html to the buton container
    return html // pass the button html back
  }
  addInput(input = {}, data = {}) {
    return `<div class="animate-message-input-container"><input class="animate-message-action-input" type="text" placeholder="${input.placeholder || ""}" data-currentPath="${this.currentPath}" data-path="${input.path}" ${this.returnDataParams(data)}></input></div>`
  }
  addSelect(options = [], data = {}) {
    let html="<option value=''>-- Select One --</option>";
    options.forEach(option => html+= `<option value="${option.text}" data-path="${option.path}" data-currentPath="${this.currentPath}" ${this.returnDataParams(data)}>${option.text}</option>`)

    return `<div class="animate-message-select-container"><select class="animate-message-action-select">${html}</select></div>`
  }
  addMultiButton(options = [], data = {}) {
    let htmlHead = "", htmlButton = "";

    let addHeader = (option, n) => {
      return htmlHead+= `<a data-w-tab="${option.title}" class="tab_main w-inline-block w-tab-link ${n === 0 ? "w--current" : ""}"><div class="text-block-6">${option.title}</div></a>`;
    }
    let addButton = (option, n) => {
      htmlButton+= `
      <div data-w-tab="${option.title}" class="w-tab-pane ${n === 0 ? "w--tab-active" : ""}" style="${n === 0 ? "opacity:1" : "display:none"}; transition: opacity 300ms ease 0s;">
        <div class="location_ist_wrapper w-dyn-list">
          <div class="w-dyn-items w-row">
            ${this.addButtons(option.buttons, this.data)}
          </div>
        </div>
      </div>`;
    };

    options.forEach((option, n) => addHeader(option, n) && addButton(option, n))

    let html = `
    <div class="tabs-menu w-tab-menu mt-4 mb-2">
      ${htmlHead}
    </div>
    <div class="w-tab-content">
      ${htmlButton}
    </div>`;

    return html;
  }
  addTemplate(){
    switch(this.template_type){
      case 'input':
        return this.addInput(this.props.input, this.data);
      break;
      case 'select':
        return this.addSelect(this.props.options, this.data)
      break;
      case 'multi-button':
        return this.addMultiButton(this.props.options, this.data)
      break;
      default:
        return this.addButtons(this.buttons, this.data);
      break;
    }
  }
  returnDataParams(data, prev){ // creates data-parameters on the button object
    if (!data) return ""; // return nothing if there is no data
    let html = ""; // initial html string
    Object.keys(data).forEach(key => html+= `data-${key}="${data[key]}"`) // iterate through the data object and add to the html
    return html // return html string to be added to the button object
  }

  render(){ // renders the message from the path - create the HTML then returns it
    return `<div class="animate-message"><div class="animate-message-inner"><div class="animate-message-text"><span>${this.message}</span></div><div class="animate-message-buttons">${this.addTemplate()}</div></div></div>`
  }
}

class Events { // event listener system
  constructor(){
    this.events = {};
  }
  on(event, fn){
    if (typeof event !== 'string') return null;
    if (!this.events[event]) this.events[event] = new Set();
    this.events[event].add(fn);
  }
  emit(event, args){
    let self = this;
    this.events[event] && this.events[event].forEach(fn => {
      fn.apply(this, [args]);
    })
  }
}
