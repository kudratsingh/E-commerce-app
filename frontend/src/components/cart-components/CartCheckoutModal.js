// CheckoutModal.js
import React from 'react';
import ReactDOM from 'react-dom';

import CartCheckoutModalItems from './CartCheckoutModalItems';
import './CartCheckoutModal.css'; // Create and style your modal

import { useSelector } from 'react-redux';


const CartCheckoutModal = ({ isOpen, onClose, items}) => {  

    const totalCost = useSelector((state) => state.cart.totalCost);
    const totalItems = useSelector((state) => state.cart.totalItems);

    const tax = totalCost/10;
    const shipping = 5
    
    const cartSubmitHandler = (e) => {
        e.preventDefault();
    };

    if (!isOpen) return null;


    return ReactDOM.createPortal(
        <div className="checkout-modal-overlay">
            <div className="checkout-modal">

                <CartCheckoutModalItems items={items} />

                <div className="checkout-modal-summary">
                    {/* Example structure, adjust as needed */}
                    <div>Subtotal: ${totalCost}</div>
                    <div>Tax: ${tax}</div>
                    <div>Shipping: ${shipping}</div>
                    <div>Total: ${totalCost + tax + shipping}</div>
                </div>

                <form onSubmit={cartSubmitHandler}> 
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Phone" />
                    <input type="text" placeholder="Street Address" />
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="State" />
                    <input type="text" placeholder="Zip Code" />
                    <input type="text" placeholder="Country" />
                    <input type="text" placeholder="Card Number" />
                    <input type="text" placeholder="Card Exp Date" />
                    <input type="text" placeholder="Card CVV" />   
                    <div className="checkout-modal-buttons">
                        <button onClick={onClose}>Close</button>
                        <button>Checkout</button>
                    </div> 
                        
                </form>
                {/* Your checkout modal content goes here */}
            </div>
        </div>,
        document.getElementById('modal-checkout-root') // Ensure you have this div in your index.html
    );
};

export default CartCheckoutModal;
