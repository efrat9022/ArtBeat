import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import { setMessage } from '../redux/slices/messageSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('אימייל לא תקין').required('יש להזין אימייל'),
      password: Yup.string().required('יש להזין סיסמה'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.get(`http://localhost:4000/users?email=${values.email}`);
        const user = res.data[0];

        if (!user) {
          dispatch(setMessage({ type: 'error', text: 'אימייל לא נמצא' }));
          return;
        }

        if (user.password !== values.password) {
          dispatch(setMessage({ type: 'error', text: 'סיסמה שגויה' }));
          return;
        }

        dispatch(login(user));
        dispatch(setMessage({ type: 'success', text: 'התחברות הצליחה!' }));
        navigate(user.isAdmin ? '/admin/add' : '/');
      } catch {
        dispatch(setMessage({ type: 'error', text: 'שגיאה בהתחברות' }));
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>התחברות</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="אימייל"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          margin="normal"
          label="סיסמה"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          התחבר
        </Button>
      </form>
    </Box>
  );
};

export default Login;
