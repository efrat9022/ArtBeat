import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/messageSlice';

const categories = ['Painting', 'Sculpture', 'Print', 'Screen Print', 'Collage', 'Drawing', 'Photography'];

const AdminCreateArtwork = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
      price: '',
      category: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('נדרש שם'),
      description: Yup.string(),
      image: Yup.string().url('יש להזין כתובת תמונה תקינה'),
      price: Yup.number().required('נדרש מחיר').positive('המחיר חייב להיות חיובי'),
      category: Yup.string().required('יש לבחור קטגוריה')
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:4000/artworks', {
          ...values,
          price: parseFloat(values.price.toString()),
          purchases: 0
        });
        dispatch(setMessage({ type: 'success', text: 'היצירה נוספה בהצלחה!' }));
        navigate('/admin/add');
      } catch (err) {
        dispatch(setMessage({ type: 'error', text: 'אירעה שגיאה בהוספה' }));
      }
    }
  });

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>הוספת יצירה חדשה</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="שם"
          {...formik.getFieldProps('title')}
        />
        <TextField
          fullWidth
          margin="normal"
          label="תיאור"
          {...formik.getFieldProps('description')}
        />
        <TextField
          fullWidth
          margin="normal"
          label="תמונה (URL)"
          {...formik.getFieldProps('image')}
        />
        <TextField
          fullWidth
          margin="normal"
          label="מחיר"
          type="number"
          {...formik.getFieldProps('price')}
        />
        <TextField
          select
          fullWidth
          margin="normal"
          label="קטגוריה"
          {...formik.getFieldProps('category')}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          הוספה
        </Button>
      </form>
    </Box>
  );
};

export default AdminCreateArtwork;