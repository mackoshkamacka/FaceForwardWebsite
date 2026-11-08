import { Resend } from "resend";

let client: Resend | undefined;

/** Resend client, created on first use so builds don't require RESEND_API_KEY. */
export function getResend() {
    client ??= new Resend(process.env.RESEND_API_KEY);
    return client;
}
