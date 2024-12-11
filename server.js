const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for simplicity (adjust in production)
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Serve a test route
app.get('/', (req, res) => {
  res.send({ message: 'Chatroom backend is running!' });
});

// Socket.IO setup
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle chat messages
  socket.on('chatMessage', (data) => {
    console.log(`Message from ${socket.id}: ${data}`);
    io.emit('chatMessage', data); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
