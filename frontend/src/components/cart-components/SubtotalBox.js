import React, { useState } from "react";
import "./SubtotalBox.css";

const SubtotalBox = ({ totalCost, onProceedToCheckout }) => {

  return (
    <div className="subtotal-box">
      <h4>Subtotal: ${totalCost.toFixed(2)}</h4>
      <button
        onClick={onProceedToCheckout}
        className="checkout-button"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default SubtotalBox;
