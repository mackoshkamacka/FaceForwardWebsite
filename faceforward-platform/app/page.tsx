import Link from "next/link";
import HomeComponent from "./components/noLogin/Home";

export default function Home() {
    return (
        <main className="p-4">
            {/* Navbar */}
            <nav className="navBar flex gap-4">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/signup">Signup</Link>
                <Link href="/login">Login</Link>
            </nav>
            {/* Main content */}
            <div className="mt-6">
                <HomeComponent />
            </div>
        </main>
    );
}
