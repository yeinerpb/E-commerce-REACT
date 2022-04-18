import React from 'react';
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import '../styles/purchases.css'

const Purchases = ({isPurchases}) => {
    const purchases = useSelector(state => state.purchases)

    const navigate = useNavigate ();
   
    
    return (
        <div className={`purchases-modal ${isPurchases? 'open' : ''}`}>

            <h2>My purchases</h2>
            <ul>
            {
                purchases.map(purchase => (
                    
                    <li className='info' key={purchase.id}
                    onClick={() => navigate(`/products/${purchase.id}`)}
                    >

                        <div className='date'>
                            {purchase.createdAt}
                        </div>
                        <div className='articles'>
                            <div className="image">
                                {/* <img src={productItem.product.images[0]} alt="" /> */}
                            </div>
                            <div className='name'>
                                {purchase.cart.products[0]?.title}
                            </div>
                            <div className='quantity'>
                                <button className='box'>
                                    {purchase.cart.products[0]?.productsInCart.quantity}
                                </button>
                            </div>
                            <div className='price'>
                                $ {purchase.cart.products[0]?.price}
                            </div>
                        </div>

                    </li>
                ))
            }
            </ul>
        </div>
    );
};

export default Purchases;