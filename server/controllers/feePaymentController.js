import FeePayment from "../models/feePayment.js";
import User from "../models/user.js";

// Create multiple fee records (payload: [{ studentId, amount, status, collegeName, batch, programName, technology }])
export const createFeePayments = async (req, res) => {
  try {
    const payload = req.body;
    if (!Array.isArray(payload) || payload.length === 0) return res.status(400).json({ error: "Array payload required" });

    const markedBy = req.user?.id;
    // We'll upsert a single document per student+college+batch+program+technology
    const ops = payload.map(p => {
      const filter = {
        student: p.studentId,
        collegeName: p.collegeName,
        batch: p.batch,
        programName: p.programName,
        technology: p.technology
      };
      const update = {
        $set: {
          amount: p.amount,
          status: p.status || 'Pending',
          markedBy,
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      };
      return {
        updateOne: {
          filter,
          update,
          upsert: true
        }
      };
    });

    const bulk = await FeePayment.bulkWrite(ops);
    // bulkWrite doesn't give exact inserted count uniformly; return summary
    res.json({ matchedCount: bulk.matchedCount || 0, upsertedCount: bulk.upsertedCount || 0, modifiedCount: bulk.modifiedCount || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List fee payments with optional filters (collegeName, batch, programName, technology, studentId)
export const listFeePayments = async (req, res) => {
  try {
    const { collegeName, batch, programName, technology, studentId } = req.query;
    // Return latest payment per student for the given filters
    const match = {};
    if (collegeName) match.collegeName = collegeName;
    if (batch) match.batch = batch;
    if (programName) match.programName = programName;
    if (technology) match.technology = technology;
    if (studentId) match.student = typeof studentId === 'string' ? require('mongoose').Types.ObjectId(studentId) : studentId;

    const agg = [
      { $match: match },
      { $sort: { createdAt: -1 } },
      // use $$ROOT and ensure we don't try to replaceRoot with a null doc
      { $group: { _id: "$student", doc: { $first: "$$ROOT" } } },
      { $match: { doc: { $ne: null } } },
      { $replaceRoot: { newRoot: "$doc" } },
      { $lookup: { from: 'users', localField: 'student', foreignField: '_id', as: 'student' } },
      { $unwind: { path: '$student', preserveNullAndEmptyArrays: true } }
    ];

    const records = await FeePayment.aggregate(agg);
    
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update fee status (id param) - body: { status: 'Paid' }
export const updateFeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) return res.status(400).json({ error: 'id required' });
    if (!['Pending','Paid'].includes(status)) return res.status(400).json({ error: 'invalid status' });

    const update = { status };
    if (status === 'Paid') update.paidOn = new Date();

    const fp = await FeePayment.findByIdAndUpdate(id, update, { new: true });
    res.json(fp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
