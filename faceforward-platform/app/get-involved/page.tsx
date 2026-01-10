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
                    If you are a hospital, patient, artist, or volunteer please feel free to make an account with us. For all other inquiries, please reach out to us via email to connect with us more directly. If you already have an account with us, log in below!
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