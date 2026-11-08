import SplashBackdrop from "../common/SplashBackdrop";
import "./styling/HeroSplash.css";

/**
 * Home hero background: a droplet falls, the splash bursts open from the
 * impact point, and ripples keep pulsing outward from it.
 */
export default function HeroSplash() {
    return (
        <>
            <span className="splashDrop" aria-hidden="true" />
            <SplashBackdrop className="heroBottom">
                <div className="splashRipples">
                    <span />
                    <span />
                    <span />
                </div>
            </SplashBackdrop>
        </>
    );
}
