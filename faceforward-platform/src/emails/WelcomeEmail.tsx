import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";
import { footer, heading, hr, main, container, paragraph, section } from "./styles";

interface WelcomeEmailProps {
    name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>Welcome to Face Forward Canada</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={heading}>Welcome to Face Forward</Heading>

                <Text style={paragraph}>Hi {name},</Text>

                <Section style={section}>
                    <Text style={paragraph}>
                        Thank you for joining Face Forward Canada, a not-for-profit wellness
                        initiative that brings free beauty and self-care services to underserved and
                        marginalized communities.
                    </Text>
                    <Text style={paragraph}>
                        To keep our partner organizations, clients and volunteers safe, our team
                        reviews every new account. This usually takes up to 24 hours, and
                        we&rsquo;ll email you as soon as your account is approved.
                    </Text>
                    <Text style={paragraph}>
                        Questions? Just reply to this email or write to
                        info.faceforwardcanada@gmail.com.
                    </Text>
                </Section>

                <Hr style={hr} />
                <Text style={footer}>
                    Face Forward Canada · Bringing beauty, dignity, and joy to every face
                </Text>
            </Container>
        </Body>
    </Html>
);

WelcomeEmail.PreviewProps = { name: "Alex" } as WelcomeEmailProps;

export default WelcomeEmail;
