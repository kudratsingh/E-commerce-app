import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// ... other imports
import './Products.css';
import ProductList from '../components/product-components/ProductList';

import { fetchProducts } from '../store/slices/productSlice';
import { fetchCart } from '../store/slices/cartSlice';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  const totalItems = useSelector(state => state.cart.totalItems);

    
  useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCart());
  }, [dispatch]);

  let content;

  if (status === 'loading') {
        content = <div className='loading'>Loading...</div>;  // or use a spinner component
  } else if (status === 'succeeded') {
        content = <ProductList className='product-list' products={products} />;
  } else if (status === 'failed') {
      content = (
          <div>
                <p className='error-message'>There was an error fetching the products: {error}</p>
                <button className='try-again-button' onClick={() => dispatch(fetchProducts())}>Try Again</button>
          </div>
      );
  };

    return (
        <div className="products-page">
            {/* Top Section */}
            <div className="top-section">
                <input type="text" className="products-search-bar" placeholder="Search for products..." />
                <button className='search-button'>Search</button>
                <Link to="/cart" className="cart-button-link"> {/* Convert the button to a Link */}
                    <span className="cart-icon">🛒</span> <span className="cart-count">{totalItems}</span> {/* Display the totalItems value */}
                </Link>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Left Sidebar for Categories */}
                <div className="sidebar">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        <li><button>Electronics</button></li>
                        <li><button>Clothing</button></li>
                        <li><button>Home & Garden</button></li>
                        <li><button>Books</button></li>
                        <li><button>Automotive</button></li>
                        <li><button>Jewelry</button></li>
                        <li><button>Beauty & Health</button></li>
                        <li><button>Sports</button></li>
                        <li><button>Toys & Kids</button></li>
                        <li><button>Groceries</button></li>
                    </ul>
                </div>

                {/* Product Listings */}
                {content}

                {/* Right Sidebar */}
                <div className="sidebar">
                    <h3>Other Information</h3>
                    <p>Some content here</p>
                </div>
            </div>
        </div>
    );
}

export default Products;
