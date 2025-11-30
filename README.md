# Face Forward Platform

> A volunteer service coordination platform connecting makeup artists with hospitals and domestic violence survivors seeking reconstructive makeup services.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Development Journey](#development-journey)
- [Roadmap](#roadmap)
- [Contributing](#contributing)


## Overview

Face Forward is a web platform that streamlines the coordination of volunteer makeup artistry services for patients in and outside of hospital care. The platform connects three key user types:

- **Artists**: Volunteer makeup artists offering reconstructive services, and volunteering expereince. 
- **Hospitals**: Healthcare facilities requesting services for patients. 
- **Patients/Individuals**: Direct service recipients looking for care. 

### Background

This is my first full-stack dynamic web application, representing the natural progression of my web development journey:
1. Static HTML/CSS websites (resume)
2. Wix websites (for non-profits, friends, and family)
3. React component-based website (digital portfolio)
4. **Full-stack Next.js application with authentication and database** (this project)

**Note**: Commits under "mevro" were made using my university email.


## Features

### For Artists
- **Service Management**: Create, edit, and manage offered services
- **Request Dashboard**: View incoming requests with filtering (pending, approved, completed, rejected)
- **Approval Workflow**: Review client information, set appointment times, and approve/reject requests
- **Email Notifications**: Automatic confirmation emails with calendar attachments (.ics files)

### For Hospitals & Patients
- **Service Discovery**: Browse available makeup artistry services
- **Request Submission**: Submit service requests with preferred dates and notes
- **Request Tracking**: Monitor request status in real-time
- **Appointment Confirmations**: Receive email confirmations with calendar invites

### System Features
- **Authentication**: Secure Firebase Authentication with role-based access
- **Real-time Updates**: Firestore real-time listeners for instant status changes
- **Email System**: Automated transactional emails via Resend API
- **Calendar Integration**: ICS file generation for Google Calendar/Outlook compatibility
- **Responsive Design**: Mobile-friendly interface with modern CSS



##  Tech Stack

### Frontend
- **Framework**: Next.js 15.5 (App Router)
- **UI Library**: React 19.1
- **Styling**: CSS Modules + Tailwind CSS
- **Icons**: React Icons

### Backend
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Auth
- **Server Functions**: Next.js API Routes
- **Admin SDK**: Firebase Admin (server-side operations)

### Email & Calendar
- **Email Service**: Resend API
- **Email Templates**: React Email
- **Calendar**: ICS file generation (RFC 5545 standard)

### DevOps
- **Hosting**: Vercel (recommended)
- **Version Control**: Git & GitHub
- **Package Manager**: npm


##  Project Structure

```
faceforward-platform/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── contact/              # Contact form endpoint
│   │   └── send-appointment-email/  # Email notification system
│   ├── artist-dashboard/         # Artist interface
│   │   └── styling/              # Component-specific CSS
│   ├── login/                    # Authentication pages
│   ├── signup/
│   └── patient-dashboard/        # Patient/Hospital interface
│       └── styling/
├── lib/                          # Utility functions
│   └── firebase-admin.ts         # Firebase Admin SDK config
├── src/                          # Source code
│   ├── firebase.js               # Firebase client SDK config
│   ├── components/               # Reusable React components
│   └── emails/                   # Email templates
│       └── ArtistApprovedEmail.tsx
├── public/                       # Static assets
│   └── ReactRenderingVisualV3.png  # Architecture diagram
├── .env.local                    # Environment variables (not committed)
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
└── README.md                     # This file
```

### Key Files

- **`src/firebase.js`**: Client-side Firebase configuration (authentication, Firestore queries)
- **`lib/firebase-admin.ts`**: Server-side Firebase Admin SDK (privileged operations)
- **`app/api/send-appointment-email/route.ts`**: Handles email sending and calendar generation
- **`app/artist-dashboard/page.js`**: Artist request management interface
- **`app/patient-dashboard/page.js`**: Patient/Hospital service request interface

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project ([console.firebase.google.com](https://console.firebase.google.com))
- Resend account ([resend.com](https://resend.com))
- Domain verified with Resend (for production emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mackoshkamacka/FaceForwardWebsite.git
   cd FaceForwardWebsite/faceforward-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Create collections: `users`, `services`, `requests`
   - Download service account key (Project Settings → Service Accounts)

4. **Configure environment variables**
   
   Create `.env.local` in the root directory:
   ```bash
   # Resend API
   RESEND_API_KEY=re_your_key_here
   
   # Firebase Admin SDK
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour_Key_Here\n-----END PRIVATE KEY-----\n
   ```

5. **Update Firebase client config**
   
   Edit `src/firebase.js` with your Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     // ... other config
   };
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

### Firestore Database Structure

```
users/
  {userId}/
    - email: string
    - name: string
    - role: "artist" | "patient" | "hospital"
    - createdAt: timestamp

services/
  {serviceId}/
    - artistId: string
    - serviceName: string
    - description: string
    - createdAt: timestamp

requests/
  {requestId}/
    - userId: string (requester)
    - artistId: string
    - serviceId: string
    - serviceName: string
    - name: string (requester name)
    - email: string
    - type: "hospital" | "individual"
    - requestedDate: string (YYYY-MM-DD)
    - appointmentTime: string (HH:MM)
    - numberOfPatients: number
    - notes: string
    - status: "pending" | "approved" | "completed" | "rejected"
    - createdAt: timestamp
    - updatedAt: timestamp
```

---

## Architecture

### Component Hierarchy

```
App
├── Login/Signup (Authentication)
│
├── Artist Dashboard
│   ├── ArtistServices (CRUD services)
│   ├── CreateNewService (Service creation form)
│   └── ArtistRequests (Request management)
│       └── Request Modal (Approve/reject interface)
│
└── Patient Dashboard
    ├── ServicesList (Browse services)
    ├── PatientAdminRequest (Submit requests)
    └── PatientRequests (Track submitted requests)
```

### Data Flow

1. **Request Submission**:
   - Patient/Hospital submits service request → Firestore `requests` collection
   - Real-time listener updates artist dashboard

2. **Request Approval**:
   - Artist approves request → API call to `/api/send-appointment-email`
   - API fetches request data from Firestore
   - Generates ICS calendar file
   - Sends email via Resend with calendar attachment
   - Updates request status to "approved"

3. **Real-time Synchronization**:
   - Firestore `onSnapshot()` listeners in both dashboards
   - Automatic UI updates when data changes

---

## Development Journey

### Learning Process

I approached this project with ~50% understanding of the technologies involved, learning by doing and documenting along the way. Key milestones:

1. **Authentication Flow**: Implemented Firebase Auth with protected routes
2. **Database Design**: Structured Firestore collections for scalable data relationships
3. **Real-time Updates**: Integrated Firestore listeners for instant UI synchronization
4. **Email System**: Built transactional email system with React Email templates
5. **Calendar Integration**: Implemented ICS file generation for cross-platform compatibility

### Code Annotation Strategy

To ensure full comprehension, I annotated components in this order:
- `Signup.js` → `Login.js` → `ArtistDashboard.js`
- Refactored CSS in `ArtistRequest.js` (created `ArtistRequest.css`)
- `firebase.js` → `ArtistServices.js` → `CreateNewService.js`
- `PatientAdminRequest.js` → `PatientDashboard.js` → `PatientRequests.js`
- `ProtectedRoute.js`

### Dashboard Architecture

- **ArtistDashboard**: Container for `CreateNewService`, `ArtistServices`, `ArtistRequest`
- **PatientDashboard**: Container for `PatientAdminRequest`, `ServicesList`, `PatientRequests`

### Further docs are in Public folder!

## Contact

- **Developer**: Mark Evro  
- **Email**: mackoshkamacka@gmail.com 
- **Organization**: Face Forward Humanitarian Association
- **Website**: [faceforwardcanada.org](https://faceforwardcanada.org)


## Acknowledgments & License
This project is developed for Face Forward Humanitarian Association.
- **Face Forward**: For the opportunity to contribute to their mission
- **Firebase**: For backend infrastructure
- **Resend**: For reliable email delivery
- **Next.js Team**: For the excellent framework
- **React Email**: For beautiful email templates

