const $ = (s) => document.querySelector(s);
$('#year').textContent = new Date().getFullYear();

const roles = ['digital experiences', 'web applications', 'business solutions', 'ideas into reality'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typed = $('#typedRole');
function typeRole() {
  const word = roles[roleIndex];
  typed.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex < word.length) { charIndex++; setTimeout(typeRole, 85); }
  else if (!deleting) { deleting = true; setTimeout(typeRole, 1450); }
  else if (charIndex > 0) { charIndex--; setTimeout(typeRole, 38); }
  else { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 350); }
}
typeRole();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $('#progress').style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
});
$('#menuToggle').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

const form = $('#contactForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = form.querySelector('button');
  const status = $('#formStatus');
  button.disabled = true;
  button.querySelector('span').textContent = 'Sending...';
  status.textContent = '';
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch('/contact', {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)
    });
    const result = await response.json();
    status.textContent = result.message;
    status.className = `form-status ${result.ok ? 'success' : 'error'}`;
    if (result.ok) form.reset();
  } catch {
    status.textContent = 'Connection problem. Please try WhatsApp instead.';
    status.className = 'form-status error';
  } finally {
    button.disabled = false;
    button.querySelector('span').textContent = 'Send message';
  }
});

const chatPanel = $('#chatPanel');
function setChat(open) {
  chatPanel.classList.toggle('open', open);
  chatPanel.setAttribute('aria-hidden', String(!open));
  if (open) setTimeout(() => $('#chatInput').focus(), 200);
}
$('#chatLaunch').addEventListener('click', () => setChat(!chatPanel.classList.contains('open')));
$('#chatClose').addEventListener('click', () => setChat(false));

const answers = [
  {keys:['skill','technology','stack','know','language'], text:"Ethan works with web technologies including HTML, CSS, JavaScript and React; backend tools such as Python and Flask; and app technologies including Flutter, Dart and Kotlin. He also works with databases, APIs and Git."},
  {keys:['project','work','built','portfolio'], text:"Some featured projects are SolarOption Stock System (inventory and sales), SchoolConnect (school communication), JARVIS AI Assistant (desktop voice assistant) and EasyWait (queue management). Ask Ethan for more details about a specific project."},
  {keys:['contact','email','reach','whatsapp','hire','available'], text:"You can email Ethan at ethantech17@gmail.com, WhatsApp him on +254 705 911 157, or connect on LinkedIn at linkedin.com/in/ethan-tech-5b4b39445."},
  {keys:['about','who','ethan'], text:"Ethan Tech is a software and web developer focused on building practical digital products, business systems and clean user experiences. He is based in Kenya."},
  {keys:['cv','resume','experience'], text:"For a CV or detailed experience profile, please contact Ethan directly by email or WhatsApp."}
];
function getAnswer(q) {
  const s = q.toLowerCase();
  const match = answers.find(a => a.keys.some(k => s.includes(k)));
  return match ? match.text : "I can help with Ethan's skills, projects, background or contact details. Try asking: “What skills does Ethan have?”";
}
function addMessage(text, who) {
  const node = document.createElement('div');
  node.className = who === 'user' ? 'user-message' : 'bot-message';
  node.textContent = text;
  $('#chatMessages').appendChild(node);
  $('#chatMessages').scrollTop = $('#chatMessages').scrollHeight;
}
function sendChat(text) {
  const q = text.trim(); if (!q) return;
  addMessage(q, 'user');
  setTimeout(() => addMessage(getAnswer(q), 'bot'), 350);
}
$('#chatForm').addEventListener('submit', e => {
  e.preventDefault(); const input = $('#chatInput'); sendChat(input.value); input.value = '';
});
document.querySelectorAll('[data-question]').forEach(btn => btn.addEventListener('click', () => sendChat(btn.dataset.question)));