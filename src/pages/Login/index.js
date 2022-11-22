import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import AlertBar from '../../components/AlertBar';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import './styles.css';

function Login() {
    const { token, setToken, setUserId, setStoreName } = useUser();
    const [form, setForm] = useState({ email: '', password: '' });
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
    }

    function handleClearForm() {
        setForm({ email: '', password: '' });
        setWarning('');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setOpenAlertBar(true);

        try {
            const response = await api().post('/login', {
                email: form.email,
                password: form.password
            });

            setToken(response.data.token);
            setUserId(response.data.user.id);
            setStoreName(response.data.user.store_name);

            navigate('/');

        } catch (error) {
            setWarning(error.response.data);
            setBadAlet(true);
            return;
        }

        handleClearForm();
    }

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, []);

    return (
        <div className='container container--login'>
            <div className='login'>
                <img className='login__img' src={Logo} alt="Logo Cubos Market" />
                <h2>Boas-vindas!</h2>
                <span className='login__sapn-info'>Use seu e-mail e senha para acessar a conta</span>
                <form className='login__form' onSubmit={handleSubmit}>
                    <div className='form__email'>
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
                    <div className='form__password'>
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
                    <button className='button transform' type='submit'>Fazer login</button>
                </form>
                <span className='login__link-signup'>Não possui conta? <button className='transform' onClick={() => navigate('/registro')}>Cadastrar</button></span>
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

export default Login;
