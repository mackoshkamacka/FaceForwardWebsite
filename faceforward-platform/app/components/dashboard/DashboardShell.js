"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import { auth } from "../../../src/firebase";
import SplashBackdrop from "../common/SplashBackdrop";
import { CurrentUserContext, useCurrentUser } from "../../lib/useCurrentUser";
import { ROLE_OPTIONS, dashboardPathFor } from "../../lib/platform";
import "./Dashboard.css";

/**
 * Page frame for signed-in dashboards: guards access, greets the user, and
 * lays out two columns of widgets. Widgets read the user via useDashboardUser().
 *
 * @param allowedRoles  role ids that may view this dashboard
 * @param intros        { [roleId]: string[] } paragraphs shown in the welcome card
 */
export default function DashboardShell({ allowedRoles, intros, left, right }) {
    const router = useRouter();
    const current = useCurrentUser();
    const { user, profile, loading } = current;
    const allowed = Boolean(profile?.verified && allowedRoles.includes(profile.role));

    useEffect(() => {
        if (loading) return;
        if (!user) router.replace("/login");
        else if (!allowed) router.replace(dashboardPathFor(profile));
    }, [loading, user, profile, allowed, router]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/");
    };

    const roleLabel = ROLE_OPTIONS.find((r) => r.value === profile?.role)?.label;
    const firstName = profile?.name?.split(" ")[0];

    return (
        <div className="panelPage dashPage">
            <SplashBackdrop className="panelBackdrop" />

            <div className="panelContent dashContent">
                {!allowed ? (
                    <div className="spinner" role="status" aria-label="Loading" />
                ) : (
                    <CurrentUserContext.Provider value={current}>
                        <section className="glass dashWelcome">
                            <div className="dashWelcomeHeader">
                                <div>
                                    {roleLabel && <p className="eyebrow">{roleLabel} dashboard</p>}
                                    <h1 className="panelTitle">
                                        Welcome{firstName ? `, ${firstName}` : ""}
                                    </h1>
                                </div>
                                <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                                    Log Out
                                </button>
                            </div>
                            {(intros[profile.role] ?? []).map((paragraph) => (
                                <p key={paragraph} className="dashIntro">{paragraph}</p>
                            ))}
                        </section>

                        <div className="dashGrid">
                            <section className="glass dashColumn">{left}</section>
                            <section className="glass dashColumn">{right}</section>
                        </div>
                    </CurrentUserContext.Provider>
                )}
            </div>
        </div>
    );
}
