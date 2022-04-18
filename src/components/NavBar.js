
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  getCartThunk, getPurchasesThunk, loginThunk, setLoginMessage } from '../redux/actions';
import '../styles/navbar.css';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginError, setLoginError] = useState("");

    const dispatch = useDispatch();

    const Navigate = useNavigate();
    

    const openCarts = () => {
        setIsFavoritesOpen(!isFavoritesOpen);
        dispatch(getCartThunk());
    }
    const openPurchases = () => {
        setIsPurchasesOpen(!isPurchasesOpen);
        dispatch(getPurchasesThunk())
        if(localStorage.getItem("token")){
            Navigate("/purchases");
        } else {
            dispatch(setIsLoginOpen(true))
            dispatch(setLoginMessage("You have to Log In to access to your purchases"))
        };
    }
    

    const login = e => {
        e.preventDefault();
        const credentials = { email, password };
        dispatch(loginThunk(credentials))
            .then(res => {
                localStorage.setItem("token", res.data.data.token)
                setLoginError("");
                setIsLoginOpen(false);
            })
            .catch(error => {
                setLoginError(error.response.data.message);
            })

    }
    
   

    return (
        <div className='navbar'>
            <div className='fixed'>
            <nav>

                <div className='title'>
                <strong onClick={() => Navigate("/")}>
                    e-commerce
                </strong>
                </div>
                
                <button className='icon' onClick={() => setIsLoginOpen(!isLoginOpen)}>
                    <i className="fa-solid fa-user"></i>
                </button>

                <button onClick={openPurchases} className='icon'>
                <i className="fa-solid fa-box-archive"></i>
                </button>

                <button className='icon' onClick={openCarts}>
                    <i className="fa-solid fa-cart-arrow-down"></i>
                </button>
               

            </nav>
            <form onSubmit={login} action="" className={`login ${isLoginOpen ? 'open' : ''}`}>
                {
                    localStorage.getItem("token") ? (
                        <button onClick={() => localStorage.setItem("token", "")} type="button">
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    ) : (
                        <>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Email'
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Password'
                            />
                            <p>{loginError}</p>
                            <button className='button-login'>Submit</button>
                        </>
                    )
                }


            </form>
            < Cart isOpen={isFavoritesOpen}/>
            </div>
           
        </div>
    );
};

export default NavBar;