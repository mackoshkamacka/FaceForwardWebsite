import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { WelcomeEmail } from '../../../src/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY!); 

export async function POST(req: Request) {
  try {
    const { firstName, email } = await req.json();

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing firstName or email' }, { status: 400 });
    }

    // Send email via Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: email,
      subject: 'Welcome!',
      react: WelcomeEmail({ firstName }), 
    });

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (err: any) {
    console.error('Error sending email:', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const body = await req.json();
//   console.log('Received body:', body);
//   return NextResponse.json({ message: 'Email endpoint works!' });
// }



