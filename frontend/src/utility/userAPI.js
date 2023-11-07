const baseURL = 'http://localhost:5000/api';

// User registration
export const registerUser = (userData) => {
    return fetch(`${baseURL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
};

// User login
export const loginUser = async (userData) => {
    console.log("User data:", userData);
    const response = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to login');
    }
  
    // Use the json() method here
    const data = await response.json();
    console.log("Login response 2:", data);
    return data;
};
