const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  Register,
  Login,
  getUser,
  addProfile,
} = require("../controllers/authController");
const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/register", Register);
router.post("/profile", upload.single("profile"), addProfile);
router.post("/login", Login);

router.get("/user/get", auth(), getUser);

module.exports = {
  routes: router,
};
