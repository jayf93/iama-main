// TODO:
// - Consider moving the data attribute onto each button - or allowing that capability so that buttons can have individual parameters (ie one stage is 'restart', other is 'continue' OR 'end')
// - Consider only fading out the inner of the animateMessage - will look cleaner if only the inner is fading instead of hte whole object
// - Add ability to drop pure HTML onto a message instead of text
// - Add an input box capability in place of buttons on messages
// - Pass the event into the trigger callback so that it can be manipulated - (useful for type checking with an input box)

// primary class for the animateForm function
class IAMA {
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
    this.stepPercentage = props.stepPercentage || 10;
    this.step_count = typeof props.step_count === "boolean" ? props.step_count : false;
    this.version = '0.2.0'; // current version of the IAMA tool
    this.init(); // initialises the function
  }

  generateRandomId(len = 30){ // generates a random id for the user or session ID for tracking
    var dec2hex = dec => {
    	return ('0' + dec.toString(16).substr(-2))
    };
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
      localStorage.setItem('iama-user', user);
    }
    return user;
  }

  initPixel(){ // initialises the pixel object
    let _this = this;
    this.pixelF = document.createElement('iframe');
    this.pixelF.style.display = "none";
    this.pixelF.src = `https://7yax6waadk.execute-api.ap-southeast-2.amazonaws.com/default/iama-pixel/${this.project}?u=${this.user}&s=${this.session}&t=init&q=init&v=init`;
    document.body.appendChild(this.pixelF);

    $(window).on('beforeunload', e => { // if the person leaves, record them leaving as an 'ended session'
      _this.logPixelEvent({
        stage: 'end_session',
        value: 'end_session'
      });
    });
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

    let m = new AnimateMessage(Object.assign(path, { previous: data.path }), data.path, this).render(); // render the path
    // $(this.container).html(m); // add it to the form
    $(this.container).hide().html(m).fadeIn();
    if (!props.previous) {
      this.history.push(Object.assign(path, { path: data.path })); //if not a back action, push this to history
      $('.iama-perm-progress-bar').animate({
        width: $('.iama-perm-progress-bar').width((i, val) => val+= $('.iama-perm-progress-bar').width() >= $('.iama-perm-progress').width() ? 0 : ($('.iama-perm-progress').width() * (this.stepPercentage / 100)))
      });
    } else {
      $('.iama-perm-progress-bar').animate({
        width: $('.iama-perm-progress-bar').width((i, val) => val-= $('.iama-perm-progress-bar').width() <= 0 ? 0 : ($('.iama-perm-progress').width() * (this.stepPercentage / 100)))
      });
    }

    this.history && this.history.length > 1 ? $('#iama-perm-back').fadeIn() : $('#iama-perm-back').fadeOut(); // if there is history then add the back button

    this.initListeners(); // reinitialise the event listeners to be able to action clicks
    this.events.emit('any').emit(data.path); // leave this at the end to ensure optimal ability to mutate events
  }

  insertBackButton(p, d){
    return `<div style="display:none;" class="iama-back-btn" id="iama-perm-back"><div class="iama-back-symbol"></div><div class="iama-back-txt"><span>Back</span></div></div>`; // returns the back button element
  }

  handleBack(e){
    this.history.pop(); // pop the latest option out of the history
    let path = this.getPrevious(); // get the object of the previous path from aF
    console.log(path);
    this.handleSidebarReverse(path); // function to remove the options in the sidebar to match the step back
    let p = this.history[this.history.length - 1];
    this.switchPath(this.history[this.history.length - 1], { previous: true }); // switches path, and also passes the previous boolean

  }
  handleSidebarReverse(path){
    $(`[data-step="${path.path}"]`).fadeOut('normal', () => $(this).remove() );
  }

  getPathObj(){
    let _this = this;
    return new Promise(function(resolve, reject) {
      if (_this.pathObj) resolve(_this.pathObj);
      else $.get(`https://7yax6waadk.execute-api.ap-southeast-2.amazonaws.com/default/iama-flow-retrieve/${_this.project}/${_this.flowId}`, v => {
        resolve(v && v.result ? JSON.parse(v.result) : {});
      });
    });
  }

  init(){ // initialises the function
    this.getPathObj() // grab the local or remote path file
    .then(path => {
      this.pathObj = path;
      let initMsg = path[this.start][0]; // intial path is loaded
      let a = new AnimateMessage(initMsg, this.start, this).render(); // initial path is rendered
      $(this.container).html(`<div id="iama-inner-a" class="iama-inner-a"></div><div id="iama-inner-b" class="iama-inner-b"><div id="iama-perm-progress" class="iama-perm-progress"><div class="iama-perm-progress-bar"></div></div>${this.insertBackButton()}</div>`); // insert the new containers
      this.container = "#iama-inner-a"; // update the container
      $(this.container).hide().html(a).fadeIn(); // add it to the form
      $('#iama-perm-back').click(e => this.handleBack(e)); // add listeners to the back button
      this.history.push(Object.assign(initMsg, { path: this.start }));
      this.initListeners(); // initialise the event listeners to be able to action clicks
      this.initPixel();
    });
  }
  triggerCallback(){ // trigger a callback when a button is clicked
    // this is to be overwritten with a function via the options
    return null;
  }
  triggerPath(){ // trigger during a path transition
    // this is to be overwritten with a function via the options
    return null;
  }
  triggerEnd(){ // trigger a callback when the path reaches an end
    // this is to be overwritten with a function via the options
    return null;
  }
  getPrevious(){
      return this.history[this.history.length-1];
  }
  initListeners(){ // intiialises the listeners for the clicks
    if ($('.animate-message-action-button')) $('.animate-message-action-button').off().click(e => this.manageRoutes(e)); // reset the on-click listeners
    if ($('.animate-message-action-checkbox')) $('.animate-message-action-checkbox, .animate-button-carat').off().click(e => this.manageChecks(e));
    if ($('.animate-message-action-input')) {
      $('.animate-message-action-input').off().on('keypress', e => {
        if (e.which === 13) {
          let { validation, validation_msg } = $(e.target).data();

          if (!validation) return this.manageRoutes(e);

          let regex = new RegExp(validation),
              val = $(e.target).val();

          if (validation && !val.match(regex)) {

            return $('.iama-input-err-container').html(`<span>${validation_msg || "Error: Invalid entry"}</span>`);

          } else return this.manageRoutes(e);
        } else return null;
        // e.which === 13 ? this.manageRoutes(e) : null
      })
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
    this.dataObj[data.stage] = data.value;

    this.logPixelEvent(data); // log the callback data for tracking
    this.updateSidebar(data);
    this.switchPath(data); // switch the path for the next message;
    this.triggerCallback(data); // fire the callback to the user;
  }
  manageChecks(e){
    let $el = !$(e.target).hasClass('animate-message-action-checkbox') ? $(e.target).parents('.animate-message-action-checkbox') : $(e.target);

    let checkedIcon = `<span>&#10003;</span>`;
    let uncheckedIcon = `<div class="iama-checkbox-unchecked"></div>`;


    $el.toggleClass('unchecked').toggleClass('checked');

    $el.find('.animate-button-carat').html($el.hasClass('checked') ? checkedIcon : uncheckedIcon)

    $el.data('checked', $el.hasClass('checked'));
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
  constructor(props, path, iama){
    console.log(iama)
    this.message = props.message || "Message"; // main question text
    this.buttons = props.buttons || []; // question buttons array
    this.props = props || {};
    this.currentPath = path;
    this.history = iama.history;
    this.step_count = iama.step_count;
    this.template_type = props.template_type || 'button';
    this.data = props.data ? Object.assign(props.data, { message: props.message }) : {}; // additional data to put into refs for callbacks
  }
  addButtons(buttons = [], data = {}){ // adds buttons to the message
    let html = "<div class=\"animate-message-buttons-container\">" // initial html for the button container
    let width = buttons.length > 1 ? "50%" : "100%";
    buttons.forEach(button => { // iterate through the buttons array
      if (button.type === "web_url") { // action if the button should link to a URL instead of a path
        html+= `<div class="animate-message-td"><a href="${button.url}"><div><button class="button animate-message-action-button" data-currentPath="${this.currentPath}" data-text="${button.text}" data-path="${button.path}" ${this.returnDataParams(data)}>${button.text}<div class="animate-button-carat"><i class="caret right"></i></div></button></div></a></div>` // url button template
      } else {
        html+= `<div class="animate-message-td"><button class="button animate-message-action-button" data-currentPath="${this.currentPath}" data-text="${button.text}" data-path="${button.path}" ${this.returnDataParams(data)}>${button.text}<div class="animate-button-carat"><i class="caret right"></i></div></button></div>` // primary button template
      }

    })
    html+= "</div>" // end html to the buton container
    return html // pass the button html back
  }
  addInput(input = {}, data = {}) {
    return `<div class="animate-message-input-container"><input class="animate-message-action-input" type="text" placeholder="${input.placeholder || ""}" data-currentPath="${this.currentPath}" data-path="${input.path}" data-validation="${input.validation && input.validation.pattern}" data-validation_msg="${input.validation && input.validation.message}" ${this.returnDataParams(data)}></input><div class="iama-input-err-container"></div>      <div class="iama-next-btn-container">
              <button class="button animate-message-action-button iama-next-step-btn" data-currentPath="${this.currentPath}" data-path="${input.path}" ${this.returnDataParams(data)}>Next step</div>
            </div></div>`
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
  addCheckBox(options = [], data = []){
    let htmlChecks = "";

    let addCheck = (option, n) => {
      return htmlChecks+= `<div class="animate-message-td"><button class="button animate-message-action-checkbox iama-checkbox unchecked" data-state="unchecked" data-currentPath="${this.currentPath}" data-text="${option.text}" data-path="${option.path}" ${this.returnDataParams(data)}>${option.text}<div class="animate-button-carat"><div class="iama-checkbox-unchecked"></div></div></button></div>`
    }

    let addCheckContinue = () => {
      return `<div class="iama-checkbox-action"><button class="button animate-message-action-button" data-state="unchecked" data-currentPath="${this.currentPath}" data-text="Continue" data-path="${data.path}" ${this.returnDataParams(data)}>Continue<div class="animate-button-carat"><i class="caret right"></i></div></button></div>`
    }

    options.forEach((option, n) => addCheck(option,n));

    let html = `<div class="animate-message-checkbox-container"><div class="iama-checkbox-container">${htmlChecks}</div>${addCheckContinue()}</div>`;

    return html;
  }
  addTemplate(){
    switch(this.template_type){
      case 'input':
        return this.addInput(this.props.input, this.data);
      break;
      case 'select':
        return this.addSelect(this.props.options, this.data);
      break;
      case 'multi-button':
        return this.addMultiButton(this.props.options, this.data);
      break;
      case 'checkbox':
        return this.addCheckBox(this.props.options, this.data);
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

  calcStepCount(){
    if (this.step_count) {
      return `<div class="iama-msg-step-count">Step ${this.history && this.history.length +1 || 1}</div>`
    } else {
      return '';
    }
  }

  render(){ // renders the message from the path - create the HTML then returns it
    return `<div class="animate-message"><div class="animate-message-inner">${this.calcStepCount()}<div class="animate-message-text"><span>${this.message}</span></div><div class="animate-message-buttons">${this.addTemplate()}</div></div></div>`
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
    return this;
  }
}


// actions for when the window is ready
let iama, aO, qO;
$( window ).on( "load", () => {

  // will init this as a jQuery function
  if (jQuery) jQuery.fn.iama = function(props = {}) {
      console.log('is jquery')
      props.container = this.selector; // init it with the selector

      if (!props.project || !props.flow) throw new Error('ERROR: iama needs a project ID and Flow ID to continue.')
      return new IAMA(props); // Pass to the AnimateForm Constructor to create the form
  };

  $('body').prepend(`<div class="row no-margin">
    <div class="col-lg-6 lime-sidebar-main">
      <span class="ml-2 d-none">Sidebar</span>
      <div class="lime-logo-sidebar mt-5">
        <a href="/">
          <img class="pedleys-logo" src="https://uploads-ssl.webflow.com/5dd713aa4e896a30d5457cef/5dd713aa4e896a6e0a457d4f_pedley_logo.svg">
        </a>
      </div>
      <div class="container" id="iama-sidebar-text-na" style="top:20%;">
        <div class="pedleys-hero-txt">
          <span>Let's get started! Answer the question on the right to <span class="pedleys-orange">start your quote.</span></span>
        </div>
      </div>
      <div class="text-testimonial-container">
        <span class="pedleys-lower-txt">
          <span class="pedleys-orange">6,130 Installations Complete.</span> We're committed to providing the best solar power solution and service.
        </span>
        <div class="iama-emailer-container" style="display:none;">
          <input type="email" placeholder="Enter email..."></input>
          <button class="button pedleys-secondary-btn">Send</button>
        </div>
      </div>
    </div>
    <div class="col-lg-6 overflow-auto iama-main-side">
        <div id="iama" style="height:100vh;">
          <span></span>
        </div>
    </div>
  </div>`)
  let params = (new URL(document.location)).searchParams;
  let start = params.get("s") || 'start';
  var isMobile = false; //initiate as false
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
      isMobile = true;
  }
  // console.log('initing booking form', pathObj)
  iama = $('#iama').iama({ // initialise the animatedform
    form: 'form',
    start: start,
    // triggerCallback: e => parseCallbacks(e),
    triggerEnd: e => parseEnd(e),
    // triggerPath: (p, d, props) => parsePath(p, d, props),
    pathObj,
    project: "pedleys-27f72e269df8377b0875",
    flow: "test",
    step_count: true,
    stepPercentage: 10,
    history: validateHistory(params) // augments the beginning history to start it with some history
  })
  if (params.has('p')) {
    let type = params.get('t'),
        s = params.get('s');
    iama.dataObj['scope'] = type;
    // $('.animate-message-inner').append(insertBackButton()); // add the back button
    // $('.lime-back-btn-container').click(e => handleBack(e)); // add listeners to the back button
  }

  setEvents(); // sets the eventemitter events
})

var setEvents = () => {

  let testimonialArr = [
    `<span class="pedleys-orange">6,130 Installations Complete.</span> We're committed to providing the best solar power solution and service.`,
    `<span class="pedleys-orange">$2,110 Average Savings (per year).</span> Whether you have a residential or commercial property, we've got you covered.`,
    `<span class="pedleys-orange">49,000 KW Installed.</span> We can also help you navigate Solar System Rebates.`
  ],
  testimonialIndex = 1;

  setInterval(function(){
    $('.pedleys-lower-txt').fadeOut('slow', () => {
      $('.pedleys-lower-txt').html(testimonialArr[testimonialIndex]).fadeIn('slow');
      testimonialIndex = testimonialIndex === 2 ? 0 : testimonialIndex + 1;
    })
  }, 10000)

  // iama.events.on('any', e => {
  //   let angle = ($('.brodie-spin').data('angle') + 90) || 90;
  //   $('.brodie-spin').removeClass('rotation').animate({
  //     width:  $('.brodie-spin').width() * 2,
  //     height: $('.brodie-spin').height() * 2
  //   }).addClass('rotation');
  //
  // })

  iama.events.on('start', e => {
    $('.iama-perm-progress-bar').width('0%');
  })


  iama.events.on('property_location', e => {
    $('.animate-message-action-input').replaceWith(`<input id="gsearch-autocomplete" class="animate-message-action-input" placeholder="Enter address" type="text" />`);

     buildGoogleSearch()

     // $('#iama-sidebar-text-na').html(`
     //   <div class="your-ima-text"><span>Your IAMA</span></div>
     //   <div id="iama-txt">
     //    <span>Currently I have <span class="pedleys-orange">${iama.dataObj.start === "No solar" ? "no solar" : "an existing solar sytem"}</span> on my property.</span>
     //   </div>
     //   `)
     $('.pedleys-hero-txt').html('<span>Help us understand <span class="pedleys-orange">your home.</span></span>')
  })

  iama.events.on('property_status', e => {
    $('.animate-message-text').text(`At ${iama.dataObj.address_short || "my property"} I`);

    // $('#iama-sidebar-text-na').html(`
    //   <div class="your-ima-text"><span>Your IAMA</span></div>
    //   <div id="iama-txt">
    //    <span>Currently I have <span class="pedleys-orange">${iama.dataObj.start === "No solar" ? "no solar" : "an existing solar sytem"}</span> on my property at <span class="pedleys-orange">${iama.dataObj.address_short}</span>.</span>
    //   </div>
    //   `)
  })

  iama.events.on('last_quarterly_bill', e => {
    // $('#iama-sidebar-text-na').html(`
    //   <div class="your-ima-text"><span>Your IAMA</span></div>
    //   <div id="iama-txt">
    //    <span>Currently I have <span class="pedleys-orange">${iama.dataObj.start === "No solar" ? "no solar" : "an existing solar sytem"}</span> on my property at <span class="pedleys-orange">${iama.dataObj.address_short}</span> which I <span class="pedleys-orange">${iama.dataObj.property_status === "Pay rent" ? "rent" : "own"}</span>.</span>
    //   </div>
    //   `)
  })



  iama.events.on('property_wiring', e => {
    $('.pedleys-hero-txt').html('<span>Help us understand <span class="pedleys-orange">your home.</span></span>')
  })

  iama.events.on('choosing_system', e => {
    $('.pedleys-hero-txt').html('<span>Tell us more about <span class="pedleys-orange">what you\'re after.</span></span>')
  })


  iama.events.on('system_choice_1', e => {
    $('.pedleys-hero-txt').html('<span>Tell us more about <span class="pedleys-orange">what you\'re after.</span></span>')
  })
  iama.events.on('contact_detail', e => {
    $('.pedleys-hero-txt').html('<span>What\'s the best way for us to <span class="pedleys-orange">reach you?</span></span>')

    // $('.animate-message-buttons').prepend(`
    //   <div class="tabs-menu w-tab-menu mt-4 mb-2">
    //     <a data-w-tab="email" class="tab_main w-inline-block w-tab-link current"><div class="text-block-6">email</div></a>
    //     <a data-w-tab="phone" class="tab_main w-inline-block w-tab-link"><div class="text-block-6">phone</div></a>
    //   </div>`)
  })

  iama.events.on('property_type', e => {
    $('.animate-message-text').text(`${iama.dataObj.address_short} is a`)
  })

  iama.events.on('system_choice_1', e => {
    $('.animate-message-buttons').replaceWith(systemChoiceHtml());
    $('.iama-next-step-btn').click(e => {
      let data = { custom_system: true };
      $('.animate-message-action-input').each((i, el) => {
        console.log($(el).data())
        let key = $(el).data('prop');
        Object.assign(data, { [key]: $(el).val() });
      })
      Object.assign(iama.dataObj, data)
      iama.manageRoutes(e);
    })
  })

  iama.events.on('contact_detail', e => {
    console.log('CONTACT DETAIL HERE')
    let emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        phoneRegex = new RegExp(/^[+\d](?:.*\d)?$/);

    $('.animate-message-buttons').replaceWith(contactHtml());
    $('.iama-next-step-btn').click(e => {
      let data = { custom_system: true },
          invalid = false;
      $('.animate-message-action-input').each((i, el) => {
        console.log($(el).data())
        let key = $(el).data('prop'),
            { validation } = $(el).data();

        switch (validation) {
          case 'email':
            if ($(el).val().match(emailRegex)) $(el).parents('.animate-message-input-container').find('.iama-input-err-container').html('');
            else {
              console.log('No email match')
              invalid = true;
              $(el).parents('.animate-message-input-container').find('.iama-input-err-container').html('<span>Please enter a valid email address</span>')
            }
          break;
          case 'phone':
            if ($(el).val().match(phoneRegex)) $(el).parents('.animate-message-input-container').find('.iama-input-err-container').html('');
            else {
              console.log('No phone match')
              invalid = true;
              $(el).parents('.animate-message-input-container').find('.iama-input-err-container').html('<span>Please enter a valid phone number</span>')
            }
          break;
          default:
            console.log('no validation')
            // do nothing
          break;
        }

        Object.assign(data, { [key]: $(el).val() });
      })

      if (invalid) return null;

      Object.assign(iama.dataObj, data)
      iama.manageRoutes(e);
    })
  })



}

const systemChoiceHtml = () => {
  return `
      <div class="animate-message-input-container">
        <span class="pedleys-system-text">System size</span>
        <input style="margin-top:0.5rem;" data-prop="system_size" class="animate-message-action-input" type="text" placeholder="Enter the size of the system"></input></div>
      <div class="animate-message-input-container">
        <span class="pedleys-system-text">Panel type</span>
        <input style="margin-top:0.5rem;" data-prop="system_panel_type" class="animate-message-action-input" type="text" placeholder="Enter the type of panel"></input></div>
      <div class="animate-message-input-container">
        <span class="pedleys-system-text">Inverter type</span>
        <input style="margin-top:0.5rem;" data-prop="system_inverter_type" class="animate-message-action-input" type="text" placeholder="Enter the type of inverter"></input></div>
      <div class="animate-message-input-container">
        <span class="pedleys-system-text">Battery size</span>
        <input style="margin-top:0.5rem;" data-prop="system_battery" class="animate-message-action-input" type="text" placeholder="Enter the size of the battery"></input></div>
      <div class="iama-next-btn-container">
        <button class="button iama-next-step-btn" data-stage="system_choice_1" data-value="custom_system" data-path="contact_detail">Next step</div>
      </div>
      `
}

const contactHtml = () => {
  return `
      <div class="animate-message-input-container">
        <span class="pedleys-system-text">First name</span>
        <input style="margin-top:0.5rem;" data-prop="contact_name" class="animate-message-action-input" type="text" placeholder="Enter your name"></input>
      </div>
      <div class="animate-message-input-container">
        <span class="pedleys-system-text">Email Address</span>
        <input style="margin-top:0.5rem;" data-prop="email_address" class="animate-message-action-input" type="text" placeholder="Enter your email address" data-validation="email"></input>
        <div class="iama-input-err-container"></div>
      </div>
      <div class="animate-message-input-container">
        <span class="pedleys-system-text">Phone Number</span>
        <input style="margin-top:0.5rem;" data-prop="phone_number" class="animate-message-action-input" type="text" placeholder="Enter your phone number" data-validation="phone"></input>
        <div class="iama-input-err-container"></div>
      </div>
      <div class="iama-next-btn-container">
        <button class="button iama-next-step-btn" data-path="">Next step</div>
      </div>
      `
}

const buildGoogleSearch = () => {
  const input = document.getElementById('gsearch-autocomplete')

  let bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-10.199342, 112.472406),
    new google.maps.LatLng(-44.601349, 155.128274));

  let searchBox = new google.maps.places.SearchBox(input, { bounds, strictbounds: true });

  searchBox.addListener('places_changed', () => {

    let places = searchBox.getPlaces();

    if (!places.length) return null;
    else {
      let place = places[0].formatted_address

      iama.dataObj.address_short = places[0].name;

      $(input).data({
        value: place,
        stage: 'property_location',
        path: 'property_status'
      })
      iama.manageRoutes({ target: '#gsearch-autocomplete'});
    }
  })
}

let dataObj = {}; // global obj to be built up with the information

var validateHistory = params => {
  if (params.has('p')) {

    return false;
  } else {
    return false
  }
}

const sendEnquiry = () => {
  let email = {
    from: 'noreply@pedleys.com.au',
    to: 'jay@bothello.io'
  },
  url = 'https://7yax6waadk.execute-api.ap-southeast-2.amazonaws.com/default/iama-mail',
  data = iama.dataObj,
  template_id = 'd-6960931c099f43188b18d6bc1571dafd';

  data = Object.assign(data, { template_id, email });

  $.ajax({
    type: 'POST',
    url,
    data: JSON.stringify(data),
    dataType: 'json'
  })
}

const sendIama = () => {
  let email = {
    from: 'noreply@pedleys.com.au',
    to: 'jay@bothello.io'
  },
  url = 'https://7yax6waadk.execute-api.ap-southeast-2.amazonaws.com/default/iama-mail',
  data = iama.dataObj,
  template_id = 'd-b2a2bd4f1899448f854a494b71b36397';

  data = Object.assign(data, { template_id, email });

  $.ajax({
    type: 'POST',
    url,
    data: JSON.stringify(data),
    dataType: 'json'
  })

}

const sendZap = () => {
  let url = 'https://hooks.zapier.com/hooks/catch/6970822/o1kbgsw/',
      data = iama.dataObj;
      console.log('sending a zap')
  return $.ajax({
    type: 'POST',
    url,
    data: JSON.stringify(data),
    dataType: 'json'
  })
}

var parseEnd = e => { // triggered at the end of the flow

  sendIama();
  sendEnquiry();
  sendZap();

  setTimeout(function(){ // slight delay to ensure that the dataObject is correctly populated

    $('.animate-message').hide().html(`
      <div class="animate-message-inner">
        <div class="animate-message-text">
          <span>Thank you</span>
        </div>
        <div class="animate-message-end-subtext">
          <span>We will be in touch shortly with a quote and options.</span>
        </div>
      </div>
    `).fadeIn();
    $('.iama-inner-b').remove();
  }, 50)
}
