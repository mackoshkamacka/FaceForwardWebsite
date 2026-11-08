import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";
import { footer, heading, hr, main, container, paragraph, section } from "./styles";

interface ArtistApprovedEmailProps {
    recipientName: string;
    artistName: string;
    serviceName: string;
    date: string; // already formatted for display
    time: string; // already formatted for display
    location: string;
}

export const ArtistApprovedEmail = ({
    recipientName,
    artistName,
    serviceName,
    date,
    time,
    location,
}: ArtistApprovedEmailProps) => (
    <Html>
        <Head />
        <Preview>Your Face Forward service is confirmed</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={heading}>You&rsquo;re all set!</Heading>

                <Text style={paragraph}>Hi {recipientName},</Text>

                <Section style={section}>
                    <Text style={paragraph}>
                        {artistName} has confirmed your request for <strong>{serviceName}</strong>.
                    </Text>
                    <Text style={paragraph}>
                        <strong>When:</strong> {date} at {time}
                        <br />
                        <strong>Where:</strong> {location}
                    </Text>
                    <Text style={paragraph}>
                        A calendar invite is attached. As with every Face Forward service, this is
                        completely free of charge. If you have any skin sensitivities or product
                        preferences (for example, fragrance-free), please let us know ahead of time
                        by replying to this email.
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

ArtistApprovedEmail.PreviewProps = {
    recipientName: "Alex",
    artistName: "Jordan",
    serviceName: "Natural everyday makeup",
    date: "Saturday, November 14, 2026",
    time: "10:00 a.m.",
    location: "Community Centre, 123 Main St.",
} as ArtistApprovedEmailProps;

export default ArtistApprovedEmail;
