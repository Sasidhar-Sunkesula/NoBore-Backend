const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const watchListSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    video: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WatchList", watchListSchema);
