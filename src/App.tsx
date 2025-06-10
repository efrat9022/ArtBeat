import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtworkDetails from './pages/ArtworkDetails';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import AdminAddArtwork from './pages/AdminAddArtwork';
import AdminCreateArtwork from './pages/AdminCreateArtwork'; 
import AdminEditArtwork from './pages/AdminEditArtwork';    
import Checkout from './pages/Checkout'; 
import ThankYou from './pages/ThankYou';
import Navbar from './components/Navbar';
import ToastMessage from './components/ToastMessage';
import AboutGallery from './pages/gallery'; 

const App = () => {
  return (
    <>
      <Navbar />
      <ToastMessage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artworks/:id" element={<ArtworkDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/admin/add" element={<AdminAddArtwork />} />
        <Route path="/admin/create" element={<AdminCreateArtwork />} />
        <Route path="/admin/edit/:id" element={<AdminEditArtwork />} />
      </Routes>
    </>
  );
};

export default App;
