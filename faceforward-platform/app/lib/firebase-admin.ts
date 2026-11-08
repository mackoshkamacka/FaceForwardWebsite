import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

/** Initializes Firebase Admin on first use (not at import, so builds don't need secrets). */
function ensureApp() {
    if (getApps().length) return;

    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (!privateKey || !projectId || !clientEmail) {
        throw new Error("Missing Firebase Admin credentials in environment variables");
    }

    initializeApp({
        credential: cert({
            projectId,
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
    });
}

export function getAdminDb() {
    ensureApp();
    return getFirestore();
}

export function getAdminAuth() {
    ensureApp();
    return getAuth();
}
