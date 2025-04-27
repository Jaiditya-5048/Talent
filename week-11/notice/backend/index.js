const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/mongoDB.config.cjs');
const noticeRouter = require('./routes/notice.route.cjs');
const categoryRouter = require('./routes/category.route.cjs');
const cors = require('cors');
app.use(express.json());
dotenv.config();
connectDB();

const allowedOrigins = ['http://localhost:5173', 'http://192.168.0.19:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));




app.use('/', noticeRouter)
app.use('/', categoryRouter)








app.listen(process.env.PORT || 3000, () => { console.log('server is running on port =>', process.env.PORT) })