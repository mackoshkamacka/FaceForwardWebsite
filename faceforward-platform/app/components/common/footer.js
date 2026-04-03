import "./footer.css"; 
import Image from 'next/image';
import WaterBar from "./waterBar"; 

export default function Footer() {
    return (
        <div className = "footer">
            <WaterBar />
            <h2 className = "sponsorHeader">
                    Supported By & In Collaboration With
                </h2>
            <div className = "sponsors">
                    <img className = "sponsor" src="https://www.ontario.ca/themes/ontario_2021/assets/ontario@2x-print.png"/>
                    <img className = "sponsor" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTluLETzYoTaS5aBauzorP1bmqqxv4hp5IeQQ&s" />
                    <img className = "sponsor" src = "https://sunnybrook.vertoengage.com/engage/assets/generic-open-clinic/src/assets/logos/sunnybrook.png" />
            </div>
            <p className = "copy">© 2026 by FFC. All Rights Reserved</p>


            <div className = "legalInfo">
                <p className = "legal">
                    Face Forward Humanitarian Association is a registered charitable organization in Canada, under the Registration number:  
                    <strong className = "regNum">
                        &nbsp; 1744416-8
                    </strong>
                </p>
                <div className = "socials">
                    <a href="https://instagram.com/faceforwardcanada" target="_blank">
                        <Image 
                            src="/Instagram_logo_2022.svg.webp" 
                            alt="Instagram" 
                            className="instagram"
                            width={30}
                            height={30}
                        />
                    </a>
                    <a href="https://linkedin.com" target="_blank">
                        <Image 
                            src="/LinkedIn_logo_initials.png" 
                            alt="LinkedIn" 
                            className="linkedIn"
                            width={30}
                            height={30}
                        />
                    </a>
                    
                </div>
            </div>

            
        </div>

    );
}
