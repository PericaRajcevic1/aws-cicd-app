const express = require('express');
const app = express();

// početna stranica
app.get('/', (req, res) => {
  res.send(`
    <h1>Perica Rajčević</h1>
    <p>Docker CI/CD aplikacija</p>
    <p>Vrijeme: ${new Date().toLocaleString()}</p>
    <a href="/api">API</a>
  `);
});

// API ruta
app.get('/api', (req, res) => {
  res.json({
    student: "Perica Rajčević",
    message: "CI/CD radi!",
    time: new Date().toISOString()
  });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
