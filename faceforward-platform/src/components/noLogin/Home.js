import "./styling/Home.css"; 

export default function Home() {
  return (
    <div className="homeContainer">
        <div className="hero">
            <div className = "heroLeft">
                {/* slash goes here  */}
            </div>
            <div className = "heroRight">
                <h1 className="title">FACE FORWARD</h1> 
                <div className="heroRightText">                    
                    <h3 className = "missionStatement">...Mission Statement...</h3>
                    <p>...Supporting Tagline...</p>
                </div>
            </div>
        </div>
        <div className="impact">
            <p>...stats...hospitals associated (if too large make it # of), # of patients helped, # of artists etc.</p>    
        </div>
        <div className="testimonials">
            {/* card carosel component  */}
        </div>
        <div className="updates">
            {/* card carosel component  */}
        </div>      
    </div>
  );
}