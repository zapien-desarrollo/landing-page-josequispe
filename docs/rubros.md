# Rubros: necesidades del cliente y tipo de página

Contexto base para el portfolio, las demos y la venta. Todo lo que se diseñe
para un rubro tiene que responder a **para qué le sirve la página a ese
negocio**, no a qué tecnología usamos.

Relevado el 2026-10-22.

## Resumen

| Rubro | Tipo de página | Objetivo de la página |
|---|---|---|
| Estudio jurídico | Landing | Consulta / turno |
| Estudio contable | Landing | Consulta / abono mensual |
| Ferretería, electrodomésticos, muebles | **Tiendanube** | Venta online |
| Hamburguesería, pizzería, bar | Landing + carta | Pedido por WhatsApp / reserva |
| Inmobiliaria | Sitio con catálogo | Consulta por propiedad / tasación |
| Concesionaria | Sitio con catálogo | Consulta / financiación / taller |

Regla general: **solo va con Tiendanube cuando el negocio vende productos con
carrito** (catálogo grande, stock, pagos, envíos). En el resto el objetivo es
un contacto, una reserva o una visita, y conviene una landing o un sitio a
medida (repo propio + Vercel).

---

## 1. Estudio jurídico → Landing

- **Ejemplo:** https://limaabogados.com.ar (Mendoza). Historia del estudio,
  áreas de práctica (laboral, civil y comercial, ambiental), logos de clientes,
  contacto por WhatsApp, mail y mapa. Sin formulario ni blog.
- **Para qué le sirve la página:** generar confianza y conseguir la primera
  consulta. Nadie contrata un servicio legal online: quiere ver que el estudio
  es serio y saber si toma su tipo de caso.
- **Qué incluir en la demo:**
  - Áreas de práctica.
  - Equipo con fotos.
  - Preguntas frecuentes ("¿cuánto sale una consulta?", "me despidieron, ¿qué hago?").
  - Botón de WhatsApp y pedido de turno.

## 2. Estudio contable → Landing

- **Ejemplo:** https://estudioimpositivopaz.com.ar (WordPress). Servicios
  separados (monotributo, Ingresos Brutos, Ganancias, liquidación de sueldos) y
  WhatsApp.
- **Para qué le sirve la página:** conseguir consultas. Además los
  monotributistas buscan mucho en Google ("alta monotributo",
  "recategorización"), así que cada servicio puede atraer tráfico propio.
- **Qué incluir en la demo:**
  - Servicios con planes o abonos mensuales.
  - Calendario de vencimientos.
  - WhatsApp.
  - Algunos estudios venden los abonos con botón de pago; se puede simular sin
    Tiendanube.

## 3. Ferretería / electrodomésticos / muebles → Tiendanube

- **Ejemplos:**
  - https://ferreteriaugarte.com.ar (CABA). Carrito, Mercado Pago, envío y
    retiro en el local.
  - https://www.gangahome.com.ar (hogar y deco, hecha con Tiendanube).
  - Más tiendas de referencia:
    https://www.tiendanube.com/blog/tiendanube-argentina-ejemplos/
- **Para qué le sirve la página:** vender. Necesita catálogo grande, stock,
  carrito, pagos, envíos y facturación. Armar todo eso a mano no tiene sentido.
- **Cómo se arma la demo:** no va como repo en Vercel. Va como tienda
  Tiendanube con un diseño (tema) personalizado. La idea original de "3
  ecommerce" encaja acá: ferretería, electro y muebles.

## 4. Hamburguesería / pizzería / bar → Landing con carta propia

- **Ejemplo:** https://burgerjoint.com.ar (Palermo). La web es casi
  institucional y la carta está aparte, en https://menu.burgerjoint.com.ar
  (las dos en WordPress).
- **Para qué le sirve la página:** que el cliente vea la carta con fotos y
  precios y pida o reserve rápido. Muchos dependen hoy de PedidosYa, que les
  cobra comisión por cada pedido.
- **Qué incluir en la demo:**
  - Carta por categorías.
  - Carrito armado a mano que **manda el pedido por WhatsApp** ya escrito (sin
    backend).
  - Horarios y sucursales.
  - Reservas, para el caso del bar.
- **Tipo de página:** Tiendanube queda grande para esto.

## 5. Inmobiliaria → Sitio a medida con catálogo

- **Ejemplo:** https://www.membrivesinmobiliaria.com.ar (Godoy Cruz).
  - Buscador por operación (venta, alquiler, temporario), localidad y tipo de
    propiedad.
  - Fichas con precio, superficie y ambientes.
  - WhatsApp flotante.
  - Hecho con InmoUp, una plataforma para inmobiliarias. Otra muy usada en
    Argentina es Tokko Broker.
- **Para qué le sirve la página:** que el interesado filtre propiedades y
  consulte por una puntual. No hay compra online.
- **Qué incluir en la demo:**
  - Buscador con filtros.
  - Ficha con galería, mapa y botón "consultar por esta propiedad".
  - Formulario de tasación.
  - Es de las demos que más lucen en un portfolio.

## 6. Concesionaria → Sitio a medida con catálogo

- **Ejemplos:**
  - https://www.territorioyacopini.com.ar (grupo Yacopini, Mendoza).
  - https://surmotors.com.ar. Casi solo institucional (marcas y formulario,
    sin catálogo ni WhatsApp): sirve como ejemplo de lo que **no** hay que
    hacer.
- **Para qué le sirve la página:** mostrar 0km y usados, captar consultas,
  ofrecer financiación y turnos de taller.
- **Qué incluir en la demo:**
  - Catálogo de usados con filtros (marca, año, km, precio).
  - Ficha con galería.
  - Simulador de cuotas.
  - Recepción del usado como parte de pago.
  - WhatsApp.

---

## Orden sugerido de demos

1. **Hamburguesería:** sale rápido, impacta y muestra el pedido por WhatsApp.
2. **Inmobiliaria:** la más vistosa para el portfolio.
3. El resto según los leads que vayan apareciendo.

Las demos usan negocios ficticios y en el portfolio se marcan como
"proyecto de ejemplo".
