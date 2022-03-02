const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://lighthouselabs.ca",
  "9sm5xK": "http://google.com",
  "S152tx": "https://www.tsn.ca",
};

function generateRandomString(inp) {
  let check = inp;
  let potentialChars = "abcdefghij1234567890klmnopqrstuvwxyz1234567890";
  let str = "";
  let max = potentialChars.length;
  
  while (inp > 0) {
    let spot = Math.floor(Math.random() * max);
    str += potentialChars[spot];
    inp--;
  }
  return (check > 0 ? str : "Invalid string length");
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});



app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {

  console.log(urlDatabase);
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  const templateVars = { 
    shortURL, longURL 
  };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  const str = generateRandomString(6);
  console.log(str);
  console.log(req.body);
  const { longURL } = req.body;
  console.log(longURL);
  urlDatabase[str] = longURL;
  console.log(urlDatabase);
  res.redirect(`/urls/${str}`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});