const express = require("express");

const {
  getSubscriptions,
  addSubscription,
  removeSubscription,
} = require("../controllers/subscriptionsController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all subscription routes
router.use(requireAuth);

// GET all subscriptions
router.get("/:email", getSubscriptions);

// POST a new subscription
router.post("/", addSubscription);

// DELETE a subscription
router.delete("/removeFromList", removeSubscription);

module.exports = router;
