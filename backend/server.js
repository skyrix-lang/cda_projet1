const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000
const app = express();

const cors = require('cors');

app.use(cors()); // To accept CORS requests

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/user_pending.routes.js")(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});