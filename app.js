const express = require("express");
const path = require('path')
const app = express()
const bodyParser = require("body-parser");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const routes = require("./routes")
const Promise = require('bluebird');
const chalk = require('chalk');


//requirements
nunjucks.configure("views", { noCache: true });
app.engine("html", nunjucks.render);
app.set("view engine", "html");

const models = require('./models');

Promise.all([
  models.Place.sync({}),
  models.Hotel.sync({}),
  models.Activity.sync({}),
  models.Restaurant.sync({})
])
.then(function() {
  app.listen(3000, function(){
    console.log(chalk.magenta("server is listening"));
  })
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '/public')))
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')))
// app.use('/bootstrap', function (req, res) {
//   let extension = req.originalUrl.split('.').slice(-1).join('')
//   console.log(extension)
//   var localPath = path.join(__dirname, '/node_modules/bootstrap/dist', extension, 'bootstrap.min.'+extension)
//   express.static(localPath)
// })
//routes
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jQuery/tmp/')))


app.use(function(req, res, next) {
  const err = new Error('Nothing found here!!!');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status = err.status || 500;
  res.render('error');
})
