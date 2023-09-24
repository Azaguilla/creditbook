const jwt = require('jsonwebtoken');
const user = require('../models/user.model');
const passport = require("passport");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          username: req.body.username,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Le compte a été créé avec succès' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
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
            return res.status(401).json({ message: 'Le login ou le mot de passe est incorrect'});
        }
        token = user.generateJwt();
        res.status(200).json({ userId: user._id, token});
      })(req, res);



    // User.findOne({ username: req.body.username })
    //     .then(user => {
    //         if (!user) {
    //             return res.status(401).json({ message: 'Le login ou le mot de passe est incorrect'});
    //         }
    //         bcrypt.compare(req.body.password, user.password)
    //             .then(valid => {
    //                 if (!valid) {
    //                     return res.status(401).json({ message: 'Le login ou le mot de passe est incorrect' });
    //                 }
    //                 res.status(200).json({
    //                     userId: user._id,
    //                     token: jwt.sign(
    //                         { userId: user._id },
    //                         'ceDctaAsrDIi6LWBx6vkaEFYawj136Nr',
    //                         { expiresIn: '24h' }
    //                     )
    //                 });
    //             })
    //             .catch(error => res.status(500).json({ error }));
    //     })
    //     .catch(error => res.status(500).json({ error }));
 };