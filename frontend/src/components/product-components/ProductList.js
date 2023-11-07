import React, { useState } from 'react';

import './ProductList.css';

import { useDispatch } from 'react-redux';

import { addProductToCart } from '../../store/slices/cartSlice';
import ProductItem from './ProductItem';
import Modal from '../Modal'


const ProductList = ({ products }) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    const handleAddToCart = (productId, quantity) => {
        console.log("Product ID:", productId);
        console.log("Quantity:", quantity);
        console.log("Redux Dispatch:", dispatch);
        dispatch(addProductToCart({ productId, quantity: 1 }));
    };

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductItem key={product._id} product={product} handleShowModal={() => handleShowModal(product)} />
            ))}
            {selectedProduct && <Modal product={selectedProduct} onClose={handleCloseModal} onShowModal={showModal} onAddToCart={handleAddToCart}/>}
        </div>
    );
}

export default ProductList;
