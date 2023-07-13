const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bycrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./database/db");

const app = express();

//--------------------------Imports Done-----------

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport); //to use same instance of passport in the entire server

//------------------------Middleware Done----------------------

//Mounting Routes
app.use("/api", require("./api")(passport));

//Start Server
const serverRun = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Live on port: ${process.env.PORT}`);
  });
};

async function main() {
  await db.sync();
  await serverRun();
}

main();
