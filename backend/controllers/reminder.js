const Reminder = require("../models/Reminder");

async function addReminder(reminder) {
  const newReminder = await Reminder.create(reminder);

  if (!newReminder) {
    throw new Error("Error load data");
  }

  return newReminder;
}

async function editNote(id, note) {
  const newNote = await Note.findByIdAndUpdate(id, note, {
    returnDocument: "after",
  });

  if (!newNote) {
    throw new Error("Error load data");
  }
  return newNote;
}

function deleteNote(id) {
  if (!id) {
    throw new Error("Error load data");
  }
  return Note.deleteOne({ _id: id });
}

async function getRemindersForUser(userId) {
  const reminder = await Reminder.find({
    author_id: userId,
  }).sort({ createdAt: -1 });

  if (!reminder) {
    throw new Error("Error load data");
  }

  return reminder;
}

module.exports = {
  addReminder: addReminder,
  editNote: editNote,
  deleteNote: deleteNote,
  getRemindersForUser: getRemindersForUser,
};
