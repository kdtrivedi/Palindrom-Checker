var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var app = express();
const static = express.static(__dirname + "views");
app.use(express.static("asset"));
app.use("views", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/result", (req, res) => {
  var text = req.body["text-to-test"];
  if (text == '') {
    res.status(400);
    res.send("<p class=\"error\"> Error 400. Input text empty. </p>")
  }
  var removeChar = text.replace(/[^A-Z0-9]/ig, "").toLowerCase();
  var checkPalindrome = removeChar.split('').reverse().join('');
  var palindromeF;
    if (removeChar == checkPalindrome) {
      palindromeF = true;
    } else {
      palindromeF = false;
    }
  res.render("result", {
    palindromeF: palindromeF,
    text: text
  });
});

app.listen(3000, () => {
  console.log("server is running!");
  console.log("Routes will be running on http://localhost:3000");
});
