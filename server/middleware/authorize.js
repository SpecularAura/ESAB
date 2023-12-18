const authorize = (allowedRoles) => {
  return (req, res, next) => {
    console.log(req?.session?.user?.roles);
    console.log(allowedRoles);
    if (!req?.session?.user?.roles)
      return res.status(401).json({ msg: "Not Logged in" });
    const rolesArray = allowedRoles;
    const result = req.session.user.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.status(401).json({ msg: "Unauthorized Access" });
    next();
  };
};

module.exports = authorize;
