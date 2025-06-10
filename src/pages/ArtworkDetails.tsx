import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Rating
} from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/slices/cartSlice';
import { setMessage } from '../redux/slices/messageSlice';

interface Artwork {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  purchases?: number;
}

interface Review {
  id: number | string;
  artworkId: number;
  userId: string | number;
  userName?: string;
  rating: number;
  comment: string;
  date: string;
}

const ArtworkDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:4000/artworks/${id}`).then(res => setArtwork(res.data));
    axios.get(`http://localhost:4000/reviews?artworkId=${id}`).then(res => setReviews(res.data));
  }, [id, location.key]);

  const handleAddToCart = () => {
    if (!user) {
      dispatch(setMessage({ type: 'error', text: 'אינך מחובר, אנא התחבר למערכת' }));
      return;
    }
    if (artwork) dispatch(addToCart(artwork));
  };

  const handleReviewSubmit = async () => {
    if (!user || !rating || !comment.trim()) return;

    const newReview = {
      artworkId: Number(id),
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    const res = await axios.post(`http://localhost:4000/reviews`, newReview);
    setReviews(prev => [...prev, res.data]);
    setComment('');
    setRating(null);
  };

  const handleDeleteReview = async (reviewId: string | number) => {
    await axios.delete(`http://localhost:4000/reviews/${reviewId}`);
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  if (!artwork) return <Typography sx={{ m: 5 }}>טוען...</Typography>;

  return (
        <Box sx={{
        p: 4,
        mt: 10, 
        maxWidth: 1200,
        mx: 'auto',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 5
      }}>
      <Box sx={{
        flex: 1,
        maxWidth: 500,
        bgcolor: '#f9f9f9',
        p: 2,
        borderRadius: 2,
        textAlign: 'center'
      }}>
        <img
          src={artwork.image}
          alt={artwork.title}
          style={{ width: '100%', objectFit: 'contain', maxHeight: 400 }}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>{artwork.title}</Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>{artwork.description}</Typography>
        <Typography variant="h6">₪{artwork.price}</Typography>
        <Typography variant="body2">קטגוריה: {artwork.category}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          נרכש {artwork.purchases || 0} פעמים
        </Typography>

        <Button variant="contained" onClick={handleAddToCart} sx={{ mb: 4 }}>
          הוסף לסל
        </Button>

        {user && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6" gutterBottom>כתוב ביקורת</Typography>
            <Rating
              value={rating}
              onChange={(_, newVal) => setRating(newVal)}
              sx={{ mb: 1 }}
            />
            <TextField
              label="התגובה שלך"
              multiline
              fullWidth
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button sx={{ mt: 1 }} onClick={handleReviewSubmit} variant="contained">שלח</Button>
          </Box>
        )}

        <Box>
          <Typography variant="h6" gutterBottom>חוות דעת של לקוחות</Typography>
          {reviews.length === 0 ? (
            <Typography color="text.secondary">אין עדיין חוות דעת.</Typography>
          ) : (
            reviews.map(review => (
              <Box key={review.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                <Rating value={review.rating} readOnly />
                <Typography variant="body2" sx={{ mt: 1 }}>{review.comment}</Typography>
                <Typography variant="caption" color="text.secondary">
                  נכתב על ידי: {review.userName || 'משתמש'} בתאריך {review.date}
                </Typography>
                {user && user.id.toString() === review.userId.toString() && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteReview(review.id)}
                    sx={{ mt: 1 }}
                  >
                    מחק
                  </Button>
                )}
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ArtworkDetails;




