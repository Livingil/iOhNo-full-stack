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

// async function getNotes(search = "", limit = 10, page = 1) {
//   const [notes, count] = await Promise.all([
//     Note.find({ title: { $regex: search, $options: "i" } })
//       .limit(limit)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 }),
//     Note.countDocuments({ title: { $regex: search, $options: "i" } }),
//   ]);

//   if (!notes || !count) {
//     throw new Error("Error load data");
//   }

//   return {
//     notes: notes,
//     lastPage: Math.ceil(count / limit),
//   };
// }

// function getNote(id) {
//   if (!id) {
//     throw new Error("Error load data");
//   }
//   return Note.findById(id);
// }

module.exports = {
  addReminder: addReminder,
  editNote: editNote,
  deleteNote: deleteNote,
  // getNotes: getNotes,
  // getNote: getNote,
  getRemindersForUser: getRemindersForUser,
};
