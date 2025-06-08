// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ArtworkDetails from './pages/ArtworkDetails';
// import Profile from './pages/Profile';
// import Cart from './pages/Cart';
// import AdminAddArtwork from './pages/AdminAddArtwork';
// import Navbar from './components/Navbar';
// import ToastMessage from './components/ToastMessage'; // ✅ הודעה קופצת

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <ToastMessage /> {/* ✅ תופיע בכל עמוד */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/artworks/:id" element={<ArtworkDetails />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/admin/add" element={<AdminAddArtwork />} />
//       </Routes>
//     </>
//   );
// };

// export default App;


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
import Navbar from './components/Navbar';
import ToastMessage from './components/ToastMessage'; 
import Checkout from './pages/Checkout'; 
import ThankYou from './pages/ThankYou';

const App = () => {
  return (
    <>
      <Navbar />
      <ToastMessage /> {/* ✅ תופיע בכל עמוד */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artworks/:id" element={<ArtworkDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/add" element={<AdminAddArtwork />} />
        <Route path="/admin/create" element={<AdminCreateArtwork />} /> 
        <Route path="/admin/edit/:id" element={<AdminEditArtwork />} /> 
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </>
  );
};

export default App;
