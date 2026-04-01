import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import StudentQRCodes from './pages/StudentQRCodes';
import './App.css';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {!isOnline && (
          <div style={offlineBannerStyle}>
            ⚠️ You are currently offline. Changes will be saved locally and synced when you reconnect.
          </div>
        )}
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/qrcodes" element={<StudentQRCodes />} />
        </Routes>
      </div>
    </Router>
  );
}

const offlineBannerStyle = {
  backgroundColor: '#f59e0b',
  color: '#000',
  padding: '10px',
  textAlign: 'center',
  fontWeight: 'bold',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

export default App;
