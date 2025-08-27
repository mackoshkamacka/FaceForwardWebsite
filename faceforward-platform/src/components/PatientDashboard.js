import ServicesList from './ServiceList';
import PatientRequests from './Requests';
//import PatientAdminRequest from './PatientAdminRequest';

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