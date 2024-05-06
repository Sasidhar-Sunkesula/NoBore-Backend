const WatchListModel = require("../models/watchListModel");
const mongoose = require("mongoose");

// get all videos
const getVideos = async (req, res) => {
  const { email } = req.params;
  const watchList = await WatchListModel.find({ email }).sort({
    createdAt: -1,
  });

  res.status(200).json(watchList);
};

const addVideo = async (req, res) => {
  try {
    const { email, video } = req.body;
    const watchList = await WatchListModel.create({ email, video });
    res.status(200).json(watchList);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const removeVideo = async (req, res) => {
  const { email, videoId } = req.params;
  try {
    const watchList = await WatchListModel.findOneAndDelete({ email, videoId });
    res.status(200).json(watchList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVideos,
  addVideo,
  removeVideo,
};
