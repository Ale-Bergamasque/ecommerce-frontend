import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Close from '../../assets/icons/close_icon.png';
import './styles.css';
import { boxStyle, closeIconStyle, titleStyle } from './styles.js';

function CancelEditModal({ open, discardEdition, onClose }) {

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
                        Descartar alterações
                    </Typography>
                    <span className='cancel-edit-modal-span'>As alterações realizadas não foram salvas, deseja descartá-las?</span>
                    <div>
                        <div className='modal__delete-btns'>
                            <button
                                className='btn-discard button'
                                type='submit'
                                onClick={discardEdition}
                            >
                                Descartar
                            </button>
                            <button
                                className='btn-edit'
                                type='button'
                                onClick={onClose}
                            >
                                Continuar editando
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}

export default CancelEditModal;   