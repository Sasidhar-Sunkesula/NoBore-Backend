const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriptionsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    channelName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriptions", subscriptionsSchema);
