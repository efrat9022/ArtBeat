import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/userSlice';
import { setMessage } from '../redux/slices/messageSlice';
import { clearCart } from '../redux/slices/cartSlice';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
     dispatch(clearCart()); // ← איפוס הסל
    dispatch(setMessage({ type: 'success', text: 'התנתקת בהצלחה' }));
    navigate('/login');
  };

  const linkStyle = {
    color: 'white',
    background: 'none',
    textDecoration: 'none',
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top border-bottom border-secondary" dir="rtl">
      <div className="container-fluid px-4 d-flex align-items-center">

        <div className="collapse navbar-collapse justify-content-start">
          <ul className="navbar-nav align-items-center" style={{ gap: '1rem' }}>
            {currentUser ? (
              <>
                {currentUser.isAdmin ? (
                  <>
                    <li className="nav-item" style={{ borderLeft: '1px solid white', paddingLeft: '10px' }}>
                      <Link className="nav-link" to="/" style={linkStyle}>כל המוצרים</Link>
                    </li>

                    <li className="nav-item" style={{ borderLeft: '1px solid white', paddingLeft: '10px' }}>
                      <Link className="nav-link d-flex align-items-center" to="/admin/create" style={linkStyle}>
                        <span style={{ color: 'white', fontWeight: 'bold', marginLeft: '5px' }}>+</span> הוספת יצירה
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item" style={{ borderLeft: '1px solid white', paddingLeft: '10px' }}>
                      <Link className="nav-link" to="/" style={linkStyle}>כל האמנים והיצירות</Link>
                    </li>
                    {/* <li className="nav-item" style={{ borderLeft: '1px solid white', paddingLeft: '10px' }}>
                      <Link className="nav-link" to="/gallery" style={linkStyle}>על הגלריה</Link>
                    </li>
                    <li className="nav-item" style={{ borderLeft: '1px solid white', paddingLeft: '10px' }}>
                      <Link className="nav-link" to="/news" style={linkStyle}>חדשות ואירועים</Link>
                    </li> */}

                    <li className="nav-item position-relative">
                      <Link className="nav-link" to="/cart" style={{ padding: 0, display: 'inline-block', color: 'white' }}>
                        <i className="bi bi-cart" style={{ fontSize: '24px', color: 'white' }}></i>
                        {cartQuantity > 0 && (
                          <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                            style={{
                              backgroundColor: '#ff3f7a',
                              color: 'white',
                              fontSize: '0.75rem',
                              padding: '0.4em 0.55em',
                            }}
                          >
                            {cartQuantity}
                          </span>
                        )}
                      </Link>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/profile" style={linkStyle}>{currentUser.name}</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>התנתקות</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/login">התחברות</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm text-dark" to="/register">הרשמה</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <i className="bi bi-facebook" style={{ color: 'white', fontSize: '1.2rem' }}></i>
          <div style={{ borderLeft: '1px solid white', height: '24px' }}></div>
          <i className="bi bi-instagram" style={{ color: 'white', fontSize: '1.2rem' }}></i>
          <div style={{ borderLeft: '1px solid white', height: '24px' }}></div>
          <i className="bi bi-youtube" style={{ color: 'white', fontSize: '1.2rem' }}></i>
          <div style={{ borderLeft: '1px solid white', height: '24px' }}></div>
          <i className="bi bi-universal-access" style={{ color: 'white', fontSize: '1.2rem' }}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

