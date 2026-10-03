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

// Terminal intro: type the command, then reveal the output.
const term = document.getElementById('term');
const command = document.getElementById('term-cmd');
if (!calm && term && command) {
  const text = command.dataset.text;
  command.textContent = ''; term.classList.add('typing');
  let i = 0;
  setTimeout(function type() {
    command.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(type, 90 + Math.random() * 70);
    else setTimeout(() => term.classList.remove('typing'), 280);
  }, 500);
}

const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
if (fine && !calm) {
  // Blueprint grid: a bright patch follows the pointer with a little easing.
  const bg = document.querySelector('.bg');
  let tx = innerWidth * .72, ty = innerHeight * .18, x = tx, y = ty, running = false;
  const tick = () => {
    x += (tx - x) * .12; y += (ty - y) * .12;
    bg.style.setProperty('--x', `${x}px`); bg.style.setProperty('--y', `${y}px`);
    if (Math.abs(tx - x) + Math.abs(ty - y) > .5) requestAnimationFrame(tick); else running = false;
  };
  addEventListener('pointermove', event => { tx = event.clientX; ty = event.clientY; if (!running) { running = true; requestAnimationFrame(tick); } }, { passive: true });

  // Project cards tilt gently toward the pointer.
  for (const card of document.querySelectorAll('.project')) {
    card.addEventListener('transitionend', event => { if (event.propertyName === 'transform' && card.classList.contains('in')) card.classList.add('settled'); });
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5, py = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`); card.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  }
}
