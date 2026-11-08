import { NextRequest, NextResponse } from "next/server";
import { getResend } from "../../lib/resend";


/** Escapes user input before it goes into the email's HTML. */
function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await getResend().emails.send({
            from: "onboarding@resend.dev",
            to: "mackoshkamacka@gmail.com",
            replyTo: String(email),
            subject: `Face Forward contact from ${String(name).slice(0, 100)}`,
            html: `<p><strong>Name:</strong> ${escapeHtml(String(name))}</p>
                   <p><strong>Email:</strong> ${escapeHtml(String(email))}</p>
                   <p><strong>Message:</strong><br>${escapeHtml(String(message)).replace(/\n/g, "<br>")}</p>`,
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error("contact-us-email failed:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
