const User = require('../models/user.model');


// const addUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, role, shippingAddresses } = req.body;

//     // Validate required fields
//     if (!firstName || !lastName || !email || !password) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Create new user instance
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password,
//       role: role || undefined, // optional: use default if not provided
//       shippingAddresses: shippingAddresses || [] // optional
//     });

//     // Save to MongoDB
//     const savedUser = await newUser.save();

//     res.status(201).json({
//       message: 'User saved to MongoDB successfully',
//       data: savedUser
//     });

//     console.log('✅ Saved user:', savedUser);

//   } catch (err) {
//     console.error('Error saving user:', err);
//     // Handle duplicate email error
//     if (err.code === 11000 && err.keyPattern.email) {
//       return res.status(409).json({ message: 'Email already exists' });
//     }
//     res.status(500).json({ message: 'Server error' });
//   }
// }

const addUser = async (req, res) => {
  const { firstName, lastName, email, password, confirm_password, role, shippingAddresses } = req.body;
  const newErrors = {};

  // Validation for First Name
  if (!firstName || !firstName.trim()) {
    newErrors.firstName = 'First Name is required';
  } else {
    const nameRegex = /^[a-zA-Z\s]{2,15}$/;
    if (!nameRegex.test(firstName.trim())) {
      newErrors.firstName = 'Invalid First Name';
    }
  }

  // Validation for Last Name
  if (!lastName || !lastName.trim()) {
    newErrors.lastName = 'Last Name is required';
  } else {
    const nameRegex = /^[a-zA-Z\s]{2,15}$/;
    if (!nameRegex.test(lastName.trim())) {
      newErrors.lastName = 'Invalid Last Name';
    }
  }

  // Validation for Email
  if (!email || !email.trim()) {
    newErrors.email = 'Email is required';
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]{3,64}@[a-zA-Z0-9.-]{2,255}\.[a-zA-Z]{2,63}$/;
    if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Invalid Email';
    }
  }

  // Validation for Password
  if (!password || !password.trim()) {
    newErrors.password = 'Password is required';
  } else {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?])[A-Za-z\d!@#$%^&*(),.?]{8,64}$/;
    if (!passwordRegex.test(password.trim())) {
      newErrors.password = 'Invalid password';
    }
  }

  // Validation for Confirm Password
  // if (password !== confirm_password) {
  //   newErrors.confirm_password = 'Passwords do not match';
  // }

  // If there are validation errors, return them
  if (Object.keys(newErrors).length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: newErrors,
    });
  }

  try {
    // Create new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || undefined, // optional: use default if not provided
      shippingAddresses: shippingAddresses || [], // optional
    });

    // Save to MongoDB
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User saved to MongoDB successfully',
      data: savedUser,
    });

    console.log('✅ Saved user:', savedUser);
  } catch (err) {
    console.error('Error saving user:', err);

    // Handle duplicate email error
    if (err.code === 11000 && err.keyPattern.email) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};


const checkEmail = async (req, res) => {
  try {
    const { email } = req.body; // Get the email from the request body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' }); // If email is not provided, return an error
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the email exists in the database, return a response indicating it is taken
      return res.status(409).json({ message: 'User with same email already exists!' });
    }

    // If email does not exist, return a success message
    return res.status(200).json({ message: 'valid' });

  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {addUser , checkEmail};