import Link from "next/link";

import "./get-involved.css";
import SplashBackdrop from "../components/common/SplashBackdrop";

const EXEC_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSe7DvRU7DiW87wAMJalSd_jUqPycHeOWJ_JIzabuGMAqo2MIw/viewform";

const PATHS = [
    {
        title: "Partner organizations",
        text: "Shelters, community organizations and care settings can request free events for the people they serve.",
    },
    {
        title: "Volunteer artists",
        text: "Hair, makeup, nail and skincare artists can grow their portfolio while giving back.",
    },
    {
        title: "Volunteers",
        text: "Event assistants, photographers and liaisons help every event run smoothly.",
    },
];

export default function GetInvolved() {
    return (
        <div className="panelPage panelCenter">
            <SplashBackdrop className="panelBackdrop" />

            <section className="panelContent glass giCard">
                <h1 className="giTitle">Get Involved</h1>

                <div className="giPaths">
                    {PATHS.map((path) => (
                        <div key={path.title} className="glassInset giPath">
                            <h2 className="giPathTitle">{path.title}</h2>
                            <p>{path.text}</p>
                        </div>
                    ))}
                </div>

                <p className="giLead">
                    Create an account to get started, or log in if you already have one.
                </p>
                <div className="giButtons">
                    <Link className="btn" href="/signup">Sign Up</Link>
                    <Link className="btn btn-ghost" href="/login">Log In</Link>
                </div>

                <p className="giLead">Interested in joining our executive team?</p>
                <a className="btn btn-ghost btn-block" href={EXEC_FORM_URL}>
                    Executive Recruitment Form
                </a>
            </section>
        </div>
    );
}
