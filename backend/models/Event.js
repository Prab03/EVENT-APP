const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String },
    tickets: { type: String, default: "Free" },
    requireApproval: { type: Boolean, default: false },
    capacity: { type: String, default: "Unlimited" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);