import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FirebaseProvider } from "./context/FirebaseContext.jsx";
import { NurseDetailsProvider } from "./context/NurseDetailsContext.jsx";
import { PatientDetailsProvider } from "./context/PatientDetailsContext.jsx";
import { NurseResponseProvider } from "./context/NurseResponse.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <NurseResponseProvider>
  <PatientDetailsProvider>
      <FirebaseProvider>
        <NurseDetailsProvider>
          <App />
        </NurseDetailsProvider>
      </FirebaseProvider>
    </PatientDetailsProvider>
  </NurseResponseProvider>
    
  </StrictMode>
);
