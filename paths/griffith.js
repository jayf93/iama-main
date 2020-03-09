const pathObj = {
  start: [{
    message: 'I am a ____',
    buttons: [{
      text: 'Student',
      path: 'student_1'
    }],
    data: {
      stage: "user_type",
      id: "user_type",
      topic: 'About you',
      stage_verbose: 'I am a'
    }
  }],
  student_1: [{
    message: 'I am interested in studying...',
    buttons: [{
      text: '(Select course dropdown)',
      path: 'student_2'
    },{
      text: "I'm not sure yet",
      path: 'courses_1'
    }],
    data: {
      stage: 'course',
      stage_verbose: 'I am interested in studying',
      id: 'course',
      topic: 'About you'
    }
  }],
  student_2: [{
    message: "I will be studying as a...",
    buttons: [{
      text: "New student to Griffith College",
      path: "student_new"
    },{
      text: "Current/Past Student to Griffith College",
      path: 'student_current'
    }],
    data: {
      stage: 'student_type',
      topic: 'a'
    }
  }],
  student_new: [{
    message: "As a ____ student.",
    buttons: [{
      text: 'Domestic',
      path: 'student_new_domestic'
    },{
      text: 'International',
      path: 'student_new_international'
    }],
    data: {
      stage: 'student_type_loc',
      stage_verbose: "I am a ____ student",
      topic: 'About you'
    }
  }],
  student_new_domestic: [{
    message: "Currently, I am a...",
    buttons: [{
      text: 'Mature Student (19+)',
      path: 'student_new_domestic_mature'
    },{
      text: 'High School Graduate',
      path: 'student_new_domestic_hsg'
    },{
      text: 'High School Student',
      path: 'student_new_domestic_hss'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_domestic_mature: [{
    message: "Recently, I have been...",
    buttons: [{
      text: 'Studying',
      path: 'student_new_domestic_mature_preapply'
    },{
      text: 'Working',
      path: 'student_new_domestic_mature_preapply'
    },{
      text: 'Studying & Working',
      path: 'student_new_domestic_mature_preapply'
    },{
      text: 'None of the above',
      path: 'student_new_domestic_mature_preapply'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_domestic_mature_preapply: [{
    message: 'Before applying you will need a copy of your academic transcript (if study), a work reference (if work), a character reference (if none), proof of citizenship, a copy of your CV and submit a short statement articulating how you will use the knowledge, skills, abilities and personal qualities gained through life experience to succeed in {course}',
    buttons: [{
      text: "Apply for {course}",
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_domestic_hsg: [{
    message: "After finishing high school I ____ receive a QCE or passes in at least three (3) academic subjects from Year 12",
    buttons: [{
      text: "Did",
      path: "student_new_domestic_hsg_dp"
    },{
      text: "Did not",
      path: "student_new_domestic_hss_dnp"
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_domestic_hsg_dp: [{
    message: "I have a copy of the following",
    template_type: 'checkbox',
    options: [
      {
        text: 'Academic transcript',
        value: 'Academic transcript'
      },{
        text: 'All results'
      },{
        text: 'Key to grading system'
      }
    ],
    data: {
      path: 'student_new_domestic_hsg_dp_preapply',
      topic: 'a'
    }
  }],
  student_new_domestic_hsg_dp_preapply: [{
    message: "Before applying you will need a copy of {x}...",
    buttons: [{
      text: "Applying through QTAC & Accepting your offer.",
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_domestic_hss: [{
    message: 'I ____ on finishing high school',
    buttons: [{
      text: 'Intend',
      path: 'student_new_domestic_hss_dp'
    },{
      text: "Do not intent",
      path: 'student_new_domestic_hss_dnp'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_domestic_hss_dp: [{
    message: 'Before you can begin your {course}, you will need to finish your high school education and recieve your QCE. Alternatively have passes in at least three (3) academic subjects from Year 12. Then apply through QTAC',
    buttons: [{
      text: 'QTAC Application',
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_domestic_hss_dnp: [{
    message: 'Before you can begin your {course}, you will need to take part in our Foundation Program. Alternativly you can apply after recieving 2 years work experience and are over the age of 19.',
    buttons: [{
      text: "Apply for Foundation",
      path: 'fin'
    },{
      text: 'Learn more about Foundation',
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_domestic_hss_dnp: [{
    message: 'Before you can begin your {course}, you will need to finish your high school education and recieve your QCE. Alternatively have passes in at least three (3) academic subjects from Year 12. Then apply through QTAC',
    buttons: [{
      text: "QTAC Application",
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_international: [{
    message: "I am from...",
    template_type: 'select',
    options: [
      {
        text: "Australia",
        value: "aus",
        path: "student_new_international_2"
      },{
        text: "New Zealand",
        value: 'nz',
        path: "student_new_international_2"
      }
    ],
    data: {
      topic: 'a'
    }
  }],
  student_new_international_2: [{
    message: "I ____ meet the academic entry requirements {linked} reuqired for {course}",
    buttons: [{
      text: 'Do',
      path: 'student_new_international_dp'
    },{
      text: 'Do not',
      path: 'student_new_international_dnp'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_international_dp: [{
    message: 'I _____ meet the English language requirements {linked} reuqired for {course}',
    buttons: [{
      text: 'Do',
      path: 'student_new_international_dp_ldp'
    },{
      text: 'Do not',
      path: 'student_new_international_dp_ldnp'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_international_dp_ldp: [{
    message: 'I ____ done any additional study or work',
    buttons: [{
      text: 'Have',
      path: 'student_new_international_dp_ldp_2'
    },{
      text: 'Have not',
      path: 'student_new_international_dp_ldp_2'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_international_dp_ldp_2: [{
    message: 'I have a copy of the following',
    template_type: 'checkbox',
    options: [{
      text: 'Academic transcript'
    },{
      text: 'English test results'
    },{
      text: 'Credit Application Form (if answered above)'
    }],
    data: {
      path: 'student_new_international_dp_ldp_preapply',
      topic: "a"
    }
  }],
  student_new_international_dp_ldp_preapply: [{
    message: "Before applying you will need a copy of {x}...",
    buttons: [{
      text: "Applying through Griffith College & Accepting your offer.",
      path: 'fin'
    },{
      text: 'Applying through Griffith College Representative & Accepting your offer.',
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_international_dnp: [{
    message: 'Before you can begin your {course}, you will need to take part in our Foundation Program. Alternativly you can apply after recieving 2 years work experience and are over the age of 19.',
    buttons: [{
      text: 'Apply for Foundation',
      path: 'fin'
    },{
      text: 'Learn more about Foundation',
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_new_international_dp_ldnp: [{
    message: 'As you do not meet the English language requirements you can undertake an English intensive course at Griffith English Language Institute (GELI) prior to commencing your Griffith College program',
    buttons: [{
      text: 'Learn more about GELI',
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_current: [{
    message: "As a ____ student.",
    buttons: [{
      text: 'Domestic',
      path: 'student_current_domestic'
    },{
      text: 'International',
      path: 'student_current_international'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_current_domestic: [{
    message: "Recently, I have been...",
    buttons: [{
      text: 'Studying',
      path: 'student_current_domestic_preapply'
    },{
      text: 'Working',
      path: 'student_current_domestic_preapply'
    },{
      text: 'Studying & Working',
      path: 'student_current_domestic_preapply'
    },{
      text: 'None of the above',
      path: 'student_current_domestic_preapply'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_current_domestic_preapply: [{
    message: 'Before applying you will need a copy of your academic transcript (if study), a work reference (if work), a character reference (if none), proof of citizenship, a copy of your CV and submit a short statement articulating how you will use the knowledge, skills, abilities and personal qualities gained through life experience to succeed in {course}. During the application process please include your Griffith College student number',
    buttons: [{
      text: "Apply for {course}",
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_current_international: [{
    message: "I am from...",
    template_type: 'select',
    options: [
      {
        text: "Australia",
        value: "aus",
        path: "student_current_international_2"
      },{
        text: "New Zealand",
        value: 'nz',
        path: "student_current_international_2"
      }
    ],
    data: {
      topic: 'a'
    }
  }],
  student_current_international_2: [{
    message: 'I ____ meet the academic entry requirements {linked} reuqired for {course}',
    buttons: [{
      text: 'Do',
      path: 'student_current_international_dp'
    },{
      text: 'Do not',
      path: 'student_current_international_dnp'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_current_international_dp: [{
    message: 'I ____ meet the English language requirements {linked} reuqired for {course}',
    buttons: [{
      text: 'Do',
      path: 'student_current_international_dp_ldp'
    },{
      text: 'Do not',
      path: 'student_current_international_dp_ldnp'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_current_international_dp_ldp: [{
    message: 'I have a copy of the following',
    template_type: 'checkbox',
    options: [{
      text: 'Academic transcript'
    },{
      text: 'English test results'
    },{
      text: 'Credit Application Form (if answered above)'
    }],
    data: {
      path: 'student_current_international_dp_ldp_preapply',
      topic: 'a'
    }
  }],
  student_current_international_dp_ldp_preapply: [{
    message: 'Before applying you will need a copy of {x}... During the application process please include your Griffith College student number',
    buttons: [{
      text: 'Applying through Griffith College & Accepting your offer.',
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  student_current_international_dp_ldnp: [{
    message: "As you do not meet the English language requirements you can undertake an English intensive course at Griffith English Language Institute (GELI) prior to commencing your Griffith College program",
    buttons: [{
      text: 'Learn more about GELI',
      path: "fin"
    }],
    data: {
      topic: 'a'
    }
  }],
  student_current_international_dnp: [{
    message: 'Before you can begin your {course}, you will need to take part in our Foundation Program. Alternativly you can apply after recieving 2 years work experience and are over the age of 19.',
    buttons: [{
      text: 'Apply for Foundation',
      path: 'fin',
    },{
      text: "Learn more about Foundation",
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  courses_1: [{
    message: 'I am interested in choosing a program...',
    buttons: [{
      text: 'Based on my interests',
      path: 'courses_interests'
    },{
      text: 'Based on a career',
      path: 'courses_career'
    }],
    data: {
      topic: 'a'
    }
  }],
  courses_interests: [{
    message: 'Select your main area of interest',
    buttons: [{
      text: 'Business',
      path: 'courses_interests_2'
    },{
      text: 'Design & Creative Arts',
      path: 'courses_interests_2'
    },{
      text: 'Law & Legal System',
      path: 'courses_interests_2'
    },{
      text: 'Technology',
      path: 'courses_interests_2'
    },{
      text: 'Science & Maths',
      path: 'courses_interests_2'
    },{
      text: 'Health',
      path: 'courses_interests_2'
    }],
    data: {
      stage: 'course_a',
      stage_verbose: "My first preference is",
      topic: 'Interests'
    }
  }],
  courses_interests_2: [{
    message: 'Select your main area of interest',
    buttons: [{
      text: 'Business',
      path: 'courses_interests_3'
    },{
      text: 'Design & Creative Arts',
      path: 'courses_interests_3'
    },{
      text: 'Law & Legal System',
      path: 'courses_interests_3'
    },{
      text: 'Technology',
      path: 'courses_interests_3'
    },{
      text: 'Science & Maths',
      path: 'courses_interests_3'
    },{
      text: 'Health',
      path: 'courses_interests_3'
    },{
      text: 'None',
      path: 'courses_interests_3'
    }],
    data: {
      stage: 'course_b',
      stage_verbose: "My second preference is",
      topic: 'Interests'
    }
  }],
  courses_interests_old: [{
    message: 'Select your main area of interest',
    buttons: [{
      text: 'Art & Design',
      path: 'courses_interests_2'
    },{
      text: 'Hospitality',
      path: 'courses_interests_2'
    },{
      text: 'Drama & Performing',
      path: 'courses_interests_2'
    },{
      text: 'Social Science',
      path: 'courses_interests_2'
    },{
      text: 'Psychology',
      path: 'courses_interests_2'
    },{
      text: 'Law & Legal System',
      path: 'courses_interests_2'
    },{
      text: 'Writing/Communications',
      path: 'courses_interests_2'
    },{
      text: 'Health',
      path: 'courses_interests_2'
    },{
      text: 'Engineering',
      path: 'courses_interests_2'
    },{
      text: 'Science',
      path: 'courses_interests_2'
    },{
      text: 'Business',
      path: 'courses_interests_2'
    },{
      text: 'Technology',
      path: 'courses_interests_2'
    }],
    data: {
      topic: 'a'
    }
  }],
  courses_interests_2_old: [{
    message: 'Select an additional area of interest',
    buttons: [{
      text: 'Art & Design',
      path: 'courses_interests_3'
    },{
      text: 'Hospitality',
      path: 'courses_interests_3'
    },{
      text: 'Drama & Performing',
      path: 'courses_interests_3'
    },{
      text: 'Social Science',
      path: 'courses_interests_3'
    },{
      text: 'Psychology',
      path: 'courses_interests_3'
    },{
      text: 'Law & Legal System',
      path: 'courses_interests_3'
    },{
      text: 'Writing/Communications',
      path: 'courses_interests_3'
    },{
      text: 'Health',
      path: 'courses_interests_3'
    },{
      text: 'Engineering',
      path: 'courses_interests_3'
    },{
      text: 'Science',
      path: 'courses_interests_3'
    },{
      text: 'Business',
      path: 'courses_interests_3'
    },{
      text: 'Technology',
      path: 'courses_interests_3'
    }],
    data: {
      topic: 'a'
    }
  }],
  courses_interests_3: [{
    message: 'Based on your interests we recommend a diploma of {1st} or, {2nd}',
    buttons: [{
      text: 'Applying for {1st}',
      path: 'student_2'
    },{
      text: 'Applying for {2nd}',
      path: 'student_2'
    },{
      text: 'Learn more about {1st}',
      path: 'fin'
    },{
      text: 'Learn more about {2nd}',
      path: 'fin'
    }],
    data: {
      stage: 'course',
      id: 'course',
      topic: 'a'
    }
  }],
  courses_career: [{
    message: 'I want a career in the ____ industry',
    buttons: [{
      text: 'Communications',
      path: 'courses_career_1'
    },{
      text: 'Business & Management',
      path: 'courses_career_1'
    },{
      text: 'Legal Services',
      path: 'courses_career_1'
    },{
      text: 'Health',
      path: 'courses_career_1'
    },{
      text: 'Technology',
      path: 'courses_career_1'
    },{
      text: 'Engineering',
      path: 'courses_career_1'
    },{
      text: 'Science',
      path: 'courses_career_1'
    },{
      text: 'Design & Creative Arts',
      path: 'courses_career_1'
    }],
    data: {
      topic: 'a'
    }
  }],
  courses_career_1: [{
    message: 'I am looking for a career in...',
    template_type: 'select',
    options: [
      {
        text: "Job1",
        value: "job1",
        path: "courses_career_final"
      },{
        text: "Job2",
        value: 'job2',
        path: "courses_career_final"
      }
    ],
    data: {
      topic: 'a'
    }
  }],
  courses_career_final: [{
    message: 'Based on your interests we recommend a diploma of {1st}',
    buttons: [{
      text: 'Applying for {1st}',
      path: 'student_2'
    }, {
      text: 'Learn more about {1st}',
      path: 'fin'
    }],
    data: {
      topic: 'a'
    }
  }],
  fin: [{
    message: "Thank you.",
    buttons: [{
      text: 'restart',
      path: 'start'
    },{
      text: 'Trigger end',
      path: ''
    }],
    data: {
      stage: "end",
      id: "end"
    }
  }]
}

const courseMatrix = {
  commerce: {
    verbose: 'Commerce',
    matrix: [
      [1,2,0],
      [1,3,0],
      [1,4,0],
      [1,5,0],
      [1,6,0],
      [1,7,0],
    ]
  },
  arts_n_comms: {
    verbose: 'Arts & Communication',
    matrix: [
      [1,2,1],
      [1,7,1],
      [2,1,0],
      [2,3,0],
      [2,7,1],
    ]
  },
  criminology: {
    verbose: 'Criminology & Criminal Justice',
    matrix: [
      [1,3,1],
      [2,3,2],
      [3,1,0],
      [3,2,0],
      [3,4,0],
      [3,5,0],
      [3,7,0],
      [5,3,1],
    ]
  },
  it: {
    verbose: 'Information Technology',
    matrix: [
      [1,4,1],
      [2,4,1],
      [2,5,0],
      [4,1,0],
      [4,2,1],
      [4,3,0],
      [4,5,1],
      [4,6,0],
      [4,7,0],
    ]
  },
  science: {
    verbose: 'Science',
    matrix: [
      [1,5,1],
      [2,5,2],
      [5,1,0],
      [5,2,1],
      [5,3,0],
      [5,7,0],
    ]
  },
  health_science: {
    verbose: 'Health Sciences',
    matrix: [
      [1,5,2],
      [1,6,1],
      [2,6,1],
      [3,5,1],
      [3,6,1],
      [4,6,2],
      [5,1,1],
      [5,6,0],
      [6,1,0],
      [6,2,1],
      [6,3,0],
      [6,4,0],
      [6,5,0],
      [6,7,1],
    ]
  },
  design: {
    verbose: 'Design',
    matrix: [
      [1,2,2],
      [1,7,3],
      [2,1,1],
      [2,3,1],
      [2,4,0],
      [2,5,1],
      [2,6,0],
      [2,7,0],
      [4,2,0],
    ]
  },
  hotel_mgmt: {
    verbose: 'Hotel Management',
    matrix: [
      [1,2,3],
      [1,7,2]
    ]
  },
  social_psycho_science: {
    verbose: 'Social & Psychological Science',
    matrix: [
      [3,6,0]
    ]
  },
  engineering: {
    verbose: 'Engineering',
    matrix: [
      [4,1,2],
      [4,5,0],
      [4,6,1],
      [5,2,0],
      [5,4,0],
      [5,7,1]
    ]
  },
  health_care: {
    verbose: 'Health Care',
    matrix: [
      [6,1,1],
      [6,2,0],
      [6,3,1],
      [6,4,1],
      [6,5,1],
      [6,7,0]
    ]
  }
}

// Object.keys(courseMatrix).find(a => courseMatrix[a].matrix.find(([a1, a2, a3]) => a1 === 1 && a2 === 2))
