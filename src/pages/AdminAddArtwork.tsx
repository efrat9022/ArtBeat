import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>ניהול יצירות</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate('/admin/create')}
      >
        הוספת יצירה חדשה
      </Button>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {artworks.map((art) => (
          <Card key={art.id} sx={{ width: 300 }}>
            <CardMedia
              component="img"
              height="140"
              image={art.image}
              alt={art.title}
            />
            <CardContent>
              <Typography variant="h6">{art.title}</Typography>
              <Typography variant="body2" color="text.secondary">{art.category}</Typography>
              <Typography variant="body1">₪{art.price}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Button size="small" onClick={() => navigate(`/admin/edit/${art.id}`)}>עריכה</Button>
                <Button size="small" color="error" onClick={() => handleDelete(art.id)}>מחיקה</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminAddArtwork;
