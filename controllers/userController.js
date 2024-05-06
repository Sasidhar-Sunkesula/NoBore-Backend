const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, watchList: user.watchList, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToList = async (req, res) => {
  const { email, video } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $push: { watchList: video } },
      { new: true } // This option returns the updated document
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ email, watchList: user.watchList });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const removeFromList = async (req, res) => {
  const { email, videoId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { watchList: { id: videoId } } },
      { new: true } // This option returns the updated document
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ email, watchList: user.watchList });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, addToList, removeFromList };
