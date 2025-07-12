import { io } from 'socket.io-client';

// TODO: Replace this with your actual Render backend URL after deployment
const SOCKET_URL = 'https://your-backend.onrender.com';

export const socket = io(SOCKET_URL);

export const socketService = {
  connect() {
    socket.connect();
  },

  disconnect() {
    socket.disconnect();
  },

  onEmployeeAdded(callback: (employee: any) => void) {
    socket.on('employee_added', callback);
  },

  onEmployeeDeleted(callback: (employeeId: string) => void) {
    socket.on('employee_deleted', callback);
  },

  onInitialEmployees(callback: (employees: any[]) => void) {
    socket.on('initial_employees', callback);
  },

  emitAddEmployee(employee: any) {
    socket.emit('add_employee', employee);
  },

  emitDeleteEmployee(employeeId: string) {
    socket.emit('delete_employee', employeeId);
  },

  removeAllListeners() {
    socket.removeAllListeners();
  }
}; 