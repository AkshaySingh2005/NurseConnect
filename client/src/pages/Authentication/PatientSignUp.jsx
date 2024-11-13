import { useState } from "react";
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
import { User, Mail, LockKeyhole, Phone, Home, Calendar } from "lucide-react";
import backgroundImageMedical from "../../lib/back.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFirebase } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

export default function PatientSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const { signupUserWithEmailAndPassword, loginUserWithEmailAndPassword } =
    useFirebase();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      // Sign up user
      const result = await signupUserWithEmailAndPassword(email, password);

      // Create profile in the backend
      const profileData = {
        name,
        email,
        password,
        age,
        address,
        emergencyContact,
      };

      const res = await axios.post(
        "http://localhost:5000/patientSignUp",
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success message
      console.log("Profile created successfully:", res.data);
      toast.success("Profile created successfully");

      // Redirect to login page
      navigate("/Login");
    } catch (error) {
      console.error(
        "Error during signup or profile creation:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to create profile. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImageMedical})` }}
    >
      <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
        <CardHeader className="bg-green-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl">Patient Sign Up</CardTitle>
          <CardDescription className="text-green-100">
            Create a new account as a patient
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-1">
          <form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="name" className="text-green-600">
                Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-600">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-600">
                Password
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-green-600">
                Confirm Password
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-green-600">
                Age
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min="0"
                  max="120"
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-green-600">
                Address
              </Label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <Input
                  id="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact" className="text-green-600">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <Input
                  id="emergencyContact"
                  type="tel"
                  placeholder="Enter your contact number"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  required
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 mt-5"
            >
              Sign Up as Patient
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center bg-gray-50 rounded-b-lg">
          <p className="text-sm text-green-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-800 hover:underline">
              Login
            </a>
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
