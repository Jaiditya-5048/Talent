const { User } = require('../models/user.model');


export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, shippingAddresses } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || undefined, // optional: use default if not provided
      shippingAddresses: shippingAddresses || [] // optional
    });

    // Save to MongoDB
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User saved to MongoDB successfully',
      data: savedUser
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
}