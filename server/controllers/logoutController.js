const handleLogout = async (req, res) => {
  // If no session, Do Nothing
  if (!req.session?.user) {
    res.status(204); //No content
    res.json({
      msg: "Need to be Logged in to Log Out!",
    });
    return;
  }
  // If session, destroy the session to logout
  req.session.destroy((err) => {
    if (err) throw err;
    res.json({
      msg: "Successfully Logged Out",
    });
  });
};

module.exports = { handleLogout };
