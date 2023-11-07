import React from 'react';
import './CartItem.css';

const CartItem = ({ item }) => {
    return (
        <div className="cart-item">
            <img src={item.product.imageUrl} alt={item.product.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h4>{item.product.name}</h4>
                <p>${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
            </div>
        </div>
    );
}

export default CartItem;
