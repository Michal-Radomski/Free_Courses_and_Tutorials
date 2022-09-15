const router = require("express").Router();

const { register, login } = require("../controllers/authController");
const { checkUser } = require("../middlewares/authMiddleware");

router.post("/check", checkUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
