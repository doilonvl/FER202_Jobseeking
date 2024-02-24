import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import Home from './components/Home/Home';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
