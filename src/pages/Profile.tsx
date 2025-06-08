import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  Box, Button, TextField, Typography, Container
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { updateProfile } from '../redux/slices/userSlice';
import { setMessage } from '../redux/slices/messageSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('שדה חובה'),
      email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
      password: Yup.string().min(6, 'לפחות 6 תווים')
    }),
    onSubmit: async (values) => {
      if (!user) return;
      try {
        const updatedUser = {
          ...user,
          ...values,
          password: values.password || user.password
        };

        await axios.put(`http://localhost:4000/users/${user.id}`, updatedUser);
        dispatch(updateProfile(updatedUser));
        dispatch(setMessage({ type: 'success', text: 'הפרטים עודכנו בהצלחה' }));

        // הפנייה בהתאם לסוג המשתמש
        if (updatedUser.isAdmin) {
          navigate('/admin/add');
        } else {
          navigate('/');
        }
      } catch {
        dispatch(setMessage({ type: 'error', text: 'שגיאה בעדכון הפרטים' }));
      }
    }
  });

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6">יש להתחבר כדי לצפות בפרופיל</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>פרופיל אישי</Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="שם"
          name="name"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          label="אימייל"
          name="email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          label="סיסמה חדשה"
          name="password"
          type="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          helperText="השאר ריק אם לא רוצים לשנות סיסמה"
        />

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">שמור שינויים</Button>
        </Box>
      </form>
    </Container>
  );
};

export default Profile;
