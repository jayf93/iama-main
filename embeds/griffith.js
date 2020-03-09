// actions for when the window is ready
let iama, aO, qO;
$(window).ready(() => {
  $('body').prepend(`<div class="row no-margin">
    <div class="col-lg-6 lime-sidebar-main">
      <span class="ml-2 d-none">Sidebar</span>
      <div class="lime-logo-sidebar mt-5">
        <img class="pedleys-logo" src="https://www.griffith.edu.au/__data/assets/file/0031/892363/Griffith-College-Logo-New.svg">
      </div>
      <div class="container" id="iama-sidebar-text-na" style="top:20%;">
        <div class="hero-txt">
          <span>Let's get started! Answer the question on the right to <span class="griffith-red">study with Griffith.</span></span>
        </div>
      </div>
      <div class="text-testimonial-container">
        <span class="pedleys-lower-txt">
          <span class="griffith-red">Griffith</span> is cool.
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
    stepPercentage: 8,
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
    `<span class="griffith-red">Griffith</span> is cool.`,
    `<span class="griffith-red">Griffith</span> is great.`,
    `I love <span class="griffith-red">Griffith.</span>`
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

  iama.events.on('courses_interests_2', e => {
    console.log(e, 'EVENT HAPPENED')
    let val = e.value;

    console.log(val, "VAL IS HERE")

    $(`[data-text="${val}"]`).remove();
  })

  iama.events.on('courses_interests_3', async(e) => {

    $('.animate-message-text, .animate-message-buttons').hide()

    let interestArr = [0, 'Business', 'Design & Creative Arts', 'Law & Legal System', 'Technology', 'Science & Maths', 'Health', 'None'];

    const { course_a, course_b } = iama.dataObj;

    const v1 = interestArr.indexOf(course_a),
          v2 = interestArr.indexOf(course_b);

    console.log(v1, v2, 'INDEXES')

    let optionVals = [];

    await Object.keys(courseMatrix).forEach(course => {
      let courseObj = courseMatrix[course]
      let search = courseObj.matrix.find(([a1, a2, a3]) => a1 === v1 && a2 === v2);

      if (search) optionVals.push({ course: courseObj.verbose, pos: search[2] });

      return null;
    })

    // let vals = Object.keys(courseMatrix).find(a => courseMatrix[a].matrix.find(([a1, a2, a3]) => a1 === v1 && a2 === v2))
    //
    optionVals = optionVals.sort((a,b) => a.pos > b.pos ? 1 : -1);
    console.log(optionVals, 'VALS ARE HERE')

    let [ o1, o2, o3, o4 ] = optionVals;

    let text;

    if (!o2) text = `Based on your interests we recommend a Diploma of ${o1.course}`;
    else text = `Based on your interests we recommend a Diploma of ${o1.course} or ${o2.course}`;

    $('.animate-message-text').text(text);

    let $btns = $('.animate-message-buttons .animate-message-action-button');

    console.log($btns)

    $($btns[0]).find('span').text(`Applying for Diploma of ${o1.course}`)
    $($btns[1]).find('span').text(`Applying for Diploma of ${o2.course}`)
    $($btns[2]).find('span').text(`Learn more about ${o1.course}`)
    $($btns[3]).find('span').text(`Learn more about ${o2.course}`)

    $('.animate-message-text, .animate-message-buttons').fadeIn();

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
    $('.animate-message-buttons').replaceWith(contactHtml());
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

  iama.events.on('any', e => assignToTopic(e))

}

const assignToTopic = ({ value, stage, stage_verbose, topic, previous }) => {

  if (!stage || previous) return null;

  const parsedTopic = topic.replace(/ /g, "_").toLowerCase();

  stage = stage_verbose || stage;

  const parsedStage = stage.replace(/ /g, "_").toLowerCase();

  $('#iama-sidebar-text-na .hero-txt').remove();

  if ($(`#topic-${parsedTopic}`).length) {
    if ($(`#topic-${parsedTopic} #sub-${parsedStage}`).length) $(`#topic-${parsedTopic} #sub-${parsedStage}`).replaceWith(newSub(null, { value, stage, parsedStage }))
    else newSub($(`#topic-${parsedTopic}`), { value, stage, topic, parsedStage });
  } else {
    $('#iama-sidebar-text-na').append(newTopic(topic, { value, stage, parsedStage, parsedTopic }))
  }
}

const newTopic = (topic, { value, stage, parsedStage, parsedTopic }) => {
  return `
  <div id="topic-${parsedTopic}" class="iama-topic-container">
    <div class="iama-topic-header">
      <span>${topic}</span>
    </div>
    <div class="iama-topic-body">
      <div class="iama-topic-row">
        ${newSub(null, { value, stage, parsedStage })}
      </div>
    </div>
  </div>
  `
}

const newSub = ($el, { value, stage, parsedStage, topic }) => {
  console.log('making new sub here')
  let subHTML = `
  <div class="iama-topic-sub" id="sub-${parsedStage}">
    <div class="iama-topic-sub-stage-header">
      <span>${stage}</span>
    </div>
    <div class="iama-topic-sub-stage-body">
      <span>${value}</span>
    </div>
  </div>`

  if (!$el) return subHTML;

  console.log($el.find('.iama-topic-row:last > div'))

  if ($el.find('.iama-topic-row:last > div').length > 1) {
    console.log('already long enough')
    console.log($el.find('.iama-topic-body'))
    return $el.find('.iama-topic-body').append(`
    <div class="iama-topic-row">
      ${subHTML}
    </div>
    `)
  } else {
    $el.find('.iama-topic-row:last').append(subHTML)
  }

  return null;
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
        <input style="margin-top:0.5rem;" data-prop="contact_name" class="animate-message-action-input" type="text" placeholder="Enter your name"></input></div>
      <div class="animate-message-input-container">
        <span class="pedleys-system-text">Phone or Email Address</span>
        <input style="margin-top:0.5rem;" data-prop="contact_detail" class="animate-message-action-input" type="text" placeholder="Enter email address or phone number"></input></div>
      <div class="iama-next-btn-container">
        <button class="button iama-next-step-btn" data-stage="contact_detail" data-value="contact_detail" data-path="">Next step</div>
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

var parseEnd = e => { // triggered at the end of the flow
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
