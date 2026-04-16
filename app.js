const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Perica Rajčević</h1><p>Docker CI/CD aplikacija</p>');
});

app.get('/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.json({ message: "CI/CD radi!", student: "Perica Rajčević" });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
