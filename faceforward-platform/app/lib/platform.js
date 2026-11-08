/** Shared constants and helpers for the account/dashboard side of the site. */

/** Services volunteers can offer (matches the community partners pitch deck). */
export const SERVICE_TYPES = [
    { value: "makeup", label: "Makeup" },
    { value: "hair-styling", label: "Hair Styling" },
    { value: "manicure", label: "Nail Art & Manicure" },
    { value: "skincare", label: "Skincare" },
    { value: "face-painting", label: "Face Painting" },
];

export function serviceLabel(value) {
    return SERVICE_TYPES.find((t) => t.value === value)?.label ?? value;
}

/**
 * Account roles. The stored ids ("patient", "hospital") predate the move to
 * serving community organizations broadly; they are kept so existing accounts
 * and data keep working. Only the labels are shown to people.
 */
export const ROLES = {
    CLIENT: "patient",
    ARTIST: "artist",
    ORGANIZATION: "hospital",
};

export const ROLE_OPTIONS = [
    {
        value: ROLES.ORGANIZATION,
        label: "Partner Organization",
        hint: "Shelters, community organizations and care settings requesting events for the people they serve.",
    },
    {
        value: ROLES.ARTIST,
        label: "Volunteer Artist",
        hint: "Experienced hair, makeup, nail or skincare artists volunteering their services.",
    },
    {
        value: ROLES.CLIENT,
        label: "Client",
        hint: "Individuals requesting a free service for themselves.",
    },
];

export const REQUEST_STATUSES = ["pending", "approved", "completed", "rejected"];

/** Where a signed-in user should land, based on their profile document. */
export function dashboardPathFor(profile) {
    if (!profile) return "/";
    if (!profile.verified) return "/awaiting-verification";
    if (profile.role === ROLES.ARTIST) return "/artist-dashboard";
    if (profile.role === ROLES.CLIENT || profile.role === ROLES.ORGANIZATION) {
        return "/pat-hop-dashboard";
    }
    return "/";
}

/** Human-readable message for Firebase Auth errors. */
export function authErrorMessage(error) {
    switch (error?.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "That email and password don't match an account.";
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/email-already-in-use":
            return "This email is already registered. Try logging in instead.";
        case "auth/weak-password":
            return "Passwords need at least 6 characters.";
        case "auth/too-many-requests":
            return "Too many attempts. Please wait a moment and try again.";
        default:
            return "Something went wrong. Please try again.";
    }
}

/** Formats a Firestore Timestamp, Date, or date string; "—" when missing. */
export function formatDate(value) {
    if (!value) return "—";
    const date = value.toDate ? value.toDate() : value instanceof Date ? value : parseDay(value);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

/** "YYYY-MM-DD" strings are parsed as local dates, not UTC midnight. */
function parseDay(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    return match ? new Date(+match[1], +match[2] - 1, +match[3]) : new Date(value);
}
