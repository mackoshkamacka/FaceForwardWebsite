import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {

    console.log('Resend API Key present:', !!process.env.RESEND_API_KEY);
    console.log('Test var:', process.env.TEST_VAR);
    
    const body = await req.json();
    console.log('Request body received:', body);
    
    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.log('Missing fields detected');
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log('Attempting to send email...');
    
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "mackoshkamacka@gmail.com", 
      subject: `Face Forward Contact from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
    
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}