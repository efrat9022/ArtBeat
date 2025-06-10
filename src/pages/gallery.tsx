import React from 'react';
import { Container, Typography } from '@mui/material';

const AboutGallery = () => {
  const images = [
    'https://www.misgeret.co.il/Pics/naomi/124152-567-16-09-10-PR.jpg.webp',
    'https://www.misgeret.co.il/wht_Images/catalog/style/image_content_28.jpg.webp',
    'https://live.staticflickr.com/5745/22815145211_f88dcd17ee_b.jpg',
    'https://www.ein-hod.org/wp-content/uploads/2024/03/431227729_405865335372072_8903938602691012081_n.jpg',
    'https://www.haifa.muni.il/wp-content/uploads/2022/08/%D7%92%D7%9C%D7%A8%D7%99%D7%94-%D7%97%D7%99%D7%A4%D7%94-1000x563.jpg'
  ];

  return (
    <>
      <div id="galleryCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((src, i) => (
            <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
              <img src={src} className="d-block w-100" alt={`slide-${i}`} style={{ maxHeight: '500px', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* כפתורי ניווט */}
        <button className="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">הקודם</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">הבא</span>
        </button>
      </div>

      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          אמנות ישראלית – בנשמה
        </Typography>
        <Typography variant="body1" sx={{ color: '#444', fontSize: '1.15rem', lineHeight: 2 }}>
          הגלריה שלנו נולדה מתוך אהבה עמוקה לאמנות ישראלית עכשווית. במרכז העשייה שלנו...
        </Typography>
      </Container>
    </>
  );
};

export default AboutGallery;
