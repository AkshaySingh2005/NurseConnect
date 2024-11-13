import { useState, useEffect } from "react";
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
  User,
  Mail,
  LockKeyhole,
  Stethoscope,
  Phone,
  Home,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Webcam from "@uppy/webcam";
import ImageEditor from "@uppy/image-editor";
import ScreenCapture from "@uppy/screen-capture";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/webcam/dist/style.css";
import "@uppy/image-editor/dist/style.css";
import "@uppy/screen-capture/dist/style.css";
import axios from "axios";
import backgroundImageMedical from "../../lib/back.png";
import { useFirebase } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

export default function NurseSignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phoneNumber: "",
    address: "",
  });

  const [uppyImage, setUppyImage] = useState(null);
  const [uppyDocument, setUppyDocument] = useState(null);

  const { signupUserWithEmailAndPassword } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    const imageUppy = new Uppy({
      id: "profileImage",
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
      },
    })
      .use(Webcam)
      .use(ImageEditor)
      .use(ScreenCapture);

    const documentUppy = new Uppy({
      id: "verificationDocument",
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: [".pdf", ".doc", ".docx"],
      },
    });

    setUppyImage(imageUppy);
    setUppyDocument(documentUppy);

    return () => {
      imageUppy.destroy();
      documentUppy.destroy();
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const profileImageFile = uppyImage.getFiles()[0];
    const verificationDocumentFile = uppyDocument.getFiles()[0];

    if (!profileImageFile || !verificationDocumentFile) {
      toast.error("Please upload both profile image and verification document");
      return;
    }

    console.log("Profile Image File:", profileImageFile);
    console.log("Verification Document File:", verificationDocumentFile);

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        const blobFile = file?.data || file;
        if (!(blobFile instanceof Blob)) {
          reject(new Error("Provided file is not a Blob."));
          return;
        }
        reader.readAsDataURL(blobFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    try {
      const profileImageData = await toBase64(profileImageFile);
      const verificationDocumentData = await toBase64(verificationDocumentFile);

      const result = await signupUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      const profileData = {
        ...formData,
        phone: formData.phoneNumber,
        profileImage: profileImageData,
        verificationDocument: verificationDocumentData,
      };

      const response = await axios.post(
        "http://localhost:5000/nurseSignUp",
        profileData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Profile created successfully:", response.data);
      toast.success("Profile created successfully");
      navigate("/Login");
    } catch (error) {
      console.error(
        "Error creating profile:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to create profile. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InputField
              id="name"
              label="Name"
              icon={<User className="h-4 w-4" />}
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              icon={<Mail className="h-4 w-4" />}
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              icon={<LockKeyhole className="h-4 w-4" />}
              value={formData.password}
              onChange={handleInputChange}
            />
          </>
        );
      case 2:
        return (
          <>
            <InputField
              id="specialization"
              label="Specialization"
              icon={<Stethoscope className="h-4 w-4" />}
              value={formData.specialization}
              onChange={handleInputChange}
            />
            <InputField
              id="phoneNumber"
              label="Phone Number"
              type="tel"
              icon={<Phone className="h-4 w-4" />}
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <InputField
              id="address"
              label="Address"
              icon={<Home className="h-4 w-4" />}
              value={formData.address}
              onChange={handleInputChange}
            />
          </>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-blue-600">Profile Image</Label>
              {uppyImage && (
                <Dashboard
                  uppy={uppyImage}
                  plugins={["Webcam", "ImageEditor", "ScreenCapture"]}
                  width="100%"
                  height={250}
                />
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-blue-600">Verification Document</Label>
              {uppyDocument && (
                <Dashboard uppy={uppyDocument} width="100%" height={250} />
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImageMedical})` }}
    >
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
        <ToastContainer />
        <CardHeader className="bg-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl">Nurse Sign Up</CardTitle>
          <CardDescription className="text-blue-100">
            Step {step} of 3
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {renderStep()}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              className="ml-auto"
              onClick={() => setStep((prev) => prev + 1)}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="ml-auto" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </CardFooter>
        {step === 1 && (
          <div className="text-center text-blue-500 pb-4">
            Already have an account? Log in.
          </div>
        )}
      </Card>
    </div>
  );
}

function InputField({ id, label, type = "text", icon, value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-blue-600">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
          {icon}
        </span>
        <Input
          id={id}
          type={type}
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          required
          className="pl-10 border-blue-200 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
