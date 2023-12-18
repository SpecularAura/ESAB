const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const logoutController = require("../controllers/logoutController");
const registerController = require("../controllers/registerController");

router.get("", (req, res) => {
  res.sendStatus(200);
});

router.post("/login", authController.handleLogin);
router.get("/logout", logoutController.handleLogout);
router.post("/register", registerController.handleNewUser);

module.exports = router;
