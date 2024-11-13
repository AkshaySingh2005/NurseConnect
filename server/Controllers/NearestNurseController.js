import dotenv from "dotenv";
import axios from "axios";
import NurseProfile from "../models/NurseProfileModal.js";

dotenv.config();

const findNearestNurse = async (req, res) => {
  const { address: patientAddress } = req.body;
  console.log("Patient Addreeess from controller:", patientAddress);

  if (!patientAddress) {
    return res.status(400).json({ msg: "Patient address is required" });
  }

  try {
    // Fetch all nurse addresses from the database
    const nurseAddresses = await NurseProfile.find({}, { _id: 0, address: 1 });

    if (nurseAddresses.length === 0) {
      return res.status(404).json({ msg: "No nurses found" });
    }

    // Prepare the Distance Matrix API request
    const origins = encodeURIComponent(patientAddress);
    const destinations = nurseAddresses
      .map((nurse) => encodeURIComponent(nurse.address))
      .join("|");

    const apiKey = process.env.GOOGLE_API_KEY;
    const distanceMatrixApi = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=AIzaSyA9UIOQZ4cvsDrMDmSFO8oSlO8k3FODGh0`;

    // Call the Distance Matrix API
    const response = await axios.get(distanceMatrixApi);
    const { rows, status } = response.data;
    console.log("API Response:", JSON.stringify(response.data, null, 2));

    if (status !== "OK" || !rows || rows.length === 0 || !rows[0].elements) {
      console.error(
        "Invalid response from Distance Matrix API:",
        response.data
      );
      return res
        .status(500)
        .json({ msg: "Invalid response from Distance Matrix API" });
    }

    let nearestNurse = null;
    let minTravelTime = Infinity;
    let minDistance = null;

    // Find the nurse with the shortest travel time
    rows[0].elements.forEach((element, index) => {
      if (element.status === "OK") {
        const travelTime = element.duration.value; // Time in seconds
        const distance = element.distance.value; // Distance in meters

        if (travelTime < minTravelTime) {
          minTravelTime = travelTime;
          minDistance = distance;
          nearestNurse = nurseAddresses[index];
        }
      }
    });

    if (nearestNurse) {
      const nurseProfile = await NurseProfile.findOne({
        address: nearestNurse.address,
      });
      console.log("Nearest Nurse:", nurseProfile.address);

      return res.status(200).json({
        nurse: {
          name: nurseProfile.name,
          email: nurseProfile.email,
          specialization: nurseProfile.specialization,
          phone: nurseProfile.phone,
          address: nurseProfile.address,
          profileImage: nurseProfile.profileImage,
        },
        travelDetails: {
          timeInSeconds: minTravelTime,
          timeInMinutes: Math.round(minTravelTime / 60),
          distanceInMeters: minDistance,
          distanceInKilometers: (minDistance / 1000).toFixed(2),
        },
      });
    } else {
      return res.status(404).json({ msg: "No nurse found" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ msg: `Error: ${error.message}` });
  }
};

export default findNearestNurse;
