import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdPublishedModal from '../../components/AdPublishedModal';
import AlertBar from '../../components/AlertBar';
import CancelEditModal from '../../components/CancelEditModal';
import Input from '../../components/Input';
import SelectInput from '../../components/SelectInput';
import SimplifiedHeader from '../../components/SimplifiedHeader';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import { getBase64, getBase64Image } from '../../utils/base64';
import './styles.css';

function MyProducts() {
    const { token, setToken, setUserId, setStoreName, storeName, products, setProducts, setProduct } = useUser();
    const [form, setForm] = useState({
        product_name: '',
        category_id: '',
        product_description: '',
        price: '',
        stock: '',
        product_photo: '',
        photo_name: ''
    });
    const [warning, setWarning] = useState('');
    const [categories, setCategories] = useState([]);
    const [badAlert, setBadAlet] = useState(true);
    const [openAlertBar, setOpenAlertBar] = useState(false);
    const [modalAdPublishedOpen, setModalAdPublishedOpen] = useState(false);
    const [modalCancelEditOpen, setModalCancelEditOpen] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [descripotionCharacterCounter, setDescripotionCharacterCounter] = useState(0);
    const [nameCharacterCounter, setNameCharacterCounter] = useState(0);
    const usableCategories = [...categories];
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        api().get('/categories').then((response) => {
            setCategories(response.data);
        }).catch((error) => {
            if (error.response.data === "jwt expired") handleLogoff();
        });
    }, []);

    useEffect(() => {
        if (!id) return;
        console.log(id)
        api().get(`/products/${id}`).then((response) => {
            setForm(response.data);
        }).catch((error) => {
            if (error.response.data === "jwt expired") handleLogoff();
        });

    }, [id]);

    const handleCloseAlertBar = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlertBar(false);
    };

    function handlePageBack() {
        handleCleanForm();
        setProduct(null);
        navigate('/meus-produtos');
    }

    function handleLogoff() {
        setToken('');
        setUserId('');
        setStoreName('');
    }

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setWarning('');

        if (e.target.name === 'product_description') setDescripotionCharacterCounter(e.target.value.length);
        if (e.target.name === 'product_name') setNameCharacterCounter(e.target.value.length);
    }

    function handleChangeInputValueSelect(field, value) {
        setForm({ ...form, [field]: value });
        setWarning('');
    }

    const handleChangeInputImage = async (e) => {
        const photo = await getBase64(e.target.files[0]);
        setForm(form => ({ ...form, product_photo: photo, photo_name: e.target.files[0].name }));
    };

    function handleCleanForm() {
        setForm({
            product_name: '',
            category_id: '',
            product_description: '',
            price: '',
            stock: '',
            product_photo: '',
            photo_name: ''
        });
        setWarning('');
    }

    useEffect(() => {
        function handleDisableSubmit() {
            for (let campo of Object.values(form).entries()) {
                if (!campo[1].toString().length) {
                    break;
                }
                if (campo[0] === Object.values(form).length - 1) {
                    setFormDisabled(false);
                }
            }
        }
        handleDisableSubmit();
    }, [form]);

    async function handleSubmitRegisterProduct(e) {
        e.preventDefault();
        setOpenAlertBar(true);

        if (formDisabled) return;

        try {
            if (id) {
                await api().put(`/product-edit/${id}`, {
                    product_name: form.product_name,
                    category_id: form.category_id,
                    product_description: form.product_description,
                    price: form.price,
                    stock: form.stock,
                    product_photo: form.product_photo,
                    photo_name: form.photo_name
                });

                const indexProduct = products.findIndex((product) => product.id === form.id);
                products[indexProduct] = form;
                setProducts([...products]);

            } else {
                const response = await api().post('/product-register', {
                    product_name: form.product_name,
                    category_id: form.category_id,
                    product_description: form.product_description,
                    price: form.price,
                    stock: form.stock,
                    product_photo: form.product_photo,
                    photo_name: form.photo_name
                });

                products.push(response.data[0]);
                setProducts([...products]);
                handleCleanForm();
            }
        } catch (error) {
            if (error.response.data === 'price deve ser um tipo de `number`, Mas o valor final foi: `NaN` (Elenco do valor `""`).') {
                setWarning('Preço é um campo obrigatório.');
                return;
            }

            if (error.response.data === 'stock deve ser um tipo de `number`, Mas o valor final foi: `NaN` (Elenco do valor `""`).') {
                setWarning('Estoque é um campo obrigatório.');
                return;
            }

            setWarning(error.response.data);
            return;
        }

        setModalAdPublishedOpen(true);
        setWarning('');
    }

    function handleCloseAdPublishedModal() {
        setModalAdPublishedOpen(false);
        window.history.back();
    }

    function handleCloseCancelEditModal() {
        setModalCancelEditOpen(false);
    }

    function handleDiscardEditiontModal() {
        navigate('/meus-produtos');
        handleCloseCancelEditModal();
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
            <form className='main-register-product' onSubmit={handleSubmitRegisterProduct}>
                <div className='main-register-product__inputs'>
                    <h1>{id ? 'Editar produto' : 'Adicionar novo produto'}</h1>
                    <div className='main-register-product__inputs-fist-line'>
                        <div className='input-name'>
                            <label htmlFor="product_name">Título</label>
                            <Input
                                id='product_name'
                                type='text'
                                name='product_name'
                                value={form.product_name}
                                placeholder='Nome do produto'
                                onChange={handleChangeInputValue}
                                characterLimit={200}
                                characterCount={nameCharacterCounter}
                            />
                            <span className='name-character-counter'>{nameCharacterCounter}/200</span>
                        </div>
                        <div className='input-category'>
                            <label htmlFor="category_id">Categoria</label>
                            <SelectInput
                                id='category_id'
                                name='category_id'
                                value={form.category_id}
                                categories={usableCategories}
                                placeholder='Categorias'
                                onChange={handleChangeInputValueSelect}
                            />
                        </div>
                    </div>
                    <div className='input-description'>
                        <label htmlFor="product_description">Descrição do produto</label>
                        <Input
                            id='product_description'
                            type='text'
                            name='product_description'
                            value={form.product_description}
                            placeholder='Ex: Camiseta branca, Tamanho G'
                            onChange={handleChangeInputValue}
                            textArea={true}
                            rows='5'
                            characterLimit={2000}
                            characterCount={descripotionCharacterCounter}
                        />
                        <span className='description-character-counter'>{descripotionCharacterCounter}/2000</span>
                    </div>
                    <div className='main-register-product__inputs-third-line'>
                        <div className='input-price'>
                            <label htmlFor="price">Preço</label>
                            <Input
                                id='price'
                                type='number'
                                name='price'
                                value={form.price}
                                placeholder='R$'
                                onChange={handleChangeInputValue}
                            />
                        </div>
                        <div className='input-stock'>
                            <label htmlFor="stock">Estoque</label>
                            <Input
                                id='stock'
                                type='number'
                                name='stock'
                                value={form.stock}
                                placeholder='Ex: 10'
                                onChange={handleChangeInputValue}
                            />
                        </div>
                    </div>
                    <div className='input-photo'>
                        <label className='' htmlFor="photo">Adicionar foto</label>
                        <label className='input-photo__label' htmlFor="photo">
                            {form.product_photo && <img
                                className='img-upload'
                                src={getBase64Image(form.product_photo)}
                                alt='Foto do produto'
                            />}
                        </label>
                        <input id='photo' type="file" onChange={handleChangeInputImage} />
                        <span id='file-name'>{form.photo_name}</span>
                    </div>
                </div>
                <div className='main-register-product__btns'>
                    <button className={formDisabled ? 'button disabled' : 'button transform'} type='submit'>Publicar anúncio</button>
                    <button className='cancel-btn transform' type='button' onClick={() => setModalCancelEditOpen(true)}>Cancelar</button>
                </div>
                {warning &&
                    <AlertBar
                        message={warning}
                        openAlertBar={openAlertBar}
                        handleCloseAlertBar={handleCloseAlertBar}
                        badAlert={badAlert}
                    />}
            </form>
            <AdPublishedModal
                open={modalAdPublishedOpen}
                onClose={handleCloseAdPublishedModal}
            />
            <CancelEditModal
                open={modalCancelEditOpen}
                discardEdition={handleDiscardEditiontModal}
                onClose={handleCloseCancelEditModal}
            />
        </div>
    );
}

export default MyProducts;