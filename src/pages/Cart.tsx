import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  removeFromCart,
  clearCart,
  decreaseQuantity,
  addToCart
} from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mt-5" dir="rtl">
      <h2 className="mb-4 fw-bold mt-5 pt-5">הסל שלי</h2>

      <div className="row">
        <div className="col-lg-9">
          {cartItems.length === 0 ? (
            <p>הסל שלך ריק</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="d-flex justify-content-between align-items-center py-4">
                    <div className="d-flex align-items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                      />
                      <div>
                        <h5 className="mb-2 fw-bold">{item.title}</h5>
                        <p className="mb-1 text-muted" style={{ fontSize: '0.95rem' }}>
                          תיאור לדוגמה של המוצר או מידע קצר נוסף.
                        </p>
                        <div style={{ fontSize: '0.95rem' }}>
                          מחיר ליחידה: <strong>₪{item.price}</strong> <br />
                          סה"כ: <strong>₪{item.price * item.quantity}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => dispatch(addToCart(item))}>+</button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(removeFromCart(item.id))}>הסר</button>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <hr className="my-0" />} 
                </div>
              ))}
            </>
          )}
        </div>

        <div className="col-lg-3 mt-4 mt-lg-0">
          <div className="border rounded shadow-sm p-3 mb-3">
            <h5 className="fw-bold mb-3">סיכום הזמנה</h5>
            <div className="mb-2">סה"כ מוצרים: <strong>{totalItems}</strong></div>
            <div className="mb-3">לתשלום: <strong>₪{total}</strong></div>

            <button
              className="btn btn-dark w-100 mb-2"
              onClick={() => navigate('/checkout')}
            >
              המשך לתשלום
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => dispatch(clearCart())}
            >
              נקה סל
            </button>
          </div>
          <div className="border rounded shadow-sm p-3 text-center">
            <p className="fw-bold mb-1" style={{ fontSize: '0.95rem' }}>
              לקבל משלוח חינם ומהיר יותר<br />
              עם ניסיון בחינם למשך 6 חודשים
            </p>
            <img src="/prime.png" alt="Prime" style={{ height: '28px', marginBottom: '10px' }} />
            <br />
            <button className="btn btn-outline-dark btn-sm">Try Prime</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
