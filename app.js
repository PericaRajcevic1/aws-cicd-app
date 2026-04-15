const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Aplikacija radi!");
});

const port = 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
