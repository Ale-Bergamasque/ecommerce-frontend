import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import api from '../services/api';

function useUserProvider() {
    const [token, setToken, removeToken] = useLocalStorage('token');
    const [userId, setUserId, removeUserId] = useLocalStorage('userId');
    const [storeName, setStoreName, removeStoreName] = useLocalStorage('storeName');
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [productDetail, setProductDetail] = useState([]);
    const [productSearch, setProductSearch] = useState([]);

    useEffect(() => {
        api().get('/products').then((response) => {
            setProducts(response.data);
            setProductSearch(response.data);
        }).catch((error) => {
            return;
        });
        return;
    }, []);

    return {
        token,
        setToken,
        removeToken,
        userId,
        setUserId,
        removeUserId,
        storeName,
        setStoreName,
        removeStoreName,
        productDetail,
        setProductDetail,
        products,
        setProducts,
        product,
        setProduct,
        productSearch,
        setProductSearch
    }
}

export default useUserProvider;