import React from 'react';
import './CartItemsList.css';
import CartItem from './CartItem';

const CartItemsList = ({ items }) => {

    console.log("CartItemsList items:", items);
    
    return (
        <div className="cart-items-list">
            { items.length === 0 ? (
                <h4>Your cart is empty.</h4>
            ) : (
                items.map(item => (
                    <CartItem key={item._id} item={item} />
                ))
            )}       
        </div>
    );
}

export default CartItemsList;
