import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "mackoshkamacka@gmail.com",
        subject: `Face Forward Contact from ${name}`,
        html: `<p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Email failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
