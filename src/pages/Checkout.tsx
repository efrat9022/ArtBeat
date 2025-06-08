import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('אנא התחבר למערכת כדי לבצע הזמנה');
      return;
    }

    try {
      // 1. עדכון כמות קניות עבור כל פריט
      for (const item of cartItems) {
        const numericId = Number(item.id);
        const res = await axios.get(`http://localhost:4000/artworks/${numericId}`);
        const updatedArtwork = {
          ...res.data,
          purchases: (res.data.purchases || 0) + item.quantity
        };
        await axios.put(`http://localhost:4000/artworks/${numericId}`, updatedArtwork);
      }

      // 2. שליחת הזמנה לשרת
      const order = {
        userId: user.id,
        items: cartItems,
        total,
        date: new Date().toISOString()
      };
      await axios.post('http://localhost:4000/orders', order);

      // 3. ניקוי עגלה וניווט
      dispatch(clearCart());
      navigate('/thankyou');

    } catch (err) {
      console.error('שגיאה בביצוע ההזמנה:', err);
      alert('שגיאה בביצוע ההזמנה');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>סיכום הזמנה</Typography>

      {cartItems.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Typography>
            {item.title} - כמות: {item.quantity} - ₪{item.price * item.quantity}
          </Typography>
        </Box>
      ))}

      <Typography variant="h6">סה"כ לתשלום: ₪{total}</Typography>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handlePlaceOrder}>
        סיום רכישה
      </Button>
    </Box>
  );
};

export default Checkout;
