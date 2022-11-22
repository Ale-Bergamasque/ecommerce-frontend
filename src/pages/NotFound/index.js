import './styles.css';

function NotFound() {

    return (
        <div className='container-not-found'>
            <button className='button' onClick={() => window.history.back()}>Go Home</button>
        </div>
    );
}

export default NotFound;