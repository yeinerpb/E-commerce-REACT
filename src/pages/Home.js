import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCartThunk, filterArticleThunk, filterCategoryThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions';
import "../styles/home.css"

const Home = ({product}) => {

    const dispatch = useDispatch();

    const [article, setArticle] = useState("");

    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCategoriesThunk());

    }, [])
    const searchProduct = e => {
        e.preventDefault();
        dispatch(filterArticleThunk(article));
    }
    return (
        <div>
            <h1>Home</h1>

            <form className='search' onSubmit={searchProduct}>
                <input
                    type="text"
                    placeholder='Search product by Name'
                    value={article}
                    onChange={e => setArticle(e.target.value)}
                />
                <button>
                <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            {
                categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => dispatch(filterCategoryThunk(category.id))}
                    >
                        {category.name}
                    </button>
                ))
            }
            <ul className='dates-home'>
                {
                    products.length === 0 ? (
                        <p>We didn't find that this product!</p>
                    ) : (
                        products.map(productsItem => (
                            <Link className='link-home' to={`/products/${productsItem.id}`} key={productsItem.id}>
                                <li className='list'>
                                    <strong>{productsItem.title}</strong>
                                    <div className='images'>
                                        <img src={productsItem.productImgs[0]} alt="" className='over' />
                                        <img src={productsItem.productImgs[1]} alt="" />
                                    </div>
                                    <div className='price-home'>
                                        {" "}
                                        <b>Price: </b>
                                        
                                        {productsItem.price}
                                    </div>
                                    <button className='cart-button' onClick={() => dispatch(addCartThunk(product,1))}>
                                    <i className="fa-solid fa-cart-arrow-down"></i>
                                    </button>
                                </li>

                            </Link>

                        ))
                        )
                }
            </ul>
            
        </div>
    );
};

export default Home;