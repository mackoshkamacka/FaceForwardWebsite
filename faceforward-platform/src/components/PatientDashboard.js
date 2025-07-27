import ServicesList from './ServiceList';
import PatientAdminRequest from './PatientAdminRequest';
import PatientRequests from './PatientRequests';

export default function PatientDashboard() {
  return (
    <div>
      <h1>Welcome Patient</h1>
      {/*<PatientAdminRequest />*/}
      <ServicesList />
      <PatientRequests />
    </div>
  );
}