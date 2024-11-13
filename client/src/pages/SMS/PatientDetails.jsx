import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PatientDetailsContext from "../../context/PatientDetailsContext";
import NurseResponseContext from "../../context/NurseResponse";
import { useNavigate } from "react-router-dom";


const PatientDetails = () => {
  const { patientDetails } = useContext(PatientDetailsContext);
  const { setwhatsappLink, setQrCodeImage } = useContext(NurseResponseContext);
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [nurseResponse, setNurseResponse] = useState(null);
  // const [whatsappLink, setWhatsappLink] = useState(null);
  // const [qrCodeImage, setQrCodeImage] = useState(null);

  // Send patient details to the backend and trigger alert to nurse
  const sendingEmailToBackend = async () => {
    try {
      const res = await axios.post("http://localhost:5000/patientDetails", {
        patientDetails,
      });
      console.log("Response from backend:", res.data);
      setResponse(res.data);
      await sendAlert(); // Trigger alert to the nurse after patient details are received
    } catch (error) {
      console.error("Error sending address to backend:", error.message);
    }
  };

  // Function to send an alert to the nurse
  const sendAlert = async () => {
    try {
      const alertResponse = await axios.post("http://localhost:5000/sendAlert");
      console.log("Alert response:", alertResponse.data.msg);
      startPollingForNurseResponse(); // Start polling for nurse's response after alert is sent
    } catch (error) {
      console.error("Error sending alert to nurse:", error.message);
    }
  };

  // Function to start polling for the nurse's response
  const startPollingForNurseResponse = () => {
    const interval = setInterval(async () => {
      try {
        const nurseResponse = await axios.post("http://localhost:5000/sendingNurseResponse");
        console.log("Polling for Nurse Response:", nurseResponse.data);

        // Set nurse response and handle YES or NO cases
        setNurseResponse(nurseResponse.data.msg);
        
        if (nurseResponse.data.msg === "YES") {
          setwhatsappLink(nurseResponse.data.whatsappLink);
          setQrCodeImage(nurseResponse.data.qrCodeImage);
          clearInterval(interval);
          navigate("/NurseConfirm"); // Stop polling if nurse responds with YES
        } else if (nurseResponse.data.msg === "NO") {
          clearInterval(interval); // Stop polling if nurse responds with NO
        }
      } catch (error) {
        console.error("Error polling nurse response:", error.message);
      }
    }, 5000);
  };

  // Show patient details and WhatsApp link with QR code if the nurse responds with "YES"
  // const showDetails = () => {
  //   if (nurseResponse === "YES") {
  //     return (
  //       <div>
  //         <p>Nurse has responded with "YES". You can chat with the nurse:</p>
  //         <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
  //           Click here to chat withh nurse
  //         </a>
  //         <div>
  //           <p>Scan the QR code to start the WhatsApp chat:</p>
  //           <img src={qrCodeImage} alt="QR Code for WhatsApp Chat" />
  //         </div>
  //       </div>
  //     );
  //   } else if (nurseResponse === "NO") {
  //     return <p>Nurse has responded with "NO".</p>;
  //   } else {
  //     return <p>Waiting for nurse's response...</p>;
  //   }
  // };

  useEffect(() => {
    if (patientDetails) {
      sendingEmailToBackend();
    }
  }, [patientDetails]);

  return (
    <>
      {/* <h2>Patient Details</h2>
      {showDetails()} */}
    </>
  );
};

export default PatientDetails;
