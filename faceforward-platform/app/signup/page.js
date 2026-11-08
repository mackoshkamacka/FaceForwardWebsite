"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../src/firebase";
import AuthPanel from "../components/auth/AuthPanel";
import { ROLE_OPTIONS, ROLES, authErrorMessage } from "../lib/platform";

export default function Signup() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: ROLES.ORGANIZATION,
    });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

            await setDoc(doc(db, "users", user.uid), {
                email: form.email,
                name: form.name,
                role: form.role,
                verified: false,
                createdAt: new Date(),
            });

            // Best effort: a failed welcome email shouldn't block signup.
            fetch("/api/welcome-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, email: form.email }),
            }).catch((err) => console.error("Welcome email failed:", err));

            router.push("/awaiting-verification");
        } catch (err) {
            console.error("Signup failed:", err);
            setError(authErrorMessage(err));
            setSubmitting(false);
        }
    };

    return (
        <AuthPanel
            eyebrow="Face Forward Canada"
            title="Join Face Forward"
            intro="We connect volunteer artists with organizations that serve vulnerable populations to bring free beauty and self-care services to every face."
            footer={
                <>
                    Already have an account? <Link href="/login">Log in</Link>
                </>
            }
        >
            <form className="stack" onSubmit={handleSignup}>
                <div className="field">
                    <label htmlFor="signup-name">Name or organization</label>
                    <input
                        id="signup-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={update("name")}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="signup-email">Email</label>
                    <input
                        id="signup-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={update("email")}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="signup-password">Password</label>
                    <input
                        id="signup-password"
                        type="password"
                        autoComplete="new-password"
                        minLength={6}
                        value={form.password}
                        onChange={update("password")}
                        required
                    />
                    <span className="fieldHint">At least 6 characters.</span>
                </div>

                <fieldset className="roleOptions">
                    <legend className="fieldLabel">I am signing up as a…</legend>
                    {ROLE_OPTIONS.map((option) => (
                        <label key={option.value} className="roleOption glassInset">
                            <input
                                type="radio"
                                name="role"
                                value={option.value}
                                checked={form.role === option.value}
                                onChange={update("role")}
                            />
                            <span>
                                <strong>{option.label}</strong>
                                <span className="fieldHint">{option.hint}</span>
                            </span>
                        </label>
                    ))}
                </fieldset>

                {error && <p className="notice notice-error" role="alert">{error}</p>}

                <button type="submit" className="btn btn-block" disabled={submitting}>
                    {submitting ? "Creating account…" : "Create Account"}
                </button>
            </form>
        </AuthPanel>
    );
}
