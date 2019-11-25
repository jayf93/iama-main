// path object / routing logic
const pathObj = {
  name: [{
    message: "Hello, my name is",
    template_type: 'input',
    input: {
      placeholder: "John",
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
        text: "ATS 1",
        value: "ATS 1",
        path: "hiring_most_important"
      },{
        text: "ATS 2",
        path: "hiring_most_important"
      },{
        text: "ATS 3",
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
    template_type: "button",
    buttons: [{
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
      id: "hiring_most_important"
    }
  }]
}
