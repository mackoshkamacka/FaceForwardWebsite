import Link from "next/link";

import AuthPanel from "../components/auth/AuthPanel";

export default function AwaitingVerification() {
    return (
        <AuthPanel
            eyebrow="Almost there"
            title="Your account is being reviewed"
            intro="Thank you for joining Face Forward Canada! To keep our partner organizations, clients and volunteers safe, our team reviews every new account before it can access the platform."
            footer={<Link href="/">Back to the home page</Link>}
        >
            <div className="stack">
                <p className="notice">
                    Reviews usually take up to 24 hours. You&rsquo;ll receive an email as soon as
                    your account is approved.
                </p>
                <p className="fieldHint">
                    Questions in the meantime? Reach us at{" "}
                    <a href="mailto:info.faceforwardcanada@gmail.com">
                        info.faceforwardcanada@gmail.com
                    </a>
                    .
                </p>
            </div>
        </AuthPanel>
    );
}
