const BASE_URL = "http://localhost:5000/api";  // Change this to your server's address

export const placeOrder = async (orderData) => {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT in localStorage
        },
        body: JSON.stringify(orderData)
    });
    return response.json();
}

export const fetchAllOrders = async () => {
    const response = await fetch(`${BASE_URL}/orders`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

export const fetchUserOrders = async (userId) => {
    const response = await fetch(`${BASE_URL}/orders/user/${userId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

export const updateOrder = async (orderId, updatedData) => {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedData)
    });
    return response.json();
}

export const deleteOrder = async (orderId) => {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}
