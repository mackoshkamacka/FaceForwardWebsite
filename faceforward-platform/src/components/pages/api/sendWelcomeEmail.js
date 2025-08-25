import { Resend } from 'resend';
import { WelcomeEmail } from '../../emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { firstName, email } = req.body;
        
        const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Welcome to our platform!",
        react: WelcomeEmail({ firstName }), 
        });

        res.status(200).json({ status: 'ok', emailId: response.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
}