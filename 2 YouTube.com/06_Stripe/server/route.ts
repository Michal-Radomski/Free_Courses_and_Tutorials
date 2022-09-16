const router = require("express").Router();

import { stripePayment } from "./controller";

router.post("/payment", stripePayment);

module.exports = router;
