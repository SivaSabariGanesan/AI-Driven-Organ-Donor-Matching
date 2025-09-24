import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    organ: { type: mongoose.Schema.Types.ObjectId, ref: "Organ" },
    requestedType: { type: String, trim: true },
    requestedBloodGroup: { type: String, trim: true },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "approved", "rejected", "fulfilled"], default: "pending" },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);


