import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import nodemailer from 'npm:nodemailer';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const { form_type, from_name, from_phone, from_email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: Deno.env.get('SMTP_USER'),
        pass: Deno.env.get('SMTP_PASS'),
      },
    });

    await transporter.sendMail({
      from: `"AOL Sigorta" <${Deno.env.get('SMTP_USER')}>`,
      to: 'aolgentr@gmail.com',
      subject: `[AOL Sigorta] ${form_type}`,
      text: [
        `Form: ${form_type}`,
        `Ad: ${from_name}`,
        `Telefon: ${from_phone}`,
        `E-posta: ${from_email}`,
        `Konu: ${subject}`,
        '',
        message,
      ].join('\n'),
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
