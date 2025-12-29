import Link from "next/link";

import "./navbar.css"; 
import WaterBar from "./waterBar"; 

export default function NavBar() {
    return (
        <div>
            <nav className="navBar flex gap-4 ">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/more">More</Link>
                {/* <Link href="/get-involved">Get Involved</Link>  */}
            </nav>
            <WaterBar />
        </div>
    );
}
