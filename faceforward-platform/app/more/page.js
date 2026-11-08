import Link from "next/link";

import "./more.css";
import SplashBackdrop from "../components/common/SplashBackdrop";

export const metadata = {
    title: "Our Approach | Face Forward Canada",
    description:
        "How Face Forward events work: free beauty and self-care services, health and sanitization procedures, how we measure impact, and how to partner with us.",
};

const PILLARS = [
    {
        title: "Connection",
        text: "We connect beauty service providers with communities and organizations, free of charge.",
    },
    {
        title: "Impact",
        text: "Artists expand their portfolio and network while giving back to their community as volunteers.",
    },
    {
        title: "Dignity",
        text: "We help people feel more comfortable and confident for the moments that matter.",
    },
    {
        title: "Memories",
        text: "If desired, volunteer photographers help preserve the moment while maintaining confidentiality.",
    },
];

const SERVICES = ["Hair", "Makeup", "Nail art & manicures", "Skincare"];

const SAFETY = [
    "All Face Forward volunteers and artists wear masks and keep long hair tied back.",
    "Each client receives their own labelled kit of disposable supplies for the event, such as single-use nail files, to avoid cross-contamination.",
    "Surfaces are disinfected with 70% ethanol before, during and after every event.",
    "Volunteers never touch clients beyond the scope of their service.",
];

const METRICS = [
    { title: "Client return rate", text: "How often clients come back to future events." },
    { title: "Client feedback", text: "Mood, comfort during the service, and sense of community." },
    { title: "Staff feedback", text: "Ease of facilitation, health and safety, and sense of community." },
    { title: "Volunteer feedback", text: "Support from our team, ease of providing services, and sense of community." },
];

const PARTNER_STEPS = [
    "Permission to host a pilot event with consenting clients, and a small space to hold it.",
    "A primary contact at your organization to plan logistics and identify eligible clients with our team.",
    "Optional: permission to share event photos on our website or social media. This can be waived depending on your organization's protocol.",
    "Training or authorization for anyone involved in the event, if your organization requires it.",
];

export default function OurApproach() {
    return (
        <div className="panelPage approachPage">
            <SplashBackdrop className="panelBackdrop" />

            <div className="panelContent approachContent">
                <header className="glass approachHero">
                    <p className="eyebrow">Our approach</p>
                    <h1 className="panelTitle">How a Face Forward event works</h1>
                    <p className="approachLead">
                        Face Forward Canada is a wellness initiative delivered through beauty and
                        self-care. We bring experienced volunteer artists to organizations that
                        serve vulnerable populations, so the people they support can enjoy a moment
                        of care, completely free of charge.
                    </p>
                </header>

                <section className="approachSection" aria-labelledby="pillars-heading">
                    <h2 id="pillars-heading" className="sectionTitle approachHeading">What we offer</h2>
                    <div className="approachGrid">
                        {PILLARS.map((pillar, i) => (
                            <article key={pillar.title} className="glass approachCard">
                                <span className="approachNumber">{i + 1}</span>
                                <h3 className="approachCardTitle">{pillar.title}</h3>
                                <p>{pillar.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <div className="approachSplit">
                    <section className="glass approachPanel" aria-labelledby="services-heading">
                        <h2 id="services-heading" className="sectionTitle">Services</h2>
                        <ul className="tagList">
                            {SERVICES.map((s) => (
                                <li key={s} className="pill">{s}</li>
                            ))}
                        </ul>
                        <p>
                            Every service is provided by a volunteer with appropriate experience in
                            the field, and is always free of charge. Products can be adapted to
                            individual needs, such as fragrance-free or sensitive-skin options.
                        </p>
                    </section>

                    <section className="glass approachPanel" aria-labelledby="safety-heading">
                        <h2 id="safety-heading" className="sectionTitle">Health &amp; sanitization</h2>
                        <ol className="numberedList">
                            {SAFETY.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ol>
                    </section>
                </div>

                <section className="approachSection" aria-labelledby="metrics-heading">
                    <h2 id="metrics-heading" className="sectionTitle approachHeading">How we measure impact</h2>
                    <div className="approachGrid">
                        {METRICS.map((metric, i) => (
                            <article key={metric.title} className="glass approachCard">
                                <span className="approachNumber">{i + 1}</span>
                                <h3 className="approachCardTitle">{metric.title}</h3>
                                <p>{metric.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="glass approachPanel approachPartner" aria-labelledby="partner-heading">
                    <h2 id="partner-heading" className="sectionTitle">Partner with us</h2>
                    <p>
                        We work closely with each partner to create a plan that fits their space,
                        clients and protocols. Here&rsquo;s what we ask of partner organizations:
                    </p>
                    <ol className="numberedList">
                        {PARTNER_STEPS.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                    <div className="btnRow">
                        <Link className="btn" href="/signup">Create a Partner Account</Link>
                        <a className="btn btn-ghost" href="mailto:info.faceforwardcanada@gmail.com">
                            Email Our Team
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
