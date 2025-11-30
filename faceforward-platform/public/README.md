### Introduction/Overview

### Background 
This is my first dynamic website ... I started with static, raw HTML/CSS websites (first resume), then made a few websites with Wix (for non-profits, friends and family), then I created a webiste using React components (my digital portfolio). This website is the natural progression of my web dev journey. I applied my experience and grew by learning the following ... 

** I ownership under "mevro" for commits was under my university email. 

### Process/updates 
I may have been too ambitious with this project as I started copying code from random places - not really understanding how they work. Before this commit I understood ~50% of what was going on. So here I am going to document the challenges I face, how I solve them; as the overall structure of this project (mostly for my understanding...); and (over)annotate the code (as I am not sure if it is truely self documenting). 

#### Annotation Order
- If there is similar/duplicate boilerplate code, I will not reannotate it. To ensure that all code is understood, I annotated `Signup.js` > `Login.js` > (checked `ArtistDashboard.js`) > Refactored the css styling in `ArtistRequest.js` (creating `ArtistRequest.css`) before annotating it > Then annotated `firebase.js` > `ArtistServices.js` > (checked `CreateNewService.js`) > (checked `PatientAdminRequest.js`) > (checked `PatientDashboard.js`) > (checked `PatientRequests.js`) > (checked `ProtectedRoute.js`)

- `ArtistDashboard.js` is just a nestted component for `CreateNewService`, `ArtistsService`, and `ArtistRequest` components. Similarly, `PatientDashBoard.js` is just a nested component for (`PatientAdminRequest`,) `ServicesList`, and `PatientRequests` components.   
- `CreateNewService.js`, `PatientAdminRequest.js`, `PatientRequests.js`, `ProtectedRoute.js`, `ServiceList.js`,  were already annotated well/understood. 

After these anntoations, some files may have changed/been refactored/abstracted (particularly so patients and hopsitals have similar request cycles). 

#### ToDos
- Send a GCalendar/Microsoft Calendar invite to the `email` of the user. 
- Patient/hospital is sent a satisfaction form (stars + testimonial (optional))
- Artist can mark request as complete manually, or is marked complete after the appointment day is over, or is marked as complete if a testimonial for that request has been completed 
- Add service rating to testimonials section OF SERVICE. Make a star visual for ratings  


#### How React Renders My Website: 
![React Rendering Visual](faceforward-platform/public/ReactRenderingVisualV3.png)

