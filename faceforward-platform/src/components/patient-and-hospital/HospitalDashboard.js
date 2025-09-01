import HospitalServicesList from "./HospitalSerivesList";
import PatientRequests from "./Requests";

export default function HospitalDashboard() {
  return (
    <div>
      <h1>Welcome Hospital</h1>
      <HospitalServicesList />
      <PatientRequests />
    </div>
  );
}