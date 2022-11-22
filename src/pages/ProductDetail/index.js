import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import ProductDetailCard from '../../components/ProductDetailCard';
import SimplifiedHeader from '../../components/SimplifiedHeader';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import './styles.css';

function ProductDetail() {
    const { token, setToken, setUserId, setStoreName, productDetail, setProductDetail, products, storeName } = useUser();
    const [fourProducts, setFourProducts] = useState([]);
    const { id } = useParams();
    const [productQuantity, setProductQantity] = useState(0);
    const navigate = useNavigate();

    function handleLogoff() {
        setToken('');
        setUserId('');
        setStoreName('');
    }

    function handlePageBack() {
        window.history.back();
    }

    function changeProduct(productId) {
        navigate(`/produto/${productId}`);
    }

    async function handleProrductDetail(productId) {
        try {
            const product = await api().get(`/products/${productId}`);
            setProductDetail(product.data);

        } catch (error) {
            if (error.response.data === "jwt expired") handleLogoff();
            return;
        }
    }

    function handleAddProduct(productQuantity, stock) {
        if (productQuantity >= stock) {
            return;
        }
        let add = productQuantity;
        add++;
        setProductQantity(add);
    }

    function handleLessProduct(productQuantity) {
        if (productQuantity <= 0) {
            return;
        }
        let add = productQuantity;
        add--;
        setProductQantity(add);
    }

    function shuffleArray(inputArray) {
        inputArray.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        handleProrductDetail(id);
    }, [id]);

    useEffect(() => {
        const aleatoryArray = [...products];
        shuffleArray(aleatoryArray);
        const filterArray = aleatoryArray.filter(p => p.id !== Number(id));
        setFourProducts(filterArray.splice(0, 4));
    }, [products, id]);

    return (
        <div className='container'>
            <SimplifiedHeader
                pageBack={handlePageBack}
                token={token}
                logoff={handleLogoff}
                user={token ? storeName : 'Usuário'}
                navigateTo={() => navigate('/not-found')}
            />
            <div className='main-product'>
                <span className='main-product__guide'>Página inicial {'>'} {productDetail.product_name}</span>
                <ProductDetailCard
                    productImage={productDetail.product_photo}
                    productName={productDetail.product_name}
                    productPrice={productDetail.price}
                    storeName={productDetail.store_name}
                    productStock={productDetail.stock}
                    productDescription={productDetail.product_description}
                    productQuantity={productQuantity}
                    addProduct={handleAddProduct}
                    lessProduct={handleLessProduct}
                    navigateTo={() => navigate('/not-found')}
                />
                <h2 className='main-product__title'>Outros produtos</h2>
                <div className='main-product__other-products'>
                    {fourProducts.map((product) => (
                        <div className='main__product' key={product.id} onClick={() => changeProduct(product.id)}>
                            <ProductCard
                                productImage={product.product_photo}
                                productName={product.product_name}
                                productPrice={(product.price / 100).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;