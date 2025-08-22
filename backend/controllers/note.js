const Note = require("../models/Note");

async function addNote(note) {
  const newNote = await Note.create(note);

  if (!newNote) {
    throw new Error("Error load data");
  }

  return newNote;
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

async function getNotesForUser(userId) {
  const notes = await Note.find({
    author_id: userId,
  }).sort({ createdAt: -1 });

  if (!notes) {
    throw new Error("Error load data");
  }

  return notes;
}

async function getNotes(search = "", limit = 10, page = 1, sortOrder = "asc") {
  const order = sortOrder === "asc" ? 1 : -1;

  const [notes, count] = await Promise.all([
    Note.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: order }),
    Note.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    notes: notes,
    lastPage: Math.ceil(count / limit),
  };
}

function getNote(id) {
  if (!id) {
    throw new Error("Error load data");
  }
  return Note.findById(id);
}

module.exports = {
  addNote,
  editNote,
  deleteNote,
  getNotes,
  getNote,
  getNotesForUser,
};
