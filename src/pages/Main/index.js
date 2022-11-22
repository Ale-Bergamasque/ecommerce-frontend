import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartIcon from '../../assets/icons/cart_icon_black.png';
import MoneyIcon from '../../assets/icons/coin_icon.png';
import LogoffIcon from '../../assets/icons/out_icon.png';
import UserIcon from '../../assets/icons/profile_icon.png';
import StoreIcon from '../../assets/icons/store_icon.png';
import Logo from '../../assets/Logo_header.png';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import './styles.css';

function Main() {
    const { token,
        setToken,
        setUserId,
        setStoreName,
        setProductDetail,
        products,
        storeName,
        productSearch,
        setProductSearch } = useUser();
    const navigate = useNavigate();
    const [paginationParam, setPaginationParam] = useState({});
    const paginationLimit = 8;

    useEffect(() => {
        handlePagination(1)
    }, [productSearch]);

    function handlePagination(page) {
        setPaginationParam({
            start: (page - 1) * paginationLimit,
            end: page * paginationLimit
        });
    }

    function handleReturnProductWithoutFilter() {
        setProductSearch(products);
    }

    function handleNavigate(path) {
        token ? navigate(`/${path}`) : navigate('/login');
    }

    function handleFilter(e) {
        if (e.key !== 'Enter') {
            return;
        }

        let search = e.target.value;

        if (!search || search.trim() === '') {
            setProductSearch(products);
            return;
        }

        const productsFilter = products?.filter(product => {
            return product?.product_name.toLowerCase().includes(search.toLowerCase());
        });
        setProductSearch(productsFilter);

        e.target.value = ''
    }

    async function handleProrductDetail(productId) {
        try {
            const product = await api().get(`/products/${productId}`);
            setProductDetail(product.data);

        } catch (error) {
            return;
        }
        navigate(`/produto/${productId}`)
    }

    function handleLogoff() {
        setToken('');
        setUserId('');
        setStoreName('');
    }

    return (
        <div className='container'>
            <header className='header'>
                <img className='header__logo' src={Logo} alt="Logo Market Cubos" onClick={handleReturnProductWithoutFilter} />
                <SearchBar
                    filter={handleFilter}
                />
                <div className='header__menu'>
                    <div className='header__cart transform' onClick={() => handleNavigate('not-found')}>
                        <img src={CartIcon} alt="Ícone Carrinho de compras" />
                        <span>Meu carrinho</span>
                    </div>
                    <div className='header__store transform' onClick={() => handleNavigate('meus-produtos')}>
                        <img src={StoreIcon} alt="Ícone Loja" />
                        <span>Meus anúncios</span>
                    </div>
                    <div className='header__user transform' onClick={() => handleNavigate('not-found')}>
                        <img src={UserIcon} alt="Ícone Usuário" />
                        <span>{token ? storeName : 'Usuário'}</span>
                    </div>
                    {token && <div className='header__logoff transform' onClick={handleLogoff}>
                        <img src={LogoffIcon} alt="Ícone Sair" />
                        <span>Sair</span>
                    </div>}
                    <button className='headder__button button transform' onClick={() => handleNavigate('registrar-produto')}><img src={MoneyIcon} alt="ícone Moeda" />Quero vender</button>
                </div>
            </header>
            <main className='main'>
                <div className='main__products'>
                    {productSearch?.slice(paginationParam.start, paginationParam.end)?.map((product) => (
                        <div className='main__product' key={product.id} onClick={() => handleProrductDetail(product.id)}>
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
                <Pagination
                    handleClickPagination={handlePagination}
                    productsList={productSearch}
                    paginationLimit={paginationLimit}
                />
            </main>
        </div>
    );
}

export default Main;