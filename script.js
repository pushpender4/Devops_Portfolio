const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealItems.forEach((item, i) => {
  item.style.transitionDelay = `${Math.min(i * 80, 360)}ms`;
  observer.observe(item);
});

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('main section[id]');

menuBtn?.addEventListener('click', () => {
  nav?.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => nav?.classList.remove('open'));
});

const setActiveNav = () => {
  const marker = window.scrollY + 180;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (marker >= top && marker < top + height) {
      navLinks.forEach((link) => link.classList.remove('active'));
      const active = document.querySelector(`.nav a[href="#${id}"]`);
      active?.classList.add('active');
    }
  });
};

window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);
