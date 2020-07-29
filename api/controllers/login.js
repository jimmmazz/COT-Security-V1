const bcrypt = require('bcrypt');
const User = require('../models/users');

exports.userLogin = async (req, res, next) => {
  const email = req.body.email.trim().toLowerCase();
  const user = await User.findOne({ email: email }, async (err, user) => {
    if (!user) {
      res.status(401).json({
        message: 'Unauthorized',
      });
      console.log(err);
      // return;
    } else {
      const pwMatch = await bcrypt.compare(req.body.password, user.password);

      if (pwMatch) {
        res.status(200).json({
          message: 'Logged In',
          pwMatch,
        });
        // passes verified user to supervisor area or region to check based on schedule
        isSupervisor(user);
      } else {
        res.status(401).json({
          message: 'Unauthorized',
          pwMatch,
        });
      }
    }
  });
};

function isSupervisor(user) {
  console.log(user);
}
