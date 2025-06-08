import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Card, CardMedia, CardContent, Typography,
  CardActionArea, CircularProgress, TextField,
  FormControl, Select, MenuItem, InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

interface Artwork {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

const Home = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const fetchArtworks = async (newPage = 1, reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:4000/artworks', {
        params: {
          _page: newPage,
          _limit: 20,
          _sort: 'id',
          title_like: searchTerm,
          category: category || undefined,
          price_gte: minPrice || undefined,
          price_lte: maxPrice || undefined
        }
      });

      const fetched = res.data;
      reset ? setArtworks(fetched) : setArtworks(prev => [...prev, ...fetched]);
      setHasMore(fetched.length === 20);
    } catch (err) {
      console.error('שגיאה בטעינת יצירות:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchArtworks(1, true);
  }, [searchTerm, category, minPrice, maxPrice]);

  useEffect(() => {
    if (page === 1) return;
    fetchArtworks(page);
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        hasMore && !loading
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMore, loading]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <Box className="home-container">
      <h1 className="home-title">
        <div className="line">
          {'Art'.split('').map((char, i) => (
            <span key={i} className={`letter letter-${i}`}>{char}</span>
          ))}
        </div>
        <div className="line">
          {'Beat'.split('').map((char, i) => (
            <span key={i + 3} className={`letter letter-${i + 3}`}>{char}</span>
          ))}
        </div>
      </h1>

      <Box className="filters-bar">
        <TextField
          label="חיפוש לפי שם"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl>
          <InputLabel>קטגוריה</InputLabel>
          <Select
            value={category}
            label="קטגוריה"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">הכל</MenuItem>
            <MenuItem value="Painting">ציור</MenuItem>
            <MenuItem value="Sculpture">פיסול</MenuItem>
            <MenuItem value="Print">הדפס</MenuItem>
            <MenuItem value="Screen Print">הדפס רשת</MenuItem>
            <MenuItem value="Collage">קולאז'</MenuItem>
            <MenuItem value="Drawing">רישום</MenuItem>
            <MenuItem value="Photography">צילום</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="מחיר מינימלי"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <TextField
          label="מחיר מקסימלי"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button className="button-reset" onClick={resetFilters}>
          איפוס סינון
        </button>
      </Box>

      <Box className="artworks-grid">
        {artworks.map((art) => (
          <Box key={art.id} className="art-card" onClick={() => navigate(`/artworks/${art.id}`)}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={art.image}
                  alt={art.title}
                />
                <CardContent>
                  <Typography variant="h6">{art.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    קטגוריה: {art.category}
                  </Typography>
                  <Typography variant="body1">₪{art.price}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>

      {loading && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {!hasMore && artworks.length > 0 && (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          אין עוד יצירות לטעון
        </Typography>
      )}
    </Box>
  );
};

export default Home;
