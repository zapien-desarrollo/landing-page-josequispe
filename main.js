(() => {
  'use strict';

  const WHATSAPP = '5492617013574';

  /* ---------- Año en el footer ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header con borde al hacer scroll ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menú móvil ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Link activo según sección visible ---------- */
  const links = [...document.querySelectorAll('.nav__link')];
  const sections = links
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) =>
            l.classList.toggle('is-active', l.getAttribute('href') === `#${e.target.id}`)
          );
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Formulario → mensaje de WhatsApp ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const error = document.getElementById('form-error');
    const nombre = form.elements.nombre;

    nombre.addEventListener('input', () => {
      nombre.removeAttribute('aria-invalid');
      error.hidden = true;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(
        [...new FormData(form)].map(([k, v]) => [k, String(v).trim()])
      );

      if (!data.nombre) {
        nombre.setAttribute('aria-invalid', 'true');
        error.hidden = false;
        nombre.focus();
        return;
      }

      const lineas = [`Hola Jose, soy ${data.nombre}${data.negocio ? ` de ${data.negocio}` : ''}.`];
      if (data.rubro) lineas.push(`Rubro: ${data.rubro}.`);
      if (data.servicio) lineas.push(`Me interesa: ${data.servicio}.`);
      if (data.mensaje) lineas.push('', data.mensaje);

      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lineas.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------- Vitrina de demos del hero ---------- */
  const showcase = document.querySelector('.showcase');
  if (showcase) {
    const DEMOS = [
      { label: 'Inmobiliaria', url: 'cerropropiedades.com.ar', msg: 'Hola, me interesa la casa con pileta en Chacras. ¿Sigue disponible?' },
      { label: 'Estudio contable', url: 'estudiocerro.com.ar', msg: 'Hola, quiero darme de alta en el monotributo. ¿Qué necesito?' },
      { label: 'Concesionaria', url: 'cerroautomotores.com.ar', msg: 'Hola, ¿me toman el Gol 2016 como parte de pago del Polo?' },
      { label: 'Tienda online', url: 'adventure35.mitiendanube.com', msg: 'Hola, ¿la campera Cordón viene en talle M? ¿Cuánto tarda el envío a Córdoba?' },
    ];
    const screens = [...showcase.querySelectorAll('.browser__screen img')];
    const phones = [...showcase.querySelectorAll('.phone__screen img')];
    const dots = [...document.querySelectorAll('.showcase__dots button')];
    const url = document.getElementById('showcase-url');
    const msg = document.getElementById('showcase-msg');
    const label = document.getElementById('showcase-label');
    let current = 0;
    let timer;

    const show = (i) => {
      current = i;
      [screens, phones].forEach((imgs) => imgs.forEach((img, j) => img.classList.toggle('is-active', j === i)));
      dots.forEach((d, j) => {
        d.classList.toggle('is-active', j === i);
        d.setAttribute('aria-pressed', String(j === i));
      });
      url.textContent = DEMOS[i].url;
      label.textContent = DEMOS[i].label;
      msg.classList.add('is-changing');
      setTimeout(() => {
        msg.textContent = DEMOS[i].msg;
        msg.classList.remove('is-changing');
      }, 300);
    };

    // Rota sola salvo que el usuario prefiera menos movimiento
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = () => {
      if (reduce) return;
      clearInterval(timer);
      timer = setInterval(() => show((current + 1) % DEMOS.length), 5000);
    };
    dots.forEach((d, i) => d.addEventListener('click', () => { show(i); start(); }));
    start();
  }

  /* ---------- Carrusel de ejemplos en cilindro ---------- */
  const track = document.querySelector('.demos__track');
  if (track) {
    const cards = [...track.querySelectorAll('.demo')];
    const dots = [...document.querySelectorAll('.demos__dots button')];
    const [prev, next] = document.querySelectorAll('.demos__arrow');
    const STEP = 34; // grados entre una card y la siguiente sobre el cilindro
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let active = -1;
    let frame = 0;

    const setActive = (i) => {
      if (i === active) return;
      active = i;
      cards.forEach((c, j) => c.classList.toggle('is-active', j === i));
      dots.forEach((d, j) => {
        d.classList.toggle('is-active', j === i);
        d.setAttribute('aria-pressed', String(j === i));
      });
      prev.disabled = i === 0;
      next.disabled = i === cards.length - 1;
    };

    // Cada card se ubica sobre un cilindro de eje vertical: la posición plana del
    // scroll se convierte en un ángulo, y de ahí sale cuánto rota y cuánto se aleja.
    const render = () => {
      frame = 0;
      const spacing = cards[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || 0);
      const radius = spacing / (STEP * Math.PI / 180);
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let min = Infinity;

      cards.forEach((card, i) => {
        const d = (card.offsetLeft + card.offsetWidth / 2 - center) / spacing;
        const angle = Math.max(-90, Math.min(90, d * STEP));
        const rad = angle * Math.PI / 180;
        const x = radius * Math.sin(rad) - d * spacing;
        const z = radius * (Math.cos(rad) - 1);
        card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg)`;
        card.style.opacity = String(1 - Math.min(Math.abs(d), 2) * 0.3);
        if (Math.abs(d) < min) { min = Math.abs(d); nearest = i; }
      });
      setActive(nearest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };

    const go = (i) => {
      const card = cards[Math.max(0, Math.min(cards.length - 1, i))];
      track.scrollTo({
        left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
        behavior: reduce ? 'auto' : 'smooth',
      });
    };

    // Tocar una card lateral la trae al frente en lugar de abrir su link
    cards.forEach((card, i) => {
      card.addEventListener('click', (e) => {
        if (i === active) return;
        e.preventDefault();
        e.stopPropagation();
        go(i);
      }, true);
      card.addEventListener('focusin', () => { if (i !== active) go(i); });
    });
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    prev.addEventListener('click', () => go(active - 1));
    next.addEventListener('click', () => go(active + 1));
    track.addEventListener('keydown', (e) => {
      if (e.target !== track) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        go(active + (e.key === 'ArrowRight' ? 1 : -1));
      }
    });

    track.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    render();
  }
})();
