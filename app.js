const express = require("express");
const path = require('path')
const app = express()
const bodyParser = require("body-parser");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const routes = require("./routes")
// const routes = require("./routes")


//requirements
nunjucks.configure("views", { noCache: true });
app.engine("html", nunjucks.render);
app.set("view engine", "html");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')))
//routes
app.use(routes)



app.listen('3000', function() {
  console.log("listening on port 3000")
})

app.use(function(err, reg, res, next) {
  console.log(err)
  res.status(500).send('Sometings wrongss')
})
