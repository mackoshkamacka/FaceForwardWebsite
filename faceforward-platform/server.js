require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend'); 
//const { WelcomeEmail } = require('./src/emails/WelcomeEmail'); 
const app = express();
const PORT = 5000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: 'http://localhost:3000' 
}));
app.use(express.json());

app.post("/api/sendWelcomeEmail", async (req, res) => {
  const { firstName, email } = req.body;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to FaceForward!",
      //react: WelcomeEmail({ firstName }),
      html: `<html>
        <body>
          <h1>Welcome to FaceForward!</h1>
          <p>Hi ${firstName},</p>
          <p>Thanks for signing up. We’re excited to have you!</p>
        </body>
      </html>`, 
    });

    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
