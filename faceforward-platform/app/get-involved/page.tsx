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
                        {/* <h1 className = "GIH1">
                            Get 
                        </h1> */}
                        <h1 className="GIH2">
                            Get Involved
                        </h1>
                    </div>
                    <p className = "preamble">
                    If you are a hospital, patient, artist, or volunteer please feel free to make an account with us. If you already have an account with us, log in below! 
                    <br></br> <br></br>Alternatively, if you are looking for an executive position, please follow the link below:

                    </p>
                    <div className = "GIButtons">
                        <button className = "GIB" onClick={clickSignup}>
                            Sign Up 
                        </button>
                        <button className = "GIB" onClick={clickLogin}>
                            Log In
                        </button>
                    </div>
                     
                    <div>
                        <a href = "https://docs.google.com/forms/d/e/1FAIpQLSe7DvRU7DiW87wAMJalSd_jUqPycHeOWJ_JIzabuGMAqo2MIw/viewform">
                    <button className = "GIB2">
                        Executive Recruitment Form
                    </button>
                    </a>
                    </div>
                </div>
            </div>
            
        </div>
    ); 
} 