import "./styling/Home.css"; 

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