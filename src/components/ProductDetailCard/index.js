import './styles.css';
import TicketIcon from '../../assets/icons/ticket_icon.png';
import CardIcon from '../../assets/icons/card_icon.png';
import PixIcon from '../../assets/icons/pix_icon.png';
import AddIcon from '../../assets/icons/plus_icon.png';
import LessIcon from '../../assets/icons/less_icon.png';
import CartIcon from '../../assets/icons/cart_icon.png';

export default function ProductDetailCard({
    productImage,
    productName,
    productPrice,
    storeName,
    productStock,
    productDescription,
    productQuantity,
    addProduct,
    lessProduct,
    navigateTo
}) {



    return (
        <div className='product-detail'>

            <div className='product-detail__details'>

                <img className='product-detail__img' src={productImage} alt="Foto do produto" />
                <div className='product-detail__product'>
                    <h1 className='product-detail__name'>{productName}</h1>
                    <span className='product-detail__store'>
                        Vendido e entregue por | <span className='product-detail__store-name'>{storeName}</span>
                    </span>
                    <h1 className='product-detail__price'>{(productPrice / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}</h1>
                    <span className='product-detail__pay'>Formas de pagamento</span>
                    <div className='product-detail__payment-icons'>
                        <img className='product-detail__payment-icon' src={TicketIcon} alt="Pagamento em Boleto" />
                        <img className='product-detail__payment-icon' src={CardIcon} alt="Pagamento em Cartão" />
                        <img className='product-detail__payment-icon' src={PixIcon} alt="Pagamento em Pix" />
                    </div>
                    <span className='product-detail__quantity'>Quantidade</span>
                    <div className='product-detail__quantity-calc'>
                        <div className='product-detail__item'>
                            <img className='transform' src={LessIcon} alt="Diminuir um item" onClick={() => lessProduct(productQuantity)} />
                            <span>{productQuantity}</span>
                            <img className='transform' src={AddIcon} alt="Adicionar um item" onClick={() => addProduct(productQuantity, productStock)} />
                        </div>
                        <span className='product-detail__stock'>{productStock} disponíveis</span>
                    </div>
                    <span className='product-detail__freight'>Calcular frete e prazo</span>
                    <input className='product-detail__freight-input' type="text" placeholder='Digite o CEP' />
                    <div className='product-detail__buttons'>
                        <button className='product-detail__add transform' onClick={navigateTo}><img src={CartIcon} alt="Carrinho" className='cart-icon' />Adicionar ao carrinho</button>
                        <button className='product-detail__buy button transform' onClick={navigateTo}>Comprar agora</button>
                    </div>
                </div>
            </div>
            <div className='product-detail__description'>
                <h1 className='product-detail__description-title'>Descrição do produto</h1>
                <p className='product-detail__description-text'>{productDescription}</p>
            </div>
        </div>
    );
}