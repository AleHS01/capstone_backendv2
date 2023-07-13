const express = require("express");
const router = express.Router();

module.exports = (passport) => {
  router.post("/", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.send("Logout successful");
    });
  });

  return router;
};
