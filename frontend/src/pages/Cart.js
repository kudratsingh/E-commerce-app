import React, { useEffect, useState } from "react";
import "./Cart.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/slices/cartSlice";
import store from "../store/store";

import CartItemsList from "../components/cart-components/CartItemsList";
import SubtotalBox from "../components/cart-components/SubtotalBox";
import Recommendations from "../components/cart-components/Recommendations";
import CartCheckoutModal from "../components/cart-components/CartCheckoutModal";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const totalCost = useSelector((state) => state.cart.totalCost);
  const totalItems = useSelector((state) => state.cart.totalItems);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCart()).then(() => {
      const currentState = store.getState();
      console.log("Current Redux State:", currentState);
    });
  }, [dispatch]);

  const handleProceedToCheckout = () => {
    console.log("Proceed 2 Checkout button clicked");
    setIsCheckoutModalOpen(true);
  };

  let content;

  if (status === "loading") {
    content = <div className="loading">Loading...</div>; // or use a spinner component
  } else if (status === "succeeded") {
    content = <CartItemsList className="cart-items-list" items={cartItems} />;
  } else if (status === "failed") {
    content = (
      <div>
        <p className="error-message">
          There was an error fetching the cart: {error}
        </p>
        <button
          className="try-again-button"
          onClick={() => dispatch(fetchCart())}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-content">
        <h2 className="shopping-cart-title">Shopping Cart</h2>
        {content}
      </div>
      <div className="checkout-section">
        <SubtotalBox
          totalCost={totalCost}
          onProceedToCheckout={handleProceedToCheckout}
        />
        <Recommendations />
      </div>
      {isCheckoutModalOpen && (
        <CartCheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          items={cartItems}
          totalCost={totalCost}
          totalItems={totalItems}
        />
      )}
    </div>
  );
};

export default Cart;
