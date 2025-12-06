import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  paidOn: { type: Date, default: Date.now },
  by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { _id: false });

const studentFeeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalFee: { type: Number, required: true },
  paidFee: { type: Number, default: 0 },   // keeps increasing
  currentFee: { type: Number, default: 0 }, // totalFee - paidFee
  status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  paymentHistory: [
  {
    amount: Number,
    by: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    paidOn: Date,
    paymentMode: { type: String, enum: ["cash", "online"], default: "cash" },
    transactionId: { type: String, default: "" },
    receipt: { type: String, default: "" }, // store filename
    remark: { type: String, default: "" }
  }
]

}, { _id: false });

const feeGroupSchema = new mongoose.Schema({
  name: String,
  collegeName: String,
  batch: String,
  programName: String,
  technology: String,
  students: { type: [studentFeeSchema], default: [] },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("FeeGroup", feeGroupSchema);
