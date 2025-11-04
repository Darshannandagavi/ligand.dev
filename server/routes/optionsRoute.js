// routes/options.js
import express from "express";
import Options from "../models/Options.js";


const optionsRouter = express.Router();

// Create option
optionsRouter.post("/", async (req, res) => {
  try {
    const { type, value } = req.body;
    const option = new Options({ type, value });
    await option.save();
    res.json({ message: "Option added", option });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get options by type
optionsRouter.get("/:type", async (req, res) => {
  try {
    const optionType = req.params.type;   // ✅ safer name
   

    const options = await Options.find({ type: optionType });  // field "type" in schema
  

    res.json(options);
  } catch (err) {
    console.error("Error fetching options:", err);
    res.status(400).json({ error: err.message });
  }
});


// Update option
optionsRouter.put("/:id", async (req, res) => {
  try {
    const option = await Options.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(option);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete option
optionsRouter.delete("/:id", async (req, res) => {
  try {
    await Options.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default optionsRouter;
