import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store employees in memory (in production, use a database)
let employees = [];

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send current employees to newly connected client
  socket.emit('initial_employees', employees);

  // Handle new employee addition
  socket.on('add_employee', (employee) => {
    employees.push(employee);
    // Broadcast to all clients except sender
    socket.broadcast.emit('employee_added', employee);
  });

  // Handle employee deletion
  socket.on('delete_employee', (employeeId) => {
    employees = employees.filter(emp => emp.id !== employeeId);
    // Broadcast to all clients except sender
    socket.broadcast.emit('employee_deleted', employeeId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// REST endpoints
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.post('/api/employees', (req, res) => {
  const employee = req.body;
  employees.push(employee);
  io.emit('employee_added', employee);
  res.status(201).json(employee);
});

app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter(emp => emp.id !== id);
  io.emit('employee_deleted', id);
  res.status(200).json({ message: 'Employee deleted' });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 