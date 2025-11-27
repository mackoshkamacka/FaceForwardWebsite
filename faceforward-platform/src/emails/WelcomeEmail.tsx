import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  
  interface WelcomeEmailProps {
    name: string;
    magicLink?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';
  
  export const WelcomeEmail = ({
    name,
    magicLink,
  }: WelcomeEmailProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Welcome to Face Forward</Preview>
        <Container style={container}>
          <Heading style={heading}>WELCOME TO FACEFORWARD</Heading>
  
          <Text style={paragraph}>Hi {name},</Text>
  
          <Section style={body}>
            {magicLink && (
              <Text style={paragraph}>
                <Link style={link} href={magicLink}>
                  Click here to verify your account
                </Link>
              </Text>
            )}
  
            <Text style={paragraph}>
              We're excited to have you join the FaceForward community!
            </Text>
          </Section>
  
          <Hr style={hr} />
  
          <Text style={footer}>Face Forward Humanitarian Association</Text>
        </Container>
      </Body>
    </Html>
  );

WelcomeEmail.PreviewProps = {
  magicLink: 'https://raycast.com', // !!! change this to verification 
} as WelcomeEmailProps; // this too!!

export default WelcomeEmail; //

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
  backgroundImage: 'url("/static/raycast-bg.png")',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat, no-repeat',
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
