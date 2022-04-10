const express = require("express");
const { getUserByEmail, getUserPassword, getUserByID, generateRandomString, urlsForUser, cookieCheck } = require("./helpers");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const { addListener } = require("nodemon");
const { cookie } = require("express/lib/response");
 
app.set("view engine", "ejs");
 
const urlDatabase = {
 "b2xVn2": {
   longURL: "http://lighthouselabs.ca",
   userID: "aJ48lW"
 },

 "9sm5xK": {
   longURL: "http://google.com",
   userID: "aGxN2r"
 },

 "S152tx": {
   longURL: "https://www.tsn.ca",
   userID: "6JxwVp"
 },
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
 
app.get("/", (req, res) => {
  if (req.session.userID) {
    res.redirect("/urls");
  } else {
    res.redirect("/login");
  }
});
 
app.get("/urls/new", (req, res) => {
 if (cookieCheck(req.session.currentUser, users));
 

 res.render("urls_new");
});
 
app.get("/urls.json", (req, res) => {
 res.json(urlDatabase);
});
 
app.get("/hello", (req, res) => {
 res.send("<html><body>Hello <b>World</b></body></html>\n");
});
 
app.get("/register", (req, res) => {
  res.render("urls_register");
});
 
app.get('/login', (req, res) => {
 let userCheck = req.session.currentUser;
 const templateVars = { urls: urlDatabase };
 res.render("urls_login");
});
 
app.get("/urls", (req, res) => {

  if (cookieCheck(req.session.currentUser, users)) {
    const templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
  } else {
    res.redirect("/login");
  }
  
});
 
app.get("/urls/:shortURL", (req, res) => {
 
 const shortURL = req.params.shortURL;
 const longURL = urlDatabase[shortURL].longURL;
 console.log(`shortURL: ${shortURL} \n longURL: ${longURL}`);
 const templateVars = {
   shortURL, longURL
 };

 res.render("urls_show", templateVars);
});
 
app.post("/urls", (req, res) => {
 const str = generateRandomString(6);
 const { longURL } = req.body;
  urlDatabase[str] = { longURL,
      userID: req.session.currentUser,
};
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
 
  urlDatabase[shortID] = { 
    longURL: longID,
    userID: req.session.currentUser,
  };
  res.redirect('/urls');
});
 
app.post('/register', (req, res) => {
 const newUserEmail = req.body.newUser;
 const newUserPass = req.body.newPass;

 let userID = generateRandomString(6);
  if (!newUserEmail || !newUserPass) {
   res.status(400).send("Enter a valid email and password");
 } else if (newUserEmail && newUserPass) {
   users[userID] = {
     id: userID,
     email: newUserEmail,
     password: bcrypt.hashSync(newUserPass, 15),
   };
   
   req.session.currentUser = userID;
   res.redirect('/urls');
  }
});
 
app.post('/login', (req, res) => {
 const userMail = req.body.email;
 const userPass = req.body.password;
 const storedUser = getUserByEmail(userMail, users);
 
 if (!getUserByEmail(userMail, users)) {
   res.status(403).send("No account with this email has been found.");
 } else {
   if (storedUser.password !== userPass) {
     res.status(403).send("Incorrect password.");
   } else {
     res.redirect("/urls");
   } 
  }
});

app.listen(PORT, () => {
 console.log(`Example app listening on port ${PORT}!`);
});