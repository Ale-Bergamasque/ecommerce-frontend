import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClosedImage from '../../assets/empty_state.png';
import AddIcon from '../../assets/icons/add_icon.png';
import DeleteProductModal from '../../components/DeleteProductModal';
import MyProductsCard from '../../components/MyProductCard';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import SimplifiedHeader from '../../components/SimplifiedHeader';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import './styles.css';

function MyProducts() {
    const { token, setToken, setUserId, setStoreName, storeName, products, setProducts } = useUser();
    const [storeProducts, setStoreProducts] = useState([]);
    const [storeProductsSearch, setStoreProductsSearch] = useState([]);
    const [producKey, setProductKey] = useState(null);
    const [modalDeleteProductOpen, setModalDeleteProductOpen] = useState(false);
    const [paginationParam, setPaginationParam] = useState({});
    const paginationLimit = 7;
    const navigate = useNavigate();

    useEffect(() => {
        handlePagination(1)
    }, [storeProductsSearch]);

    function handlePagination(page) {
        setPaginationParam({
            start: (page - 1) * paginationLimit,
            end: page * paginationLimit
        });
    }

    function handleReturnProductWithoutFilter() {
        setStoreProductsSearch(storeProducts);
    }

    useEffect(() => {
        api().get('/user-products').then((response) => {
            setStoreProducts(response.data);
            setStoreProductsSearch(response.data);
        }).catch((error) => {
            if (error.response.data === "jwt expired") handleLogoff();
        });
    }, [products]);

    function handlePageBack() {
        navigate('/');
    }

    function handleLogoff() {
        setToken('');
        setUserId('');
        setStoreName('');
        setStoreProducts([]);
    }

    function handleOpenEditModal(product) {
        navigate(`/editar-produto/${product.id}`);
    }

    function handleOpenDeleteModal(key) {
        setProductKey(key)
        setModalDeleteProductOpen(true);
    }

    function handleCloseDeleteModal() {
        setModalDeleteProductOpen(false);
    }

    async function handleSubmitDeleteProduct(e) {
        e.preventDefault();

        try {
            await api().delete(`/product-delete/${producKey}`);

            const indexProduct = products.findIndex((product) => product.id === producKey);
            products.splice(indexProduct, 1);

            setProducts([...products]);

        } catch (error) {
            console.log(error.response.data)
            return;
        }
        setModalDeleteProductOpen(false)
    }

    function handleFilter(e) {
        if (e.key !== 'Enter') {
            return;
        }

        let search = e.target.value;

        if (!search || search.trim() === '') {
            setStoreProductsSearch(storeProducts);
            return;
        }

        const productsFilter = products?.filter(product => {
            return product?.product_name.toLowerCase().includes(search.toLowerCase());
        });
        setStoreProductsSearch(productsFilter);

        e.target.value = ''
    }

    return (
        <div className='container'>
            <SimplifiedHeader
                pageBack={handlePageBack}
                token={token}
                logoff={handleLogoff}
                user={token ? storeName : 'Usuário'}
                navigateTo={() => navigate('/not-found')}
            />
            <main className='main-my-products'>
                <div className='main-my-products__title-products'>
                    <h1 onClick={handleReturnProductWithoutFilter}>Meus produtos</h1>
                    <SearchBar
                        filter={handleFilter}
                    />
                    <button className='button transform' onClick={() => navigate('/registrar-produto')}><img src={AddIcon} alt="Adicionar" />Criar anúncio</button>
                </div>
                <div className='main-my-products__products'>
                    <div className='main-my-products__table-title'>
                        <div className='main-my-products__table-title-name'>
                            <span>Nome</span>
                        </div>
                        <div className='organization'>
                            <div className='main-my-products__table-title-stock'>
                                <span>Estoque</span>
                            </div>
                            <div className='main-my-products__table-title-sale'>
                                <span>Vendidos</span>
                            </div>
                            <div className='main-my-products__table-title-price'>
                                <span>Valor</span>
                            </div>
                        </div>
                    </div>
                    <div className='main-my-products__my-products'>

                        {storeProductsSearch?.slice(paginationParam.start, paginationParam.end)?.map((storeProduct) => (
                            <div className='main-my-products__product' key={storeProduct.id}>
                                <MyProductsCard
                                    productImage={storeProduct.product_photo}
                                    productName={storeProduct.product_name}
                                    productPrice={(storeProduct.price / 100).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                                    productStock={storeProduct.stock}
                                    openModal={handleOpenDeleteModal}
                                    productId={storeProduct.id}
                                    openEditModal={handleOpenEditModal}
                                    product={storeProduct}
                                />
                            </div>
                        ))}
                        {storeProducts.length === 0 &&
                            <div className='main-my-products__empty-stock'>
                                <img src={ClosedImage} alt="Estoque vazio" />
                                <h1>Estoque vazio</h1>
                                <span>Parece que sua loja ainda não possui produtos à venda</span>
                            </div>
                        }
                    </div>
                    <div className='main-my-products__pagination'>
                        <Pagination
                            handleClickPagination={handlePagination}
                            productsList={storeProductsSearch}
                            paginationLimit={paginationLimit}
                        />
                    </div>
                </div>
            </main>
            <DeleteProductModal
                open={modalDeleteProductOpen}
                onClose={handleCloseDeleteModal}
                onSubmit={handleSubmitDeleteProduct}
            />
        </div>
    );
}

export default MyProducts;