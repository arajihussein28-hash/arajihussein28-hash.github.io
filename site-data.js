/* V3: Edit this file for normal content changes. */
const SITE_DATA = {
  profile: {
    email: "arajihussein28@gmail.com",
    github: "https://github.com/arajihussein28-hash",
    linkedin: "",
    resume: "resume.pdf",
    heroIntro: "I build software, learn how systems work, and keep improving through coursework and hands-on projects.",
    contactText: "I'm currently interested in co-op and internship opportunities in software development, AI/ML, and other technical roles."
  },
  about: [
    "I'm a Computer Science student at Carleton University with a focus on Artificial Intelligence and Machine Learning. My current coursework is strengthening my foundation in programming, algorithms, data structures, systems programming, and discrete mathematics.",
    "Before moving into Computer Science, I studied Interactive Multimedia and Design. That gave me experience with web development, interface design, electronics, Arduino, and interactive projects.",
    "Right now, I'm focused on becoming a stronger developer, building better projects, and getting real technical experience through co-op and internships."
  ],
  skills: [
    {group:"Programming", items:["Python","Java","C","JavaScript"]},
    {group:"Web & Development", items:["HTML","CSS","Django","Git","GitHub","Linux"]},
    {group:"Computer Science", items:["Data Structures","Algorithms","OOP","Systems Programming","Discrete Mathematics"]},
    {group:"Current Focus", items:["Artificial Intelligence","Machine Learning","Software Development"]}
  ],
  experience: [
    {date:"Current",title:"Computer Science — AI & Machine Learning",place:"Carleton University · Ottawa, ON",description:"Building a foundation in programming, algorithms, data structures, systems programming, and mathematics."},
    {date:"Current",title:"Store Team Member",place:"Food Basics · Ottawa, ON",description:"Support customers, stock merchandise, and work with the store team in a fast-paced environment."},
    {date:"Previous",title:"Retail & Customer Service",place:"Shoppers Drug Mart",description:"Worked in customer service, cash handling, stocking, daily store operations, and staff training."},
    {date:"Previous",title:"Interactive Multimedia & Design",place:"Carleton University",description:"Worked with web development, visual design, Arduino, electronics, and physical computing before moving into Computer Science."}
  ],
  projects: [
    {
      id:"queueup", title:"QueueUp", category:"Full-stack web application", label:"TEAM PROJECT · IMD 2900",
      image:"assets/projects/queueup.png",
      shortDescription:"A Django gaming lobby platform where users can discover, create, join, and manage gaming lobbies.",
      description:"QueueUp is a full-stack web application developed collaboratively with Django. Users can discover gaming lobbies, create their own groups, apply to join others, manage requests, and communicate through lobby chat.",
      contribution:"I worked collaboratively with the project team while gaining experience with how Django templates, views, routing, models, and user interactions work together.",
      tags:["Python","Django","HTML","CSS","Full Stack"],
      features:["User accounts and authentication","Lobby discovery","Create and manage lobbies","Join requests","Lobby chat"],
      github:"https://github.com/vinit-rao/queueup-django", live:""
    },
    {
      id:"one-piece", title:"One Piece Card Game", category:"Interactive programming project", label:"SOFTWARE PROJECT",
      image:"",
      shortDescription:"A programming project focused on card-game rules, player actions, and game-state logic.",
      description:"An interactive programming project inspired by the One Piece Card Game. It helped me practice turning game rules, player actions, and state changes into working program behaviour.",
      contribution:"Worked on organizing and implementing the game logic.",
      tags:["Programming","Game Logic","Software"],
      features:["Player actions","Game-state logic","Rule-driven behaviour"],
      github:"https://github.com/arajihussein28-hash/ONE_PIECE_CARD_GAME", live:""
    }
  ]
};