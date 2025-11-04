import mongoose from "mongoose";

const feePaymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  paidOn: { type: Date },
  collegeName: { type: String },
  batch: { type: String },
  programName: { type: String },
  technology: { type: String },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("FeePayment", feePaymentSchema);
