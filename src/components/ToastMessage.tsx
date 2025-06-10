import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  Snackbar,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { CheckCircle, ErrorOutline, InfoOutlined, Close } from '@mui/icons-material';
import { clearMessage } from '../redux/slices/messageSlice';

const ToastMessage = () => {
  const message = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleClose = () => {
    dispatch(clearMessage());
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: '#e6f4ea',
          color: '#276749',
          icon: <CheckCircle sx={{ color: '#276749', mr: 1 }} />
        };
      case 'error':
        return {
          bg: '#fdecea',
          color: '#9b2c2c',
          icon: <ErrorOutline sx={{ color: '#9b2c2c', mr: 1 }} />
        };
      default:
        return {
          bg: '#e8f0fe',
          color: '#1a237e',
          icon: <InfoOutlined sx={{ color: '#1a237e', mr: 1 }} />
        };
    }
  };

  const styles = getStyles(message.type || 'info');

  return (
    <Snackbar open={!!message.text} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ mt: 9 }}>
      <Box
        sx={{
          backgroundColor: styles.bg,
          color: styles.color,
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          borderRadius: '12px',
          px: 3,
          py: 1.5,
          maxWidth: 460,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {styles.icon}
          <Typography sx={{ fontWeight: 500 }}>
            {message.text}
          </Typography>
        </Box>
        <IconButton onClick={handleClose}>
          <Close sx={{ color: styles.color }} />
        </IconButton>
      </Box>
    </Snackbar>
  );
};

export default ToastMessage;

