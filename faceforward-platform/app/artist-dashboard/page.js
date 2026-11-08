import DashboardShell from "../components/dashboard/DashboardShell";
import CreateNewService from "../components/artist/CreateNewService";
import ArtistServices from "../components/artist/ArtistsServices";
import ArtistRequests from "../components/artist/ArtistRequest";
import { ROLES } from "../lib/platform";

const INTROS = {
    [ROLES.ARTIST]: [
        "Thank you for volunteering your talent. List the services you can offer, such as hair, makeup, nail art or skincare, and partner organizations and clients will be able to request them. Every Face Forward service is free of charge.",
        "Review new requests on the right. Approving one sends the requester a confirmation email with a calendar invite. At every event, please follow our health and sanitization procedures: masks on, long hair tied back, one personal single-use kit per client.",
    ],
};

export default function ArtistDashboard() {
    return (
        <DashboardShell
            allowedRoles={[ROLES.ARTIST]}
            intros={INTROS}
            left={
                <>
                    <CreateNewService />
                    <ArtistServices />
                </>
            }
            right={<ArtistRequests />}
        />
    );
}
