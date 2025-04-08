const express = require('express');
const app = express();
const PORT = 3000
const fs = require('fs');
app.use(express.json());

app.get("/get", [], (req, res) => {
  return res.json({
    message: "get route"
  })
})

app.get("/get", [], async (req, res) => {
  //file data
  const dataFromFile = fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "server error"
      })

    }
  })

  return res.json({
    message: "get route"
  })
})

const userDetails = JSON.parse(data)
const userId = req.params.id


app.listen(PORT, () => { console.log('server is running on port =>', PORT) })