// path object / routing logic
const pathObj = {
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
