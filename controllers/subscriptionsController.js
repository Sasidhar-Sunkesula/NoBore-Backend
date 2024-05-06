const subscriptionsModel = require("../models/subscriptionsModel");

// get all subscriptions

const getSubscriptions = async (req, res) => {
  const { email } = req.params;
  const subscriptions = await subscriptionsModel
    .find({ email })
    .sort({ createdAt: -1 });
  res.status(200).json(subscriptions);
};

const addSubscription = async (req, res) => {
  try {
    const { email, channelName } = req.body;
    const subscriptions = await subscriptionsModel.create({
      email,
      channelName,
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const removeSubscription = async (req, res) => {
  const { email, channelName } = req.body;

  try {
    const removeSubscription = await subscriptionsModel.findOneAndDelete({
      email,
      channelName,
    });
    res.status(200).json(removeSubscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSubscriptions,
  addSubscription,
  removeSubscription,
};
