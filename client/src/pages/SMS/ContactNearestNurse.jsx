import { useEffect, useContext } from 'react';
import axios from 'axios';
import PatientDetailsContext from '../../context/PatientDetailsContext';

const NearestNurseAlert = () => {
  const { fullPatientDetails } = useContext(PatientDetailsContext);

  // Function to send alert to nurse
  const sendAlert = async () => {
    try {
      const response = await axios.post('http://localhost:5000/sendAlert', {
        fullPatientDetails
      });
      console.log(response.data.msg); // Log the alert response
    } catch (error) {
      console.error("Error sending alert to nurse:", error.message);
    }
  };

  // Call sendAlert on component load
  useEffect(() => {
    sendAlert();
  }, []); // Empty dependency array ensures this runs only once

  return null; // No UI needed, as this component only sends an alert
};

export default NearestNurseAlert;
