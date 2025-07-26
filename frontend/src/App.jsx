import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AddPropertyPage from './pages/AddPropertyPage';
import InquiryInfoPage from './pages/InquiryInfoPage';
import './App.css'
import AddEditPropertyPage from './pages/AddEditPropertyPage';

const App = () => {
  return (
    <AuthProvider>

    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/api/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-property" element={<AddPropertyPage />} />
        <Route path="/admin/add-property/:id" element={<AddEditPropertyPage />} />
        <Route path="/admin/inquiries" element={<InquiryInfoPage />} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;