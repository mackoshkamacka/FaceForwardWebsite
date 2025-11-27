import { Resend } from "resend";
import { WelcomeEmail } from "../../../src/emails/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, email } = await req.json();

  if (!email) {
    return Response.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to FaceForward!",
      react: WelcomeEmail({ name }),
    });

    return Response.json({ message: "sent" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
