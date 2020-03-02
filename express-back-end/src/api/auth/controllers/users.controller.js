const { SignupSchema } = require('../schemas');
const User = require('../models/user.model');
const config = require('../../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (function() {
  const Signup = async (req,res) =>{
    // Validate against schema
    const { error, value:UserData} = SignupSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      res.status(422).json({
        errors: error.details.map(error => ({
          value: error.path,
          message: error.message,
        })),
      });
      return;
    }

    // Check email is not already taken
    const emailAlreadyTaken = await User.findOne({ email: UserData.email });
    if (emailAlreadyTaken) {
      res.status(422).json({
        errors: [{
          value: ["email"],
          message: "Email already taken",
        }]
      });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(UserData.password,salt);

    // Try save and tokenize the user return error if it doesn't work
    const user = new User({
      ...UserData,
      password: hashedPassword,
    });

    try {
      const result = await user.save();
  
      // Tokenize data
      const token = jwt.sign(
        {
          _id: result._id,
          name: result.name,
          email: result.email,
        },
        config.secret,
        {
          expiresIn: '4h',
        },
      );
  
      // return the tokenized user
      res.json({
        token,
      });
    } catch (err) {
      res.status(500).json({
        error: "There was an error creating your user"
      });
      return;
    };
  }

  return {
    Signup,
  };
})();
