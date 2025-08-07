const express = require("express");
const {
  // getNotes: getNotes,
  // getNote: getNote,
  addReminder: addReminder,
  editNote: editNote,
  deleteNote: deleteNote,
  getRemindersForUser: getRemindersForUser,
} = require("../controllers/reminder");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const mapReminder = require("../helpers/mapReminder");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.USER]),
  async (req, res) => {
    try {
      const reminders = await getRemindersForUser(req.user.id);

      res.send({ error: null, data: reminders.map(mapReminder) });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

// router.get("/all", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
//   try {
//     const { notes, lastPage } = await getNotes(
//       req.query.search,
//       req.query.limit,
//       req.query.page
//     );

//     res.send({ error: null, data: { lastPage, notes: notes.map(mapNote) } });
//   } catch (e) {
//     res.send({ error: e.message || "Unknown error" });
//   }
// });

// router.get("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
//   try {
//     const note = await getNote(req.params.id);

//     res.send({ error: null, data: mapNote(note) });
//   } catch (e) {
//     res.send({ error: e.message || "Unknown error" });
//   }
// });

router.post(
  "/",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.USER]),
  async (req, res) => {
    try {
      const newReminder = await addReminder({
        title: req.body.title,
        content: req.body.content,
        author_id: req.body.authorId,
      });

      res.send({ error: null, data: mapReminder(newReminder) });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.USER]),
  async (req, res) => {
    try {
      const updatedNote = await editNote(req.params.id, {
        title: req.body.title,
        content: req.body.content,
      });

      res.send({ error: null, data: mapReminder(updatedNote) });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.USER]),
  async (req, res) => {
    try {
      await deleteNote(req.params.id);

      res.send({ error: null });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

module.exports = router;
