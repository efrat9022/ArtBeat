import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/userSlice';
import { setMessage } from '../redux/slices/messageSlice';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setMessage({ type: 'success', text: 'התנתקת בהצלחה' }));
    navigate('/login');
  };

  return (
    <AppBar position="fixed" className="navbar" elevation={0}>
      <Toolbar className="navbar-toolbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo.png" alt="לוגו" className="logo-img" />
          </Link>
        </div>

        <div className="navbar-right">
          {currentUser && !currentUser.isAdmin && (
            <>
              <Button color="inherit" component={Link} to="/">בית</Button>
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartQuantity} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </>
          )}
       

       
          {currentUser ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                {currentUser.name}
              </Button>
              <Button color="inherit" onClick={handleLogout}>התנתקות</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">התחברות</Button>
              <Button color="inherit" component={Link} to="/register">הרשמה</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
