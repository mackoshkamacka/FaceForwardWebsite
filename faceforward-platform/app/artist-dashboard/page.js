import "./ArtistDashboard.css"; 
import GrainVisual from "../components/home/GrainVisual"

import CreateNewService from "../components/artist/CreateNewService";
import ArtistsServices from "../components/artist/ArtistsServices";
import ArtistRequest from "../components/artist/ArtistRequest";

export default function ArtistDashboard() {
    return (
        <div className="artistDash">
            <div className = "dashBottom">
                <GrainVisual /> 
            </div>
            <div className = "dashTop">
                <div className = "welcome">
                    <h1 className = "nHeader">Welcome _name_</h1>
                    <div className = "howTo"> 
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                
                <div className = "services">
                    <div className = "leftServices">
                        <CreateNewService />
                        <ArtistsServices />
                    </div>
                    <div className="rightServices">
                        <ArtistRequest />
                    </div>
                </div>
                
                
            </div>
            

            
        </div>
    );
}