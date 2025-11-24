import "./PatHopDashboard.css"; 
import GrainVisual from "../components/home/GrainVisual"; 

import HospitalServicesList from "../components/patient-and-hospital/SerivesRequest";
import PatientRequests from "../components/patient-and-hospital/ClientRequests";

export default function HospitalDashboard() {
    return (
        <div className="patHopDash">
            <div className="dashBottom2">
                <GrainVisual />
            </div>
            <div className="dashTop2">
                <div className="welcome">
                    <h1 className="nHeader">Welcome _name_</h1>
                    <div className="howTo">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>

                <div className="services">
                    <div className="leftServices">
                        <HospitalServicesList />
                    </div>
                    <div className="rightServices">
                        <PatientRequests />
                    </div>
                </div>


            </div>



        </div>
    );
}