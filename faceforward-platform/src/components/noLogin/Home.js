import "./styling/Home.css"; 

export default function Home() {
  return (
    <div className="homeContainer">
        <div className="hero">
            <div className = "heroBottom">
                {/* slash goes here  */}
            </div>
            <div className = "heroTop">
                <div className = "title">
                    <h1 className="title1">FACE</h1> 
                    <h1 className="title2">FORWARD</h1>
                    <h2 className="subtitle">Humanitarian Association </h2>
                </div>
                <div className="heroDesc">                    
                    <h3 className = "missionStatement">Mission Statement: </h3>
                    <p className = "missionStatementP">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. "</p>
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