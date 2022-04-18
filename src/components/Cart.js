import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCartThunk, purchaseCartThunk, } from '../redux/actions';
import '../styles/cart.css';



const Cart = ({isOpen}) => {

    const carts = useSelector(state => state.carts?.products);
    
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    let total = 0;

    if(carts?.length > 0){
        if(carts?.length > 1){
            total = carts?.reduce((initial, current) => {
                if(typeof initial === 'number'){
                    return initial + (current.price * current.productsInCart?.quantity)
                } else {
                    return (initial.price * initial.productsInCart?.quantity)  +  (current.price * current.productsInCart?.quantity)
                }
            });
        } else {
            total = carts?.[0].price * carts?.[0].productsInCart?.quantity
        }
    }
    const checkout = () => {
        dispatch(purchaseCartThunk());
        navigate("/purchases");
    }
    return (
        <div className={`carts-modal ${isOpen ? 'open' : ' '}`}>
            My Carts
            <ul className='cart-list'>
                {
                    carts?.map(cart => (
                        <li key={cart.id} >
                            <div>{cart.brand}</div>
                            <strong onClick={() => navigate(`/products/${cart.id}`)}>
                                {cart.title}
                            </strong>
                            <div>quantity: {cart.productsInCart.quantity}</div>
                            <div>Total: {cart.price}</div>
                            <button onClick={() => dispatch(deleteCartThunk(cart.id))}><i className="fa-solid fa-trash"></i></button>
                           
                        </li>
                    ))
                }
            </ul>
            <div className="checkout-section">
                <div className="total">
                    <span className="label">Total:</span>
                    <b>$ {total}</b>
                </div>

                <button className='buy-button' onClick={checkout} disabled={!Boolean(carts)}>
                    Checkout
                </button>
            </div>

        </div>
    );
};

export default Cart;