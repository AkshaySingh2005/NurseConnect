import { createContext, useContext, useState } from "react";

const PatientDetailsContext = createContext(null);


export const usePatientDetails = () => useContext(PatientDetailsContext);


export const PatientDetailsProvider = ({ children }) => {

  const [patientDetails, setPatientDetails] = useState(null);
  const [error, setError] = useState(null);
  const [fullPatientDetails, setFullPatientDetails] = useState(null);

  // Expose state and state setters
  const value = {
    patientDetails,
    setPatientDetails,
    error,
    setError,
    fullPatientDetails,
    setFullPatientDetails
  };

  return (
    <PatientDetailsContext.Provider value={value}>
      {children}
    </PatientDetailsContext.Provider>
  );
};

export default PatientDetailsContext;
