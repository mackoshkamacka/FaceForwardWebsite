"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../src/firebase";

/**
 * Signed-in Firebase user plus their `users/{uid}` profile document.
 * Waits for Firebase to restore the session, so it's safe on a hard refresh
 * (unlike reading `auth.currentUser` during the first render).
 */
export function useCurrentUser() {
    const [state, setState] = useState({ user: null, profile: null, loading: true });

    useEffect(
        () =>
            onAuthStateChanged(auth, async (user) => {
                if (!user) {
                    setState({ user: null, profile: null, loading: false });
                    return;
                }
                try {
                    const snap = await getDoc(doc(db, "users", user.uid));
                    setState({ user, profile: snap.exists() ? snap.data() : null, loading: false });
                } catch (error) {
                    console.error("Failed to load user profile:", error);
                    setState({ user, profile: null, loading: false });
                }
            }),
        []
    );

    return state;
}

/** Provided by DashboardShell so dashboard widgets share one auth lookup. */
export const CurrentUserContext = createContext({ user: null, profile: null, loading: true });

export function useDashboardUser() {
    return useContext(CurrentUserContext);
}
