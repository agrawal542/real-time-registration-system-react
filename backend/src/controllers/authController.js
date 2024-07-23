// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const users = [];
const loggedInSessions = {};

const generateToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (data, socket) => {
  const { name, email, mobile, avatar, description, password } = data;
  try {
    let user = users.find(u => u.email === email || u.mobile === mobile);
    if (user) {
      if (user.email === email) {
        socket.emit('registration_error', { error: 'Email already exists' });
      } else if (user.mobile === mobile) {
        socket.emit('registration_error', { error: 'Mobile number already exists' });
      }
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, mobile, avatar, description, password: hashedPassword });

    socket.emit('registration_success');
  } catch (error) {
    socket.emit('registration_error', { error: 'Registration failed' });
  }
};

const loginUser = async (data, socket) => {
  const { email, password } = data;
  try {
    const user = users.find(u => u.email === email);
    if (!user) {
      socket.emit('login_error', { error: 'Invalid email or password' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      socket.emit('login_error', { error: 'Invalid email or password' });
      return;
    }

    const token = generateToken(email);
    if (!loggedInSessions[email]) {
      loggedInSessions[email] = [];
    }
    loggedInSessions[email].push(new Date());

    socket.emit('login_success', { token, otherSessions: loggedInSessions[email] });
  } catch (error) {
    socket.emit('login_error', { error: 'Login failed' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loggedInSessions
};
