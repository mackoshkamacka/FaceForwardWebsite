import "./footer.css"; 
import Image from 'next/image';

export default function Footer() {
    return (
        <div className = "footer">
            <div className = "dummy">

            </div>
            <h2 className = "sponsorHeader">
                    Supported By
                </h2>
            <div className = "sponsors">
                    <img className = "sponsor" src="https://www.ontario.ca/themes/ontario_2021/assets/ontario@2x-print.png"/>
                    <img className = "sponsor" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Canada_wordmark.svg/2560px-Canada_wordmark.svg.png" />
            </div>
            <p className = "copy">© 2025 by FFC. All Rights Reserved</p>


            <div className = "legalInfo">
                <p className = "legal">
                    Face Forward Humanitarian Association is a registered charitable organization in Canada, under the Registration number:  
                    <strong className = "regNum">
                        &nbsp; 1744416-8
                    </strong>
                </p>
                <div className = "socials">
                    <a href="https://instagram.com/yourusername" target="_blank">
                        <Image 
                            src="/Instagram_logo_2022.svg.webp" 
                            alt="Instagram" 
                            className="instagram"
                            width={30}
                            height={30}
                        />
                    </a>
                    <a href="https://instagram.com/yourusername" target="_blank">
                        <Image 
                            src="/LinkedIn_logo_initials.png" 
                            alt="Instagram" 
                            className="instagram"
                            width={30}
                            height={30}
                        />
                    </a>
                    
                </div>
            </div>

            
        </div>

    );
}
