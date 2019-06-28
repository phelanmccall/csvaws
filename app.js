var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer'),
    multerS3 = require('multer-s3');
const S3BUCKET = 'csvchallenge';

var aws = require('aws-sdk');
aws.config = new aws.Config();
aws.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
aws.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
aws.config.region = "us-west-1";
aws.config.logger = console;
var lambda = new aws.Lambda();
var s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3BUCKET,
    key: function (req, file, cb) {

      let fileType = file.originalname.split(".").pop();
      console.log(fileType);
      cb(null, `${fileType}/${file.originalname}`); //use Date.now() for unique file keys
    }
  })
});





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
require('./routes/routes')(app, lambda, s3, upload);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
