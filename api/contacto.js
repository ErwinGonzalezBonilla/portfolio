// Formulario de contacto: envía cada mensaje al correo de la agencia (función de Vercel).
// Variables de entorno en Vercel: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS y CONTACT_TO (opcional).
const nodemailer = require("nodemailer");

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clean = (v, max) => String(v ?? "").trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido." });
  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  if (b.web) return res.status(200).json({ ok: true }); // trampa anti-spam

  const d = {
    nombre: clean(b.nombre, 100), email: clean(b.email, 160), telefono: clean(b.telefono, 40), negocio: clean(b.negocio, 120),
    servicios: (Array.isArray(b.servicios) ? b.servicios : []).map(s => clean(s, 40)).slice(0, 8),
    presupuesto: clean(b.presupuesto, 40), mensaje: clean(b.mensaje, 4000),
  };
  if (d.nombre.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) || d.mensaje.length < 5)
    return res.status(400).json({ error: "Completa nombre, correo y mensaje." });

  const { SMTP_HOST, SMTP_PORT = "465", SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return res.status(503).json({ error: "Correo no configurado." });
  const to = process.env.CONTACT_TO || SMTP_USER;

  const rows = [["Nombre", d.nombre], ["Correo", d.email], ["Teléfono", d.telefono], ["Negocio", d.negocio],
    ["Necesita", d.servicios.join(", ")], ["Presupuesto", d.presupuesto || "Prefiere hablarlo"]];
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px">
    <h2 style="color:#FF6A1A;margin:0 0 12px">Nuevo contacto desde la web</h2>
    <table style="border-collapse:collapse;width:100%">${rows.map(([k, v]) => `<tr><td style="padding:6px 10px 6px 0;color:#777;white-space:nowrap">${k}</td><td style="padding:6px 0"><b>${esc(v) || "—"}</b></td></tr>`).join("")}</table>
    <p style="background:#FFF4EA;border-radius:10px;padding:14px;white-space:pre-wrap">${esc(d.mensaje)}</p>
    <p style="color:#777;font-size:13px">Responde a este correo para contestarle directamente.</p></div>`;

  try {
    const t = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await t.sendMail({
      from: `"Orange Street · Web" <${SMTP_USER}>`, to, replyTo: `"${d.nombre.replace(/"/g, "")}" <${d.email}>`,
      subject: `🟠 Nuevo contacto: ${d.negocio || d.nombre}${d.servicios.length ? " · " + d.servicios.join(", ") : ""}`,
      html, text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\n" + d.mensaje,
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("[contacto]", e.message);
    res.status(502).json({ error: "No se pudo enviar." });
  }
};
