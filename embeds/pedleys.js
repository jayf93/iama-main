// actions for when the window is ready
let iama, aO, qO;
$(window).ready(() => {
  $('body').prepend(`<div class="row no-margin">
    <div class="col-lg-4 lime-sidebar-main">
      <span class="ml-2 d-none">Sidebar</span>
      <div class="lime-logo-sidebar mt-5">
        <img class="pedleys-logo" src="https://uploads-ssl.webflow.com/5dd713aa4e896a30d5457cef/5dd713aa4e896a6e0a457d4f_pedley_logo.svg">
      </div>
      <div class="container" id="iama-sidebar-text-na" style="top:20%;">
      </div>
      <div class="text-testimonial-container">
        <span class="xref-testimonial-txt">
        "Stuff can <span class="xref-green">go in here.</span>"
        </span>
      </div>
    </div>
    <div class="col-lg-8 overflow-auto iama-main-side">
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
    project: "jay_tester",
    flow: "test",
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

  iama.events.on('loc', e => {
    console.log('loc step is here')
    $('.animate-message-action-button').off().click(e => {
      let location = $(e.target).data('text'),
          scope = iama.dataObj.scope;
      iama.dataObj.location = location;
      switch(scope) {
        case 'Employer':
            $(e.target).data('path', 'employer_a')
          break;
        case 'Lawyer':
          $(e.target).data('path', 'lawyer')
          break;
        case 'Insurer':
          $(e.target).data('path', 'insurer')
          break;
        case 'Worker':
          $(e.target).data('path', 'worker')
          break;
      }
      iama.manageRoutes(e);
    })
  })


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
    $('.brodie-spin').animate({
      width:  '1px',
      height: '1px'
    });
  })

  iama.events.on('location', e => {
    $('.xref-hero-txt').html('<span>A few details about your <span class="xref-green">business</span></span>')
  })

  iama.events.on('hire_count', e => {
    $('.xref-hero-txt').html('<span>Let\'s get to know more about your <span class="xref-green">hiring</span></span>')
  })
  iama.events.on('hiring_most_important', e => {
    $('.xref-hero-txt').html('<span>Let\'s get to know more about your <span class="xref-green">hiring</span></span>')
  })

  iama.events.on('recommendation', e => {
    $('.xref-hero-txt').html('<span><span class="xref-green">Xref</span> can help.</span>')
    $('.iama-perm-progress-bar').width('100%');
  })

  iama.events.on('property_location', e => {
    $('.animate-message-action-input').replaceWith(`
       <input id="gsearch-autocomplete" class="animate-message-action-input" placeholder="Enter address" type="text" />`)

     buildGoogleSearch()

  })

  iama.events.on('system_choice_1', e => {
    // $('#iama').html(systemChoiceHtml())
  })

}

const systemChoiceHtml = () => {
  return `
    <div id="iama-inner-a" class="iama-inner-a">
      <div class="animate-message-input-container"><input class="animate-message-action-input" type="text" placeholder="plaveholder" data-currentPath="system_choice_1" data-path="a"></input></div>
    </div>
    <div id="iama-inner-b" class="iama-inner-b">
      <div id="iama-perm-progress" class="iama-perm-progress">
        <div class="iama-perm-progress-bar">
        </div>
      </div>
      ${iama.insertBackButton()}
    </div>`;
}

const buildGoogleSearch = () => {
  const input = document.getElementById('gsearch-autocomplete')

  let bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-10.199342, 112.472406),
    new google.maps.LatLng(-44.601349, 155.128274));

  let searchBox = new google.maps.places.SearchBox(input, { bounds, strictbounds: true });

  console.log(searchBox)
  //
  searchBox.addListener('places_changed', () => {

    let places = searchBox.getPlaces();

    if (!places.length) return null;
    else {
      let place = places[0].formatted_address

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

    return [{
          "message":"I am a...",
          "buttons":[
            {
            "text":"Employer",
            "path":"employer_a"
            },
            {
            "text":"Lawyer",
            "path":"lawyer"
            },
            {
            "text":"Insurer",
            "path":"insurer"
            },
            {
            "text":"Worker",
            "path":"worker"
            }
          ],
          "data":{
          "stage":"scope",
          "id":"scope"
          },
          "path":"a"
          }]
  } else {
    return false
  }
}

var parseEnd = e => { // triggered at the end of the flow
  setTimeout(function(){ // slight delay to ensure that the dataObject is correctly populated
    console.log('this is the end')
  }, 50)
}
