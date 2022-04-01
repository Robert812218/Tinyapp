const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
const bcrypt = require("bcrypt");
const { addListener } = require("nodemon");
app.use(bodyParser.urlencoded({extended: true}));
 
app.set("view engine", "ejs");
 
const urlDatabase = {
 "b2xVn2": "http://lighthouselabs.ca",
 "9sm5xK": "http://google.com",
 "S152tx": "https://www.tsn.ca",
};
 
const users = {
 "userRandomID": {
   id: "userRandomID",
   email: "user@example.com",
   password: "purple-monkey-dinosaur"
 },
"user2RandomID": {
   id: "user2RandomID",
   email: "user2@example.com",
   password: "dishwasher-funk"
 }
};
 
app.use(cookieSession({
 name: 'session',
 keys: ['BOBDONALD'],
 
 // Cookie Options
 maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
 
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
 
function getUserByEmail(userEmail, data) {
 for (const i in data) {
   if (i === userEmail) {
     return true;
   }
 }
 return false;
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
 
app.get("/register", (req, res) => {
 if (!newUserEmail || !newUserPass) {
   res.status(400).send("Invalid email and/or password.");
 } else if (checkUserByEmail(newUserEmail, urlDatabase)) {
   res.status(403).send("User already exists");
 } else {
   let templateVars = {
     user: users[req.session.userID],
   }
   res.render("urls_register");
 }
 })
 
app.get('/login', (req, res) => {
 let userCheck = req.session.userID;
 const templateVars = { urls: urlDatabase };
 res.render("urls_login", templateVars);
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
 const { longURL } = req.body;
 urlDatabase[str] = longURL;
 res.redirect(`/urls/${str}`);
});
 
app.post("/urls/:shortURL/delete", (req, res) => {
 const tingID = req.params.shortURL;
 for (const i in urlDatabase) {
   if (i === tingID) {
     delete urlDatabase[tingID];
   }
 }
 res.redirect('/urls');
});
 
app.post('/urls/:shortURL', (req, res) => {
 const shortID = req.params.shortURL;
 const longID = req.body.url;
 
 urlDatabase[shortID] = longID;
  res.redirect('/urls');
});
 
app.post('/register', (req, res) => {
 const newUserEmail = req.body.newUser;
 const newUserPass = req.body.newPass;
 let userID = generateRandomString(6);
  if (!newEmail || !newPassword) {
   res.status(400).send("Enter a valid email and password");
 } else if (newEmail && newPassword) {
   users[newUser] = {
     id: userID,
     email: newEmail,
     password: 'password'
   }
   req.session.currentUser = userID;
   res.redirect('/urls');
 }
});
 
app.post('/login', (req, res) => {
 const userMail = req.body.user-email;
 const userPass = req.body.user-password;
 
 console.log(`Mail: ${userMail} \n Pass: ${userPass}`);
 
 if (!getUserByEmail(userMail, users)) {
   res.status(403).send("No account with this email has been found.");
 } else {
   let currentUser = getUserByEmail(userMail, users);
   console.log("current user: " + currentUser);
 }
 
 
 // res.redirect('/login');
});
 
app.listen(PORT, () => {
 console.log(`Example app listening on port ${PORT}!`);
});
 
 
