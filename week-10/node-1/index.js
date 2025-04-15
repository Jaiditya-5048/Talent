const express = require('express');
const dotenv = require('dotenv');
const app =  express();
// const PORT = 3000;
const fs = require('fs');
const { json } = require('stream/consumers');

app.use(express.json());

dotenv.config();



app.get('/', (req, res) => {
  try {
    const data = fs.readFileSync('./db/db.json', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(data);
    res.end();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/users',(req,res)=>{
 const users= req.body;
 console.log(users)
  res.status(200).json({ message: "ok" });
})



app.post('/post', (req, res) => {
  try {
    const newData = req.body;
    const {firstName,lastName,email,password}=req.body;
    if(!newData) {
      res.status(400).json({ message: 'empty user' }); 
    } else {

    // Read data
    const fileData = fs.readFileSync('./db/db.json', 'utf-8');
    const jsonArray = JSON.parse(fileData);

    // Add data
    jsonArray.push(newData);

    // saving new array to db
    fs.writeFileSync('./db/db.json', JSON.stringify(jsonArray, null, 2), 'utf-8');

    res.status(200).json({ message: 'Data appended successfully', data: newData });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/put', (req, res) => {
  try {
    const newData = req.body;

    // Read data
    const fileData = fs.readFileSync('./db/db.json', 'utf-8');
    const jsonArray = JSON.parse(fileData);

    // Find index
    const index = jsonArray.findIndex(user => user.id === newData.id);

    if (index !== -1) {
      // Replace
      jsonArray[index] = newData;  
    } else {
      // push if not found
      jsonArray.push(newData);
    }
    jsonArray.sort((a, b) => Number(a.id) - Number(b.id));


    // Save back to file
    fs.writeFileSync('./db/db.json', JSON.stringify(jsonArray, null, 2), 'utf-8');

    res.status(200).json({ message: 'Data updated successfully', data: newData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/delete/:id', (req, res) => {
  try {
    const userId = req.params.id;

    const fileData = fs.readFileSync('./db/db.json', 'utf-8');
    let jsonArray = JSON.parse(fileData);

    // Filter on ID
    const newArray = jsonArray.filter(user => user.id !== userId);

    if (jsonArray.length === newArray.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(newArray, null, 2), 'utf-8');

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/patch/:id', (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const fileData = fs.readFileSync('./db/db.json', 'utf-8');
    const jsonArray = JSON.parse(fileData);

    const index = jsonArray.findIndex(user => user.id === userId);

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only provided fields
    jsonArray[index] = {
      ...jsonArray[index],
      ...updates
    };

    fs.writeFileSync('./db/db.json', JSON.stringify(jsonArray, null, 2), 'utf-8');

    res.status(200).json({ message: 'User updated successfully', data: jsonArray[index] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});









app.listen(process.env.PORT, () => { console.log('server is running on port =>', process.env.PORT) })
