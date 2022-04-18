import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCartThunk, getProductsThunk, } from '../redux/actions';
import "../styles/products.css"

const Products = ({ images = [] }) => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const [productsFiltered, setProductsFiltered] = useState([]);
    const [quantity, setQuantity] = useState(0);

    const products = useSelector(state => state.products)

    const [currentImage, setCurrentImage] = useState(1);
    const percent = 100 / images.length;

    const listStyles = {
        width: `${100 * images.length}%`,
        transform: `translateX(-${(currentImage - 1) * percent}%)`
    }

    useEffect(() => dispatch(getProductsThunk()), [dispatch]);



    const productsFound = products?.find(productsItem => productsItem.id === Number(id));

    useEffect(() => {
        if (productsFound) {
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productsFound?.category.id}`)
                .then(res => setProductsFiltered(res.data.data.products));
        }

    }, [dispatch, productsFound])

    const addCart = () => {
        const product = {
            id,
            quantity
        }
        dispatch(addCartThunk(product));
    }
    return (
        <section className='products-detail'>





            <div className="images-gallery">
                {/*
                <div className="gallery">
                 <div className="button-gallery left">
                        <button
                            onClick={() => setCurrentImage(currentImage - 1)}
                            disabled={currentImage <= 1}
                        >
                            <i className="icon-chevron-left"></i>
                        </button>
                    </div>
                    <div className="button-gallery right">
                        <button
                            onClick={() => setCurrentImage(currentImage + 1)}
                            disabled={currentImage >= images.length}
                        >
                            <i className="icon-chevron-right"></i>
                        </button>
                   </div>
    
                   

                    <ul className="images-list" style={listStyles}>
                        {
                            images.map(image => (
                                <li key={image}>
                                    <img src={image} alt="" />
                                </li>
                            ))
                        }
                    </ul>

                </div>
                */}


                <ul className="images-preview">
                    {
                        images.map((image, i) => (
                            <li
                                key={image}
                                className={currentImage === i + 1 ? 'selected' : ''}
                            >
                                <img
                                    src={image}
                                    alt=""
                                    onClick={() => setCurrentImage(i + 1)}
                                />
                            </li>
                        ))
                    }
                </ul>


            </div>

            <div className='detail-products'>
                <div className='image-product'>
                    <img src={productsFound?.productImgs[1]} alt="" />
                </div>

                <div className='data-products'>
                    <h1>{productsFound?.title}</h1>
                    <p>{productsFound?.description}</p>

                    <div className="quantity">
                        <div className="label">Quantity</div>
                        <div className="flex">
                            <button
                                onClick={() => setQuantity(quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                <i className="icon-minus"></i>
                            </button>
                            <div className="value">
                                {quantity}
                            </div>
                            <button onClick={() => setQuantity(quantity + 1)}>
                                <i className="icon-plus"></i>
                            </button>

                        </div>

                    </div>


                    <button className="add-cart-button" onClick={addCart}>
                        Add to cart <i className='icon-shopping-cart'></i>
                    </button>

                </div>

            </div>

            <ul>
                <strong>
                    Discover similar items
                </strong>
                {
                    productsFiltered.map(productsItem => (
                        <li onClick={() => productsFound} key={productsItem.id}>
                            <Link className='products-link' to={`/products/${productsItem.id}`}>{productsItem?.title}
                                <ul>
                                    {
                                        <li>
                                            <img src={productsItem?.productImgs[0]} alt="" />
                                        </li>

                                    }
                                </ul>

                            </Link>
                            <div className="suggestions">


                            </div>

                        </li>
                    ))
                }

            </ul>


        </section>
    );
};

export default Products;