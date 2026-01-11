import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Sales from './pages/Sales';
import Purchase from './pages/Purchase';
import Inventory from './pages/Inventory';
import Finance from './pages/Finance';
import Marketing from './pages/Marketing';
import './styles/index.css';

const PrivateRoute = ({ children }) => {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <Overview />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <PrivateRoute>
            <Layout>
              <Sales />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/purchase"
        element={
          <PrivateRoute>
            <Layout>
              <Purchase />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <Layout>
              <Inventory />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/finance"
        element={
          <PrivateRoute>
            <Layout>
              <Finance />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/marketing"
        element={
          <PrivateRoute>
            <Layout>
              <Marketing />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
