import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ArtistApprovedEmail } from "../../../src/emails/ArtistApprovedEmail";
import { adminDb } from "../../lib/firebase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

// ICS Calendar Generation
function generateICS(
  artistName: string,
  serviceName: string,
  date: string,
  time: string = '10:00',
  location: string = 'Face Forward Clinic',
  duration: number = 60
): string {
  const start = new Date(`${date}T${time}:00`);
  const end = new Date(start.getTime() + duration * 60 * 1000);

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const now = new Date();
  const uid = `${now.getTime()}-${Math.random().toString(36).substring(7)}@faceforward.com`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Face Forward//Appointment//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDate(now)}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:${serviceName} with ${artistName}
DESCRIPTION:Your appointment with ${artistName} for ${serviceName} is confirmed.
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Appointment with ${artistName} tomorrow
END:VALARM
END:VEVENT
END:VCALENDAR`.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { requestId } = body;

    console.log('Received request to send email for:', requestId);

    // Validate request ID
    if (!requestId) {
      return NextResponse.json(
        { error: 'Missing required field: requestId' },
        { status: 400 }
      );
    }

    // Fetch request details from Firestore
    const requestDoc = await adminDb.collection('requests').doc(requestId).get();
    
    if (!requestDoc.exists) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    const requestData = requestDoc.data();
    
    if (!requestData) {
      return NextResponse.json(
        { error: 'Request data is empty' },
        { status: 404 }
      );
    }
    
    console.log('Request data:', requestData);

    // Get user details from the users collection
    const userDoc = await adminDb.collection('users').doc(requestData.userId).get();
    const userData = userDoc.data();

    // Get artist details from the users collection
    const artistDoc = await adminDb.collection('users').doc(requestData.artistId).get();
    const artistData = artistDoc.data();

    console.log('User email:', userData?.email);
    console.log('Artist name:', artistData?.name);

    // Use data from the request document
    const recipientEmail = requestData.email || userData?.email;
    const recipientName = requestData.name || userData?.name || 'Client';
    const artistName = artistData?.name || 'Face Forward Artist';
    const appointmentTime = '10:00'; // Default time, can be customized later
    const location = 'Face Forward Clinic'; // Default location

    // Generate ICS file content
    const icsContent = generateICS(
      artistName,
      requestData.serviceName,
      requestData.requestedDate,
      appointmentTime,
      location,
      60
    );

    // Create data URL for calendar link
    const calendarLink = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

    // Format date for display
    const appointmentDate = new Date(`${requestData.requestedDate}T${appointmentTime}:00`);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    console.log('Sending email to:', recipientEmail);

    // Send email with React Email template
    const { data, error } = await resend.emails.send({
      from: "test@faceforwardcanada.org",
      to: recipientEmail,
      subject: `Your appointment with ${artistName} is confirmed!`,
      react: ArtistApprovedEmail({
        recipientName,
        artistName,
        serviceName: requestData.serviceName,
        date: formattedDate,
        time: formattedTime,
        location,
        calendarLink,
      }),
      attachments: [
        {
          filename: 'appointment.ics',
          content: Buffer.from(icsContent).toString('base64'),
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    // Update request status to approved
    await adminDb.collection('requests').doc(requestId).update({
      status: 'approved',
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Appointment email sent successfully',
      emailId: data?.id,
      requestData: {
        recipient: recipientName,
        artist: artistName,
        service: requestData.serviceName,
        date: formattedDate,
        time: formattedTime,
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}