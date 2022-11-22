import './styles.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Close from '../../assets/icons/close_icon.png';
import { boxStyle, closeIconStyle, titleStyle } from './styles.js';

function DeleteProductModal({ open, onClose, onSubmit }) {

    return (

        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <img
                        src={Close}
                        alt="Fechar"
                        onClick={onClose}
                        style={closeIconStyle}
                    />
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={titleStyle}
                    >
                        Remover produto
                    </Typography>
                    <span className='delete-product-modal-span'>Tem certeza que deseja remover esse produto do estoque? A ação não poderá ser desfeita.</span>
                    <div>
                        <form onSubmit={onSubmit}>
                            <div className='modal__delete-btns'>
                                <button className='btn-delete button' type='submit'>Remover</button>
                                <button className='btn-cancel' type='button' onClick={onClose}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default DeleteProductModal;   