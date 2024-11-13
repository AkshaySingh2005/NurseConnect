import React, { useState, useEffect, useContext } from "react";
import {
  MapPin,
  Loader2,
  Clock,
  Stethoscope,
  Phone,
  MapPinHouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import NurseDetailsContext from "../../context/NurseDetailsContext";
import { useNavigate } from "react-router-dom";



export default function NearestNurse() {
  const [nearestNurse, setNearestNurse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { nurseDetails, error } = useContext(NurseDetailsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNearestNurse = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setNearestNurse({
        name: `${nurseDetails.nurse.name}`,
        specialization: `${nurseDetails.nurse.specialization}`,
        phone: `${nurseDetails.nurse.phone}`,
        address: `${nurseDetails.nurse.address}`,
        image: `${nurseDetails.nurse.profileImage}`, // Assuming nurse profile image URL is available here
        distance: `${nurseDetails.travelDetails.distanceInKilometers} km`,
        availableTime: `${nurseDetails.travelDetails.timeInMinutes} minutes`,
      });
      setLoading(false);
    };

    fetchNearestNurse();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg text-primary-foreground p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              NurseConnect
            </h1>
          </div>
          <nav>
            <Button className="mr-3">About</Button>
            <Button className="ml-5">Services</Button>
          </nav>
        </div>
      </header>

      <main className="flex items-center justify-center container mx-auto px-4 py-12 flex-start ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl border-t-4 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-primary">
                Nearest Available Nurse
              </CardTitle>
              <CardDescription className="text-center">
                Professional healthcare at your doorstep
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-60">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-lg text-muted-foreground">
                    Locating nearest nurse...
                  </p>
                </div>
              ) : (
                nearestNurse && (
                  <>
                    <div className="w-40 h-40 rounded-full mb-4 overflow-hidden  shadow-xl">
                      <img
                        src={nearestNurse.image}
                        alt="Nurse"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      {nearestNurse.name}
                    </h2>
                    <div className="flex items-center mb-2">
                      {/* <stethoscope className="h-4 w-4 text-muted-foreground mr-2" /> */}
                      <Stethoscope className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">
                        Specialization : {nearestNurse.specialization}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">
                        {nearestNurse.distance} away
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">
                        Available in {nearestNurse.availableTime}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">
                        {nearestNurse.phone}
                      </span>
                    </div>
                    <div className="flex justify-center items-center mb-5">
                      <MapPinHouse className="h-8 w-8 text-muted-foreground mr-1" />
                      <span className="text-center text-muted-foreground">
                        Address: {nearestNurse.address}
                      </span>
                    </div>
                    <Button onClick={()=>navigate('/Contacting-Nurse')} className="w-full bg-primary text-white hover:bg-primary/90">
                      Request This Nurse
                    </Button>
                  </>
                )
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm py-2 text-center text-gray-600 mt-auto">
        <div className="container mx-auto px-4">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} NurseLocator. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-primary hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
