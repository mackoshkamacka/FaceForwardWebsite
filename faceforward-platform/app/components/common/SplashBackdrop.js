import GrainVisual from "../home/GrainVisual";
import "./SplashBackdrop.css";

/**
 * The Face Forward "splash": rotating blue-violet gradient, drifting pastel
 * blobs (pitch-deck palette), a periodic light sheen, and film grain.
 * Purely decorative. Size and shape it with `className`; anything passed as
 * children renders above the blobs and below the grain.
 *
 * @param {{ className?: string, children?: import("react").ReactNode }} props
 */
export default function SplashBackdrop({ className = "", children }) {
    return (
        <div className={`splash ${className}`} aria-hidden="true">
            <div className="splashBlobs">
                <span />
                <span />
                <span />
                <span />
            </div>
            {children}
            <GrainVisual />
        </div>
    );
}
