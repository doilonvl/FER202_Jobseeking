import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import Home from './components/Home/Home';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import UserProfile from './components/Users/UserProfile';
import MyResume from './components/Users/MyResume';
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <Header user={user} updateUser={updateUser} />
      <Routes>
        <Route path="/login" element={<Login updateUser={updateUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/CV?userId=:8" element={<MyResume/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
