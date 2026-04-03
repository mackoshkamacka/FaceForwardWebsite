import Link from "next/link";

import "./navbar.css"; 
import WaterBar from "./waterBar"; 

export default function NavBar() {
    return (
        <div className = "navBack">
            <nav className="navBar flex gap-4 ">
                <Link className = "navText" href="/">HOME</Link>
                <Link className = "navText" href="/about">ABOUT</Link>
                {/* <Link className = "navText" href="/more">MORE</Link> */}
                <Link className = "navText" href="/get-involved">GET INVOLVED</Link> 
            </nav>
            <WaterBar />
        </div>
    );
}
