import { createContext, useContext, useState } from "react";

const NurseDetailsContext = createContext(null);


export const useNurseDetails = () => useContext(NurseDetailsContext);


export const NurseDetailsProvider = ({ children }) => {

  const [nurseDetails, setNurseDetails] = useState(null);
  const [error, setError] = useState(null);

  // Expose state and state setters
  const value = {
    nurseDetails,
    setNurseDetails,
    error,
    setError,
  };

  return (
    <NurseDetailsContext.Provider value={value}>
      {children}
    </NurseDetailsContext.Provider>
  );
};

export default NurseDetailsContext;
