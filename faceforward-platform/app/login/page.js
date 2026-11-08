"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../src/firebase";
import AuthPanel from "../components/auth/AuthPanel";
import { authErrorMessage, dashboardPathFor } from "../lib/platform";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            const profile = await getDoc(doc(db, "users", user.uid));
            if (!profile.exists()) {
                throw new Error("Missing user profile");
            }
            router.push(dashboardPathFor(profile.data()));
        } catch (err) {
            console.error("Login failed:", err);
            setError(authErrorMessage(err));
            setSubmitting(false);
        }
    };

    return (
        <AuthPanel
            eyebrow="Face Forward Canada"
            title="Welcome back"
            intro="Log in to manage your services, requests and upcoming events."
            footer={
                <>
                    New to Face Forward? <Link href="/signup">Create an account</Link>
                </>
            }
        >
            <form className="stack" onSubmit={handleLogin}>
                <div className="field">
                    <label htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="notice notice-error" role="alert">{error}</p>}

                <button type="submit" className="btn btn-block" disabled={submitting}>
                    {submitting ? "Logging in…" : "Log In"}
                </button>
            </form>
        </AuthPanel>
    );
}
