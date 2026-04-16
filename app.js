const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const MONGO_URL = process.env.MONGO_URL || null;

if (MONGO_URL) {
  mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB error:', err));
} else {
  console.log('Running without MongoDB (test mode)');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

app.get('/', async (req, res) => {
  let tasks = [];

if (MONGO_URL) {
  tasks = await Task.find().sort({ createdAt: -1 });
}

  const taskItems = tasks.map(task => `
    <li class="task-item">
      <span>${task.text}</span>
      <form method="POST" action="/delete/${task._id}" style="display:inline;">
        <button type="submit" class="delete-btn">Obriši</button>
      </form>
    </li>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="hr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Perica Rajčević - ToDo App</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          min-height: 100vh;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          width: 100%;
          max-width: 850px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.25);
          padding: 36px;
        }
        h1 {
          text-align: center;
          font-size: 42px;
          margin-bottom: 10px;
        }
        .subtitle {
          text-align: center;
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 30px;
        }
        .info-box {
          background: rgba(255,255,255,0.14);
          border-radius: 14px;
          padding: 18px;
          margin-bottom: 24px;
        }
        .form-box {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }
        input[type="text"] {
          flex: 1;
          padding: 14px;
          border-radius: 10px;
          border: none;
          outline: none;
          font-size: 16px;
        }
        button {
          border: none;
          border-radius: 10px;
          padding: 14px 18px;
          cursor: pointer;
          font-weight: bold;
        }
        .add-btn {
          background: white;
          color: #1e3c72;
        }
        ul {
          list-style: none;
        }
        .task-item {
          background: rgba(255,255,255,0.14);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
        .delete-btn {
          background: #ef4444;
          color: white;
          padding: 10px 14px;
        }
        .footer {
          margin-top: 25px;
          text-align: center;
          opacity: 0.85;
        }
        a {
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Perica Rajčević</h1>
        <p class="subtitle">Docker Compose CI/CD To-Do aplikacija</p>

        <div class="info-box">
          <p><strong>Status:</strong> Online</p>
          <p><strong>Baza:</strong> MongoDB</p>
          <p><strong>Tehnologije:</strong> Node.js, Express, MongoDB, Docker, Docker Compose, Jenkins, AWS EC2</p>
        </div>

        <form class="form-box" method="POST" action="/add">
          <input type="text" name="text" placeholder="Unesi novi zadatak..." required />
          <button type="submit" class="add-btn">Dodaj</button>
        </form>

        <ul>
          ${taskItems || '<li class="task-item"><span>Nema zadataka.</span></li>'}
        </ul>

        <div class="footer">
          <p><a href="/api/tasks">Pregled API-ja</a></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.post('/add', async (req, res) => {
  const text = (req.body.text || '').trim();
  if (text) {
    await Task.create({ text });
  }
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json({
    student: 'Perica Rajčević',
    count: tasks.length,
    tasks
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App running on port ${PORT}`);
});
