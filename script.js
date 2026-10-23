const D = SITE_DATA;
const $ = id => document.getElementById(id);
const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tagList = tags => tags.map(t => '<span>'+escapeHTML(t)+'</span>').join('');
for (const id of ['emailButton','emailLink']) $(id).href = 'mailto:'+D.profile.email;
for (const id of ['githubButton','githubLink']) $(id).href = D.profile.github;
for (const id of ['resumeNav','resumeLink']) $(id).href = D.profile.resume;
$('emailText').textContent = D.profile.email;
$('contactText').textContent = D.profile.contactText;
$('year').textContent = new Date().getFullYear();
const links = [{label:'GitHub ↗',url:D.profile.github},...(D.profile.linkedin?[{label:'LinkedIn ↗',url:D.profile.linkedin}]:[]),{label:'Resume ↗',url:D.profile.resume}];
$('contactLinks').innerHTML = links.map(l => '<a href="'+escapeHTML(l.url)+'" target="_blank" rel="noopener">'+escapeHTML(l.label)+'</a>').join('');
$('aboutCopy').innerHTML = D.about.map(p => '<p>'+escapeHTML(p)+'</p>').join('');
$('skillsList').innerHTML = D.skills.map(s => '<div class="skill-row"><h3>'+escapeHTML(s.group)+'</h3><div class="skill-items">'+tagList(s.items)+'</div></div>').join('');
$('timeline').innerHTML = D.experience.map(e => '<article class="timeline-row"><p class="timeline-date">'+escapeHTML(e.date)+'</p><div><h3>'+escapeHTML(e.title)+'</h3><p class="timeline-place">'+escapeHTML(e.place)+'</p><p class="timeline-desc">'+escapeHTML(e.description)+'</p></div></article>').join('');
$('projectGrid').innerHTML = D.projects.map(p => '<article class="project-card" data-project="'+escapeHTML(p.id)+'" tabindex="0" role="button" aria-label="View '+escapeHTML(p.title)+' project details"><div class="project-image">'+(p.image?'<img src="'+escapeHTML(p.image)+'" alt="'+escapeHTML(p.title)+' screenshot" loading="lazy">':'<div class="project-placeholder">'+escapeHTML(p.title)+'</div>')+'</div><div class="project-copy"><div class="project-meta">'+escapeHTML(p.label)+'</div><h3>'+escapeHTML(p.title)+' <span class="project-arrow" aria-hidden="true">↗</span></h3><p>'+escapeHTML(p.shortDescription)+'</p><div class="project-tags">'+tagList(p.tags)+'</div></div></article>').join('');
const modal = $('projectModal');
let lastFocus;
function openProject(id) {
  const p = D.projects.find(p => p.id === id);
  if (!p) return;
  lastFocus = document.activeElement;
  $('modalLabel').textContent = p.label;
  $('modalBody').innerHTML = '<h2 id="modalTitle">'+escapeHTML(p.title)+'</h2><p class="modal-category">'+escapeHTML(p.category)+'</p>'+(p.image?'<img class="modal-image" src="'+escapeHTML(p.image)+'" alt="'+escapeHTML(p.title)+' screenshot">':'')+'<p class="modal-lead">'+escapeHTML(p.description)+'</p><div class="modal-detail"><div><h3>My involvement</h3><p>'+escapeHTML(p.contribution)+'</p></div><div><h3>Key features</h3><ul>'+p.features.map(f=>'<li>'+escapeHTML(f)+'</li>').join('')+'</ul></div></div><div class="project-tags">'+tagList(p.tags)+'</div><div class="modal-links">'+(p.github?'<a href="'+escapeHTML(p.github)+'" target="_blank" rel="noopener">Source code ↗</a>':'')+(p.live?'<a href="'+escapeHTML(p.live)+'" target="_blank" rel="noopener">Live demo ↗</a>':'')+'</div>';
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  modal.querySelector('button').focus();
}
function closeProject() {
  if (!modal.classList.contains('open')) return;
  modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  lastFocus?.focus();
}
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click',()=>openProject(card.dataset.project));
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(card.dataset.project)}});
});
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeProject));
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeProject();
  if(e.key==='Tab' && modal.classList.contains('open')) {
    const focusable=modal.querySelectorAll('button,a[href]');
    const first=focusable[0],last=focusable[focusable.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
});
const navLinks=[...document.querySelectorAll('.nav-links a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const sections=[...document.querySelectorAll('main section[id]')];
  const visible=new Set();
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>e.isIntersecting?visible.add(e.target.id):visible.delete(e.target.id));
    const current=sections.find(s=>visible.has(s.id))?.id;
    navLinks.forEach(a=>{const active=a.hash==='#'+current;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
  },{rootMargin:'-18% 0px -52% 0px'});
  sections.forEach(s=>observer.observe(s));
}
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(window.matchMedia('(pointer: fine)').matches && !reducedMotion.matches) {
  let pending=false;
  document.addEventListener('pointermove',e=>{
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{document.documentElement.style.setProperty('--spot-x',e.clientX+'px');document.documentElement.style.setProperty('--spot-y',e.clientY+'px');pending=false});
  },{passive:true});
}
window.addEventListener('scroll',()=>$('backToTop').classList.toggle('visible',window.scrollY>600),{passive:true});
$('backToTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'}));
// Start immediately; remote fonts and images cannot hold the intro open.
const intro = document.getElementById("loader");
function finishIntro() {
  intro.classList.add("hide");
  intro.setAttribute("aria-hidden", "true");
  if (intro.contains(document.activeElement)) document.getElementById("skipIntro").blur();
}
document.getElementById("skipIntro").addEventListener("click", finishIntro);
document.addEventListener("keydown", e => { if (e.key === "Escape") finishIntro(); });
setTimeout(finishIntro, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1600 : 2800);
