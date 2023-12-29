import React from 'react'

import './CartCheckoutModalItems.css'

import { useDispatch, useSelector } from "react-redux";




const CartCheckoutModalItems = () => {

  const cartItems = useSelector((state) => state.cart.items)

  return (
    <div>
        {cartItems.map((item) => {  
            return (
                <div className="cart-checkout-modal-items" key={item.id}>
                    <div className="cart-checkout-modal-items-image">
                        <img src={item.product.imageUrl} alt={item.product.name} />
                    </div>
                    <div className="cart-checkout-modal-items-info">
                        <div className="cart-checkout-modal-items-name">
                            {item.product.name}
                        </div>
                        <div className="cart-checkout-modal-items-price">
                            ${item.product.price}
                        </div>
                        <div className="cart-checkout-modal-items-quantity">
                            Quantity: {item.quantity}
                        </div>
                    </div>
                </div>
            )
        })}
      
    </div>
  )
}

export default CartCheckoutModalItems;
