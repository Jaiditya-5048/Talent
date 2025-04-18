const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/mongodb.config.cjs');
const noticeRouter = require('./routes/notice.route.cjs');
const cors = require('cors');
app.use(express.json());
dotenv.config();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // URL for frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use('/', noticeRouter)








app.listen(process.env.PORT || 3000, () => { console.log('server is running on port =>', process.env.PORT) })