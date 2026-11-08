import "./Home.css";
import HeroSplash from "../components/home/HeroSplash";

export default function HomePage() {
    return (
        <div className="homeContainer">
            <section className="hero">
                <HeroSplash />

                <div className="heroTop">
                    <div className="title">
                        <h1 className="title1">FACE</h1>
                        <h1 className="title2">FORWARD</h1>
                        <h2 className="subtitle">Humanitarian Association</h2>
                    </div>

                    <div className="heroDesc">
                        <h3 className="missionStatement">Mission Statement:</h3>
                        <p className="missionStatementP">
                            &ldquo;Face Forward Canada is a not-for-profit wellness initiative that
                            brings free beauty and self-care services to underserved and
                            marginalized communities. We connect volunteer hair, makeup, nail, and
                            skincare artists with organizations that serve vulnerable populations,
                            helping people feel comfortable, confident, and like themselves.&rdquo;
                        </p>
                        <p className="missionStatementP2">
                            Proudly a Canadian Government Registered Foundation and 501(c)(3) in
                            the United States of America.
                        </p>
                    </div>
                </div>
            </section>

            <section className="infoContainer">
                <div className="info">
                    <h2 className="infoHeading">WHAT FACE FORWARD ADDRESSES:</h2>
                    <p>
                        <strong>
                            People in underserved communities often have limited access to the
                            small pleasures of everyday life
                        </strong>
                        —the freedom to express themselves, to feel confident in their
                        appearance, to prepare for a meaningful occasion, or to enjoy activities
                        they once loved.
                    </p>
                    <p>
                        Few organizations provide accessible beauty and self-care services to
                        people who may not otherwise have them, leaving many communities without
                        consistent opportunities for these experiences. Yet small moments of care
                        and self-expression can make a real difference in how a person feels.
                    </p>
                </div>

                <div className="info">
                    <h2 className="infoHeading">HOW WE TACKLE IT:</h2>
                    <p>
                        <em>
                            We partner with shelters, community organizations, and care settings
                            that serve vulnerable populations to host free events where experienced
                            volunteer artists offer hair, makeup, nail, and skincare
                            services—bringing beauty, dignity, and joy to every face.
                        </em>
                    </p>
                </div>
            </section>
        </div>
    );
}
