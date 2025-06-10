import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }} dir="rtl">
      <div className="card shadow text-center p-5" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-success mb-3" style={{ fontSize: '4rem' }}>✓</div>
        <h3 className="fw-bold mb-3">תודה על הרכישה!</h3>
        <p className="mb-4">ההזמנה שלך התקבלה בהצלחה ואנחנו מטפלים בה כעת.</p>
        <button className="btn btn-dark w-100" onClick={() => navigate('/')}>
          חזרה לעמוד הבית
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
