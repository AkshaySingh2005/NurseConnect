import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    emergencyContact: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);

export default PatientProfile;
