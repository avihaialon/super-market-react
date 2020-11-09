const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.send({ msg: "Invalid Authentication" });

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) return res.send({ msg: " Authorization not valid" });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.send({ msg: err.message });
  }
};

module.exports = auth;
