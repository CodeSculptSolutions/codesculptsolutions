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

    await resend.emails.send({
      from: 'CodeSculptSolutions <noreply@codesculptsolutions.com>',
      to: ['august.jakelourencevillar@gmail.com'],
      replyTo: email,
      subject: `New message from ${name} via codesculptsolutions.com`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
