import "./styling/Home.css"; 
import ContactUsForm from "./ContactUsForm"; 

export default function Home() {
  return (
    <div className="homeContainer">
        <div className="hero">
            <div className = "heroBottom">
                {/* slash goes here  */}
                <svg className="grainOrb" viewBox="0 0 200 200" aria-hidden="true">
                    <defs>
                    <filter id="grain">
                        <feTurbulence
                        type="fractalNoise"
                        baseFrequency="2"
                        numOctaves="1"
                        seed="2"
                        >
                        <animate
                            attributeName="seed"
                            from="2"
                            to="200"
                            dur="8s"
                            repeatCount="indefinite"
                        />
                        </feTurbulence>
                        <feColorMatrix type="saturate" values="0" />
                    </filter>

                    <clipPath id="orbClip">
                        <circle cx="100" cy="100" r="98" />
                    </clipPath>

                    <radialGradient id="orbShade" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                        <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                    </defs>

                    <g clipPath="url(#orbClip)">
                    <rect width="200" height="200" filter="url(#grain)" />
                    <circle cx="100" cy="100" r="98" fill="url(#orbShade)" />
                    </g>
                </svg>
            </div>
            <div className = "heroTop">
                <div className = "title">
                    <h1 className="title1">FACE</h1> 
                    <h1 className="title2">FORWARD</h1>
                    <h2 className="subtitle">Humanitarian Association </h2>
                </div>
                <div className="heroDesc">                    
                    <h3 className = "missionStatement">Mission Statement: </h3>
                    <p className = "missionStatementP">"Face Forward is an Ontario-based organization
                        that strives to bring comfort and dignity to hospitalized individuals through 
                        complementary beauty services. We connect cosmetic and facepaint artists with 
                        hospitals to host makeover events for adults and children at no charge to patients"</p>
                </div>
            </div>
            
        </div>
        <div className="impact">
            <p>0 Hospitals Associated, 0 Patients Helped, 0 Artists Participating.</p>    
        </div>
        <div className="testimonials">
            {/* card carosel component  */}
        </div>
        <div className="updates">
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
                {/* card carosel component  */}
                <p>updates coming soon!!</p>
            </div>
        </div>
        <ContactUsForm />       
    </div>
  );
}