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
  MenuItem,
  Paper
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
    <Box sx={{ mt: 12, display: 'flex', justifyContent: 'center', px: 2 }}>
      <Paper
        elevation={6}
        sx={{
          p: 3,
          width: '100%',
          maxWidth: 340,
          bgcolor: '#fafafa',
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: '0 8px 18px rgba(0,0,0,0.1)'
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mb: 2, fontWeight: 600, color: '#111', textAlign: 'center' }}
        >
          עריכת יצירה
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            label="שם"
            size="small"
            {...formik.getFieldProps('title')}
          />
          <TextField
            fullWidth
            margin="dense"
            label="תיאור"
            multiline
            rows={2}
            size="small"
            {...formik.getFieldProps('description')}
          />
          <TextField
            fullWidth
            margin="dense"
            label="תמונה (URL)"
            size="small"
            {...formik.getFieldProps('image')}
          />
          <TextField
            fullWidth
            margin="dense"
            label="מחיר"
            type="number"
            size="small"
            {...formik.getFieldProps('price')}
          />
          <TextField
            select
            fullWidth
            margin="dense"
            label="קטגוריה"
            size="small"
            {...formik.getFieldProps('category')}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1,
              fontWeight: 500,
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': { backgroundColor: '#222' }
            }}
          >
            שמור שינויים
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminEditArtwork;




