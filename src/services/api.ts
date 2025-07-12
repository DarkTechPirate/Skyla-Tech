const API_BASE_URL = 'https://skyla-tech.vercel.app/api';

export const apiService = {
  // Get all employees
  async getEmployees() {
    const response = await fetch(`${API_BASE_URL}/employees`);
    return response.json();
  },

  // Add a new employee
  async addEmployee(employee: any) {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    return response.json();
  },

  // Delete an employee
  async deleteEmployee(employeeId: string) {
    const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Poll for updates (alternative to WebSockets)
  startPolling(callback: (employees: any[]) => void, interval = 5000) {
    const poll = async () => {
      try {
        const employees = await this.getEmployees();
        callback(employees);
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Initial call
    poll();
    
    // Set up interval
    const intervalId = setInterval(poll, interval);
    
    // Return function to stop polling
    return () => clearInterval(intervalId);
  }
}; 