// Vercel Serverless Function — sends contact form via SendGrid
// Requires environment variables: SENDGRID_API_KEY, TO_EMAIL

const sgMail = require('@sendgrid/mail');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !phone || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.TO_EMAIL;
  if (!apiKey || !toEmail) {
    res.status(500).json({ error: 'SendGrid not configured' });
    return;
  }

  sgMail.setApiKey(apiKey);

  const msg = {
    to: "vive7429@gmail.com",
    from: toEmail, // use a verified sender or same as TO_EMAIL for simplicity
    subject: `Website contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong><br/>${message}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SendGrid error', err?.response?.body || err.message || err);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
