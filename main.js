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
})();
