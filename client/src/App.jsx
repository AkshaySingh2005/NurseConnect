import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Authentication/LoginPage"; // Assuming Login is imported correctly
import NurseSignUp from "./pages/Authentication/NurseSignUp";
import PatientSignUp from "./pages/Authentication/PatientSignUp";
import GoogleMap from "./pages/Map/GoogleMap";
import { Audio } from "react-loader-spinner";
import { useFirebase } from "./context/FirebaseContext";
import NurseCard from "./pages/Map/NurseCard";
import LoadingScreen from "./pages/SMS/Loading";
import NurseConfirm from "./pages/SMS/NurseConfirm";



// import LogoutButton from "./lib/logoutButton"; // Ensure this is imported correctly

const App = () => {
  const { loading, user } = useFirebase();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/NurseSignUp" element={<NurseSignUp />} />
          <Route path="/patientSignUp" element={<PatientSignUp />} />
          <Route
            path="/Home"
            element={user ? <HomePage /> : <Navigate to="/Login" />}
          />
          <Route
            path="/NurseCard"
            element={user ? <NurseCard /> : <Navigate to="/Login" />}
          />
          <Route
            path="/Map"
            element={user ? <GoogleMap /> : <Navigate to="/Login" />}
          />
          <Route
            path="/Contacting-Nurse"
            element={user ? <LoadingScreen /> : <Navigate to="/Login" />}
          />
          <Route
            path="/NurseConfirm"
            element={user ? <NurseConfirm /> : <Navigate to="/Login" />}
          />
          <Route path="*" element={<Navigate to="/Login" />} />
        </Routes>
        {/* Conditional rendering of LogoutButton */}
      </div>
    </BrowserRouter>
  );
};

export default App;
