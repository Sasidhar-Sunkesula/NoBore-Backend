const express = require("express");
const {
  getVideos,
  addVideo,
  removeVideo,
} = require("../controllers/watchListController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all watchlist routes
router.use(requireAuth);

// GET all videos in watchlist
router.get("/:email", getVideos);


// POST a new watchlist video
router.post("/", addVideo);

// DELETE a video from watchlist
router.delete("/removeFromList/:email/:videoId", removeVideo);

module.exports = router;
