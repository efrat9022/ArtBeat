import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/messageSlice';

const categories = ['Painting', 'Sculpture', 'Print', 'Screen Print', 'Collage', 'Drawing', 'Photography'];

const AdminEditArtwork = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/artworks/${id}`);
        const { title, description, image, price, category } = res.data;
        setInitialValues({
          title,
          description,
          image,
          price: price.toString(),
          category
        });
      } catch (err) {
        dispatch(setMessage({ type: 'error', text: 'שגיאה בטעינת פרטי היצירה' }));
      }
    };
    fetchArtwork();
  }, [id, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required('נדרש שם'),
      description: Yup.string(),
      image: Yup.string().url('יש להזין כתובת תמונה תקינה'),
      price: Yup.number().required('נדרש מחיר').positive('המחיר חייב להיות חיובי'),
      category: Yup.string().required('יש לבחור קטגוריה')
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:4000/artworks/${id}`, {
          ...values,
          price: parseFloat(values.price.toString())
        });
        dispatch(setMessage({ type: 'success', text: 'היצירה עודכנה בהצלחה!' }));
        navigate('/admin/add');
      } catch (err) {
        dispatch(setMessage({ type: 'error', text: 'שגיאה בעדכון היצירה' }));
      }
    }
  });

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>עריכת יצירה</Typography>
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
          שמור שינויים
        </Button>
      </form>
    </Box>
  );
};

export default AdminEditArtwork;

// ✅ פותר את שגיאת TS1208
export {};
