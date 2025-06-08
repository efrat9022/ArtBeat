import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  clearCart,
  decreaseQuantity,
  addToCart
} from '../redux/slices/cartSlice';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button
} from '@mui/material';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>הסל שלי</Typography>

      {cartItems.length === 0 ? (
        <Typography>הסל ריק</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ width: { xs: '100%', md: '48%' } }}>
                <Card sx={{ display: 'flex', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      width: 150,
                      height: 150,
                      objectFit: 'contain',
                      backgroundColor: '#f0f0f0',
                      borderRadius: 1
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography>כמות: {item.quantity}</Typography>
                    <Typography>מחיר ליחידה: ₪{item.price}</Typography>
                    <Typography>סה"כ: ₪{item.price * item.quantity}</Typography>

                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <IconButton
                        color="success"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        <AddIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          <Typography variant="h6" sx={{ mt: 4 }}>
            סה"כ לתשלום: ₪{total}
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(clearCart())}
            >
              נקה סל
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/checkout')}
            >
              לתשלום
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
