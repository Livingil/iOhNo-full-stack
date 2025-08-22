const express = require("express");
const {
  getUsers,
  getUser,
  getRoles,
  updateUser,
  deleteUser,
  getUsersForAllNotes,
} = require("../controllers/user");
const hasRole = require("../middlewares/hasRole");
const authenticated = require("../middlewares/authenticated");
const mapUser = require("../helpers/mapUser");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const { search, limit, page, sortOrder } = req.query;

    const { users, lastPage } = await getUsers(search, limit, page, sortOrder);

    res.send({ error: null, data: { lastPage, users: users.map(mapUser) } });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.get(
  "/forAllNotes",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const users = await getUsersForAllNotes();
      res.send({ error: null, data: users.map(mapUser) });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

router.get(
  "/roles",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const roles = getRoles();

      res.send({ error: null, data: roles });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

router.get("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const user = await getUser(req.params.id);

    res.send({ error: null, data: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.USER]),
  async (req, res) => {
    try {
      const newUser = await updateUser(req.params.id, {
        role_id: req.body.roleId,
        city: req.body.city,
        image_url: req.body.image_url,
      });

      res.send({ error: null, data: mapUser(newUser) });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      await deleteUser(req.params.id);

      res.send({ error: null });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

module.exports = router;
