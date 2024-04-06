// import library
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
var cors = require('cors')
// import module
const db = require('./config/database');
const route = require('./routes');
//
const app = express();
dotenv.config({ path: "./config.env" });

// middleWare
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // read file in public
app.use(helmet()); // protect header
app.use(mongoSanitize()); //middleware chặn các kiu truy vấn sql
app.use(xss()); //middleware chặn các mã js độc hại
// app.use(hpp());// middleware ngăng ngừa các tham số
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1h chỉ có 100 req quá sẽ báo lỗi
  message: "quá nhiều requet trong 1 h",
});
app.use('/api',limiter);
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(express.json());// parse body, read data from body
app.use(cors())

db();//  kết nối dữ liệu
// router
route(app);

module.exports = app;
