import "./about.css"; 
import ContactUsForm from "../components/home/ContactUsForm"; 

export default function AboutPage() {
    return ( 
        <div className = "aboutPage">
            
            {/* hero section */}
            <div className="heroSection">
                <div className="heroText">
                    <h1 className = "nHeader">OUR MISSION</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

                <div className = "heroImageContainer">
                    {/* hero image  */}
                    <p>image goes here!</p>
                </div>
            </div>

            {/* volunteer section */}
            <div className = "volunteerSection">
                <div className = "nnHeader">VOLUNTEER WITH US</div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className = "button-container">
                    <button className = "volButton">...action...</button>
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
            <ContactUsForm />
      </div>
    );
  }
  