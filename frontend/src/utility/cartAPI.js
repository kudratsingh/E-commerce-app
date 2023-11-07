const baseURL = 'http://localhost:5000/api';

// Add an item to the cart
export const addToCart = (productId, quantity) => {
    console.log("Product ID:", productId);
    console.log("Quantity:", quantity);
    console.log("API Call: addToCart");
    const token = localStorage.getItem('userToken'); 
    return fetch(`${baseURL}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
    });
};

// Fetch user's cart
export const getCart = async () => {
    const token = localStorage.getItem('userToken');  // Assuming you store the JWT token in local storage after login

    const response = await fetch('http://localhost:5000/api/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
};


// ... Add other cart related API calls as needed ...
