import express from "express";
import twilio from "twilio";
import dotenv from "dotenv";
import PatientProfile from "../models/PatientProfileModal.js";
import axios from "axios";

dotenv.config();
const router = express.Router();
const { MessagingResponse } = twilio.twiml;

const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;
const client = twilio(accountSid, authToken);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

let patientDetailsStore = {};
let nurseWhatappResponse = null;  // Initially, set to null

// Route to retrieve patient details and store them temporarily
router.post("/patientDetails", async (req, res) => {
  const { patientDetails } = req.body;

  try {
    const patient = await PatientProfile.findOne({ email: patientDetails });
    if (!patient) {
      return res.status(400).json({ msg: "Patient not found" });
    }
    // Store patient details in memory
    patientDetailsStore = {
      name: patient.name,
      address: patient.address,
      emergencyContact: patient.emergencyContact,
    };
    res.status(200).json({ msg: "Patient found", patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to send alert to nurse
router.post("/sendAlert", async (req, res) => {
  if (!patientDetailsStore.name || !patientDetailsStore.address) {
    return res.status(400).json({ msg: "Patient details are not set" });
  }

  try {
    const message = await client.messages.create({
      body: `Emergency Alert: Patient ${patientDetailsStore.name} at ${patientDetailsStore.address} needs assistance. Are you available to respond? Reply YES if you can respond, or NO if you are unavailable.`,
      from: `whatsapp:${twilioNumber}`,
      to: `whatsapp:+919762953837`, // Replace with actual nurse number from context
    });

    res.status(200).json({ msg: "Alert message sent successfully", message });
    console.log("Alert message sent successfully");
  } catch (error) {
    res.status(500).json({ msg: "Failed to send alert message", error });
  }
});

// Route to handle WhatsApp response from nurse
router.post("/NurseResponse", (req, res) => {
  const twiml = new MessagingResponse();
  const nurseResponse = req.body.Body.trim().toUpperCase();

  if (nurseResponse === "YES") {
    twiml.message(
      `Thank you for responding. Please proceed to the patient's location: ${patientDetailsStore.address}. Contact the patient ${patientDetailsStore.name} at ${patientDetailsStore.emergencyContact} for further assistance.Please share your live location with patient through whatsapp.`
    );
  } else if (nurseResponse === "NO") {
    twiml.message(
      "Thank you for your response. We will contact the next nearest available nurse."
    );
  } else {
    twiml.message("Please respond with YES or NO.");
  }

  console.log("Nurse responded with:", nurseResponse);
  nurseWhatappResponse = nurseResponse;  // Update nurse response
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// Route to send the nurse's response
router.post("/sendingNurseResponse", async (req, res) => {
  try {
    if (nurseWhatappResponse) {
       if(nurseWhatappResponse === "YES") {
        const patientWhatsApp = patientDetailsStore.emergencyContact;

        const whatsappLink = `https://wa.me/+919518327410`;

        const qrCodeResponse = await axios.get(
          `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
            whatsappLink
          )}&size=200x200`,
          { responseType: "arraybuffer" } // Retrieve image data as binary
        );

        const qrCodeImage = Buffer.from(qrCodeResponse.data, "binary").toString("base64");

        return res.status(200).json({
          msg:"YES",
          whatsappLink,
          qrCodeImage: `data:image/png;base64,${qrCodeImage}`,
        });
    }
  }
  else if (nurseWhatappResponse === "NO") {
    return res.status(200).json({ msg: "NO" });
  } 
  else {
    return res.status(200).json({ msg: "Waiting for nurse's response..." });
  }
  } 
  catch (error) {
    res.status(500).json({ msg: "Failed to send nurse response", error });
  }
  
});

export default router;
