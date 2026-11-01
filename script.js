/* ===== HELPERS ===== */
const D = SITE_DATA;
const $ = id => document.getElementById(id);
const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tagList = tags => tags.map(t => '<span>'+escapeHTML(t)+'</span>').join('');
/* ===== DISPLAY WEBSITE CONTENT ===== */
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
/* ===== PROJECT POPUP ===== */
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
/* ===== ACTIVE NAVIGATION SECTION ===== */
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
/* ===== MOUSE BACKGROUND EFFECT ===== */
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(window.matchMedia('(pointer: fine)').matches && !reducedMotion.matches) {
  let pending=false;
  document.addEventListener('pointermove',e=>{
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{document.documentElement.style.setProperty('--spot-x',e.clientX+'px');document.documentElement.style.setProperty('--spot-y',e.clientY+'px');pending=false});
  },{passive:true});
}
/* ===== BACK TO TOP ===== */
window.addEventListener('scroll',()=>$('backToTop').classList.toggle('visible',window.scrollY>600),{passive:true});
$('backToTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'}));
// Start immediately; remote fonts and images cannot hold the intro open.
/* ===== OPENING INTRO ===== */
const intro = document.getElementById("loader");
function finishIntro() {
  intro.classList.add("hide");
  intro.setAttribute("aria-hidden", "true");
  if (intro.contains(document.activeElement)) document.getElementById("skipIntro").blur();
}
document.getElementById("skipIntro").addEventListener("click", finishIntro);
document.addEventListener("keydown", e => { if (e.key === "Escape") finishIntro(); });
setTimeout(finishIntro, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1600 : 2800);

/* ===== PAC-MAN SOUND EFFECTS ===== */
function createAudioContext() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

let pacAudio;

function getPacAudio() {
  if (!pacAudio) {
    pacAudio = createAudioContext();
  }

  if (pacAudio.state === "suspended") {
    pacAudio.resume();
  }

  return pacAudio;
}

function playEatSound() {
  const audio = getPacAudio();

  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.type = "square";

  oscillator.frequency.setValueAtTime(
    240,
    audio.currentTime
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    140,
    audio.currentTime + 0.08
  );

  gain.gain.setValueAtTime(
    0.08,
    audio.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audio.currentTime + 0.1
  );

  oscillator.connect(gain);
  gain.connect(audio.destination);

  oscillator.start();
  oscillator.stop(audio.currentTime + 0.1);
}
  function playExplosionSound() {
  const audio = getPacAudio();

  const duration = 0.45;

  const buffer = audio.createBuffer(
    1,
    audio.sampleRate * duration,
    audio.sampleRate
  );

  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    data[i] =
      (Math.random() * 2 - 1) *
      (1 - i / data.length);
  }

  const source = audio.createBufferSource();
  const gain = audio.createGain();

  source.buffer = buffer;

  gain.gain.setValueAtTime(
    0.25,
    audio.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audio.currentTime + duration
  );

  source.connect(gain);
  gain.connect(audio.destination);

  source.start();
}
/* ===== PAC-MAN NAME ANIMATION ===== */
window.addEventListener("load", () => {

  const dotsContainer =
    document.querySelector(".pac-dots");

  const pacman =
    document.querySelector(".red-pacman");

  const allNameSpans =
    document.querySelectorAll(
      ".letter-name > span:not(.name-space)"
    );


  const TOTAL_DOTS = 12;

  const START_DELAY = 4200;


  /* =========================
     CREATE 12 DOTS
  ========================= */

  for (
    let i = 0;
    i < TOTAL_DOTS;
    i++
  ) {

    const dot =
      document.createElement("span");

    dot.className = "pac-dot";

    dotsContainer.appendChild(dot);

  }


  const dots =
    document.querySelectorAll(".pac-dot");


  /* =========================
     SHOW DOTS FIRST
  ========================= */

  setTimeout(() => {

    dots.forEach((dot, index) => {

      setTimeout(() => {

        dot.classList.add("ready");

      }, index * 70);

    });

  }, START_DELAY);


  /* =========================
     START PAC-MAN
  ========================= */

  setTimeout(() => {

    pacman.style.opacity = "1";

    let current = 0;


    function eatNextDot() {

      if (current >= TOTAL_DOTS) {

        finishPacman();

        return;

      }


      const dot =
        dots[current];


      /*
        Move Pac-Man to current dot
      */

const scene = document.querySelector(".pac-scene");

const sceneRect = scene.getBoundingClientRect();
const dotRect = dot.getBoundingClientRect();
const pacRect = pacman.getBoundingClientRect();

// Dot centre measured from the animation area's left edge.
const dotCenter =
  dotRect.left - sceneRect.left + dotRect.width / 2;

// Account for Pac-Man growing after each dot.
const mouthOffset =
  pacman.offsetWidth / 2 + pacRect.width * 0.22;

pacman.style.left = `${dotCenter - mouthOffset}px`;


      /*
        Wait until Pac-Man reaches dot
      */

      setTimeout(() => {

        /* eat dot */

        dot.classList.add("eaten");
        const dotRect = dot.getBoundingClientRect();
const pacRect = pacman.getBoundingClientRect();

const suckX =
  (pacRect.right - dotRect.left) - 7;

dot.style.setProperty("--suck-x", `${suckX}px`); 


        /* reveal corresponding letter */

      // Remember this letter before "current" increases.
const letterToReveal = allNameSpans[current];

// Show the letter after the dot finishes disappearing.
setTimeout(() => {
  if (letterToReveal) {
    letterToReveal.classList.add("show-letter");
  }
}, 280);


        /* eating sound */

        if (
          typeof playEatSound ===
          "function"
        ) {

          playEatSound();

        }


        /*
          Pac-Man gets larger
          after EVERY dot
        */

        const growth =
          1 + ((current + 1) * 0.065);


        pacman.style.transform =
          `translateY(-50%) scale(${growth})`;


        current++;


        /*
          Small pause before
          moving to next dot
        */

        setTimeout(
          eatNextDot,
          170
        );


 }, 550);

    }


    eatNextDot();

  }, START_DELAY + 1200);


  /* =========================
     FINAL EXPLOSION
  ========================= */

 async function finishPacman() {
  const wait = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    pacman.style.opacity = "0";
    allNameSpans.forEach(letter =>
      letter.classList.add("show-letter")
    );
    return;
  }

  // Add a worried face.
  pacman.innerHTML = `
    <span class="pac-worried-eye left"></span>
    <span class="pac-worried-eye right"></span>
    <span class="pac-worried-mouth"></span>
  `;

  pacman.classList.add("pac-panicking");

  // Wait for inflation and trembling to finish.
  await Promise.all(
    pacman.getAnimations().map(animation =>
      animation.finished.catch(() => {})
    )
  );

  // Measure the burst point before hiding Pac-Man.
  const rect = pacman.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  pacman.style.opacity = "0";

  if (typeof playExplosionSound === "function") {
    try {
      playExplosionSound();
    } catch {
      // The visual effect still runs if audio is unavailable.
    }
  }

  const layer = document.createElement("div");
  layer.className = "pac-splatter-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  async function sprayDrop() {
    const drop = document.createElement("span");
    drop.className = "pac-screen-drop";

    const size = 8 + Math.random() * 24;
    const targetX = Math.random() * screenWidth;
    const targetY = Math.random() * screenHeight;

    drop.style.width = `${size}px`;
    drop.style.height = `${size}px`;
    drop.style.setProperty(
      "--drip-length",
      `${35 + Math.random() * 130}px`
    );

    layer.appendChild(drop);

    const start = `
      translate(${originX - size / 2}px, ${originY - size / 2}px)
      scale(0.15)
    `;

    const landing = `
      translate(${targetX}px, ${targetY}px)
      scale(1)
    `;

    // Spray outward from Pac-Man and hit the screen.
    const flight = drop.animate(
      [
        { transform: start, opacity: 1 },
        {
          transform: `
            translate(${targetX}px, ${targetY}px)
            scale(1.45, 0.7)
          `,
          opacity: 1,
          offset: 0.85
        },
        { transform: landing, opacity: 1 }
      ],
      {
        duration: 350 + Math.random() * 400,
        easing: "cubic-bezier(.15,.65,.3,1)",
        fill: "forwards"
      }
    );

    await flight.finished;

    drop.style.transform = landing;
    flight.cancel();

    // Splats stick briefly, then form drips.
    await wait(100 + Math.random() * 500);
    drop.classList.add("dripping");

    const fall = drop.animate(
      [
        { transform: landing, opacity: 1 },
        {
          transform: `
            translate(${targetX}px, ${targetY + 65}px)
            scale(0.9, 1.15)
          `,
          opacity: 1,
          offset: 0.65
        },
        {
          transform: `
            translate(${targetX}px, ${screenHeight + 180}px)
            scale(0.7, 1.6)
          `,
          opacity: 0
        }
      ],
      {
        duration: 2400 + Math.random() * 1400,
        easing: "ease-in",
        fill: "forwards"
      }
    );

    await fall.finished;
    drop.remove();
  }

  // Scatter droplets across the entire viewport.
  try {
    await Promise.all(
      Array.from({ length: 48 }, () => sprayDrop())
    );
  } finally {
    layer.remove();
  }
}
  });
/* ===== JUMPING NAVIGATION CHARACTER ===== */
(() => {
  const nav = document.getElementById("navLinks");

  if (!nav || nav.querySelector(".nav-pixel-man")) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  if (!links.length) return;

  const man = document.createElement("span");
  man.className = "nav-pixel-man";
  man.setAttribute("aria-hidden", "true");

  man.innerHTML = `
    <svg viewBox="0 0 12 16"
         xmlns="http://www.w3.org/2000/svg"
         shape-rendering="crispEdges">
      <!-- Hair -->
      <path fill="#432a23" d="M4 0h4v1H3v3h6V1H8V0z"/>

      <!-- Face -->
      <path fill="#f4c49a" d="M4 2h4v4H4z"/>
      <path fill="#160b11" d="M7 3h1v1H7z"/>

      <!-- Red shirt -->
      <path fill="#ee526b" d="M3 6h6v5H3z"/>

      <!-- Arms -->
      <path fill="#f4c49a" d="M1 7h2v5H1zM9 7h2v5H9z"/>

      <!-- Trousers -->
      <path fill="#82b9de" d="M3 11h6v2H3zM3 13h2v2H3zM7 13h2v2H7z"/>

      <!-- Shoes -->
      <path fill="#f0e5e8" d="M2 15h3v1H2zM7 15h3v1H7z"/>
    </svg>
  `;

  nav.appendChild(man);

  let selected = links[0];
  let clickTimer;
  let followingClick = false;

  function moveTo(link) {
  if (!link) return;
  selected = link;

  const walker = document.createTreeWalker(
    link,
    NodeFilter.SHOW_TEXT
  );

  let lastNode = null;
  let node;

  while ((node = walker.nextNode())) {
    if (node.textContent.trim()) {
      lastNode = node;
    }
  }

  if (!lastNode) return;

  const end = lastNode.textContent.trimEnd().length;
  const range = document.createRange();

  range.setStart(lastNode, end - 1);
  range.setEnd(lastNode, end);

  const letterBox = range.getBoundingClientRect();
  const navBox = nav.getBoundingClientRect();

  const x =
    letterBox.left - navBox.left +
    letterBox.width / 2 -
    man.offsetWidth / 2;

  const y =
    letterBox.top - navBox.top -
    man.offsetHeight - 1;

  man.style.transform = `translate(${x}px, ${y}px)`;
}

  function followActiveSection() {
    if (followingClick) return;

    const active = links.find(link =>
      link.classList.contains("active") ||
      link.getAttribute("aria-current") === "location"
    );

    moveTo(active || selected);
  }

  links.forEach(link => {
    link.addEventListener("click", () => {
      followingClick = true;
      moveTo(link);

      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        followingClick = false;
        followActiveSection();
      }, 1000);
    });
  });

  // Watch your existing navigation highlighting.
  const observer = new MutationObserver(followActiveSection);

  links.forEach(link => {
    observer.observe(link, {
      attributes: true,
      attributeFilter: ["class", "aria-current"]
    });
  });

  window.addEventListener("resize", () => moveTo(selected));

  followActiveSection();
  document.fonts.ready.then(() => moveTo(selected));
})();

