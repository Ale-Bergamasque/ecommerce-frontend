import EditIcon from '../../assets/icons/edit_icon.png';
import DeleteIcon from '../../assets/icons/trash_icon.png';
import './styles.css';

function MyProductsCard({
    productImage,
    productName,
    productPrice,
    productStock,
    openModal,
    productId,
    openEditModal,
    product
}) {

    return (
        <div className='my-product-card'>
            <div>
                <img
                    className='my-product-card__product-photo'
                    src={productImage}
                    alt="Imagem do produto"
                />
            </div>
            <div className='my-product-card__product-name'>
                <span>{productName}</span>
            </div>
            <div className='organization-my-product-card'>
                <div className='my-product-card__product-stock'>
                    <span>{productStock}</span>
                </div>
                <div className='my-product-card__product-sale'>
                    <span>0</span>
                </div>
                <div className='my-product-card__product-price'>
                    <span>{productPrice}</span>
                </div>
                <div className='my-product-card__product-icons'>
                    <img
                        className='my-product-card__edit-icon transform'
                        src={EditIcon}
                        alt="Ícone Editar Produto"
                        onClick={() => openEditModal(product)}
                    />
                    <img
                        className='transform'
                        src={DeleteIcon}
                        alt="Ícone Deletar Produto"
                        onClick={() => openModal(productId)} />
                </div>
            </div>
        </div>
    );
}

export default MyProductsCard;