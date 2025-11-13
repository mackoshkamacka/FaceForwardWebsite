"use client"; 

import "./get-involved.css"; 
import GrainVisual from "../components/home/GrainVisual"; 
import { useRouter } from "next/navigation"; 

export default function GetInvolved() {
    const router = useRouter(); 

    const clickSignup = () => {
        router.push("/signup"); 
    }; 
    
    const clickLogin = () => {
        router.push("/login"); 
    };
    
    return (
        <div className = "GIContainer">  
            <div className = "GIBottom">
                <GrainVisual />
            </div> 
            <div className = "GITop">
                <div className = "centralCard"> 
                    <div className="GIheader">
                        <h1 className = "GIH1">
                            Get 
                        </h1>
                        <h1 className="GIH2">
                            Involved
                        </h1>
                    </div>
                    <p className = "preamble">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    </p>
                    <div className = "GIButtons">
                        <button className = "GIB" onClick={clickSignup}>
                            Sign Up 
                        </button>
                        <button className = "GIB" onClick={clickLogin}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    ); 
} 