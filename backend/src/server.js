// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createServer } = require('http');
const socketIo = require('socket.io');
const authenticateToken = require('./middlewares/auth.middleware');
const { registerUser, loginUser, loggedInSessions } = require('./controllers/authController');
const { PORT, WEBSITE_URL } = require('./config');

const app = express();
const server = createServer(app);
const io = socketIo(server, {
  cors: {
    origin: WEBSITE_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

app.use(bodyParser.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('register', (data) => registerUser(data, socket));
  socket.on('login', (data) => loginUser(data, socket));

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/sessions', authenticateToken, (req, res) => {

  const sessions = loggedInSessions[req.user.email] || [];
  res.json({ sessions });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
