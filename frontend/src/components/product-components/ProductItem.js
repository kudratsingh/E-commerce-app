import React from "react";
import "./ProductItem.css";

const ProductItem = ({ product, handleShowModal }) => {
  return (
    <div className="product-item">
      <div className="image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>
      <h4>{product.name}</h4>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <p className="product-description">{product.description}</p>
      <button
        onClick={() => handleShowModal(product)}
        className="details-button"
      >
        See More Details
      </button>
    </div>
  );
};

export default ProductItem;
