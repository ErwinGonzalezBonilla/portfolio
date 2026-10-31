# Orange Street Automation

Web de la agencia: servicios, trabajos, proceso y contacto.

Sitio estático (HTML + CSS + JavaScript) con una función de Vercel para el formulario de contacto.

- `index.html`: web de la agencia
- `portafolio.html`: portafolio técnico (se ve en `/portafolio`)
- `aviso-legal.html`, `privacidad.html`, `cookies.html`: páginas legales
- `api/contacto.js`: envía al correo cada mensaje del formulario
- `img/`: logo, imagen para compartir en redes y foto
- `CV-Erwin-Gonzalez-Bonilla.pdf`: currículum

## Formulario de contacto

En Vercel → Settings → Environment Variables agrega:

| Variable | Ejemplo |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | tu correo de Gmail |
| `SMTP_PASS` | contraseña de aplicación de Google (myaccount.google.com/apppasswords) |
| `CONTACT_TO` | correo donde quieres recibir los mensajes (opcional) |

Sin estas variables el formulario igual funciona: ofrece enviar el mensaje con el programa de correo del visitante.

## Configuración (WhatsApp, redes, precios y medición)

En `index.html`, al final, edita el bloque `CONFIG`:

- `whatsapp`: número con código de país, solo dígitos (ej. `34600000000`). Activa el botón flotante y el de contacto.
- `instagram`, `tiktok`: usuario sin @. Aparecen en el pie.
- `precios`: textos como `"Desde 400 €"`. Vacíos = "Cerrado tras la llamada".
- `medicion`: IDs de Google Analytics, píxel de Meta y píxel de TikTok. Solo se cargan si el visitante acepta las cookies; el banner aparece únicamente si configuras alguno.

## Páginas legales

`aviso-legal.html`, `privacidad.html` y `cookies.html` son plantillas: completa todo lo marcado como [REVISAR].

## Testimonios

La sección `#testimonios` está oculta (`hidden`). Cuando tengas testimonios reales, quita `hidden` y reemplaza los textos [PENDIENTE].
