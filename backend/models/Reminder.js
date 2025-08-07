const mongoose = require("mongoose");

const ReminderSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminder", ReminderSchema);

module.exports = Reminder;
