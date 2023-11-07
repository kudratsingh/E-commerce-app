const baseURL = 'http://localhost:5000/api';

// Fetch all products
export const getAllProducts = () => {
    return fetch(`${baseURL}/products`);
};

// Fetch a single product by ID
export const getProductById = (productId) => {
    return fetch(`${baseURL}/products/${productId}`);
};

// ... Add other product related API calls as needed ...
