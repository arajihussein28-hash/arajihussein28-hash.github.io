const D = SITE_DATA;

document.getElementById("availabilityText").textContent = D.profile.availability;
document.getElementById("heroIntro").innerHTML = D.profile.heroIntro.replace("Hussein Araji","<strong>Hussein Araji</strong>");
document.getElementById("emailButton").href = `mailto:${D.profile.email}`;
document.getElementById("emailLink").href = `mailto:${D.profile.email}`;
document.getElementById("emailText").textContent = D.profile.email;
document.getElementById("githubLink").href = D.profile.github;
document.getElementById("resumeNav").href = D.profile.resume;
document.getElementById("contactText").textContent = D.profile.contactText;

document.getElementById("heroMeta").innerHTML = D.profile.meta.map(x => `<div><span>${x.label}</span><strong>${x.value}</strong></div>`).join("");

const socials = [
  {label:"GitHub ↗",url:D.profile.github},
  ...(D.profile.linkedin ? [{label:"LinkedIn ↗",url:D.profile.linkedin}] : []),
  {label:"Resume ↗",url:D.profile.resume}
];
document.getElementById("socialRow").innerHTML = socials.map(x => `<a href="${x.url}" target="_blank" rel="noopener">${x.label}</a>`).join("");

const tech = [...D.technologies,...D.technologies];
document.getElementById("techMarquee").innerHTML = tech.map(x => `<span>${x}</span><i>◆</i>`).join("");

document.getElementById("aboutCopy").innerHTML = D.about.map(x => `<p>${x}</p>`).join("");

document.getElementById("skillGrid").innerHTML = D.skills.map(x => `
<article class="skill-card"><span class="skill-index">${x.letter}</span><h3>${x.title}</h3><p>${x.description}</p>
<div class="tag-row">${x.tags.map(t=>`<span>${t}</span>`).join("")}</div></article>`).join("");

document.getElementById("timeline").innerHTML = D.experience.map(x => `
<article class="timeline-row"><div class="timeline-date">${x.date}</div><div class="timeline-content">
<span class="timeline-type">${x.type}</span><h3>${x.title}</h3><p class="timeline-place">${x.place}</p><p>${x.description}</p>
</div></article>`).join("");

document.getElementById("courseList").innerHTML = D.coursework.map(x => `
<div class="course-row"><span>${x.code}</span><strong>${x.name}</strong><p>${x.details}</p></div>`).join("");

const grid = document.getElementById("projectGrid");
const filters = document.getElementById("projectFilters");
const categories = ["All",...new Set(D.projects.map(p=>p.category))];

filters.innerHTML = categories.map((c,i)=>`<button class="filter-btn ${i===0?"active":""}" data-category="${c}">${c}</button>`).join("");

function renderProjects(category="All"){
  const projects = category==="All" ? D.projects : D.projects.filter(p=>p.category===category);
  grid.innerHTML = projects.map(p=>`
  <article class="project-card" data-project="${p.id}" tabindex="0">
    <div class="project-card-top"><span>${p.label}</span><span class="arrow">↗</span></div>
    <div class="project-art ${p.image?"has-image":""}">
      ${p.image ? `<img src="${p.image}" alt="${p.title} screenshot">` : `<div class="placeholder"><strong>${p.title}</strong></div>`}
    </div>
    <h3>${p.title}</h3><p>${p.shortDescription}</p>
    <div class="tag-row">${p.tags.slice(0,5).map(t=>`<span>${t}</span>`).join("")}</div>
  </article>`).join("");

  document.querySelectorAll(".project-card").forEach(card=>{
    const open=()=>openProject(card.dataset.project);
    card.addEventListener("click",open);
    card.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  });
}
renderProjects();

filters.addEventListener("click",e=>{
  const b=e.target.closest(".filter-btn"); if(!b)return;
  document.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));
  b.classList.add("active"); renderProjects(b.dataset.category);
});

const modal=document.getElementById("projectModal");
const modalBody=document.getElementById("modalBody");
const modalType=document.getElementById("modalType");

function openProject(id){
  const p=D.projects.find(x=>x.id===id); if(!p)return;
  modalType.textContent=`${p.category.toUpperCase()} / PROJECT`;
  modalBody.innerHTML=`
    <p class="eyebrow">${p.label}</p><h2>${p.title}</h2><p class="modal-subtitle">${p.category}</p>
    ${p.image ? `<img class="modal-image" src="${p.image}" alt="${p.title} screenshot">` : `<div class="modal-placeholder"><strong>${p.title}</strong></div>`}
    <p class="modal-lead">${p.description}</p>
    <div class="detail-grid">
      <div><h3>What I worked on</h3><p>${p.contribution}</p></div>
      <div><h3>Key features</h3><ul>${p.features.map(f=>`<li>${f}</li>`).join("")}</ul></div>
    </div>
    <div class="tag-row">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
    <div class="modal-links">
      ${p.github ? `<a class="primary-link" href="${p.github}" target="_blank" rel="noopener">Source Code ↗</a>` : ""}
      ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live Demo ↗</a>` : ""}
    </div>`;
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");}
document.querySelectorAll("[data-close-modal]").forEach(x=>x.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});

const menu=document.getElementById("menuToggle"), nav=document.getElementById("navLinks");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const topBtn=document.getElementById("backToTop");
window.addEventListener("scroll",()=>topBtn.classList.toggle("visible",window.scrollY>700));
topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

document.getElementById("year").textContent=new Date().getFullYear();
window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  setTimeout(() => {

    loader.classList.add("hide");

  }, 2000);

});
