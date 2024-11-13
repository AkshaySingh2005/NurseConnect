import { useFirebase } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logoutUser } = useFirebase();

  function handleLogout() {
    logoutUser()
      .then(() => {
        console.log("logged out succesfully");
        toast.success("Logged out successfully!");
        navigate("/auth");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        toast.error("Error logging out. Please try again.");
      });
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        className="absolute top-1 right-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
}
