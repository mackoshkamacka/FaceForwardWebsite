import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  
  interface ArtistApprovedEmailProps {
    recipientName: string;
    artistName: string;
    serviceName: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    location?: string;
    calendarLink?: string;
  }
  
  export const ArtistApprovedEmail = ({
    recipientName,
    artistName,
    serviceName,
    date,
    time,
    location,
    calendarLink,
  }: ArtistApprovedEmailProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Your Face Forward Appointment is Confirmed!</Preview>
        <Container style={container}>
          <Heading style={heading}>Appointment Confirmed!</Heading>
  
          <Text style={paragraph}>Hi {recipientName},</Text>
  
          <Section style={body}>
            <Text style={paragraph}>
              {artistName} has approved your request for <strong>{serviceName}</strong>.
            </Text>
            <Text style={paragraph}>
              Your appointment is scheduled for <strong>{date} at {time}</strong>.
              {location && <> Location: {location}</>}
            </Text>
  
            {calendarLink && (
              <Text style={paragraph}>
                <Link style={link} href={calendarLink}>
                  Add this appointment to your calendar
                </Link>
              </Text>
            )}
          </Section>
  
          <Hr style={hr} />
          <Text style={footer}>Face Forward Humanitarian Association</Text>
        </Container>
      </Body>
    </Html>
  );
  
  const main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 25px 48px',
  };
  
  const heading = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginTop: '48px',
  };
  
  const body = {
    margin: '24px 0',
  };
  
  const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
  };
  
  const link = {
    color: '#FF6363',
  };
  
  const hr = {
    borderColor: '#dddddd',
    marginTop: '48px',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
    marginLeft: '4px',
  };
  
  export default ArtistApprovedEmail;
  