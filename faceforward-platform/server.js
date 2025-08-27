const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/sendWelcomeEmail", async (req, res) => {
    const { firstName, email } = req.body;
  
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Welcome to FaceForward!",
        react: WelcomeEmail({ firstName }),
      });
  
      res.json({ message: "Email sent successfully!" });
    } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).json({ error: "Failed to send email" });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
