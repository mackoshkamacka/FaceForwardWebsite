// import {
//     Body,
//     Container,
//     Head,
//     Heading,
//     Html,
//     Img,
//     Link,
//     Preview,
//     Text,
//   } from '@react-email/components';

// import React from 'react';

// interface WelcomeEmailProps {
//     firstName?: string;
//     loginCode?: string;  
// }
  
// const baseUrl = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : '';
  
// export const WelcomeEmail = ({
//     firstName, 
//     loginCode,
// }: WelcomeEmailProps) => (
//     <Html>
//       <Head />
//       <Body style={main}>
//         <Preview>Welcome to Face Forward!</Preview>
//         <Container style={container}>
//           <Heading style={h1}>Welcome, {firstName}! </Heading>
//           <Link
//             href="https://notion.so"
//             target="_blank"
//             style={{
//               ...link,
//               display: 'block',
//               marginBottom: '16px',
//             }}
//           >
//             Click here to log in with this magic link
//           </Link>
//           <Text style={{ ...text, marginBottom: '14px' }}>
//             Thank you for signing up! You have successfully created a ... account. 
//           </Text>
//           <code style={code}>{loginCode}</code>
//           <Text
//             style={{
//               ...text,
//               color: '#ababab',
//               marginTop: '14px',
//               marginBottom: '16px',
//             }}
//           >
//             If you didn&apos;t try to login, you can safely ignore this email.
//           </Text>
          
//           <Img
//             src={`${baseUrl}/static/faceforward-logo.png`}
//             width="32"
//             height="32"
//             alt="Face Forward"
//           />
//           <Text style={footer}>
//             <Link
//               href="https://temporaryDomainNotYeAvailable.com"
//               target="_blank"
//               style={{ ...link, color: '#898989' }}
//             >
//               TempDomain.com
//             </Link>
//             , slogan of company 
//             <br />
//             mission statement...? 
//           </Text>
//         </Container>
//       </Body>
//     </Html>
//   );
  
//   WelcomeEmail.PreviewProps = {
//     firstName: 'John', 
//     loginCode: 'sparo-ndigo-amurt-secan',
//   } as WelcomeEmailProps;
  
//   export default WelcomeEmail;
  
//   const main = {
//     backgroundColor: '#ffffff',
//   };
  
//   const container = {
//     paddingLeft: '12px',
//     paddingRight: '12px',
//     margin: '0 auto',
//   };
  
//   const h1 = {
//     color: '#333',
//     fontFamily:
//       "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//     fontSize: '24px',
//     fontWeight: 'bold',
//     margin: '40px 0',
//     padding: '0',
//   };
  
//   const link = {
//     color: '#2754C5',
//     fontFamily:
//       "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//     fontSize: '14px',
//     textDecoration: 'underline',
//   };
  
//   const text = {
//     color: '#333',
//     fontFamily:
//       "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//     fontSize: '14px',
//     margin: '24px 0',
//   };
  
//   const footer = {
//     color: '#898989',
//     fontFamily:
//       "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//     fontSize: '12px',
//     lineHeight: '22px',
//     marginTop: '12px',
//     marginBottom: '24px',
//   };
  
//   const code = {
//     display: 'inline-block',
//     padding: '16px 4.5%',
//     width: '90.5%',
//     backgroundColor: '#f4f4f4',
//     borderRadius: '5px',
//     border: '1px solid #eee',
//     color: '#333',
//   };
  

const React = require('react');
const { Html, Body, Container, Heading, Text } = require('@react-email/components');

function WelcomeEmail({ firstName }) {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Welcome to FaceForward!</Heading>
          <Text>Hi {firstName},</Text>
          <Text>Thanks for signing up!</Text>
        </Container>
      </Body>
    </Html>
  );
}

module.exports = { WelcomeEmail };
