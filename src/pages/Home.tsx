import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface Artwork {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

const Home: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('1000');
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
          price_lte: maxPrice || undefined,
        },
      });
      const fetched = res.data;
      reset ? setArtworks(fetched) : setArtworks((prev) => [...prev, ...fetched]);
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
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMore, loading]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('');
    setMinPrice('0');
    setMaxPrice('1000');
  };

  return (
    <div style={{ paddingTop: '40px' }}>
      <div className="container-fluid py-4" dir="rtl">
        <div className="px-0" dir="rtl">
          <div className="d-flex align-items-center justify-content-start gap-4 flex-row-reverse" style={{ marginBottom: '0.2rem' }}>
            <img
              src="/art.png"
              alt="Art Gallery Logo"
              style={{ height: '120px', width: 'auto', marginRight: 0 }}
            />
            <h1 className="fw-bold h4 text-dark m-0">
              מיטב אמני ישראל במקום אחד
            </h1>
          </div>
          <hr
            style={{
              borderTop: '4px solid #333',
              marginTop: '0rem',
              marginBottom: '2rem',
              width: '100vw',
              marginRight: 0,
              marginLeft: 0
            }}
          />
        </div>
        <div className="p-0 mb-5 d-flex flex-wrap align-items-center justify-content-center gap-3" style={{ background: 'transparent' }}>
          <input
            type="text"
            className="form-control form-control-sm w-auto"
            placeholder="חיפוש לפי שם"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-select form-select-sm w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">כל הקטגוריות</option>
            <option value="Painting">ציור</option>
            <option value="Sculpture">פיסול</option>
            <option value="Print">הדפס</option>
            <option value="Screen Print">הדפס רשת</option>
            <option value="Collage">קולאז'</option>
            <option value="Drawing">רישום</option>
            <option value="Photography">צילום</option>
          </select>

          <div className="text-center" style={{ minWidth: 200 }}>
            <div className="small mb-1">
              טווח מחירים: ₪{maxPrice} - ₪{minPrice}
            </div>
            <Slider
              range
              min={0}
              max={1000}
              step={10}
              defaultValue={[+minPrice, +maxPrice]}
              onChange={(value) => {
                if (Array.isArray(value) && value.length === 2) {
                  const [min, max] = value;
                  setMinPrice(min.toString());
                  setMaxPrice(max.toString());
                }
              }}
              trackStyle={[{ backgroundColor: '#0d6efd' }]}
              handleStyle={[
                { borderColor: '#0d6efd', backgroundColor: '#fff' },
                { borderColor: '#0d6efd', backgroundColor: '#fff' },
              ]}
              railStyle={{ backgroundColor: '#ccc' }}
            />
          </div>

          <button className="btn btn-outline-secondary btn-sm" onClick={resetFilters}>
            איפוס סינון
          </button>
        </div>
        <div className="container">
          <div className="row g-4">
            {artworks.map((art) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={art.id}>
                <div
                  className="card h-100 shadow-sm"
                  role="button"
                  onClick={() => navigate(`/artworks/${art.id}`)}
                >
                  <img
                    src={art.image}
                    className="card-img-top"
                    alt={art.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{art.title}</h5>
                    <p className="card-text text-muted mb-1">קטגוריה: {art.category}</p>
                    <p className="card-text fw-bold">₪{art.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border" role="status" />
          </div>
        )}

        {!hasMore && artworks.length > 0 && (
          <p className="text-center text-muted mt-4">אין עוד יצירות לטעון</p>
        )}
      </div>
    </div>
  );
};

export default Home;

