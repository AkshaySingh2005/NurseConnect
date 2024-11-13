import { useContext, useEffect, useState } from "react";
import axios from "axios";
import NurseDetailsContext from "../../context/NurseDetailsContext";


const PatientLocation = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [address, setAddress] = useState();
  const apiKey = "AIzaSyA9UIOQZ4cvsDrMDmSFO8oSlO8k3FODGh0";

  const { setNurseDetails, setError } = useContext(NurseDetailsContext);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            reverseGeocode(position.coords.latitude, position.coords.longitude);
            console.log(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    };
    getLocation();
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=en`,
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );

      if (response.data.status === "OK" && response.data.results.length > 0) {
        const mapAddress = response.data.results[0].formatted_address;
        setAddress(mapAddress);
        console.log(mapAddress);
        SendingAddressToBackend(mapAddress);
      } else {
        console.log("Unable to fetch address");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const SendingAddressToBackend = async (address) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/findNearestNurse",
        {
          address: address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNurseDetails(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setError("Error sending address to backend: " + error.message);
    }
  };
  return <></>;
};

export default PatientLocation;
