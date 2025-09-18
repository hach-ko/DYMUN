import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Connect from './Pages/Connect';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import Resources from './Pages/Resources';
import Admin from './Pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          }
        />
        <Route
          path="/about-us"
          element={
            <ErrorBoundary>
              <AboutUs />
            </ErrorBoundary>
          }
        />
        <Route
          path="/connect"
          element={
            <ErrorBoundary>
              <Connect />
            </ErrorBoundary>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          }
        />
        <Route
          path="/register"
          element={
            <ErrorBoundary>
              <Register />
            </ErrorBoundary>
          }
        />
        <Route
          path="/resources"
          element={
            <ErrorBoundary>
              <Resources />
            </ErrorBoundary>
          }
        />
        <Route
          path="/admin"
          element={
            <ErrorBoundary>
              <Admin />
            </ErrorBoundary>
          }
        />
        <Route
          path="*"
          element={
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;