import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ product, onClose, onAddToCart }) => {

    const [exiting, setExiting] = useState(false);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleAddToCartAndClose = () => {
        onAddToCart(product);
        setExiting(true);
        setTimeout(onClose, 500);
    };

    const modalContent = (
        <div className={`backdrop ${exiting ? 'exiting' : ''}`} onClick={handleBackdropClick}>
            <div className="modal">
                <img src={product.imageUrl} alt={product.name} className="modal-image" />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <button className="add-to-cart-btn" onClick={handleAddToCartAndClose}>Add to Cart</button>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
}

export default Modal;
