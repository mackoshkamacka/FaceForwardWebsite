import Link from "next/link";
import "./navbar.css"; 

export default function NavBar() {
    return (
        <nav className="navBar flex gap-4 ">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/more">More</Link>
            {/* <Link href="/login">Login</Link> = temp removal */} 
        </nav>
    );
}
