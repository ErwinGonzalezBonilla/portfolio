# Orange Street Automation

Web de la agencia: servicios, trabajos, proceso y contacto.

Sitio estático (HTML + CSS + JavaScript) con una función de Vercel para el formulario de contacto.

- `index.html`: web de la agencia
- `portafolio.html`: portafolio técnico (se ve en `/portafolio`)
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

## WhatsApp

En `index.html`, busca `var WHATSAPP = ""` y escribe tu número con código de país, solo dígitos (por ejemplo `34600000000`). Aparecerán el botón flotante y el enlace en contacto.
