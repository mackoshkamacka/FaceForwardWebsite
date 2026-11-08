import { getResend } from "../../lib/resend";
import { WelcomeEmail } from "../../../src/emails/WelcomeEmail";


export async function POST(req) {
  const { name, email } = await req.json();

  if (!email) {
    return Response.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    await getResend().emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to Face Forward Canada!",
      react: WelcomeEmail({ name }),
    });

    return Response.json({ message: "sent" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
