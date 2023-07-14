const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bycrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./database/db");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

const sessionStore = new SequelizeStore({ db });

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
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 4 * 60 * 60 * 1000 },
  })
);
app.use(cookieParser("secret"));
require("./config/passportConfig")(passport); //to use same instance of passport in the entire server
app.use(passport.initialize());
app.use(passport.session());
// passport.regenerate = function (req, res, next) {
//   // Manually regenerate the session
//   return new Promise((resolve, reject) => {
//     req.session.regenerate((err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   })
//     .then(() => {
//       // Update the session ID in the Passport session
//       return new Promise((resolve, reject) => {
//         passport.session()(req, res, (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve();
//           }
//         });
//       });
//     })
//     .then(() => {
//       next();
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

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
  await sessionStore.sync();
  await db.sync();
  await serverRun();
}

main();
