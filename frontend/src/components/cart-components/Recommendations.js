import React from 'react';
import './Recommendations.css';

const Recommendations = ({ recommendations }) => {
    return (
        <div className="recommendations">
            <h4>Other items you might like:</h4>
            {/* {recommendations.map(product => (
                <div key={product.id} className="recommended-item">
                    {product.name}
                </div>
            ))} */}
        </div>
    );
}

export default Recommendations;
