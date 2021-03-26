// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { startDatabase } = require("./database/mongo");
const { insertuser, getusers, getuser } = require("./database/users");
const { body, validationResult } = require("express-validator");

// defining the Express app
const app = express();

// userding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// userding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an endpoint to return all users
app.get("/", async (req, res) => {
  res.send(await getusers());
});

app.get("/user/:id", async (req, res) => {
  res.send(await getuser(req.params.id));
});

// app.post("/addUser", async (req, res) => {
//   const newUser = req.body;
//   const id = await insertuser(newUser);
//   res.send({ message: "New user inserted.", _id: id });
// });

app.post(
  "/addUser",

  body("email").isEmail(),
  body("firstName").isLength({ min: 2 }),
  body("surname").isLength({ min: 2 }),
  body("telephoneNumber").isLength({ min: 8 }),
  body("emailOptIn").isBoolean(),
  body("phoneOptin").isBoolean(),
  body("termAccepted").isBoolean(),
  

  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUser = req.body;
    const id = await insertuser(newUser);
    res.send({ message: "New user inserted.", _id: id });
  }
);

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  await insertuser({ title: "Hello, now from the in-memory database!" });

  // start the server
  app.listen(3001, async () => {
    console.log("listening on port 3001");
  });
});
