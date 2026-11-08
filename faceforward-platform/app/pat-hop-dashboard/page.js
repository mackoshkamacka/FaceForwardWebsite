import DashboardShell from "../components/dashboard/DashboardShell";
import ServiceRequest from "../components/patient-and-hospital/SerivesRequest";
import ClientRequests from "../components/patient-and-hospital/ClientRequests";
import { ROLES } from "../lib/platform";

const INTROS = {
    [ROLES.ORGANIZATION]: [
        "Browse services offered by our volunteer artists and request one for an event at your organization. Every service is free of charge, and products can be adapted to your clients' needs, such as fragrance-free or sensitive-skin options.",
        "Once an artist confirms, you'll receive an email with the details and a calendar invite. You can follow the status of each request on the right.",
    ],
    [ROLES.CLIENT]: [
        "Browse services offered by our volunteer artists and request one for yourself. Every service is free of charge. Let us know about any sensitivities or product preferences in the notes.",
        "Once an artist confirms, you'll receive an email with the details. You can follow the status of each request on the right.",
    ],
};

export default function ClientDashboard() {
    return (
        <DashboardShell
            allowedRoles={[ROLES.ORGANIZATION, ROLES.CLIENT]}
            intros={INTROS}
            left={<ServiceRequest />}
            right={<ClientRequests />}
        />
    );
}
