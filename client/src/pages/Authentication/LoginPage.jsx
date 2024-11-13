import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LockKeyhole, Mail, User, Stethoscope } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import backgroundImageMedical from "../../lib/back.png";
import { useFirebase } from "../../context/FirebaseContext";
import PatientDetailsContext from "../../context/PatientDetailsContext";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { loginUserWithEmailAndPassword, logoutUser, user, setLoading } = useFirebase();
  const { setPatientDetails } = useContext(PatientDetailsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUserWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("Logged in successfully!");
        setPatientDetails(email);
        navigate("/Home");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        toast.error("Invalid email or password. Please try again.");
      });

    console.log("Login submitted", { email, password });
  };

  const handleSignUp = (userType) => {
    setIsModalOpen(false);
    console.log(`User chose to sign up as: ${userType}`);
    if (userType === "patient") {
      navigate("/patientSignUp");
    } else {
      navigate("/nurseSignUp");
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login here
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("Logged out successfully");
        toast.success("Logged out successfully!");
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        toast.error("Error logging out. Please try again.");
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative" // Set to relative for absolute positioning
      style={{ backgroundImage: `url(${backgroundImageMedical})` }}
    >
      {user && ( // Display logout button if user is logged in
        <div className="absolute top-4 right-4">
          {" "}
          {/* Absolute positioning for top right */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      )}
      <Card className="w-full max-w-md mx-auto bg-white bg-opacity-80 shadow-lg backdrop-filter backdrop-blur-lg">
        <CardHeader className="bg-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl">Login to NurseConnect</CardTitle>
          <CardDescription className="text-blue-100">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-600">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-600">
                Password
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
          <div className="mt-4">
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Login with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center bg-gray-50 rounded-b-lg">
          <p className="text-sm text-blue-600">
            Don't have an account?{" "}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="p-0 text-blue-800 hover:underline"
                >
                  Sign up
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Choose Account Type</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button
                    onClick={() => handleSignUp("patient")}
                    className="flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Sign up as Patient
                  </Button>
                  <Button
                    onClick={() => handleSignUp("nurse")}
                    className="flex items-center justify-center gap-2"
                  >
                    <Stethoscope className="w-4 h-4" />
                    Sign up as Healthcare Provider
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </p>
        </CardFooter>
      </Card>
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
