import Image from "next/image";

import "./footer.css";
import WaterBar from "./waterBar";

export default function Footer() {
    return (
        <footer className="footer">
            <WaterBar />

            <h2 className="sponsorHeader">Supported By &amp; In Collaboration With</h2>
            <div className="sponsors">
                <img
                    className="sponsor"
                    src="https://www.ontario.ca/themes/ontario_2021/assets/ontario@2x-print.png"
                    alt="Government of Ontario"
                />
                <img
                    className="sponsor"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTluLETzYoTaS5aBauzorP1bmqqxv4hp5IeQQ&s"
                    alt="Sponsor logo"
                />
            </div>

            <p className="copy">© 2026 by FFC. All Rights Reserved</p>

            <div className="legalInfo waterFlow">
                <p className="legal">
                    Face Forward Humanitarian Association is a registered charitable organization
                    in Canada, under the Registration number: <strong>1744416-8</strong>
                </p>
                <div className="socials">
                    <a
                        href="https://instagram.com/faceforwardcanada"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image src="/Instagram_logo_2022.svg.webp" alt="Instagram" width={30} height={30} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/LinkedIn_logo_initials.png" alt="LinkedIn" width={30} height={30} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
