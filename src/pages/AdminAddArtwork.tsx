import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Paper
} from '@mui/material';
import axios from 'axios';

interface Artwork {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

const AdminAddArtwork = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get('http://localhost:4000/artworks');
        setArtworks(res.data);
      } catch (err) {
        console.error('שגיאה בטעינת יצירות', err);
      }
    };
    fetchArtworks();
  }, []);

  if (!user?.isAdmin) {
    return <Typography sx={{ m: 4 }}>אין לך הרשאה לגשת לעמוד זה</Typography>;
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את היצירה?')) {
      try {
        await axios.delete(`http://localhost:4000/artworks/${id}`);
        setArtworks(prev => prev.filter(a => a.id !== id));
      } catch (err) {
        alert('שגיאה במחיקה');
      }
    }
  };

  return (
    <Box sx={{ px: 3, py: 5, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper elevation={4} sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: '#ffffff' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#111' }}>
          ניהול יצירות
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            px: 4,
            py: 1,
            fontWeight: 500,
            '&:hover': { backgroundColor: '#222' }
          }}
          onClick={() => navigate('/admin/create')}
        >
          הוספת יצירה חדשה
        </Button>
      </Paper>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {artworks.map((art) => (
          <Card
            key={art.id}
            sx={{
              width: 280,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: '#fff',
              transition: '0.3s',
              '&:hover': { boxShadow: 6 }
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={art.image}
              alt={art.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#222' }}>
                {art.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                {art.category}
              </Typography>
              <Typography variant="body1" sx={{ color: '#000' }}>
                ₪{art.price}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/admin/edit/${art.id}`)}
                  sx={{ fontWeight: 500 }}
                >
                  עריכה
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(art.id)}
                >
                  מחיקה
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminAddArtwork;
