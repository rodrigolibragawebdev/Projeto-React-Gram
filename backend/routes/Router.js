const express = require("express");
const router = express();

// api distribution
router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));

// test route
router.get("/", (req, res) => {
  res.send("API WORKING");
});

module.exports = router;
