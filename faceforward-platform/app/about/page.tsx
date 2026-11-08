import Link from "next/link";

import "./about.css";
import ContactUsForm from "../components/home/ContactUsForm";
import WaterBar from "../components/common/waterBar";

const EXEC_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSe7DvRU7DiW87wAMJalSd_jUqPycHeOWJ_JIzabuGMAqo2MIw/viewform";

export default function AboutPage() {
    return (
        <div className="aboutPage">
            {/* mission */}
            <section className="heroSection">
                <div className="heroText">
                    <h1 className="nHeader">OUR MISSION</h1>
                    <p>
                        Face Forward Canada brings free beauty and self-care services—hair, makeup,
                        nails, and skincare—to people in underserved and marginalized communities,
                        bringing back a piece of normalcy for those who might otherwise go without.
                    </p>
                    <p>
                        <strong>Our goal is simple: to bring beauty, dignity, and joy to every face.</strong>
                    </p>
                </div>

                <div className="heroImageContainer">
                    <img className="heroImage" src="/about-1.webp" alt="" />
                </div>
            </section>

            <div className="mergeSection">
                {/* what we do + why it matters */}
                <section className="whatWeDoSection">
                    <img className="whatWeImage" src="/about-2.webp" alt="" />
                    <div className="whatWeText">
                        <h2 className="nnHeader">WHAT WE DO</h2>
                        <p>
                            We connect experienced volunteer artists with shelters, community
                            organizations, and care settings that serve vulnerable
                            populations—completely free of charge. Artists grow their portfolios
                            and networks while giving back, and, when requested, volunteer
                            photographers help preserve the memories while maintaining
                            confidentiality.
                        </p>
                        <p>
                            <strong>
                                Every event follows strict health and sanitization procedures, with a
                                personal single-use kit for each client and products adapted to
                                individual needs, such as fragrance-free or sensitive-skin options.
                            </strong>
                        </p>

                        <h2 className="nnHeader2">WHY IT MATTERS</h2>
                        <p className="why">
                            Research suggests that appearance-related supportive care can improve
                            well-being. In one randomized study, a single beauty-care session
                            reduced depressive symptoms and was associated with higher quality of
                            life and self-esteem.
                            <sup><a href="https://pubmed.ncbi.nlm.nih.gov/30511433/" target="_blank" rel="noopener noreferrer">1</a></sup>{" "}
                            In another controlled study, aesthetic skincare support reduced
                            emotional burden by about 72% over 28 days.
                            <sup><a href="https://pubmed.ncbi.nlm.nih.gov/30788654/" target="_blank" rel="noopener noreferrer">2</a></sup>
                        </p>
                        <p className="why">
                            A moment of care can help someone feel comfortable, confident, and like
                            themselves again.
                        </p>
                    </div>
                </section>

                {/* volunteer */}
                <section className="volunteerSection">
                    <img className="whatWeImage" src="/about-3.webp" alt="" />
                    <div className="whatWeText">
                        <h2 className="nnHeader">VOLUNTEER WITH US</h2>
                        <p>
                            From medicine to social work to fine arts—Face Forward welcomes all.
                            Volunteer as an artist, event assistant, photographer, or liaison and
                            contribute to the well-being of the people we serve through creativity
                            and connection.
                        </p>

                        <h2 className="nnHeader peer">PEER AMBASSADORS</h2>
                        <p>
                            Volunteers who spread the word across disciplines—bringing more voices,
                            talents, and passions into the initiative.
                        </p>

                        <div className="button-container">
                            <Link className="btn execButton" href="/get-involved">
                                Volunteer
                            </Link>
                            <a className="btn execButton" href={EXEC_FORM_URL}>
                                Executive Recruitment Form
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <div className="aboutSpacer" />
            <WaterBar />
            <ContactUsForm />
        </div>
    );
}
