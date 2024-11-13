import mongoose from "mongoose";

const nurseProfileSchema = new mongoose.Schema({
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
    specialization: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    verificationDocument: {  // Changed from VerificationDoc to match frontend
        type: String,
        required: true,
    },
}, { timestamps: true });

const NurseProfile = mongoose.model("NurseProfile", nurseProfileSchema);

export default NurseProfile;
