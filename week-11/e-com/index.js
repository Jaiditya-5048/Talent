const express = require('express');
const dotenv = require('dotenv');
const app =  express();
const router = express.Router();
const User = require('./models/user.model');
const fs = require('fs');
const { json } = require('stream/consumers');

const mongoose = require('mongoose');
const { route } = require('./routes/route');

mongoose.connect('mongodb://localhost:27017/e-commerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


app.use(express.json());

dotenv.config();


app.use('/user' , route);







app.listen(process.env.PORT || 3000, () => { console.log('server is running on port =>', process.env.PORT) })










// app.get('/', (req, res) => {
//   try {
//     const data = fs.readFileSync('./db/db.json', 'utf-8');
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.write(data);
//     res.end();
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post('/users',(req,res)=>{
//  const users= req.body;
//  console.log(users)
//   res.status(200).json({ message: "ok" });
// })



// app.post('/post', (req, res) => {
//   try {
//     const newData = req.body;
//     const {firstName,lastName,email,password}=req.body;
//     if(!newData) {
//       res.status(400).json({ message: 'empty user' });
//     } else {

//     // Read data
//     const fileData = fs.readFileSync('./db/db.json', 'utf-8');
//     const jsonArray = JSON.parse(fileData);

//     // Add data
//     jsonArray.push(newData);

//     // saving new array to db
//     fs.writeFileSync('./db/db.json', JSON.stringify(jsonArray, null, 2), 'utf-8');

//     res.status(200).json({ message: 'Data appended successfully', data: newData });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
///////////////////////////////////////////////////////////////////////////////////////////////
// app.post('/post', async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     if (!firstName || !lastName || !email || !password) {
//       return res.status(400).json({ message: 'Missing fields' });
//     }

//     const newUser = new User({ firstName, lastName, email, password });
//     const savedUser = await newUser.save();

//     res.status(200).json({ message: 'User saved to MongoDB', data: savedUser });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
///////////////////////////////////////////////////////////////////////////////////////////////

// app.post('/post', async (req, res) => {
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
// });
