const express = require("express");
const router = express.Router();
const userControler = require("../controllers/user.controller");
const passport = require("passport");

router.post("/signup", userControler.signUp);

router.post("/login", userControler.login);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res
      .status(200)
      .json({
        success: true,
        msg: "You are successfully authenticated to this route!",
      });
  }
);

module.exports = router;
