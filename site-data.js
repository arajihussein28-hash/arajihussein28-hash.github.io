/*
EDIT THIS FILE FOR MOST FUTURE CHANGES.
Add/remove projects, skills, experience, links, coursework, and text here.
Usually you only need to upload THIS file after editing.
*/

const SITE_DATA = {
  profile: {
    email: "arajihussein28@gmail.com",
    github: "https://github.com/arajihussein28-hash",
    linkedin: "",
    resume: "resume.pdf",
    availability: "Open to co-op & internship opportunities",
    heroIntro: "I'm Hussein Araji, a Computer Science student at Carleton University focused on Artificial Intelligence and Machine Learning. I enjoy building software, solving technical problems, and turning ideas into projects I can test and improve.",
    contactText: "I'm interested in co-op and internship opportunities in software development, AI/ML, and related technical roles.",
    meta: [
      { label: "Based in", value: "Ottawa, Canada" },
      { label: "Studying", value: "Computer Science · AI/ML" },
      { label: "Currently", value: "Building & learning" }
    ]
  },

  technologies: ["Python","Java","C","JavaScript","HTML & CSS","Git & GitHub","Linux","Data Structures","Algorithms","Django"],

  about: [
    "I'm currently studying Computer Science at Carleton University with a focus on Artificial Intelligence and Machine Learning. My coursework is strengthening my foundation in programming, algorithms, data structures, systems programming, and discrete mathematics.",
    "Before moving into Computer Science, I studied Interactive Multimedia and Design. That gave me hands-on experience with web development, interface design, Arduino, electronics, and interactive projects.",
    "My goal is to keep building stronger projects, improve as a programmer, and gain real software or AI/ML experience through co-op and internships."
  ],

  skills: [
    { letter:"A", title:"Programming", description:"Building core problem-solving skills through Java, C, Python, and JavaScript.", tags:["Java","C","Python","JavaScript"] },
    { letter:"B", title:"Computer Science", description:"Data structures, algorithms, OOP, discrete mathematics, and systems concepts.", tags:["Algorithms","OOP","Data Structures"] },
    { letter:"C", title:"Development", description:"Building and debugging with Linux, Git, GitHub, HTML, CSS, and the command line.", tags:["Git","GitHub","Linux","Web"] },
    { letter:"D", title:"Current Direction", description:"Growing toward AI and machine learning while strengthening software engineering skills.", tags:["AI","Machine Learning","Software"] }
  ],

  experience: [
    { date:"Current", type:"Education", title:"Computer Science — AI & Machine Learning", place:"Carleton University · Ottawa, ON", description:"Building a foundation in programming, algorithms, data structures, systems programming, and mathematics while preparing for software and AI/ML co-op opportunities." },
    { date:"Current", type:"Work", title:"Store Team Member", place:"Food Basics · Ottawa, ON", description:"Support customers, stock and organize merchandise, and work with the store team in a fast-paced environment." },
    { date:"Previous", type:"Work", title:"Retail & Customer Service", place:"Shoppers Drug Mart", description:"Developed several years of customer service experience involving cash handling, stocking, store operations, teamwork, and helping train staff." },
    { date:"Previous", type:"Education", title:"Interactive Multimedia & Design", place:"Carleton University", description:"Worked with web development, visual design, interactive systems, electronics, Arduino, and physical computing before transitioning into Computer Science." }
  ],

  projects: [
    {
      id:"queueup",
      title:"QueueUp",
      category:"Full Stack",
      label:"TEAM PROJECT · IMD 2900",
      image:"",
      shortDescription:"A team-built gaming lobby platform where users can discover, create, join, and manage gaming lobbies.",
      description:"QueueUp is a full-stack web application developed collaboratively with Django. Users can discover other players, create gaming lobbies, apply to join groups, manage lobby requests, and communicate through lobby chat.",
      contribution:"I worked collaboratively with the project team while learning how a larger Django application connects frontend templates, backend views, routing, models, and user interactions.",
      tags:["Python","Django","HTML","CSS","Full Stack","Team Project"],
      features:["User registration and authentication","Browse gaming lobbies","Create and manage lobbies","Join requests with accept / decline controls","Lobby details and navigation","Lobby chat"],
      github:"https://github.com/vinit-rao/queueup-django",
      live:""
    },
    {
      id:"gamefeast",
      title:"GameFeast",
      category:"Software",
      label:"SOFTWARE PROJECT",
      image:"",
      shortDescription:"An interactive software project focused on organizing features and user experience.",
      description:"A software project where I worked on organizing features and turning the core idea into an interactive application.",
      contribution:"Worked on the application experience and project implementation.",
      tags:["Software","Interactive"],
      features:["Interactive application flow","Organized project features","User-focused interface"],
      github:"https://github.com/arajihussein28-hash/Gamefeastfinal",
      live:""
    },
    {
      id:"future-ai",
      title:"AI / ML Project",
      category:"AI/ML",
      label:"COMING NEXT",
      image:"",
      shortDescription:"Reserved for a stronger machine-learning project as I move further into my specialization.",
      description:"This space is reserved for a future machine-learning project built with Python and real data.",
      contribution:"Planned future project.",
      tags:["Python","AI","Machine Learning"],
      features:["Model training","Data preprocessing","Model evaluation"],
      github:"",
      live:""
    }
  ],

  coursework: [
    { code:"COMP 2401", name:"Systems Programming", details:"C, memory, pointers, structs, low-level programming" },
    { code:"COMP 2402", name:"Abstract Data Types & Algorithms", details:"Data structures, algorithm analysis, implementation" },
    { code:"COMP 1805", name:"Discrete Structures", details:"Logic, proofs, sets, functions, combinatorics" },
    { code:"IMD 1005", name:"Web Development", details:"Web interfaces and front-end development" },
    { code:"BIT 2006", name:"Electronics & Physical Computing", details:"Arduino, electronics, sensors, serial communication" }
  ]
};
