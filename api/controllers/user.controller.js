const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(async (hash) => {
    User.findOne({ username: req.body.username }, async (err, user2) => {
      const user = new User({
        username: req.body.username,
        password: hash,
      });

      if (user2)
        return res
          .status(500)
          .json({ message: "Le nom d'utilisateur existe déjà." });

      try {
        await user.save();
        token = user.generateJwt();
        res.status(200).json({ userId: user._id, token });
      } catch (e) {
        res.status(500).json({ message: "Une erreur est survenue." });
      }
    });
  });
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (!user) {
      return res
        .status(401)
        .json({ message: "Le login ou le mot de passe est incorrect." });
    }
    token = user.generateJwt();
    res.status(200).json({ userId: user._id, token });
  })(req, res);
};
