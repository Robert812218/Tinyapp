const getUserByEmail = function(userEmail, data) {
  for (const i in data) {
    if (data[i].email === userEmail) {
      return data[i];
    }
  }
  return false;
 };

const getUserByID = function(userEmail, data) {
   for (const i in data) {
     if (userEmail === data[i].email) {
       return data[i].id;
     }
   }
 }

const getUserPassword = function(userEmail, data) {
   for (const j in data) {
     if (data[j].email === userEmail) {
       return data[j].password;
     }
   }
}

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

function urlsForUser(data) {
  const user = req.session.userID;
  for (const ident in urlDatabase) {
    if (ident === user) {
      return true;
    }
  }
  return false;
};

function cookieCheck(cookie, data) {
  for (const i in data) {
    console.log(i);
    console.log(`cookie: ${cookie}`);
    if (i === cookie) {
      
      return true;
    }
  }
  return false;
}

module.exports = {
  getUserByEmail,
  getUserPassword,
  getUserByID,
  generateRandomString,
  urlsForUser,
  cookieCheck
}