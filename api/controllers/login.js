const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users');
const userController = require('./user');

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

          res.status(200).json({
            message: 'Logged In',
            token,
          });

          // passes verified user to supervisor area or region to check based on schedule
          userController.isSupervisor(user);
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
