const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users');
const userController = require('./user');
const parkController = require('./parks');
const { json } = require('body-parser');

exports.userLogin = async (req, res, next) => {
  const email = req.body.email.trim().toLowerCase();
  await User.findOne({ email: email }, async (err, user) => {
    try {
      if (!user) {
        res.status(401).json({
          message: 'Auth failed',
        });
        console.log(err);
        // return;
      } else {
        const pwMatch = await bcrypt.compare(req.body.password, user.password);

        if (pwMatch) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '8h',
            }
          );

          const cookieOptions = {
            // secure: true, //if 'true' needs https for cookie to be sent
            httpOnly: true,
            expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
          };

          res.cookie('COTAccessJWT', token, cookieOptions);

          if (user.supervisor) {
            userController.isSupervisor(user);
          } else {
            res.redirect(`/users/${user._id}`);
            // res.status(200).json({
            //   message: 'Logged In & cookie sent',
            // });
          }
        } else {
          res.status(401).json({
            message: 'Auth failed',
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  });
};
