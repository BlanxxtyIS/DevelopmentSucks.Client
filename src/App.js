import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CurrentLessonPage from './pages/components/CurrentLessonPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/lessons/:order?' element={<CurrentLessonPage />} />
      </Routes>
    </Router>
  );
}

export default App;