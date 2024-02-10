import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/Admin/index';
import GiftReservationPage from './pages/GiftReservation/index';
import InvitationPage from './pages/Home/index';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/giftreservation" element={<GiftReservationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;