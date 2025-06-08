import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/messageSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('יש להזין שם'),
      email: Yup.string().email('אימייל לא תקין').required('יש להזין אימייל'),
      password: Yup.string()
        .min(6, 'הסיסמה חייבת לפחות 6 תווים')
        .matches(/[a-z]/, 'חייב אות קטנה')
        .matches(/[A-Z]/, 'חייב אות גדולה')
        .matches(/[0-9]/, 'חייב ספרה אחת לפחות')
        .required('יש להזין סיסמה'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.get(`http://localhost:4000/users?email=${values.email}`);
        if (res.data.length > 0) {
          dispatch(setMessage({ type: 'error', text: 'משתמש קיים, נא להתחבר' }));
          navigate('/login');
          return;
        }

        await axios.post('http://localhost:4000/users', {
          ...values,
          isAdmin: false,
        });

        dispatch(setMessage({ type: 'success', text: 'ההרשמה הצליחה! התחבר עכשיו' }));
        navigate('/login');
      } catch {
        dispatch(setMessage({ type: 'error', text: 'שגיאה בהרשמה' }));
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>הרשמה</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="שם"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
          הירשם
        </Button>
      </form>
    </Box>
  );
};

export default Register;
