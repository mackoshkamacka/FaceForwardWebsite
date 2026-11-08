import SplashBackdrop from "../common/SplashBackdrop";
import "./AuthPanel.css";

/** Splash-backed page with a centred glass card, used by login/signup/verification. */
export default function AuthPanel({ eyebrow, title, intro, children, footer }) {
    return (
        <div className="panelPage panelCenter authPage">
            <SplashBackdrop className="panelBackdrop" />
            <section className="panelContent glass authCard">
                {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                <h1 className="panelTitle">{title}</h1>
                {intro && <p className="authIntro muted">{intro}</p>}
                {children}
                {footer && <div className="authFooter">{footer}</div>}
            </section>
        </div>
    );
}
