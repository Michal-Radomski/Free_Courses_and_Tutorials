export {};
const router = require("express").Router();
import {Response, Request} from "express";

const Secret = require("../models/Secret");

// Routes
// Home Page
router.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  if (req.isAuthenticated()) {
    res.redirect("/secrets");
  } else {
    res.render("home");
  }
});

// Register page
router.get("/register", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  if (req.isAuthenticated()) {
    res.redirect("/secrets");
  } else {
    res.render("register");
  }
});

// Login page
router.get("/login", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  if (req.isAuthenticated()) {
    res.redirect("/secrets");
  } else {
    res.render("login");
  }
});

// Secrets page
router.get("/secrets", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  try {
    const allSecrets = await Secret.find();
    res.render("secrets", {allSecrets, isAuth: req.isAuthenticated()});
  } catch (err) {
    res.send(err);
  }
});

// Submit page
router.get("/submit", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

// Submit Secret to database
router.post("/submit", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  try {
    const secret = new Secret({
      secret: req.body.secret,
      bgColor: req.body.bgColor.substring(1), //* to cut "#"
    });
    // Save secret in DB
    const saveSecret = secret.save();
    // If post request failed -> do:
    !saveSecret && res.redirect("/submit");
    // If secret saved to database -> do:
    res.redirect("/secrets");
  } catch (err) {
    res.send(err);
  }
});

// Like Secret
router.post("/secrets/like", async (req: Request, res: Response) => {
  try {
    // Find the post to like
    const findSecret = await Secret.findById(req.body.likesBtn);
    // Update Likes
    const updateSecretLikes = await findSecret.updateOne({likes: findSecret.likes + 1});
    console.log({updateSecretLikes});
    // Redirect to secrets page
    res.redirect("/secrets");
  } catch (err) {
    res.send(err);
  }
});

//Export router
module.exports = router;
