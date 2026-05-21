import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
  }

  const resend = new Resend(apiKey)

  try {
    const body = await req.json()
    const { name, email, message } = body as { name: string; email: string; message: string }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#F4EFE6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4EFE6;padding:48px 24px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#FDFAF6;border-radius:6px;overflow:hidden;border:1px solid rgba(27,26,31,0.08);">

        <!-- Clay accent bar -->
        <tr><td style="background:#C9A9C7;height:4px;"></td></tr>

        <!-- Header -->
        <tr><td style="padding:40px 48px 32px;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#4A4751;font-family:monospace;">Studio contact</p>
          <h1 style="margin:0;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#1B1A1F;">Code Sculpt Solutions</h1>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 48px;"><div style="height:1px;background:rgba(27,26,31,0.08);"></div></td></tr>

        <!-- Sender info -->
        <tr><td style="padding:28px 48px 0;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:10px;">
                <span style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#4A4751;font-family:monospace;">From</span>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:4px;">
                <span style="font-size:18px;font-weight:600;color:#1B1A1F;letter-spacing:-0.01em;">${name}</span>
              </td>
            </tr>
            <tr>
              <td>
                <a href="mailto:${email}" style="font-size:14px;color:#C9A9C7;text-decoration:none;">${email}</a>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Message -->
        <tr><td style="padding:28px 48px 0;">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#4A4751;font-family:monospace;">Message</p>
          <div style="background:#F4EFE6;border-radius:4px;padding:20px 24px;border-left:2px solid #C9A9C7;">
            <p style="margin:0;font-size:15px;line-height:1.75;color:#1B1A1F;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
        </td></tr>

        <!-- Reply CTA -->
        <tr><td style="padding:28px 48px;">
          <a href="mailto:${email}" style="display:inline-block;background:#1B1A1F;color:#F4EFE6;font-size:13px;font-weight:500;letter-spacing:0.02em;padding:12px 24px;border-radius:4px;text-decoration:none;">Reply to ${name} →</a>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 48px;"><div style="height:1px;background:rgba(27,26,31,0.08);"></div></td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 48px 32px;">
          <p style="margin:0;font-size:11px;color:#4A4751;font-family:monospace;letter-spacing:0.06em;">via codesculptsolutions.com · ${new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    const autoReplyHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#F4EFE6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4EFE6;padding:48px 24px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#FDFAF6;border-radius:6px;overflow:hidden;border:1px solid rgba(27,26,31,0.08);">

        <tr><td style="background:#C9A9C7;height:4px;"></td></tr>

        <tr><td style="padding:40px 48px 28px;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#4A4751;font-family:monospace;">Got it.</p>
          <h1 style="margin:0;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#1B1A1F;">Code Sculpt Solutions</h1>
        </td></tr>

        <tr><td style="padding:0 48px;"><div style="height:1px;background:rgba(27,26,31,0.08);"></div></td></tr>

        <tr><td style="padding:32px 48px 0;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1B1A1F;">Hey ${name},</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:#4A4751;">Your message landed. I read every one of these personally — I'll get back to you as soon as I can, usually within a day or two.</p>
          <p style="margin:0;font-size:15px;line-height:1.75;color:#4A4751;">Talk soon.</p>
          <p style="margin:12px 0 0;font-size:15px;font-weight:600;color:#1B1A1F;">— Jake, Code Sculpt Solutions</p>
        </td></tr>

        <tr><td style="padding:28px 48px 0;">
          <div style="background:#F4EFE6;border-radius:4px;padding:16px 20px;border-left:2px solid rgba(27,26,31,0.12);">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#4A4751;font-family:monospace;">Your message</p>
            <p style="margin:0;font-size:13px;line-height:1.7;color:#4A4751;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
        </td></tr>

        <tr><td style="padding:0 48px;margin-top:28px;"><div style="height:1px;background:rgba(27,26,31,0.08);margin-top:28px;"></div></td></tr>

        <tr><td style="padding:20px 48px 32px;">
          <p style="margin:0;font-size:11px;color:#4A4751;font-family:monospace;letter-spacing:0.06em;">codesculptsolutions.com · Cebu, PH</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // Notification to studio — must succeed
    await resend.emails.send({
      from: 'Code Sculpt Solutions <hello@codesculptsolutions.com>',
      to: ['august.jakelourencevillar@gmail.com'],
      replyTo: email,
      subject: `New message from ${name} via codesculptsolutions.com`,
      html,
      text: `From: ${name} <${email}>\n\n${message}`,
    })

    // Auto-reply to sender — best effort, never blocks response
    resend.emails.send({
      from: 'Code Sculpt Solutions <hello@codesculptsolutions.com>',
      to: [email],
      replyTo: 'august.jakelourencevillar@gmail.com',
      subject: `Got your message — Code Sculpt Solutions`,
      html: autoReplyHtml,
      text: `Hey ${name},\n\nYour message landed. I read every one of these personally — I'll get back to you as soon as I can, usually within a day or two.\n\nTalk soon.\n— Jake, Code Sculpt Solutions\n\n---\nYour message:\n${message}`,
    }).catch((err: unknown) => console.error('Auto-reply failed:', err))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
