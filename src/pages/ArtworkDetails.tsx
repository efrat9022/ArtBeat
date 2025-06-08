import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardMedia, CardContent,
  TextField, Button, Rating
} from '@mui/material';
import { useParams, useLocation } from 'react-router-dom'; // ✅ נוספה location
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
  const location = useLocation(); // ✅ משמש כדי לטריגר טעינה מחדש
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
  }, [id, location.key]); // ✅ רענון גם אם id לא משתנה

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
    <Box sx={{ p: 2 }}>
      <Card>
        <CardMedia
          component="img"
          image={artwork.image}
          alt={artwork.title}
          sx={{
            maxHeight: 300,
            width: '100%',
            objectFit: 'contain',
            backgroundColor: '#f5f5f5',
            p: 1
          }}
        />
        <CardContent>
          <Typography variant="h4">{artwork.title}</Typography>
          <Typography variant="subtitle1">{artwork.description}</Typography>
          <Typography variant="body1">₪{artwork.price}</Typography>
          <Typography variant="body2" color="text.secondary">קטגוריה: {artwork.category}</Typography>

          {/* ✅ מציג את כמות הקניות */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            נרכש {artwork.purchases || 0} פעמים
          </Typography>

          <Button onClick={handleAddToCart} sx={{ mt: 2 }} variant="contained">
            הוסף לסל
          </Button>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>חוות דעת</Typography>
        {reviews.map(review => (
          <Box key={review.id} sx={{ mb: 2, borderBottom: '1px solid #ccc', pb: 1 }}>
            <Rating value={review.rating} readOnly />
            <Typography>{review.comment}</Typography>
            <Typography variant="subtitle2">
              נכתב על ידי: {review.userName || 'משתמש'}
            </Typography>
            {user && user.id.toString() === review.userId.toString() && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDeleteReview(review.id)}
              >
                מחק
              </Button>
            )}
          </Box>
        ))}
      </Box>

      {user && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">כתוב ביקורת</Typography>
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
    </Box>
  );
};

export default ArtworkDetails;
