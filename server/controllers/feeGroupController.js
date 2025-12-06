import FeeGroup from "../models/feeGroup.js";
import mongoose from "mongoose";
import { sendGroupCreationEmails } from "../utils/groupEmail.js";

export const createFeeGroup = async (req, res) => {
  try {
    console.log("welcome to create fee group");
    const { name, collegeName, batch, programName, technology, students } =
      req.body;
    console.log("how this is printing ",req.body);
    const exists = await FeeGroup.findOne({
      collegeName,
      batch,
      programName,
      technology,
      "students.student": { $in: students.map((s) => s.studentId) },
    });

    if (exists) {
      return res
        .status(400)
        .json({ error: "Fee group already exists for these students" });
    }

    if (!Array.isArray(students) || students.length === 0)
      return res.status(400).json({ error: "students required" });
    const markedBy = req.user?.id;

    const doc = new FeeGroup({
      name: name || "",
      collegeName,
      batch,
      programName,
      technology,
      students: students.map((s) => {
        const total = Number(s.fee) || 0;
        // distribute equally into 3 installments if not provided
        const inst = (s.installments || [])
          .slice(0, 3)
          .map((a) => ({ amount: Number(a) || 0, paidAmount: 0 }));
        while (inst.length < 3)
          inst.push({ amount: Math.round(total / 3 || 0), paidAmount: 0 });
        // if provided installments sum is zero, fallback to equal distribution
        const sumInst = inst.reduce((a, b) => a + (b.amount || 0), 0);
        if (sumInst === 0) {
          inst[0].amount = Math.round(total / 3);
          inst[1].amount = Math.round(total / 3);
          inst[2].amount = total - inst[0].amount - inst[1].amount;
        }
        return {
          student: new mongoose.Types.ObjectId(String(s.studentId)),
          totalFee: total,
          paidFee: 0,
          currentFee: total,
          paymentHistory: [],
          installments: inst,
        };
      }),

      markedBy,
    });

    await doc.save();
    console.log("sending emails");
    sendGroupCreationEmails(doc).catch((e) =>
      console.error("Email error:", e)
    );
    res.json({ success: true, groupId: doc._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const listFeeGroups = async (req, res) => {
  try {
    const { collegeName, batch, programName, technology } = req.query;
    const match = {};
    if (collegeName) match.collegeName = collegeName;
    if (batch) match.batch = batch;
    if (programName) match.programName = programName;
    if (technology) match.technology = technology;

    const groups = await FeeGroup.find(match).populate(
      "students.student",
      "name usn email profilePic"
    );
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFeeGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const g = await FeeGroup.findById(id).populate(
      "students.student",
      "name usn email profilePic"
    );
    if (!g) return res.status(404).json({ error: "Not found" });
    res.json(g);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markInstallmentPaid = async (req, res) => {
  console.log("markinstallmenpaid");
  try {
    const { id, studentId, index } = req.params;
    // -----------------------------------
// ONE TIME SETTLEMENT
// -----------------------------------
if (req.body.installmentIndex === "OTS") {
  const fullAmount = studentEntry.totalFee - studentEntry.paidFee;

  studentEntry.paidFee = studentEntry.totalFee;
  studentEntry.currentFee = 0;
  studentEntry.status = "Paid";

  // Mark all installments fully paid
  studentEntry.installments = studentEntry.installments.map(inst => ({
    amount: inst.amount,
    paidAmount: inst.amount,
    status: "Paid",
    paidOn: new Date(),
  }));

  // Add payment history
  studentEntry.paymentHistory.push({
    amount: fullAmount,
    by: req.user?.id,
    paidOn: new Date()
  });

  await group.save();
  return res.json({ success: true, message: "One Time Settlement complete" });
}

    console.log(index)
    const idx = Number(index);
    if (![0, 1, 2].includes(idx))
      return res.status(400).json({ error: "invalid index" });

    const group = await FeeGroup.findById(id);
    if (!group) return res.status(404).json({ error: "Group not found" });

    const sf = group.students.find((s) => {
      const sid =
        s.student && (s.student._id || s.student.id)
          ? String(s.student._id || s.student.id)
          : String(s.student);
      return sid === String(studentId);
    });
    if (!sf) return res.status(404).json({ error: "Student not in group" });

    // normalize installments array (ensure length >=3 and amounts set)
    if (!sf.installments) sf.installments = [];
    // map/ensure shape
    sf.installments = sf.installments.map((it) => ({
      amount: Number(it.amount || 0),
      paidAmount: Number(it.paidAmount || 0),
      status:
        it.status ||
        (it.paidAmount && it.paidAmount >= it.amount ? "Paid" : "Pending"),
      paidOn: it.paidOn || null,
    }));
    while (sf.installments.length < 3)
      sf.installments.push({
        amount: 0,
        paidAmount: 0,
        status: "Pending",
        paidOn: null,
      });
    // if sum of installments amounts is zero, split totalFee equally
    const sumInst = sf.installments.reduce((a, b) => a + (b.amount || 0), 0);
    if (sumInst === 0) {
      const total = Number(sf.totalFee || 0);
      const a = Math.floor(total / 3);
      sf.installments[0].amount = a;
      sf.installments[1].amount = a;
      sf.installments[2].amount = total - a - a;
    } else if (sumInst < (sf.totalFee || 0)) {
      // allocate any remaining amount to last installment
      sf.installments[2].amount += (sf.totalFee || 0) - sumInst;
    }

    // ensure installment exists
    if (!sf.installments[idx])
      return res.status(400).json({ error: "installment not set" });
    sf.installments[idx].status = "Paid";
    sf.installments[idx].paidOn = new Date();
    // ensure installment's paidAmount reflects full amount when manually marked
    if (
      !sf.installments[idx].paidAmount ||
      sf.installments[idx].paidAmount < sf.installments[idx].amount
    ) {
      sf.installments[idx].paidAmount = Number(
        sf.installments[idx].amount || 0
      );
    }

    await group.save();

    // recalc paidAmount and pending
    sf.paidAmount = (sf.installments || []).reduce(
      (a, b) => a + (b.paidAmount || 0),
      0
    );
    if (sf.paidAmount > sf.totalFee) sf.paidAmount = sf.totalFee;
    sf.pending = Math.max(0, (sf.totalFee || 0) - sf.paidAmount);

    // append history for admin manual mark
    try {
      sf.paymentHistory = sf.paymentHistory || [];
      sf.paymentHistory.push({
        amount: Number(
          sf.installments[idx].paidAmount || sf.installments[idx].amount || 0
        ),
        installmentIndex: idx,
        by: req.user?.id || null,
        at: new Date(),
      });
    } catch (e) {}

    const allPaid = sf.installments.every((it) => it.status === "Paid");
    res.json({
      success: true,
      studentId,
      installmentIndex: idx,
      paidOn: sf.installments[idx].paidOn,
      studentPaid: allPaid,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markInstallmentUnpaid = async (req, res) => {
  console.log("welcome to markinstallmentunpaid")
  try {
    const { id, studentId, index } = req.params;
    const idx = Number(index);
    if (![0, 1, 2].includes(idx))
      return res.status(400).json({ error: "invalid index" });

    const group = await FeeGroup.findById(id);
    if (!group) return res.status(404).json({ error: "Group not found" });

    const sf = group.students.find((s) => {
      const sid =
        s.student && (s.student._id || s.student.id)
          ? String(s.student._id || s.student.id)
          : String(s.student);
      return sid === String(studentId);
    });
    if (!sf) return res.status(404).json({ error: "Student not in group" });

    // normalize installments similar to markInstallmentPaid
    if (!sf.installments) sf.installments = [];
    sf.installments = sf.installments.map((it) => ({
      amount: Number(it.amount || 0),
      paidAmount: Number(it.paidAmount || 0),
      status:
        it.status ||
        (it.paidAmount && it.paidAmount >= it.amount ? "Paid" : "Pending"),
      paidOn: it.paidOn || null,
    }));
    while (sf.installments.length < 3)
      sf.installments.push({
        amount: 0,
        paidAmount: 0,
        status: "Pending",
        paidOn: null,
      });
    const sumInst2 = sf.installments.reduce((a, b) => a + (b.amount || 0), 0);
    if (sumInst2 === 0) {
      const total = Number(sf.totalFee || 0);
      const a = Math.floor(total / 3);
      sf.installments[0].amount = a;
      sf.installments[1].amount = a;
      sf.installments[2].amount = total - a - a;
    } else if (sumInst2 < (sf.totalFee || 0)) {
      sf.installments[2].amount += (sf.totalFee || 0) - sumInst2;
    }

    if (!sf.installments[idx])
      return res.status(400).json({ error: "installment not set" });
    sf.installments[idx].status = "Pending";
    sf.installments[idx].paidOn = null;
    // ensure paidAmount reset when marking unpaid
    sf.installments[idx].paidAmount = 0;

    // recompute paidAmount & pending (paidAmount is sum of paidAmount fields)
    sf.paidAmount = (sf.installments || []).reduce(
      (a, b) => a + (b.paidAmount || 0),
      0
    );
    if (sf.paidAmount > sf.totalFee) sf.paidAmount = sf.totalFee;
    sf.pending = Math.max(0, (sf.totalFee || 0) - sf.paidAmount);

    await group.save();

    const allPaid = sf.installments.every((it) => it.status === "Paid");
    res.json({
      success: true,
      studentId,
      installmentIndex: idx,
      studentPaid: allPaid,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const dashboard = async (req, res) => {
  try {
    const { collegeName, batch, programName, technology } = req.query;
    const match = {};
    if (collegeName) match.collegeName = collegeName;
    if (batch) match.batch = batch;
    if (programName) match.programName = programName;
    if (technology) match.technology = technology;

    const groups = await FeeGroup.find(match).lean();

    let totalAssigned = 0;
    let totalPaid = 0;
    let paidStudents = 0;
    let totalStudents = 0;

    groups.forEach((g) => {
      (g.students || []).forEach((s) => {
        totalStudents++;
        totalAssigned += s.totalFee || 0;
        totalPaid += s.paidAmount || 0;
        if ((s.paidAmount || 0) >= (s.totalFee || 0)) paidStudents++;
      });
    });

    res.json({
      totalAssigned,
      totalPaid,
      toBePaid: totalAssigned - totalPaid,
      paidStudents,
      totalStudents,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listStudentFees = async (req, res) => {
  try {
    const { collegeName, batch, programName, technology } = req.query;
    const match = {};
    if (collegeName) match.collegeName = collegeName;
    if (batch) match.batch = batch;
    if (programName) match.programName = programName;
    if (technology) match.technology = technology;

    const groups = await FeeGroup.find(match)
      .populate("students.student", "name usn email profilePic")
      .populate("students.paymentHistory.by", "name email")
      .lean();
    
    
    console.log("group data",groups)
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const installmentsSummary = async (req, res) => {
  try {
    const { collegeName, batch, programName, technology } = req.query;
    const match = {};
    if (collegeName) match.collegeName = collegeName;
    if (batch) match.batch = batch;
    if (programName) match.programName = programName;
    if (technology) match.technology = technology;

    const groups = await FeeGroup.find(match).lean();

    const totalAssigned = [0, 0, 0];
    const totalPaid = [0, 0, 0];
    const paidCount = [0, 0, 0];
    const totalStudents = { count: 0 };

    groups.forEach((g) => {
      (g.students || []).forEach((s) => {
        totalStudents.count++;
        for (let i = 0; i < 3; i++) {
          const it = (s.installments || [])[i] || {
            amount: 0,
            status: "Pending",
          };
          const amt = Number(it.amount || 0);
          totalAssigned[i] += amt;
          if (it.status === "Paid") {
            totalPaid[i] += amt;
            paidCount[i]++;
          }
        }
      });
    });

    const toBePaid = totalAssigned.map((a, idx) => a - totalPaid[idx]);
    res.json({
      totalAssigned,
      totalPaid,
      toBePaid,
      paidCount,
      totalStudents: totalStudents.count,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const paidStudentsForInstallment = async (req, res) => {
  try {
    const { index } = req.params;
    const idx = Number(index);
    if (![0, 1, 2].includes(idx))
      return res.status(400).json({ error: "invalid index" });

    const { collegeName, batch, programName, technology } = req.query;
    const match = {};
    if (collegeName) match.collegeName = collegeName;
    if (batch) match.batch = batch;
    if (programName) match.programName = programName;
    if (technology) match.technology = technology;

    const groups = await FeeGroup.find(match)
      .populate("students.student", "name usn email profilePic")
      .lean();
    const rows = [];
    groups.forEach((g) => {
      (g.students || []).forEach((s) => {
        const it = (s.installments || [])[idx];
        if (it && it.status === "Paid") {
          rows.push({
            groupId: g._id,
            groupName: g.name,
            student: s.student
              ? {
                  id: s.student._id,
                  name: s.student.name,
                  usn: s.student.usn,
                  email: s.student.email,
                  profilePic: s.student.profilePic,
                }
              : { id: s.student, name: null },
            installmentIndex: idx,
            amount: it.amount || 0,
            paidOn: it.paidOn || null,
          });
        }
      });
    });

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// export const recordPayment = async (req, res) => {
//   try {
//     const { id } = req.params; // FeeGroup ID
//     const studentId = req.body?.studentId || req.params.studentId;
//     const { amount } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: "Invalid payment amount" });
//     }

//     const group = await FeeGroup.findById(id);
//     if (!group) return res.status(404).json({ error: "Group not found" });

//     const studentEntry = group.students.find((s) => {
//       const sid =
//         s.student && (s.student._id || s.student.id)
//           ? String(s.student._id || s.student.id)
//           : String(s.student);
//       return sid === String(studentId);
//     });

//     if (!studentEntry)
//       return res.status(404).json({ error: "Student not found in any group" });

//     // Ensure numeric values
//     studentEntry.totalFee = Number(studentEntry.totalFee || 0);
//     studentEntry.paidFee = Number(studentEntry.paidFee || 0);

//     // Recalculate currentFee before applying new payment
//     studentEntry.currentFee = studentEntry.totalFee - studentEntry.paidFee;

//     // Calculate amount to apply
//     const apply = Math.min(amount, studentEntry.currentFee);

//     // Update paidFee and currentFee
//     studentEntry.paidFee += apply;
//     studentEntry.currentFee -= apply;
//     console.log(
//       "here is the data",
//       studentEntry.totalFee,
//       studentEntry.currentFee,
//       studentEntry.paidFee
//     );
//     // Update status
//     studentEntry.status = studentEntry.currentFee <= 0 ? "Paid" : "Pending";

//     // Initialize paymentHistory array if needed
//     if (!Array.isArray(studentEntry.paymentHistory))
//       studentEntry.paymentHistory = [];

//     // Add payment history
//     if (apply > 0) {
//       studentEntry.paymentHistory.push({
//         amount: apply,
//         by: req.user?.id || null,
//         paidOn: new Date(),
//       });
//     }

//     await group.save();

//     res.json({
//       success: true,
//       studentId,
//       totalFee: studentEntry.totalFee,
//       paidFee: studentEntry.paidFee,
//       currentFee: studentEntry.currentFee,
//       status: studentEntry.status,
//       paymentHistory: studentEntry.paymentHistory,
//     });
//   } catch (err) {
//     console.error("[recordPayment] error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };


export const recordPayment = async (req, res) => {
  try {
    console.log("welcome to recordpayment")
    console.log(" recordPayment called with", req.params, req.body, req.file);
    const { id, studentId } = req.params;
    const { amount, paymentMode, transactionId, remark } = req.body;
    
    if (!amount || amount <= 0)
      return res.status(400).json({ error: "Invalid payment amount" });

    if (!paymentMode)
      return res.status(400).json({ error: "Payment mode required" });

    if (paymentMode === "online" && !transactionId)
      return res.status(400).json({ error: "Transaction ID required for online payment" });

    const group = await FeeGroup.findById(id);
    if (!group) return res.status(404).json({ error: "Group not found" });

    const studentEntry = group.students.find(
      (s) => String(s.student) === String(studentId)
    );
    if (!studentEntry)
      return res.status(404).json({ error: "Student not found in group" });

    // Calculate payable amount
    const payable = studentEntry.totalFee - studentEntry.paidFee;
    const applied = Math.min(Number(amount), payable);

    studentEntry.paidFee += applied;
    studentEntry.currentFee = studentEntry.totalFee - studentEntry.paidFee;
    studentEntry.status = studentEntry.currentFee <= 0 ? "Paid" : "Pending";

    // Prepare receipt file storage
    const receiptPath = req.file ? req.file.filename : "";

    // Push payment history entry
    studentEntry.paymentHistory.push({
      amount: applied,
      by: req.user?.id || null,
      paidOn: new Date(),
      paymentMode,
      transactionId: transactionId || "",
      remark: remark || "",
      receipt: receiptPath,
    });

    await group.save();

    res.json({
      success: true,
      msg: "Payment recorded successfully",
      studentId,
      paidFee: studentEntry.paidFee,
      currentFee: studentEntry.currentFee,
      status: studentEntry.status,
      history: studentEntry.paymentHistory,
    });

  } catch (err) {
    console.error("recordPayment error:", err);
    res.status(500).json({ error: err.message });
  }
};
