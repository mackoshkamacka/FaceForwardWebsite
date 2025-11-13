import ServicesList from '../components/common/ServiceList';
import PatientRequests from '../components/patient-and-hospital/PatientRequests';
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