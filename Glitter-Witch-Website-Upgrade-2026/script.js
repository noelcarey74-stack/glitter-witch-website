const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((element) => observer.observe(element));
} else {
  revealItems.forEach((element) => element.classList.add('visible'));
}

document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

const launchDate = new Date('2026-08-24T00:00:00+01:00');
const updateCountdown = () => {
  document.querySelectorAll('[data-countdown]').forEach((node) => {
    const distance = launchDate.getTime() - Date.now();
    if (distance <= 0) { node.textContent = 'The shop is opening now'; return; }
    const days = Math.ceil(distance / 86400000);
    node.textContent = `${days} day${days === 1 ? '' : 's'} to go`;
  });
};
updateCountdown();
setInterval(updateCountdown, 3600000);
