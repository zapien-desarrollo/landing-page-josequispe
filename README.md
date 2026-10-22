# Landing page · Jose Quispe

Landing page de servicios de desarrollo de software para negocios
(páginas web, tiendas online, automatizaciones, CRM y publicidad en Meta Ads).

## Stack

Sitio estático sin build: `index.html`, `styles.css`, `main.js`.
Se despliega en Vercel automáticamente con cada push a la rama `main`.
URL de producción: https://landing-page-josequispe.vercel.app
Repo: https://github.com/zapien-desarrollo/landing-page-josequispe

## Desarrollo local

```bash
npx serve .
```

## Branding

Colores y tipografías en `design/branding.txt`. La referencia visual es
`design/tarjeta-presentacion.jpg`.

> La tipografía de título *TT Ricordi Nobili* es comercial. Mientras no se
> cargue con `@font-face`, se usa *Bodoni Moda* (Google Fonts) como sustituto.

## Secciones

- [x] Hero
- [x] Servicios
- [x] Por qué trabajar conmigo
- [x] Rubros (basado en `docs/rubros.md`)
- [x] Cómo trabajo
- [x] Preguntas frecuentes
- [x] Contacto (formulario que arma el mensaje de WhatsApp)
- [ ] Portfolio de demos por rubro
