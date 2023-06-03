const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users
