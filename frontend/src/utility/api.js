const baseURL = 'http://localhost:5000/api';  // adjust this if your backend is on a different URL

export const fetchWithToken = (endpoint, method = 'GET', body) => {
    const token = localStorage.getItem('token');  // assuming you'll store the JWT token in local storage

    return fetch(`${baseURL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(body)
    });
};
