import ServicesList from './ServiceList';
import PatientAdminRequest from './PatientAdminRequest';
import PatientRequests from './Requests';

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