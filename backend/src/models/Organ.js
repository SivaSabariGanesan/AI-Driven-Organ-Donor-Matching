import mongoose from "mongoose";

const organSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    bloodGroup: { type: String, required: true, trim: true },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    availabilityStatus: { type: String, enum: ["available", "reserved", "donated"], default: "available" },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true }
);

export const Organ = mongoose.model("Organ", organSchema);


