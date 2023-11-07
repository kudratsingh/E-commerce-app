import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/slices/cartSlice';
import CartItemsList from '../components/cart-components/CartItemsList';


const Home = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const status = useSelector(state => state.cart.status);
    const error = useSelector(state => state.cart.error);
    

    useEffect(() => {
        dispatch(fetchCart());

  }, [dispatch]);


    return (
      <main className='home-page'>
        <div className="home-container">

            {/* Logo */}
            <div className="home-logo">
                <img src="https://i.imgur.com/7I9Was5.png" alt="logo"  />
            </div>
            


            {/* Search Bar */}
            <input type="text" className="home-search-bar" placeholder="Search for products..." />

            {/* Welcome Message */}
            <div className="home-welcome-message">
                Welcome to Our Shopping Site!
            </div>

            {/* Sales Section */}
            <div className="home-section">
                <div className="home-title">
                    Today's Biggest Sales
                </div>
                <div className="home-sales-item">
                    Item 1
                </div>
                <div className="home-sales-item">
                    Item 2
                </div>
                <div className="home-sales-item">
                    Item 3
                </div>
            </div>

            {/* Cart Section - Dummy data for now */}
            <div className="home-section">
                <div className="home-title">
                    Your Cart
                </div>
                <CartItemsList className='cart-items-list' items={cartItems} />
                <Link to='/cart'>
                    <button className='cart-button'>Go to my cart</button>
                </Link>
            </div>

        </div>
      </main>
    );
}

export default Home;
