const pathObj = {
  start: [{
    message: 'Currently I have',
    buttons: [{
      text: 'No solar',
      path: 'property_location'
    },{
      text: 'Hot water solar',
      path: 'property_location'
    },{
      text: 'Current solar',
      path: 'solar_action'
    }],
    data: {
      stage: "start",
      id: "start"
    }
  }],
  solar_action: [{
    message: 'I am looking to',
    buttons: [{
      text: 'Upgrade',
      path: 'property_location'
    },{
      text: 'Replace',
      path: 'property_location'
    }],
    data: {
      stage: "solar_action",
      id: "solar_action"
    }
  }],
  property_location: [{
    message: "The property is located at",
    template_type: 'input',
    input: {
      placeholder: "Enter your address",
      path: "property_status"
    },
    data: {
      stage: "property_location",
      id: "property_location"
    }
  }],
  property_status: [{
    message: "At address I",
    buttons: [{
      text: 'Pay rent',
      path: 'last_quarterly_bill'
    },{
      text: 'Am the owner',
      path: 'last_quarterly_bill'
    }],
    data: {
      stage: "property_status",
      id: "property_status"
    }
  }],
  last_quarterly_bill: [{
    message: "and my last quarterly bill was",
    template_type: 'input',
    input: {
      placeholder: "Enter amount",
      path: "property_type"
    },
    data: {
      stage: "last_quarterly_bill",
      id: "last_quarterly_bill"
    }
  }],
  property_type: [{
    message: "Address is a",
    buttons: [{
      text: 'Free standing home',
      path: 'property_setting'
    },{
      text: 'Apartment, duplex or townhouse',
      path: 'property_setting'
    }],
    data: {
      stage: "property_type",
      id: "property_type"
    }
  }],
  property_setting: [{
    message: "And is",
    buttons: [{
      text: 'Low set',
      path: 'property_age'
    },{
      text: 'Multi-story or High set',
      path: 'property_age'
    }],
    data: {
      stage: "property_setting",
      id: "property_setting"
    }
  }],
  property_age: [{
    message: "I estimate the property to be",
    buttons: [{
      text: 'Under 30 yrs old',
      path: 'choosing_system'
    },{
      text: 'Over 30 yrs old',
      path: 'property_wiring'
    }],
    data: {
      stage: "property_age",
      id: "property_age"
    }
  }],
  property_wiring: [{
    message: "and",
    buttons: [{
      text: 'has been rewired',
      path: 'choosing_system'
    },{
      text: 'Has not been rewired',
      path: 'choosing_system'
    },{
      text: 'May have been rewired',
      path: 'choosing_system'
    }],
    data: {
      stage: "property_wiring",
      id: "property_wiring"
    }
  }],
  choosing_system: [{
    message: "When choosing a system I",
    buttons: [{
      text: 'Would like your recommendation',
      path: 'system_rec_1'
    },{
      text: 'Have a system in mind',
      path: 'system_choice_1'
    }],
    data: {
      stage: "choosing_system",
      id: "choosing_system"
    }
  }],
  system_rec_1: [{
    message: "and I would like",
    buttons: [{
      text: 'Solar only',
      path: 'contact_detail'
    },{
      text: 'a battery included',
      path: 'contact_detail'
    }],
    data: {
      stage: "system_rec_1",
      id: "system_rec_1"
    }
  }],
  system_choice_1: [{
    message: "The system I am after is a",
    buttons: [{
      text: '{Size} {panel} {inverter} {battery}',
      path: 'contact_detail'
    }],
    data: {
      stage: "system_choice_1",
      id: "system_choice_1"
    }
  }],
  contact_detail: [{
    message: "Please contact me on",
    template_type: 'input',
    input: {
      placeholder: "Enter contact number",
      path: "end"
    },
    data: {
      stage: "contact_detail",
      id: "contact_detail"
    }
  }],
  end: [{
    message: "fin.",
    buttons: [{
      text: 'restart',
      path: 'start'
    }],
    data: {
      stage: "end",
      id: "end"
    }
  }],
}

// path object / routing logic
const pathObj1 = {
  name: [{
    message: "Hello, my name is",
    template_type: 'input',
    input: {
      placeholder: "Enter your name",
      path: "location"
    },
    data: {
      stage: "name",
      id: "name"
    }
  }],
  location: [{
    message: "And I'm from",
    template_type: 'button',
    buttons: [{
      text: 'Region A',
      path: 'hire_count'
    },{
      text: 'Region B',
      path: 'hire_count'
    }],
    data: {
      stage: 'location',
      id: 'location'
    }
  }],
  hire_count: [{
    message: "My organisation makes ____ hires per year",
    template_type: 'button',
    buttons: [{
      text: '<100',
      path: 'hires_completed_by'
    },{
      text: '>100',
      path: 'hires_completed_by'
    }],
    data: {
      stage: 'hires_count',
      id: 'hires_count'
    }
  }],
  hires_completed_by: [{
    message: 'These are completed by',
    template_type: 'button',
    buttons: [{
      text: 'Our internal HR team',
      path: 'select_ATS'
    },{
      text: "Us! We're a recruitment agency",
      path: 'select_ATS'
    },{
      text: "An external recruiter",
      path: 'hiring_most_important'
    }],
    data: {
      stage: 'hires_completed_by',
      id: 'hires_completed_by'
    }
  }],
  select_ATS: [{
    message: "We currently use ____ ATS",
    template_type: 'select',
    options: [
      {
        text: "SmartRecruiters",
        value: "SmartRecruiters",
        path: "hiring_most_important"
      },{
        text: "JobAdder",
        path: "hiring_most_important"
      },{
        text: "Oracle Taleo",
        path: "hiring_most_important"
      },{
        text: "Bullhorn",
        path: "hiring_most_important"
      },{
        text: "Workday",
        path: "hiring_most_important"
      },{
        text: "Kallidus Recruit",
        path: "hiring_most_important"
      },{
        text: "Oracle Recruitment Cloud (ORC)",
        path: "hiring_most_important"
      },{
        text: "iCIMS",
        path: "hiring_most_important"
      },{
        text: "SnapHire",
        path: "hiring_most_important"
      },{
        text: "Lever",
        path: "hiring_most_important"
      },{
        text: "Springboard",
        path: "hiring_most_important"
      },{
        text: "Expr3ss!",
        path: "hiring_most_important"
      },{
        text: "Avature",
        path: "hiring_most_important"
      },{
        text: "Other",
        path: "hiring_most_important"
      }
    ],
    data: {
      stage: "current_ATS",
      id: "current_ATS"
    }
  }],
  hiring_most_important: [{
    message: "When hiring, the things most important to me are",
    template_type: "checkbox",
    options: [{
      text: 'Core Feature 1',
      path: "recommendation"
    },{
      text: 'Core Feature 2',
      path: "recommendation"
    },{
      text: 'Core Feature 3',
      path: "recommendation"
    }],
    data: {
      stage: "hiring_most_important",
      id: "hiring_most_important",
      path: 'recommendation'
    }
  }],
  recommendation: [{
    message: 'xref recommends...',
    buttons: []
  }],
  test: [{
    message: 'testing checkboxes',
    template_type: 'checkbox',
    options: [
      {
        text: 'A',
        value: 'Aa'
      },{
        text: 'B'
      }
    ],
    data: {
      path: 'name'
    }
  }]
}
