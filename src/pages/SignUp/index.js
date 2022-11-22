import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import AlertBar from '../../components/AlertBar';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import api from '../../services/api';
import './styles.css';

function SignUp() {
    const [form, setForm] = useState({ storeName: '', email: '', password: '', confirmPassword: '' });
    const [warning, setWarning] = useState('');
    const [openAlertBar, setOpenAlertBar] = useState(true);
    const [badAlert, setBadAlet] = useState(false);
    const navigate = useNavigate();

    const handleCloseAlertBar = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlertBar(false);
    };

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setWarning('');
        setBadAlet(false);
    }

    function handleClearForm() {
        setForm({ storeName: '', email: '', password: '', confirmPassword: '' });
        setBadAlet(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setOpenAlertBar(true);

        try {
            await api().post('/user-register', {
                storeName: form.storeName,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword
            });

        } catch (error) {
            setWarning(error.response.data);
            setBadAlet(true)
            return;
        }
        setWarning('Usuário cadastrado com sucesso! Clique AQUI para fazer o login.');
        handleClearForm();
    }

    return (

        <div className='container container--signup'>
            <div className='signup'>
                <img className='signup__img' src={Logo} alt="Logo Cubos Market" />
                <h2>Cadastre-se</h2>
                <form className='signup__form' onSubmit={handleSubmit}>
                    <div className='form__signup-store'>
                        <label htmlFor='storeName'>Nome da Loja</label>
                        <Input
                            id='storeName'
                            type='text'
                            name='storeName'
                            value={form.storeName}
                            onChange={handleChangeInputValue}
                            error
                            helperText="Incorrect entry."
                        />
                    </div>
                    <div className='form__signup-email'>
                        <label htmlFor='email'>E-mail</label>
                        <Input
                            id='email'
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChangeInputValue}
                            error
                            helperText="Incorrect entry."
                        />
                    </div>
                    <div className='form__signup-password'>
                        <label htmlFor='password'>Senha</label>
                        <InputPassword
                            id='password'
                            name='password'
                            value={form.password}
                            onChange={handleChangeInputValue}
                            error
                            helperText="Incorrect entry."
                        />
                    </div>
                    <div className='form__signup-confirm-password'>
                        <label htmlFor='confirmPassword'>Confirme sua senha</label>
                        <InputPassword
                            id='confirmPassword'
                            name='confirmPassword'
                            value={form.confirmPassword}
                            onChange={handleChangeInputValue}
                            error
                            helperText="Incorrect entry."
                        />
                        <span className='span-warning'></span>
                    </div>
                    <span className='form__signup-politcs'>Ao criar uma conta, você concorda com a nossa <a href="/not-found">Política de Privacidade</a> e <a href="/not-found">Termos de serviço</a></span>
                    <button className='button transform' type='submit'>Criar conta</button>
                </form>
                <span className='signup__link-signup'>Já tem uma conta? <button className='transform' onClick={() => navigate('/login')}>Fazer login</button></span>
                {warning &&
                    <AlertBar
                        message={warning}
                        openAlertBar={openAlertBar}
                        handleCloseAlertBar={handleCloseAlertBar}
                        badAlert={badAlert}
                    />}
            </div>
        </div>
    );
}

export default SignUp;