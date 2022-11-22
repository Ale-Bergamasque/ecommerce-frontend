import './styles.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Post from '../../assets/post.png';
import { boxAdStyle, modalImage, titleStyle } from './styles.js';

function AdPublishedModal({ open, onClose }) {

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxAdStyle}>
                    <img
                        src={Post}
                        alt="Anúncio publicado"
                        style={modalImage}
                    />
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={titleStyle}
                    >
                        O anúncio foi publicado
                    </Typography>
                    <span className='ad-published-modal-span'>O anúncio está ativo e o produto disponível para venda</span>
                    <div className='modal__delete-btns'>
                        <button className='button close-btn' type='button' onClick={onClose}>Fechar</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AdPublishedModal;   