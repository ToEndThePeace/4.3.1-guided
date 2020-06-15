module.exports = (req, res, next) => {
  if (req.session.user) {
    //DOES say my lib works, but doesn't authenticate
    next();
  } else {
    res.status(401).json({ message: "Authentication required." });
  }
};
