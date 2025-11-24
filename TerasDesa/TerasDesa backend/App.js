import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductForm from './pages/ProductForm';
import ProductDetail from './pages/ProductDetail';
import MyProducts from './pages/MyProducts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route 
                path="/products/new" 
                element={
                  <PrivateRoute>
                    <ProductForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/products/edit/:id" 
                element={
                  <PrivateRoute>
                    <ProductForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/my-products" 
                element={
                  <PrivateRoute>
                    <MyProducts />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;