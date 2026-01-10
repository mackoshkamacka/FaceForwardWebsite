"use client"

import "./about.css"; 
import ContactUsForm from "../components/home/ContactUsForm"; 

import { useRouter } from "next/navigation"; 

export default function AboutPage() {
    const router = useRouter(); 

    const clickGetInvolved = () => {
        router.push("/get-involved"); 
    };

    return ( 
        <div className = "aboutPage">
            
            {/* hero section */}
            <div className="heroSection">
                <div className="heroText">
                    <h1 className = "nHeader">OUR MISSION</h1>
                    <p>Face Forward Canada brings free beauty and face-painting services to hospitalized inpatients—especially those experiencing mobility challenges, chronic or acute pain, or the stress and isolation that often come with a hospital stay.</p> 
                    <br /> <strong>Our goal is simple: to bring beauty, dignity, and joy to every face.</strong> 
                </div>

                <div className = "heroImageContainer">
                    {/* hero image  */}
                    <img className = "heroImage" src = "../about-1.png" />
                </div>
            </div>


            <div className = "mergeSection">
                {/* what we do section */}
                <div className = "whatWeDoSection">
                    <img className = "whatWeImage" src = "../about-2.jpg" /> 
                    <div className = "whatWeText"> 
                        <h1 className = "nnHeader">WHAT WE DO</h1>
                        <p>We connect professional makeup artists, face painters, and volunteer photographers with hospitals across Toronto to create uplifting, artistic experiences for patients. <br /> <br/ >
                        <strong> Every event is designed to support well-being, boost self-esteem, and create meaningful human connection.</strong></p>
                        <h1 className = "nnHeader2">WHY IT MATTERS</h1>
                        <p className = "why">A moment of care can shift an entire hospital stay. <br /> <br />
                        By bringing visual arts, conversation, and community into clinical spaces, we create moments that matter—for patients, artists, and student volunteers alike.</p>
                    </div> 
                </div>

                {/* volunteer section */}
                <div className = "volunteerSection">
                    <img className = "whatWeImage" src = "../about-3.jpg" /> 
                    <div className = "whatWeText">
                    <div className = "nnHeader">VOLUNTEER WITH US</div>
                    <p>From medicine to social work to fine arts—Face Forward welcomes all.
                    Volunteer as an event assistant, photographer, or liaison and contribute to the well-being of patients through creativity and connection.</p>


                    <h2 className = "nnHeader peer">PEER AMBASADORS</h2>
                    <p>Volunteers who spread the word across disciplines—bringing more voices, talents, and passions into the initiative.</p>
                    <div className = "button-container">
                        <button className = "volButton" 
                        onClick={clickGetInvolved}>Volunteer</button>
                    </div>
                    </div>
                </div>
            </div>
            

            {/* annual statement section  */}
            <div className = "annualStatementSection">
                {/* hidden for now */}
            </div>


            <div className = "annualStatementSection">
                {/* hidden for now */}
            </div>


            {/* <div className = "whoWeAreSection">
                <h2 className = "nnHeader">WHO WE ARE</h2>
                <div className = "execGalleryContainer">
                    <p>Face forward team goes here = cards.</p>
                </div>
            </div> */}

            {/* sponsor section */}
            {/* <div className = "sponsorSection">
                <div className = "sponsorHeader">
                    <h2 className = "nnHeader">
                        OUR SPONSORS
                    </h2>
                </div>
                <div className = "sponsorCarosel">
                    <p>... Carosel of cards of the sponsors/funging parties ... </p>
                    ... 
                </div>
            </div> */}

            {/* roadmap section */}
            {/* <div className = "roadmapSection">
                <div className = "roadmapHeader">
                    <h2 className = "nnHeader">
                        MOVING FORWARD 
                    </h2>
                    <p>
                        ... Roadmap; Portfolio; Campaign Phases I, II ...
                    </p>
                </div>
                <div className = "roadMapImageContainer">
                    ...
                </div>
            </div> */}
            <div className = "uh"></div>
            <div className = "dummy2"></div>
            <ContactUsForm />
      </div>
    );
  }
  