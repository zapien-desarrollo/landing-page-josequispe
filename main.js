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
    const originals = [...track.querySelectorAll('.demo')];
    // Se duplica la tanda para cerrar la vuelta: la card que sale por un lado
    // reaparece por el otro pasando por detrás del cilindro, donde no se ve.
    originals.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a').forEach((a) => a.setAttribute('tabindex', '-1'));
      track.append(clone);
    });
    const cards = [...track.querySelectorAll('.demo')];
    const total = cards.length;
    const dots = [...document.querySelectorAll('.demos__dots button')];
    const [prev, next] = document.querySelectorAll('.demos__arrow');
    const STEP = 34; // grados entre una card y la siguiente sobre el cilindro
    const EASE = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.09;
    const mod = (a, n) => ((a % n) + n) % n;

    let pos = 0;    // posición actual, en cards (no se acota: el cilindro da vueltas)
    let target = 0; // posición hacia la que se desliza
    let active = -1;
    let frame = 0;

    const setActive = (i) => {
      if (i === active) return;
      active = i;
      cards.forEach((c, j) => c.classList.toggle('is-active', j === i));
      dots.forEach((d, j) => {
        d.classList.toggle('is-active', j === i % originals.length);
        d.setAttribute('aria-pressed', String(j === i % originals.length));
      });
    };

    const render = () => {
      const radius = cards[0].offsetWidth / (STEP * Math.PI / 180);
      cards.forEach((card, i) => {
        const d = mod(i - pos + total / 2, total) - total / 2;
        const angle = d * STEP;
        const rad = angle * Math.PI / 180;
        const x = radius * Math.sin(rad);
        const z = radius * (Math.cos(rad) - 1);
        card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg)`;
        card.style.opacity = String(1 - Math.min(Math.abs(d), 1) * 0.8);
        card.style.visibility = Math.abs(angle) > 100 ? 'hidden' : '';
      });
      setActive(mod(Math.round(pos), total));
    };

    // Se acerca a la posición destino un poco en cada cuadro: frena suave al llegar
    const tick = () => {
      pos += (target - pos) * EASE;
      if (Math.abs(target - pos) < 0.0005) pos = target;
      render();
      frame = pos !== target || dragging ? requestAnimationFrame(tick) : 0;
    };
    const animate = () => { if (!frame) frame = requestAnimationFrame(tick); };

    const go = (i) => {
      // Va hacia la copia más cercana de esa card, sin dar la vuelta larga
      const n = originals.length;
      target = Math.round(target) + mod(i - Math.round(target) + n / 2, n) - n / 2;
      animate();
    };

    /* Arrastre con inercia (mouse y touch); el scroll vertical sigue siendo de la página */
    let dragging = false;
    let moved = false;
    let startX = 0, startY = 0, startPos = 0, lastX = 0, lastT = 0, velocity = 0;

    track.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      startX = lastX = e.clientX;
      startY = e.clientY;
      startPos = pos;
      lastT = e.timeStamp;
      velocity = 0;
      moved = false;
      dragging = true;
    });
    track.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved) {
        if (Math.abs(e.clientY - startY) > Math.abs(dx) && Math.abs(e.clientY - startY) > 6) { dragging = false; return; }
        if (Math.abs(dx) < 6) return;
        moved = true;
        track.setPointerCapture(e.pointerId);
        track.classList.add('is-dragging');
      }
      const width = cards[0].offsetWidth;
      const dt = Math.max(1, e.timeStamp - lastT);
      velocity = 0.8 * velocity + 0.2 * (-(e.clientX - lastX) / width / dt);
      lastX = e.clientX;
      lastT = e.timeStamp;
      pos = target = startPos - dx / width;
      animate();
    });
    const release = () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');
      if (!moved) return;
      setTimeout(() => { moved = false; }); // después del click que dispara soltar
      // Un gesto rápido avanza más de una card, como si girara por impulso
      const fling = Math.max(-2, Math.min(2, velocity * 220));
      target = Math.round(pos + fling);
      animate();
    };
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);

    // Trackpad / rueda horizontal: desliza libre y se acomoda en la card más cercana
    let wheelTimer;
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      target += e.deltaX / cards[0].offsetWidth;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { target = Math.round(target); animate(); }, 140);
      animate();
    }, { passive: false });

    // Tocar una card lateral la trae al frente; después de arrastrar no se abre ningún link
    cards.forEach((card, i) => {
      card.addEventListener('click', (e) => {
        if (moved || i !== active) {
          e.preventDefault();
          e.stopPropagation();
          if (!moved) go(i);
        }
      }, true);
      card.addEventListener('focusin', () => { if (i !== active) go(i); });
    });
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    prev.addEventListener('click', () => { target = Math.round(target) - 1; animate(); });
    next.addEventListener('click', () => { target = Math.round(target) + 1; animate(); });
    track.addEventListener('keydown', (e) => {
      if (e.target !== track || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
      e.preventDefault();
      target = Math.round(target) + (e.key === 'ArrowRight' ? 1 : -1);
      animate();
    });

    window.addEventListener('resize', render);
    render();
  }
})();
