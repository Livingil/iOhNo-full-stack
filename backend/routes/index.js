const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/notes", require("./note"));
router.use("/users", require("./user"));
router.use("/reminders", require("./reminder"));
router.use("/weather", require("./weather"));

module.exports = router;
