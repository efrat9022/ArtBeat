import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import axios from 'axios';

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
      for (const item of cartItems) {
        const res = await axios.get(`http://localhost:4000/artworks/${item.id}`);
        const updatedArtwork = {
          ...res.data,
          purchases: (res.data.purchases || 0) + item.quantity
        };
        await axios.put(`http://localhost:4000/artworks/${item.id}`, updatedArtwork);
      }

      const order = {
        userId: user.id,
        items: cartItems,
        total,
        date: new Date().toISOString()
      };

      await axios.post('http://localhost:4000/orders', order);

      dispatch(clearCart());
      navigate('/thankyou');
    } catch (err) {
      console.error('שגיאה בביצוע ההזמנה:', err);
      alert('שגיאה בביצוע ההזמנה');
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5 pt-5" dir="rtl">
      <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h4 className="fw-bold mb-4 text-center">סיכום ההזמנה</h4>

        {cartItems.length === 0 ? (
          <p className="text-center">העגלה שלך ריקה</p>
        ) : (
          <>
            <ul className="list-group mb-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div className="fw-bold">{item.title}</div>
                    <small className="text-muted">
                      כמות: {item.quantity} | ₪{item.price} ליחידה
                    </small>
                  </div>
                  <span className="fw-bold">₪{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>

            <div className="border-top pt-3 text-end">
              <h5 className="fw-bold">סה"כ לתשלום: ₪{total}</h5>
            </div>

            <button
              className="btn btn-dark w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              סיום רכישה
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;

