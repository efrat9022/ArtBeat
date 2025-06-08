import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Snackbar, Alert } from '@mui/material';
import { clearMessage } from '../redux/slices/messageSlice';

const ToastMessage = () => {
  const message = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <Snackbar open={!!message.text} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity={message.type || 'info'}>{message.text}</Alert>
    </Snackbar>
  );
};

export default ToastMessage;
