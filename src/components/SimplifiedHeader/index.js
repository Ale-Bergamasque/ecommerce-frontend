import './styles.css';
import Logo from '../../assets/Logo_header.png';
import UserIcon from '../../assets/icons/profile_icon.png';
import LogoffIcon from '../../assets/icons/out_icon.png';
import BackIcon from '../../assets/icons/left_arrow_icon.png';

export default function SimplifiedHeader({ pageBack, token, logoff, user, navigateTo }) {
    return (
        <header className='simplified-header'>
            <img className='simplified-header__back transform' onClick={pageBack} src={BackIcon} alt="Voltar" />
            <img className='simplified-header__logo' src={Logo} alt="Logo Market Cubos" />
            <div className='simplified-header__menu'>
                <div className='simplified-header__user transform' onClick={navigateTo}>
                    <img src={UserIcon} alt="Ícone Usuário" />
                    <span>{user}</span>
                </div>
                {token && <div className='simplified-header__logoff transform' onClick={logoff}>
                    <img src={LogoffIcon} alt="Ícone Sair" />
                    <span>Sair</span>
                </div>}
            </div>
        </header>
    );
}