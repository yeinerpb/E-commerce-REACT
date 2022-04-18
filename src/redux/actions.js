import axios from "axios"

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setCarts: "SET_CARTS",
    setPurchases: "SET_PURCHASES",
    setLoginMessage: "SET_LOGIN_MESSAGE",
}
const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const setProducts = products => ({
    type: actions.setProducts,
    payload: products
})

export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload: isLoading
})

export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})
export const setCarts = cart => ({
    type: actions.setCarts,
    payload: cart
})

export const setPurchases = purchases => ({
    type: actions.setPurchases,
    payload: purchases
})

export const setLoginMessage = message => ({
    type: actions.setLoginMessage,
    payload: message
})

export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));

    }
}

export const getCategoriesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => dispatch(setCategories(res.data.data.categories)))
            .finally(() => dispatch(setIsLoading(false)));

    }
}
export const filterCategoryThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const filterArticleThunk = article => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${article}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const loginThunk = credentials => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
            .finally(() => dispatch(setIsLoading(false)))
    }
}
export const addCartThunk = (product) => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig())
            .finally(() => dispatch(setIsLoading(false)));
    }
}
export const getCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart/', getConfig())
            .then(res => dispatch(setCarts(res.data.data.cart)))
            .finally(() => dispatch(setIsLoading(false)))
            .catch(error => {
                if (error.response.status === 404) {
                    console.log("El carrito esta vacio")
                    dispatch(setCarts({}));
                }

            })
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const deleteCartThunk = productId => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${productId}`, getConfig())
            .then(() => dispatch(getCartThunk()))
            .finally(() => dispatch(setIsLoading(false)));
    }
}
export const purchaseCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
            .then(() => {
                dispatch(setCarts([]));
                dispatch(getPurchasesThunk());
            })
            .finally(() => dispatch(setIsLoading(false)));
    }
}
export const getPurchasesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases/', getConfig())
            .then(res => dispatch(setPurchases(res.data.data.purchases)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}
