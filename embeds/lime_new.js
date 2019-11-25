var generateOptDescription = type => {
  switch(type){
    case 'IME with an Occupational Physician':

    break;
    case 'IME with another Specialist':

    break;
    case 'FFD with an Occupational Physician':

    break;
    case 'FFD with another Specialist':

    break;
    default:

    break;
  }
}

var generateOptCheckboxes = (type, scope) => {
  console.log('type is ' + type)
  let html;
  switch(type){
    case 'IME with an Occupational Physician':  // THIS IS THE ONE THAT I HAVE ADDED THE QUESTION DATA
      html = `<div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-accuracy-diagnosis"
                  data-action="accuracy-diagnosis"
                  data-verbose="Accuracy of diagnosis"
                  data-question="Does the diagnosis match the clinical presentation?">
                <label for="checkbox-accuracy-diagnosis"><b>Accuracy of diagnosis</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-cause-injury" data-action="cause-of-injury" data-verbose="Cause of injury"
                  data-question="Is the described mechanism of injury consistent with the current diagnosis? OR What is the most likely diagnosis considering the mechanism of injury?">
                <label for="checkbox-cause-injury"><b>Cause injury / Illness</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-best-practice-treatment" data-action="best-practice-treatment" data-verbose="Best Practice Treatment for this condition"
                  data-question="Is the current treatment and planned treatment appropriate? OR What is the best practice treatment for this condition?">
                <label for="checkbox-best-practice-treatment"><b>Best Practice Treatment for this condition</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-rehab" data-action="rehab-and-timeframes" data-verbose="Likely rehabilitation & timeframes"
                  data-question="What are your recommendations on Rehabilitation, return to work and timeframes for recovery?">
                <label for="checkbox-rehab"><b>Likely rehabilitation & timeframes</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-return-to-work-guidance" data-action="return-to-work-guidance" data-verbose="Return to Work Guidance (short, medium and long terms)" data-question="Please provide expert guidance on Return to work in the short (3-6months), medium (6-12months) or Long term (>12 months)">
                <label for="checkbox-return-to-work-guidance"><b>Return to Work Guidance (short, medium and long terms)</b></label>
              </div>`

        if (scope === "Lawyer") {
          html+= `<div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-return-to-work-safely" data-action="return-to-work-sagely" data-verbose="Ability to Safely return to work"
                  data-question="Can worker safely perform the essential inherent requirements of the role without restrictions or accommodations? ">
                <label for="checkbox-return-to-work-safely"><b>Ability to Safely return to work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-work-restrictions" data-action="work-restrictions" data-verbose="Any restrictions that may be required to remain safe at work"
                  data-question="What restrictions are required to ensure worker doesn’t suffer a further injury or illness related to their condition?">
                <label for="checkbox-work-restrictions"><b>Any restrictions that may be required to remain safe at work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-alternate-roles" data-action="alternate-roles" data-verbose="If worker can perform any alternate roles"
                  data-question="What other roles could the worker safely perform - <i>please provide potential other roles you know to be available or vocational assessments that have been done.</i>">
                <label for="checkbox-alternate-roles"><b>If worker can perform any alternate roles</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-current-treatment" data-action="current-treatment" data-verbose="Current Treatment and potential to Impact on safety at work"
                  data-question="Do any current medication or other treatments potentially pose a risk to safety in the workplace?">
                <label for="checkbox-current-treatment"><b>Current Treatment and potential to Impact on safety at work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-impairment-level" data-action="impairment-level" data-verbose="Level of Impairment"
                  data-question="What is the level of permanent impairment in accordance with American Medical Association guides (AMA4/5)">
                <label for="checkbox-impairment-level"><b>Level of Impairment</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-preexisting-impact" data-action="preexisting-impact" data-verbose="Impact of pre-existing conditions on Impairment"
                  data-question="Is there any impairment arising from pre-existing conditions that are relevant in this case?">
                <label for="checkbox-preexisting-impact"><b>Impact of pre-existing conditions on Impairment</b></label>
              </div>`
        } else if (scope === "Insurer") {
          html+=`<div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-return-to-work-safely" data-action="return-to-work-sagely" data-verbose="Ability to Safely return to work"
                  data-question="Can worker safely perform the essential inherent requirements of the role without restrictions or accommodations? ">
                <label for="checkbox-return-to-work-safely"><b>Ability to Safely return to work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-work-restrictions" data-action="work-restrictions" data-verbose="Any restrictions that may be required to remain safe at work"
                  data-question="What restrictions are required to ensure worker doesn’t suffer a further injury or illness related to their condition?">
                <label for="checkbox-work-restrictions"><b>Any restrictions that may be required to remain safe at work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-alternate-roles" data-action="alternate-roles" data-verbose="If worker can perform any alternate roles"
                  data-question="What other roles could the worker safely perform - <i>please provide potential other roles you know to be available or vocational assessments that have been done.</i>">
                <label for="checkbox-alternate-roles"><b>If worker can perform any alternate roles</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-current-treatment" data-action="current-treatment" data-verbose="Current Treatment and potential to Impact on safety at work"
                  data-question="Do any current medication or other treatments potentially pose a risk to safety in the workplace?">
                <label for="checkbox-current-treatment"><b>Current Treatment and potential to Impact on safety at work</b></label>
              </div>`
        }

        return html;

    break;
    case 'IME with another Specialist':
      html = `<div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-accuracy-diagnosis"
                  data-action="accuracy-diagnosis"
                  data-verbose="Accuracy of diagnosis"
                  data-question="Does the diagnosis match the clinical presentation?">
                <label for="checkbox-accuracy-diagnosis"><b>Accuracy of diagnosis</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-cause-injury" data-action="cause-of-injury" data-verbose="Cause of injury"
                  data-question="Is the described mechanism of injury consistent with the current diagnosis? OR What is the most likely diagnosis considering the mechanism of injury?">
                <label for="checkbox-cause-injury"><b>Cause injury / Illness</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-best-practice-treatment" data-action="best-practice-treatment" data-verbose="Best Practice Treatment for this condition"
                  data-question="Is the current treatment and planned treatment appropriate? OR What is the best practice treatment for this condition?">
                <label for="checkbox-best-practice-treatment"><b>Best Practice Treatment for this condition</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-rehab" data-action="rehab-and-timeframes" data-verbose="Likely rehabilitation & timeframes"
                  data-question="What are your recommendations on Rehabilitation, return to work and timeframes for recovery?">
                <label for="checkbox-rehab"><b>Likely rehabilitation & timeframes</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-return-to-work-guidance" data-action="return-to-work-guidance" data-verbose="Return to Work Guidance (short, medium and long terms)" data-question="Please provide expert guidance on Return to work in the short (3-6months), medium (6-12months) or Long term (>12 months)">
                <label for="checkbox-return-to-work-guidance"><b>Return to Work Guidance (short, medium and long terms)</b></label>
              </div>`

        if (scope === "Lawyer") {
          html+= `<div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-return-to-work-safely" data-action="return-to-work-sagely" data-verbose="Ability to Safely return to work"
                  data-question="Can worker safely perform the essential inherent requirements of the role without restrictions or accommodations? ">
                <label for="checkbox-return-to-work-safely"><b>Ability to Safely return to work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-work-restrictions" data-action="work-restrictions" data-verbose="Any restrictions that may be required to remain safe at work"
                  data-question="What restrictions are required to ensure worker doesn’t suffer a further injury or illness related to their condition?">
                <label for="checkbox-work-restrictions"><b>Any restrictions that may be required to remain safe at work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-alternate-roles" data-action="alternate-roles" data-verbose="If worker can perform any alternate roles"
                  data-question="What other roles could the worker safely perform - <i>please provide potential other roles you know to be available or vocational assessments that have been done.</i>">
                <label for="checkbox-alternate-roles"><b>If worker can perform any alternate roles</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-current-treatment" data-action="current-treatment" data-verbose="Current Treatment and potential to Impact on safety at work"
                  data-question="Do any current medication or other treatments potentially pose a risk to safety in the workplace?">
                <label for="checkbox-current-treatment"><b>Current Treatment and potential to Impact on safety at work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-impairment-level" data-action="impairment-level" data-verbose="Level of Impairment"
                  data-question="What is the level of permanent impairment in accordance with American Medical Association guides (AMA4/5)">
                <label for="checkbox-impairment-level"><b>Level of Impairment</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-preexisting-impact" data-action="preexisting-impact" data-verbose="Impact of pre-existing conditions on Impairment"
                  data-question="Is there any impairment arising from pre-existing conditions that are relevant in this case?">
                <label for="checkbox-preexisting-impact"><b>Impact of pre-existing conditions on Impairment</b></label>
              </div>`
        } else if (scope === "Insurer") {
          html+=`<div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-return-to-work-safely" data-action="return-to-work-sagely" data-verbose="Ability to Safely return to work"
                  data-question="Can worker safely perform the essential inherent requirements of the role without restrictions or accommodations? ">
                <label for="checkbox-return-to-work-safely"><b>Ability to Safely return to work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-work-restrictions" data-action="work-restrictions" data-verbose="Any restrictions that may be required to remain safe at work"
                  data-question="What restrictions are required to ensure worker doesn’t suffer a further injury or illness related to their condition?">
                <label for="checkbox-work-restrictions"><b>Any restrictions that may be required to remain safe at work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-alternate-roles" data-action="alternate-roles" data-verbose="If worker can perform any alternate roles"
                  data-question="What other roles could the worker safely perform - <i>please provide potential other roles you know to be available or vocational assessments that have been done.</i>">
                <label for="checkbox-alternate-roles"><b>If worker can perform any alternate roles</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-current-treatment" data-action="current-treatment" data-verbose="Current Treatment and potential to Impact on safety at work"
                  data-question="Do any current medication or other treatments potentially pose a risk to safety in the workplace?">
                <label for="checkbox-current-treatment"><b>Current Treatment and potential to Impact on safety at work</b></label>
              </div>`
        }

        return html;

    break;
    case 'FFD with an Occupational Physician': // THIS IS THE ONE THAT I HAVE ADDED THE QUESTION DATA
      return `<div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-current-diagnosis" data-action="current-diagnosis" data-verbose="Current Diagnosis"
                  data-question="What is the current diagnosis?">
                <label for="checkbox-current-diagnosis"><b>Current Diagnosis</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-return-ability" data-action="ability-to-return" data-verbose="Ability to Safely return to the Role"
                  data-question="Can worker safely perform the essential inherent requirements of the role without restrictions or accommodations?">
                <label for="checkbox-return-ability"><b>Ability to Safely return to the Role</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-work-safe-restrictions" data-action="work-safe-restrictions" data-verbose="Any restrictions that may be required to remain safe at work" data-question="What restrictions are required to ensure worker doesn’t suffer a further injury or illness related to their condition?">
                <label for="checkbox-work-safe-restrictions"><b>Any restrictions that may be required to remain safe at work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-alternate-roles" data-action="alternate-roles" data-verbose="If worker can perform any alternate roles"
                  data-question="What other roles could the worker safely perform - please provide potential other roles you have available">
                <label for="checkbox-alternate-roles"><b>If worker can perform any alternate roles</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-current-treatment-impact" data-action="current-treatment-impact" data-verbose="Current treatment and potential impact on safety at work" data-question="Do any current medication or other treatments potentially pose a risk to safety in the workplace?">
                <label for="checkbox-current-treatment-impact"><b>Current treatment and potential impact on safety at work</b></label>
              </div>`
    break;
    case 'FFD with another Specialist':
      return `<div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-current-diagnosis" data-action="current-diagnosis" data-verbose="Current Diagnosis"
                  data-question="What is the current diagnosis?">
                <label for="checkbox-current-diagnosis"><b>Current Diagnosis</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-return-ability" data-action="ability-to-return" data-verbose="Ability to Safely return to the Role"
                  data-question="Can worker safely perform the essential inherent requirements of the role without restrictions or accommodations?">
                <label for="checkbox-return-ability"><b>Ability to Safely return to the Role</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-work-safe-restrictions" data-action="work-safe-restrictions" data-verbose="Any restrictions that may be required to remain safe at work" data-question="What restrictions are required to ensure worker doesn’t suffer a further injury or illness related to their condition?">
                <label for="checkbox-work-safe-restrictions"><b>Any restrictions that may be required to remain safe at work</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-alternate-roles" data-action="alternate-roles" data-verbose="If worker can perform any alternate roles"
                  data-question="What other roles could the worker safely perform - please provide potential other roles you have available">
                <label for="checkbox-alternate-roles"><b>If worker can perform any alternate roles</b></label>
              </div>
              <div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-current-treatment-impact" data-action="current-treatment-impact" data-verbose="Current treatment and potential impact on safety at work" data-question="Do any current medication or other treatments potentially pose a risk to safety in the workplace?">
                <label for="checkbox-current-treatment-impact"><b>Current treatment and potential impact on safety at work</b></label>
              </div>`
    break;
    default: // if there is no value from above found
      return `<div class="col-sm-5 animate-advice-card">
                <input type="checkbox" class="advice-options-check" id="checkbox-error" data-action="error">
                <label for="checkbox-error"><b>No data inputted for these options yet</b></label>
              </div>`
      // return `<div class="col-sm-5 animate-advice-card">
      //           <input type="checkbox" class="advice-options-check" id="checkbox-accuracy-diagnosis" data-action="accuracy-diagnosis">
      //           <label for="checkbox-accuracy-diagnosis"><b>Accuracy of diagnosis</b></label>
      //         </div>
      //         <div class="col-sm-5 animate-advice-card">
      //           <input type="checkbox" class="advice-options-check" id="checkbox-cause-injury" data-action="cause-of-injury">
      //           <label for="checkbox-cause-injury"><b>Cause injury</b></label>
      //         </div>
      //         <div class="col-sm-5 animate-advice-card">
      //           <input type="checkbox" class="advice-options-check" id="checkbox-best-practice-treatment" data-action="best-practice-treatment">
      //           <label for="checkbox-best-practice-treatment"><b>Best Practice Treatment for this condition</b></label>
      //         </div>
      //         <div class="col-sm-5 animate-advice-card">
      //           <input type="checkbox" class="advice-options-check" id="checkbox-rehab" data-action="rehab-and-timeframes">
      //           <label for="checkbox-rehab"><b>Likely rehabilitation & timeframes</b></label>
      //         </div>
      //         <div class="col-sm-5 animate-advice-card">
      //           <input type="checkbox" class="advice-options-check" id="checkbox-return-to-work-guidance" data-action="return-to-work-guidance">
      //           <label for="checkbox-return-to-work-guidance"><b>Return to Work Guidance (short, medium and long terms)</b></label>
      //         </div>`
    break;
  }
}

var generateOptQuestions = questions => {

  qO = questions || [];
  let html = "";
  if (!qO.length) {
    return html
  } else {
    qO.forEach(question => html+= `<div class="animate-booking-outcome-desc mb-1"><span>${question}</span></div>`)
  }
  return html

}

var generateResultDescription = (value, scope) => {

  if (value.includes('IME')) {
    return `<div class="animate-booking-outcome mb-2"><span><b>Independent Medical Examination</b></span></div><div class="animate-booking-outcome-desc mb-2"><span>Our medical specialists provide an accurate assessment of a person’s function – through an independent lens. Understanding and quantifying the impact of a condition on an individual, and their work is our speciality.</span></div>
                      <div class="animate-outcome-more"><a href="/lime-services/independent-medical-examination" target="_blank"><span><b>more info</b></span></a></div>`
  } else if (value.includes('FFD')) {
    return `<div class="animate-booking-outcome mb-2"><span><b>Fitness for Duty Assessment</b></span></div><div class="animate-booking-outcome-desc mb-2"><span>As a nation, we are getting older, heavier and more sedentary. These factors often mean an increase in health conditions and injuries in the workforce.</span></div>
                      <div class="animate-outcome-more"><a href="/lime-services/fitness-for-duty" target="_blank"><span><b>more info</b></span></a></div>`
  } else if (value.includes('File Review')) {
    return `<div class="animate-booking-outcome mb-2"><span><b>File Review</b></span></div><div class="animate-booking-outcome-desc mb-2"><span>Typically, a Forensic Assessment is performed as a desktop file review, but it may also involve an assessment of an individual, their workplace, or the site of an accident.</span></div>
                      <div class="animate-outcome-more"><a href="/lime-services/forensic-assessment" target="_blank"><span><b>more info</b></span></a></div>`
  } else { // TODO: Make sure that the file review has the description in here
    return '';
  }

  // <div class="animate-booking-outcome mb-2"><span><b>Independent Medical Examination</b></span></div><div class="animate-booking-outcome-desc mb-2"><span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</span></div>
  //                     <div class="animate-outcome-more"><span><b>more info</b></span></div>
}

// IME with an Occupational Physician
// IME with another Specialist
// FFD with an Occupational Physician
// FFD with another Specialist
// // rest to do
// IME / FFD with an Occupational Physician
// IME / FFD with another Specialist
// IME with a Psychiatrist
// I want to know if treatment is on the right track
// File Review with an Occupational Physician

// actions for when the window is ready
let aF, aO, qO;
$(window).ready(() => {
  $('body').prepend(`<div class="row no-margin">
    <div class="col-lg-6 lime-sidebar-main">
      <div class="lime-logo-sidebar mt-5">
        <a href="./index.html">
          <img class="lime-logo" src="https://uploads-ssl.webflow.com/5cedec8822e95a9e59950411/5d08c51f95e837a09380dc4b_lime_logo.svg">
        </a>
      </div>
      <div class="container" id="iama-sidebar-text" style="top:20%;">

      </div>
      <a href="/contact-us" target="_blank">
        <button class="lime-help-btn">
          <span>Contact us</span>
        </button>
      </a>
    </div>
    <div class="col-lg-6 overflow-auto">
        <div id="iama" style="height:100vh;">
          <span></span>
        </div>
    </div>
  </div>`)
  let params = (new URL(document.location)).searchParams;
  let start = params.get("s") || 'a';
  var isMobile = false; //initiate as false
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
      isMobile = true;
  }
  // console.log('initing booking form', pathObj)
  aF = $('#iama').animateForm({ // initialise the animatedform
    form: 'form',
    start: start,
    triggerCallback: e => parseCallbacks(e),
    triggerEnd: e => parseEnd(e),
    // triggerPath: (p, d, props) => parsePath(p, d, props),
    pathObj,
    project: "jay",
    flow: "test",
    history: validateHistory(params) // augments the beginning history to start it with some history
  })
  if (params.has('p')) {
    let type = params.get('t'),
        s = params.get('s');
    updateSidebar(type);
    aF.dataObj['scope'] = type;
    // $('.animate-message-inner').append(insertBackButton()); // add the back button
    // $('.lime-back-btn-container').click(e => handleBack(e)); // add listeners to the back button
  }

  setEvents()
})

var setEvents = () => {

  aF.events.on('loc', e => {
    console.log('loc step is here')
    $('.animate-message-action-button').off().click(e => {
      console.log('this was just clicked')
      console.log($(e.target).data())
      let location = $(e.target).data('text'),
          scope = aF.dataObj.scope;
      aF.dataObj.location = location;
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
      aF.manageRoutes(e);
    })
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

var updateSidebar = type => {
  html = `<span class="lime-detail lime-detail-scope"><b>- ${type}</b></span>`
  $('.lime-about').append(html)
  $('[data-step="1-b"]').find('.lime-section-text').toggleClass('active')
  $('[data-step="1-b"]').find('.lime-section.lime-ball').toggleClass('d-none')
  $('[data-step="1"]').find('.lime-divider').toggleClass('d-none')
  dataObj.scope = type;
}


// function to parse the callback response when a button is clicked
// will be used to manipulate the sidebar
var parseCallbacks = e => {
  console.log(e)
  let html = "";
  switch(e.stage) {
    case 'restart':
      $('#sidebar-text').html('')
    break;
    case 'scope':
      resetSidebarActions()
      html = `<span class="lime-detail lime-detail-scope"><b>- ${e.value}</b></span>`
      $('.lime-about').append(html)
      $('[data-step="1-b"]').find('.lime-section-text').hasClass('active') ? null : $('[data-step="1-b"]').find('.lime-section-text').addClass('active');
      $('[data-step="1-b"]').find('.lime-section.lime-ball').hasClass('d-none') ? $('[data-step="1-b"]').find('.lime-section.lime-ball').removeClass('d-none') : null;
      $('[data-step="1"]').find('.lime-divider').toggleClass('d-none')
      dataObj.scope = e.value;
      if (e.value === "an Employer") $('#sidebar-text').append(`<div class="row lime-sidebar-scope"><span>My <b>Worker</b></span></div>`)
      if (e.value === "a Lawyer") $('#sidebar-text').append(`<div class="row lime-sidebar-scope"><span>My <b>Client</b></span></div>`)
      $('[data-step="1-b"]').find('.lime-breadcrumb').attr('onclick', 'prepareSwitchRoute("loc")')

    break;
    case 'location':
      $('.lime-detail-problem, .lime-detail-loc').remove()
      html = `<span class="lime-detail lime-detail-loc"><b>- ${e.value}</b></span>`
      $('.lime-location').append(html)
      $('[data-step="2"]').find('.lime-section-text').hasClass('active') ? null : $('[data-step="2"]').find('.lime-section-text').addClass('active');
      $('[data-step="2"]').find('.lime-section.lime-ball').hasClass('d-none') ? $('[data-step="2"]').find('.lime-section.lime-ball').removeClass('d-none') : null;

      switch(aF.dataObj.scope) {
        case 'Employer':
          $('[data-step="2"]').find('.lime-breadcrumb').attr('onclick', 'prepareSwitchRoute("employer_a")')
        break;
        case 'Lawyer':
          $('[data-step="2"]').find('.lime-breadcrumb').attr('onclick', 'prepareSwitchRoute("lawyer")')
        break;
        case 'Insurer':
          $('[data-step="2"]').find('.lime-breadcrumb').attr('onclick', 'prepareSwitchRoute("insurer")')
        break;
        case 'Worker':
          $('[data-step="2"]').find('.lime-breadcrumb').attr('onclick', 'prepareSwitchRoute("worker")')
        break;
      }

      dataObj.problem = e.value;
    break;
    case 'problem':
      $('.lime-detail-problem, .lime-detail-wr').remove()
      html = `<span class="lime-detail lime-detail-problem"><b>- ${e.value}</b></span>`
      $('.lime-condition').append(html)

      dataObj.problem = e.value;
    break;
    case 'wr':
      $('.lime-detail-wr').remove()
      html = `<br class="lime-detail-wr"><span class="lime-detail lime-detail-wr"><b>- ${e.value}</b></span>`
      $('.lime-condition').append(html)
      dataObj.problem = e.value;
      $('[data-step="3"]').find('.lime-section-text').hasClass('active') ? null : $('[data-step="3"]').find('.lime-section-text').toggleClass('active');
      $('[data-step="3"]').find('.lime-section').hasClass('d-none') ? $('[data-step="3"]').find('.lime-section').removeClass('d-none') : null;
      $('[data-step="2"]').find('.lime-divider').toggleClass('d-none')
    break;
    case 'IME':
      $('.lime-detail-IME').remove()
      html = `<span class="lime-detail lime-detail-IME"><b>- ${e.value}</b></span>`;
      $('.lime-appointment').append(html)
      console.log(e, e.currentPath, e.currentpath)
      if (aF.dataObj['scope'] === 'Worker' || aF.dataObj['scope'] === 'Insurer') $('[data-step="3"]').find('.lime-breadcrumb').attr('onclick', `prepareSwitchRoute("${e.currentPath || e.currentpath}")`);
    break;
    case 'diagnosis':
      $('[data-step="3"]').find('.lime-breadcrumb').attr('onclick', `prepareSwitchRoute("${e.currentPath || e.currentpath}")`)
    break;
    case 'short-problem': // short-problem is used for lawyer/insurer flows
      $('.lime-detail-problem').remove()
      html = `<span class="lime-detail lime-detail-problem"><b>- ${e.value}</b></span>`
      $('.lime-condition').append(html)
      $('[data-step="3"]').find('.lime-section-text').hasClass('active') ? null : $('[data-step="3"]').find('.lime-section-text').addClass('active');
      $('[data-step="3"]').find('.lime-section').hasClass('d-none') ? $('[data-step="3"]').find('.lime-section').removeClass('d-none') : null;
      $('[data-step="2"]').find('.lime-divider').toggleClass('d-none');
    break;
    default:
      // do nothing
    break;

  }
}

var parseEnd = e => { // triggered at the end of the flow
  console.log(e, 'THIS IS THE END')
  setTimeout(function(){ // slight delay to ensure that the dataObject is correctly populated
    createResult(e.IME, e.scope) // will be used to mutate the end options for the user
  }, 50)

}

var resetSidebarActions = () => { // removes all of the sidebar slugs if the user starts from the start again
  $('.lime-detail-scope, .lime-detail-wr, .lime-detail-diagnosis, .lime-detail-IME, .lime-detail-problem, .lime-detail-loc').remove()
  $('[data-step="1-b"]').find('.lime-breadcrumb').attr('onclick', null)
  $('[data-step="2"]').find('.lime-breadcrumb').attr('onclick', null)
  $('[data-step="3"]').find('.lime-breadcrumb').attr('onclick', null)
  $('[data-step="3"], [data-step="2"]').find('.lime-section-text').removeClass('active')
  $('[data-step="3"], [data-step="2"]').find('.lime-section').addClass('d-none');
  aF.history = aF.history.splice(1,1); // resetting the history for "new paths"
  aF.history.unshift({ // push the start message to the start of the history so that we can only go back to the scope identifier
    "message" : "I am a...",
    "buttons" : [
      {
      "text" : "Employer",
      "path" : "employer_a"
      },
      {
      "text" : "Lawyer",
      "path" : "lawyer"
      },
      {
      "text" : "Insurer",
      "path" : "insurer"
      },
      {
      "text" : "Worker",
      "path" : "worker"
      }
    ],
    "data" : {
      "stage" : "scope",
      "id" : "scope"
    },
    "path" : "a",
    "previous" : "a"
  })
}

var prepareSwitchRoute = path => {
  aF.switchPath({ path })
}

var createResult = (value, scope) => { // will create the booking card at the end
  let html = `<div class="animate-message-booking">
                <div class="animate-message-text action-header-text mb-4"><span>You need a...</span></div>
                <div class="animate-booking-type">
                  <div class="row animate-booking-header" style="background: #FFF;">
                    <div class="col-sm-12 animate-booking-desc">${generateResultDescription(value, scope)}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 animate-booking-advice mt-4"><span><b>Please tick the areas that you need advice on <i>(optional)</i>:</b></span></div>
                  </div>
                  <div class="row animate-advice-options">
                    ${generateOptCheckboxes(value, scope)}
                  </div>
                  <div class="animate-advice-book">
                    <div class="animate-appointment-book-btn" onclick="createRecommendations('${value}')">
                      Book Appointment
                    </div>
                  </div>
                </div>
              </div>`
  $('.animate-message').css('top', '10%');
  $('.animate-message-inner').replaceWith(html);

}

var createRecommendations = value => { // will create the booking card at the end
  aO = [];
  questions = [];
  if (!$('.advice-options-check:checked').length) return redirectToBooking();
  $('.advice-options-check:checked').each((i, c) => {
    aO.push($(c).data('verbose'))
    questions.push($(c).data('question'))
  })
  console.log(questions, "Qs HERE")
  console.log('creating recommendations here')
  let html = `<div class="animate-message-booking booking-recommendation mb-4">
                <div class="animate-message-text mb-4"><span>Before you book...</span></div>
                <div class="animate-booking-type">
                  <div class="row animate-booking-header mb-4" style="background: #FFF;">
                    <div class="col-sm-12 animate-booking-desc">
                      <div class="animate-booking-outcome mb-2"><span><b>We recommend you book a...</b></span></div>
                      <div class="animate-booking-outcome-desc mb-1"><span>${value}</span></div>
                      <div class="animate-outcome-more mb-4">${generateReadMoreLink(value)}</div>
                      <div class="animate-booking-outcome animate-booking-questions-container mb-2"><span><b>Please ensure that your referral includes questions such as:</b></span></div>
                      ${generateOptQuestions(questions)}
                    </div>
                    <div class="recommendation-divider"></div>
                    <div class="col-sm-12 animate-booking-desc animate-booking-emailer-container">
                      <div class="animate-booking-outcome mb-4 align-center"><span><b>Want this emailed to you? Enter your email address below...</b></span></div>
                      <input class="animate-email-rec-input" type="text" id="recommendation-email-address" placeholder="Enter email address">
                      <div class="animate-appointment-book-btn send-rec-btn" id="animate-rec-send-btn" onclick="sendRecommendations('${value}')">Send</div>
                    </div>
                  </div>

                  <div class="animate-advice-book">
                    <div class="animate-appointment-book-btn" onclick="redirectToBooking()">
                      Book Appointment
                    </div>
                  </div>
                </div>
              </div>`
  $('.animate-message').css('top', '5%');
  $('.animate-message-booking').replaceWith(html);
  if (!qO.length) $('.animate-booking-questions-container, .animate-booking-emailer-container, .recommendation-divider').remove();
  $('#recommendation-email-address').on('keypress', e => {
    if (e.which === 13) {
      sendRecommendations(value)
    }
  })
}

var generateReadMoreLink = type => {
  if (type.includes('IME')) {
    return '<a href="/lime-services/independent-medical-examination" target="_blank"><span><b>Read more about Independent Medical Examinations</b></span></a>'
  } else if (type.includes('FFD')) {
    return '<a href="/lime-services/fitness-for-duty" target="_blank"><span><b>Read more about Fitness for Duty Assessments</b></span></a>'
  } else if (type.includes('File Review')) {
    //TODO  add this in
  } else {
    return '<a href="/lime-services/" target="_blank"><span><b>Read more about our services</b></span></a>'
  }
}

var redirectToBooking = () => {
  let { location, IME } = aF.dataObj,
      appId, locId;

  if (IME.includes('IME')) {
    appId = "10587773";
  } else if (IME.includes('FFD')) {
    appId = "10532614";
  } else if (IME.includes('File Review')) {
    appId = ""
  } else {
    return window.location.href = "https://app.acuityscheduling.com/schedule.php?owner=17864444";
  }

  return window.location.href = `https://app.acuityscheduling.com/schedule.php?owner=17864444?location=${location}&appointmentType=${appId}`;
}

var sendRecommendations = type => {
  let to = $('#recommendation-email-address').val()
  let data = {
    apptype: type,
    question: qO,
    advice: aO
  }
  let msg = {
    to,
    from: 'jay.farrell@live.com.au',
    templateId: 'd-c081a5569a674022bf19f3d6158ce47f',
    dynamic_template_data: data
  }

  var req = new Request('/help-me-book?email=' + to, {
      method: 'get',
      mode: 'cors',
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        "x-api-key": "ECRtMEGAWNa8v5aqbvkHJG2QDvyUcBH3kdlxj4Ne"
      },
      // body: data
    });
  // Use request as first parameter to fetch method
//   fetch(req)
//       .then(r => console.log('r here', r))
//       .catch(e => console.log(e))

//    var form = document.getElementById("email-form-2");
//    var element1 = document.getElementById("email-2")
//    element1.value = "un";
//    // form.submit();
//    console.log('submitting form')


//     var http = new XMLHttpRequest();
//     http.open("POST", "/help-me-book", true);
//     http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//     var params = "email=" + to; // probably use document.getElementById(...).value
//     http.send(params);
//     http.onload = function() {
//         console.log(http)
//         alert(http.responseText);
//     }

  // console.log('about to make this form ajax')
  // makeWebflowFormAjax($('form'), success => {
  //   console.log(success, "SUCCESS")
  // }, err => console.log(err))
  // console.log($('#email-form-2'))
  // $('#email-2').val(to)
  // setTimeout(function(){
  //   // $('#email-form-2').submit()
  //   $('#form-submit-btn').click()
  // }, 500)

  $('#email-form-2').submit(e => {
    console.log('this is about to me submitted')
    e.preventDefault();
    let form = $(e.target);
    $.ajax({
     method: "POST",
     url: form.attr('action'),
     data: form.serialize(),

      success: function(data){
        $('#animate-appointment-book-btn').text('Thankyou')
        console.log(data)
        if(data.success){
          //successful submission - hide the form and show the success message
          parent = $(form.parent());
          parent.children('form').css('display','none');
          parent.children('.w-form-done').css('display','block');
        } else {
          //failed submission - log the output to the console and show the failure message
          console.log('this failed', data)
          }
      },
      error: function(e){
        console.log(e)
        console.log('about to disable btn')
        $('#animate-rec-send-btn').text('Thankyou').attr('disabled', true)
      	}
    });
  })
  $('#email-2').val(to);
  data = data || []
  $('#opts').val(JSON.stringify(data))
  $('#email-form-2').submit();

}


var makeWebflowFormAjax = function( forms, successCallback, errorCallback ) {
	forms.each(function(){
		var form = $(this);
		form.on("submit", function(){
			var container = 	form.parent();
			var doneBlock  =	$(".w-form-done", container);
			var failBlock  =	$(".w-form-fail", container);

			var action = 		form.attr("action");
			var method = 		form.attr("method");
			var data = 			form.serialize();

			// call via ajax
			$.ajax({
				type: method,
				url: action,
				data: data,
				success: function (resultData) {
					if (typeof successCallback === 'function') {
						// call custom callback
						result = successCallback(resultData);
						if ( ! result ) {
							// show error (fail) block
							form.show();
							doneBlock.hide();
							failBlock.show();
							// console.log(e);
              console.log('this error\'d out')

							return;
						}
					}

					// show success (done) block
					form.hide();
					doneBlock.show();
					failBlock.hide();
				},

				error: function (e) {
					// call custom callback
					if (typeof errorCallback === 'function') {
            console.log(e)
						errorCallback(e)
					}

					// show error (fail) block
					form.show();
					doneBlock.hide();
					failBlock.show();
					console.log(e);
				}
			});

			// prevent default webdlow action
			return false;
		});
	});
}

// template to return the back button for the form
var insertBackButton = (p, d) => {
  return `<div class="lime-back-btn-container"><span class="lime-path-back">back</span></div>`
}

// handles the sidebar step backwards when the back button is clicked
var handleSidebarReverse = p => {
  if (!p.data && p.data.stage) return false; // return false if there is no stage assigned to this step
    console.log(p.data.stage)
  // switch identifies which elements to remove and adjust
  switch (p.data.stage){
    case 'scope':
      $('.lime-detail-scope').remove()
      $('[data-step="1-b"]').find('.lime-section-text').toggleClass('active')
      $('[data-step="1-b"]').find('.lime-section.lime-ball').toggleClass('d-none')
      $('[data-step="1"]').find('.lime-divider').toggleClass('d-none')
    break;
    case 'location':
      $('.lime-detail-loc').remove()
      $('[data-step="2"]').find('.lime-section-text').toggleClass('active')
      $('[data-step="2"]').find('.lime-section.lime-ball').toggleClass('d-none')
    break;
    case 'problem':
      $('.lime-detail-problem').remove()

      if ($('[data-step="3"]').find('.lime-section-text').hasClass('active')) {
        $('[data-step="3"]').find('.lime-section-text').toggleClass('active')
        $('[data-step="3"]').find('.lime-section').toggleClass('d-none')
      }
    break;
    case 'short-problem':
      $('.lime-detail-problem').remove()

      if ($('[data-step="3"]').find('.lime-section-text').hasClass('active')) {
        $('[data-step="3"]').find('.lime-section-text').toggleClass('active')
        $('[data-step="3"]').find('.lime-section').toggleClass('d-none')
      }
    break;
    case 'wr':
      $('.lime-detail-wr').remove()

      if ($('[data-step="3"]').find('.lime-section-text').hasClass('active')) {
        $('[data-step="3"]').find('.lime-section-text').toggleClass('active')
        $('[data-step="3"]').find('.lime-section').toggleClass('d-none')
      }

      $('[data-step="2"]').find('.lime-divider').toggleClass('d-none')
    break;
    case 'IME':
      $('.lime-detail-IME').remove()
    break;
  }
}
