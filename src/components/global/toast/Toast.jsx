import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material';
import { Slide, ToastContainer } from 'react-toastify';

const StyledToastContainer = styled(ToastContainer)(({ theme }) => ({
  '@media only screen and (max-width: 480px)': {
    width: '100%',
    paddingInline: '10px',
    paddingTop: '10px',
  },

  '.Toastify__toast': {
    marginBottom: 0,
    background: theme.palette.background.blur,
    color: theme.palette.text.secondary,
    borderRadius: '8px',
    backdropFilter: `blur(${theme.blur.sm})`,
    overflow: 'hidden',
  },

  '.Toastify__close-button': {
    color: theme.palette.text.secondary,
  },
}));

export default function Toast() {
  return (
    <StyledToastContainer
      position={'bottom-center'}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      transition={Slide}
    />
  );
}
