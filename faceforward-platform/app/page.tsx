import HomeComponent from "./components/noLogin/Home";
import AboutSection from "./components/noLogin/About"; 

export default function Home() {
    return (
        <main className="p-4">
            {/* Main content */}
            <div className="mt-6">
                <HomeComponent />
                <AboutSection />
            </div>
        </main>
    );
}
