import { NextRequest, NextResponse } from "next/server";
import { getResend } from "../../lib/resend";
import { ArtistApprovedEmail } from "../../../src/emails/ArtistApprovedEmail";
import { getAdminAuth, getAdminDb } from "../../lib/firebase-admin";


/** Escapes text for an iCalendar property value. */
function icsText(value: string) {
    return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/**
 * Appointment date/time as a "wall clock" Date: the components are stored in
 * UTC fields so formatting with timeZone "UTC" shows exactly what the artist
 * typed, regardless of the server's timezone.
 */
function wallClock(date: string, time: string) {
    return new Date(`${date}T${time}:00Z`);
}

/** Floating local time (no "Z"): calendar apps show it in the attendee's local time. */
function icsLocal(d: Date) {
    return d.toISOString().replace(/[-:]/g, "").slice(0, 15);
}

function generateICS(opts: {
    artistName: string;
    serviceName: string;
    start: Date;
    durationMinutes: number;
    location: string;
}) {
    const { artistName, serviceName, start, durationMinutes, location } = opts;
    const end = new Date(start.getTime() + durationMinutes * 60_000);
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@faceforwardcanada.com`;

    return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Face Forward Canada//Appointment//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:REQUEST",
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${icsLocal(start)}`,
        `DTEND:${icsLocal(end)}`,
        `SUMMARY:${icsText(`${serviceName} with ${artistName} (Face Forward)`)}`,
        `DESCRIPTION:${icsText(`Your free Face Forward service with ${artistName} is confirmed.`)}`,
        `LOCATION:${icsText(location)}`,
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "BEGIN:VALARM",
        "TRIGGER:-PT24H",
        "ACTION:DISPLAY",
        `DESCRIPTION:${icsText(`Reminder: ${serviceName} with ${artistName} tomorrow`)}`,
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
}

export async function POST(request: NextRequest) {
    try {
        // Only the artist assigned to a request may approve it.
        const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
        if (!token) {
            return NextResponse.json({ error: "Not signed in" }, { status: 401 });
        }
        const { uid } = await getAdminAuth().verifyIdToken(token);

        const body = await request.json();
        const requestId: string | undefined = body.requestId;
        const appointmentTime: string = /^\d{2}:\d{2}$/.test(body.appointmentTime ?? "")
            ? body.appointmentTime
            : "10:00";
        const location: string = String(body.location ?? "").trim();
        const duration = Number(body.duration) > 0 ? Number(body.duration) : 60;

        if (!requestId || !location) {
            return NextResponse.json({ error: "Missing requestId or location" }, { status: 400 });
        }

        const adminDb = getAdminDb();
        const requestRef = adminDb.collection("requests").doc(requestId);
        const requestDoc = await requestRef.get();
        const requestData = requestDoc.data();

        if (!requestDoc.exists || !requestData) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }
        if (requestData.artistId !== uid) {
            return NextResponse.json({ error: "Not allowed" }, { status: 403 });
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(requestData.requestedDate ?? "")) {
            return NextResponse.json({ error: "Request has no valid date" }, { status: 400 });
        }

        const [userDoc, artistDoc] = await Promise.all([
            adminDb.collection("users").doc(requestData.userId).get(),
            adminDb.collection("users").doc(uid).get(),
        ]);
        const userData = userDoc.data();
        const artistData = artistDoc.data();

        const recipientEmail = requestData.email || userData?.email;
        const recipientName = requestData.name || userData?.name || "there";
        const artistName = artistData?.name || "your Face Forward artist";
        const start = wallClock(requestData.requestedDate, appointmentTime);

        const icsContent = generateICS({
            artistName,
            serviceName: requestData.serviceName,
            start,
            durationMinutes: duration,
            location,
        });

        const formattedDate = start.toLocaleDateString("en-CA", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        });
        const formattedTime = start.toLocaleTimeString("en-CA", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
        });

        const { data, error } = await getResend().emails.send({
            from: "test@faceforwardcanada.org",
            to: recipientEmail,
            subject: `Confirmed: ${requestData.serviceName} with ${artistName}`,
            react: ArtistApprovedEmail({
                recipientName,
                artistName,
                serviceName: requestData.serviceName,
                date: formattedDate,
                time: formattedTime,
                location,
            }),
            attachments: [
                {
                    filename: "face-forward-appointment.ics",
                    content: Buffer.from(icsContent).toString("base64"),
                },
            ],
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }

        await requestRef.update({
            status: "approved",
            appointmentTime,
            location,
            updatedAt: new Date(),
        });

        return NextResponse.json({ success: true, emailId: data?.id });
    } catch (error) {
        console.error("send-appointment-email failed:", error);
        const isAuthError = error instanceof Error && /token/i.test(error.message);
        return NextResponse.json(
            { error: isAuthError ? "Not signed in" : "Internal server error" },
            { status: isAuthError ? 401 : 500 }
        );
    }
}
