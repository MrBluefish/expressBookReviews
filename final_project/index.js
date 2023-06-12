const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

app.use("/customer/auth/*", function auth(req, res, next) {
  // Write the authentication mechanism here
  if (req.session.authenticated) {
    let userToken = req.session.authenticated["accessToken"];

    jwt.verify(userToken, "access", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        res.status(403).json({ message: "User is not authenticated." });
      }
    });
  } else {
    return res.status(403).json({ message: "User is not logged in." });
  }
});

const customerRouter = express.Router();
customerRouter.use(express.urlencoded({ extended: true }));

// Login endpoint
customerRouter.post("/login", (req, res) => {
  const registeredUsers = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
  ];

  const { username, password } = req.body;

  const user = registeredUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Generate JWT token
    const token = jwt.sign({ username: user.username }, "2k2d1w");

    // Save user credentials for the session
    req.session.authenticated = { accessToken: token };

    return res.status(200).json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Mount the customerRouter on the /customer path
app.use("/customer", customerRouter);
app.use("/", genl_routes);

const PORT = 5000;

app.listen(PORT, () => console.log("Server is running"));

