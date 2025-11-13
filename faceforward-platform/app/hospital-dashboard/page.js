import HospitalServicesList from "../components/patient-and-hospital/HospitalSerivesList";
import PatientRequests from "../components/patient-and-hospital/PatientRequests";

export default function HospitalDashboard() {
    return (
        <div>
            <h1>Welcome Hospital</h1>
            <HospitalServicesList />
            <PatientRequests />
        </div>
    );
}