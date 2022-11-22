import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertBar({ message, openAlertBar, handleCloseAlertBar, badAlert }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };


  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar
        open={openAlertBar}
        autoHideDuration={3000}
        onClose={handleCloseAlertBar}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {badAlert ?
          <Alert severity="error">{message}</Alert>
          : <button
            style={{ all: 'unset', cursor: 'pointer' }}
            onClick={handleClick}>
            <Alert severity={"success"}>{message}</Alert>
          </button>
        }
      </Snackbar>

    </Stack>
  );
}