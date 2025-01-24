// // backend/routes/api/users.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const { setTokenCookie } = require('../../utils/auth');
// const { User } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const router = express.Router();

// // Validation for signup
// const validateSignup = [
//   check('email')
//     .exists({ checkFalsy: true })
//     .isEmail()
//     .withMessage('Please provide a valid email.'),
//   check('username')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 4 })
//     .withMessage('Please provide a username with at least 4 characters.'),
//   check('username')
//     .not()
//     .isEmail()
//     .withMessage('Username cannot be an email.'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 6 })
//     .withMessage('Password must be 6 characters or more.'),
//   handleValidationErrors,
// ];

// // Sign up route
// router.post(
//   '/',
//   validateSignup,
//   async (req, res, next) => {
//     try {
//       const { firstName, lastName, email, password, username } = req.body;

//       // Check if email already exists
//       const emailExists = await User.findOne({ where: { email } });
//       if (emailExists) {
//         return res.status(403).json({
//           message: 'User already exists',
//           statusCode: 403,
//           errors: {
//             email: 'User with that email already exists',
//           },
//         });
//       }

//       // Check if username already exists
//       const usernameExists = await User.findOne({ where: { username } });
//       if (usernameExists) {
//         return res.status(403).json({
//           message: 'User already exists',
//           statusCode: 403,
//           errors: {
//             username: 'User with that username already exists',
//           },
//         });
//       }

//       // Hash the password
//       const hashedPassword = bcrypt.hashSync(password);

//       // Create the user
//       const user = await User.create({
//         firstName,
//         lastName,
//         email,
//         username,
//         hashedPassword,
//       });

//       // Prepare the safe user object
//       const safeUser = {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         username: user.username,
//       };

//       // Set token cookie
//       await setTokenCookie(res, safeUser);

//       // Respond with the safe user
//       return res.status(201).json({ user: safeUser });
//     } catch (err) {
//       next(err); // Pass any unexpected errors to the error handler
//     }
//   }
// );

// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation for signup
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up route
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, username } = req.body;

      // Check for duplicate email
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(500).json({
          message: 'User already exists',
          statusCode: 500,
          errors: {
            email: 'User with that email already exists',
          },
        });
      }

      // Check for duplicate username
      const usernameExists = await User.findOne({ where: { username } });
      if (usernameExists) {
        return res.status(500).json({
          message: 'User already exists',
          statusCode: 500,
          errors: {
            username: 'User with that username already exists',
          },
        });
      }

      // Hash the password
      const hashedPassword = bcrypt.hashSync(password);

      // Create the user
      const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        hashedPassword,
      });

      // Prepare the safe user object
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      // Set the token cookie
      await setTokenCookie(res, safeUser);

      // Respond with the safe user
      return res.status(201).json({ user: safeUser });
    } catch (err) {
      console.error(err); // Log the error for debugging
      // Catch unexpected errors and send a consistent error response
      return res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500,
      });
    }
  }
);

module.exports = router;
