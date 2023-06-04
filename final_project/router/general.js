const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register/",(req,res)=>{
    const username = req.query.username;
    const password = req.query.password;

    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User registered"});
      } else {
        return res.status(404).json({message: "Existing user"});
      }
    }
    return res.status(404).json({message: "Registration unsuccessful"});
});

// Get the book list available in the shop - tack 1
public_users.get("/", function (req, res) {
    res.send(JSON.stringify({ books }, null, 4))

  });


// Get book details based on ISBN - task 2
public_users.get("/isbn/:isbn", function (req, res) {
    const bookISBN = req.params.isbn;
    res.send(books[bookISBN]);
  });
  
  
// Get book details based on author - task 3
public_users.get("/author/:author", function (req, res) {
    const author = req.params.author;
  });


// Get all books based on title - task 4
public_users.get("/title/:title", function (req, res) {
    const title = req.params.title;
});

//  Get book review - task 5
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"])
});

module.exports.general = public_users;
