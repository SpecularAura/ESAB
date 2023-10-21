const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const sessionUser = serializeSessionUser(foundUser);
    req.session.user = sessionUser;
    // Send authorization roles and access token to user
    res.json({ ...sessionUser });
  } else {
    res.sendStatus(401);
  }
};

// Helper Functions
const serializeSessionUser = (user) => ({
  userId: user._id,
  username: user.username,
  profilePic: user.profilePic,
  roles: Object.values(user.roles).filter(Boolean),
});

module.exports = { handleLogin };
