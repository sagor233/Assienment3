document.addEventListener('DOMContentLoaded', () => {

 
  function animateCounter(el, target) {
    const duration = 1200;
    const startTime = performance.now();

    function update(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target) + '%';
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }


  function initHeroCarousel() {
    const track = document.getElementById('carousel-track');
    const indicators = document.querySelectorAll('.carousel-indicator');
    if (!track || !indicators.length) return;

    let current = 0;
    const total = indicators.length;
    const intervalTime = 5000;
    let timer;

    function showSlide(index) {
      current = (index + total) % total;
      track.style.setProperty('--current-slide', current);

      indicators.forEach((dot, i) => {
        dot.classList.toggle('bg-white', i === current);
        dot.classList.toggle('bg-white/50', i !== current);
      });
    }

    function startAuto() {
      timer = setInterval(() => showSlide(current + 1), intervalTime);
    }

    function resetAuto() {
      clearInterval(timer);
      startAuto();
    }

    indicators.forEach((dot, i) =>
      dot.addEventListener('click', () => {
        showSlide(i);
        resetAuto();
      })
    );

    showSlide(0);
    startAuto();
  }

  initHeroCarousel();

  
  const openBtn = document.getElementById('menu-open-btn');
  const closeBtn = document.getElementById('menu-close-btn');
  const menu = document.getElementById('mobile-menu');

  if (openBtn && closeBtn && menu) {
    const links = menu.querySelector('[data-menu-links]');
    openBtn.onclick = () => menu.classList.remove('translate-x-full');
    closeBtn.onclick = () => menu.classList.add('translate-x-full');
    links.onclick = (e) => { if (e.target.tagName === 'A') menu.classList.add('translate-x-full'); };
  }

  
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) header.classList.add('is-sticky');
    else header.classList.remove('is-sticky');
  });

  
  const reveals = document.querySelectorAll('.reveal-fade-in, .reveal-slide-up');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('is-visible');

        const ring = el.querySelector('.progress-ring');
        if (ring && !ring.dataset.animated) {
          const value = parseInt(ring.dataset.value, 10);
          animateCounter(ring, value);
          ring.style.setProperty('--progress-value', `${(value / 100) * 360}deg`);
          ring.dataset.animated = 'true';
        }

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
});
