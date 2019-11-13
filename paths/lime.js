// path object / routing logic
const pathObj = {
  a: [{
    message: "I am a...",
    template_type: 'select',
    options: [
      {
        text: "Employer",
        value: "Employer",
        path: "loc"
      },{
        text: "Lawyer",
        path: "loc"
      },{
        text: "Insurer",
        path: "loc"
      },{
        text: "Worker",
        path: "loc"
      },
    ],
    input: {
      placeholder: "Type who you are",
      path: 'loc'
    },
    buttons: [{
      text: "Employer",
      path: "loc"
    },{
      text: "Lawyer",
      path: "loc"
    },{
      text: "Insurer",
      path: "loc"
    },{
      text: "Worker",
      path: "loc"
    }],
    data: {
      stage: "scope",
      id: "scope"
    }
  }],
  loc: [{
    message: 'I live in...',
    options: [
      {
        title: 'Capital Cities',
        buttons: [{
          text: 'Adelaide',
          path: 'a'
        },{
          text: 'Brisbane',
          path: 'a'
        },{
          text: 'Canberra',
          path: 'a'
        },{
          text: 'Hobart',
          path: 'a'
        },{
          text: 'Melbourne',
          path: 'a'
        },{
          text: 'Sydney',
          path: 'a'
        }]
      },
      {
        title: 'South East Queensland',
        buttons: [{
          text: 'Brookwater (Ipswich)',
          path: 'a'
        },{
          text: 'Capalaba',
          path: 'a'
        },{
          text: 'Gold Coast',
          path: 'a'
        },{
          text: 'Northlakes',
          path: 'a'
        },{
          text: 'Springwood',
          path: 'a'
        },{
          text: 'Sunnybank',
          path: 'a'
        },{
          text: 'Sunshine Coast',
          path: 'a'
        }]
      },
      {
        title: 'Regional Queensland',
        buttons: [{
          text: 'Cairns',
          path: 'a'
        },{
          text: 'Gladstone',
          path: 'a'
        },{
          text: 'Hervey Bay',
          path: 'a'
        },{
          text: 'Mackay',
          path: 'a'
        },{
          text: 'Rockhampton',
          path: 'a'
        },{
          text: 'Toowoomba',
          path: 'a'
        },{
          text: 'Townsville',
          path: 'a'
        }]
      }
    ],
    template_type: 'multi-button',
    data: {
      stage: 'location',
      id: 'location'
    }
  }],
  employer_a: [{
    message: "I require assistance with an employee who has a...",
    buttons: [{
      text: "Physical Condition",
      path: "employer_physical_1"
    },{
      text: "Psychological Condition",
      path: "employer_psych"
    }],
    data: {
      stage: "problem"
    }
  }],
  employer_physical_1: [{
    message: "This condition...",
    buttons: [{
      text: "May be work related",
      path: "employer_physical_wr"
    },{
      text: "Is not work related",
      path: "employer_physical_nwr_b"
    }],
    data: {
      stage: "wr"
    }
  }],
  employer_physical_wr: [{
    message: "Select below",
    buttons: [{
      text: "A formal diagnosis has been made, but I do not have enough information to manage the case",
      path: "employer_physical_wr_a_1"
    },{
      text: "There is a formal diagnosis and I have been provided with information about it",
      path: "employer_physical_wr_b_1"
    },{
      text: "A formal diagnosis has not been determined",
      path: "employer_physical_wr_c_1"
    }],
    data: {
      stage: "diagnosis"
    }
  }],
  employer_physical_wr_a_1: [{
    message: "I want a...",
    buttons: [{
      text: "IME with an Occupational Physician",
      path: ""
    },{
      text: "IME with another Specialist",
      path: ""
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_physical_wr_b_1: [{
    message: "Select below",
    buttons: [{
      text: "There is a current and open compensation claim for this injury",
      path: "employer_physical_wr_b_2"
    },{
      text: "The compensation claim for this injury has been closed",
      path: "employer_physical_wr_b_3"
    }],
    data: {
      stage: "Null"
    }
  }],
  employer_physical_wr_b_2: [{
    message: "I want a...",
    buttons: [{
      text: "IME with an Occupational Physician",
      path: ""
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_physical_wr_b_3: [{
    message: "I want a...",
    buttons: [{
      text: "FFD with an Occupational Physician",
      path: ""
    },{
      text: "FFD with another Specialist",
      path: ""
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_physical_wr_c_1: [{
    message: "I want a...",
    buttons: [{
      text: "IME with an Occupational Physician",
      path: ""
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_physical_nwr: [{
    message: "Select below",
    buttons: [{
      text: "A formal diagnosis has been made, but I have not been provided with information about it",
      path: "employer_physical_nwr_a"
    },{
      text: "There is a formal diagnosis and I have been provided with information about it",
      path: "employer_physical_nwr_b"
    },{
      text: "A formal diagnosis has not been determined",
      path: "employer_physical_nwr_c"
    }],
    data: {
      stage: "diagnosis"
    }
  }],
  employer_physical_nwr_a: [{
    message: "I want a...",
    buttons: [{
      text: "IME with an Occupational Physician",
      path: ""
    },{
      text: "IME with another Specialist",
      path: "employer_physical_nwr_c"
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_physical_nwr_b: [{
    message: "I want a...",
    buttons: [{
      text: "FFD with an Occupational Physician",
      path: ""
    },{
      text: "FFD with another Specialist",
      path: ""
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_physical_nwr_c: [{
    message: "I want a...",
    buttons: [{
      text: "IME with an Occupational Physician",
      path: ""
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_psych: [{
    message: "This condition...",
    buttons: [{
      text: "May be work related",
      path: "employer_psych_wr"
    },{
      text: "Is not work related",
      path: "employer_psych_nwr"
    },{
      text: "I have concerns about the psychological well-being of my employee and I am unsure of what steps to take",
      path: "employer_psych_other"
    }],
    data: {
      stage: "wr"
    }
  }],
  employer_psych_wr: [{
    message: "Select below",
    buttons: [{
      text: "A formal diagnosis has been made, but I do not have enough information to manage the case",
      path: "employer_psych_wr_a_1"
    },{
      text: "There is a formal diagnosis and I have been provided with information about it",
      path: "employer_psych_wr_b_1"
    },{
      text: "A formal diagnosis has not been determined",
      path: "employer_psych_wr_a_1"
    }],
    data: {
      stage: "diagnosis"
    }
  }],
  employer_psych_wr_a_1: [{
    message: "I want a...",
    buttons: [{
      text: "IME with an Occupational Physician",
      path: ""
    },{
      text: "IME with a Psychiatrist",
      path: "employer_psych_other"
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_psych_wr_b_1: [{
    message: "Select below",
    buttons: [{
      text: "There is a current compensation claim for this injury",
      path: "employer_psych_wr_a_1"
    },{
      text: "The compensation claim has closed",
      path: "employer_psych_wr_b_2"
    }],
    data: {
      stage: "diagnosis"
    }
  }],
  employer_psych_wr_b_2: [{
    message: "I want a...",
    buttons: [{
      text: "FFD with an Occupational Physician",
      path: ""
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_psych_nwr: [{
    message: "Select below",
    buttons: [{
      text: "A formal diagnosis has been made, but I have not been provided with information about it",
      path: "employer_psych_wr_a_1"
    },{
      text: "There is a formal diagnosis and I have been provided with information about it",
      path: "employer_psych_nwr_b_2_new"
    },{
      text: "A formal diagnosis has not been determined",
      path: "employer_psych_wr_a_1"
    }],
    data: {
      stage: "diagnosis"
    }
  }],
  employer_psych_nwr_b_2_new: [{
    message: "I want a...",
    buttons: [{
      text: "IME with an Occupational Physician",
      path: ""
    },{
      text: "IME with a Psychiatrist",
      path: "employer_psych_other"
    },{
      text: "FFD with an Occupational Physician",
      path: ""
    }],
    data: {
      stage: "IME"
    }
  }],
  employer_psych_other: [{
    message: "Select below",
    buttons: [{
      text: "Contact us",
      url: "/contact-us",
      type: 'web_url'
    }],
    data: {

    }
  }],
  lawyer: [{
    message: "I have a claimant / defendant with a..",
    buttons: [{
      text: "Physical Condition",
      path: "employer_physical_wr_a_1"
    },{
      text: "Psychological Condition",
      path: "employer_psych_wr_a_1"
    }],
    data: {
      stage: "short-problem"
    }
  }],
  insurer: [{
    message: "I am an <b>Insurer</b> handling a claim..",
    buttons: [{
      text: "A formal diagnosis has been made, but I do not have enough information to manage the case",
      path: "insurer_a"
    },{
      text: "There is a formal diagnosis and I have been provided with information about it",
      path: "insurer_a"
    },{
      text: "I would like a second opinion",
      path: "insurer_b"
    }],
    data: {
      stage: "short-problem"
    }
  }],
  insurer_a: [{
    message: "I want a...",
    buttons: [{
        text: "File Review with an Occupational Physician",
        path: "employer_psych_other" // previously was no path, to return it to previous just remove the path name here
    },{
        text: "IME with an Occupational Physician",
        path: ""
    },{
        text: "IME with another Specialist",
        path: ""
    },{
        text: "I want to know if treatment is on the right track",
        path: "employer_psych_other"
    }],
    data: {
      stage: "IME"
    }
  }],
  insurer_b: [{
    message: "I want a...",
    buttons: [{
        text: "IME with an Occupational Physician",
        path: ""
    },{
        text: "IME with another Specialist",
        path: ""
    }],
    data: {
      stage: "IME"
    }
  }],
  worker: [{
    message: "I am a <b>Worker</b> who requires assistance",
    buttons: [{
      text: "Call us - 1300 333 767",
      type: 'web_url',
      url :'tel:1300333767'
    },{
      text: "Email us",
      type: 'web_url',
      url :'/contact-us'
    }],
    data: {}
  }]
}
