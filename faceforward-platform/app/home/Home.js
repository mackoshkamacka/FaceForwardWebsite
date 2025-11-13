import "./Home.css";
import ContactUsForm from "../components/home/ContactUsForm";
import GrainVisual from "../components/home/GrainVisual";  

export default function HomePage() {
    return (
        <div className="homeContainer">
            <div className="hero">
                <div className="heroBottom">
                    {/* slash goes here  */}
                    <GrainVisual /> 
                </div>
                <div className="heroTop">
                    <div className="title">
                        <h1 className="title1">FACE</h1>
                        <h1 className="title2">FORWARD</h1>
                        <h2 className="subtitle"> Humanitarian Association</h2>
                    </div>
                    <div className="heroDesc">
                        <h3 className="missionStatement">Mission Statement: </h3>
                        <p className="missionStatementP">"Face Forward is an Ontario-based organization
                            that strives to bring comfort and dignity to hospitalized individuals through
                            complementary beauty services. We connect cosmetic and facepaint artists with
                            hospitals to host makeover events for adults and children at no charge to patients"</p>

                        <p className="missionStatementP2">Proudly a Canadian Government Registered Foundation 
                            and 501(c)(3) in the United States of America. 
                        </p>
                    </div>
                </div>

            </div>
            <div className="impact">
                <p>0 Hospitals Associated, 0 Patients Helped, 0 Artists Participating.</p>
            </div>
            <div className="testimonials">
                {/* card carosel component  */}
            </div>
            {/* <div className="updates">
                <div className="updateCarosel">
                    <div className="caroselTrack">
                        <span>  UPDATES  </span>
                        <span>  UPDATES  </span>
                        <span>  UPDATES  </span>
                        <span>  UPDATES  </span>
                        <span>  UPDATES  </span>
                    </div>
                </div>
                <div className="updateCardCarosel">
                    <p>updates coming soon!!</p>
                </div>
            </div> */}
            <ContactUsForm />
        </div>
    );
}