import './styles.css';

export default function ProductCard({ productImage, productName, productPrice }) {

    return (
        <div className="card transform">
            <img className='card__img' src={productImage} alt="Imagem do rpoduto" />
            <span className='card__name'>{productName}</span>
            <h1 className='card__price'>{productPrice}</h1>
        </div>
    );
}