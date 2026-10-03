import './style.css';

document.getElementById('year').textContent = new Date().getFullYear();

// Reveal blocks as they enter the viewport; content stays visible without JS.
const items = document.querySelectorAll('.reveal');
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (calm || !('IntersectionObserver' in window)) {
  items.forEach(item => item.classList.add('in'));
} else {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  items.forEach(item => observer.observe(item));
}
