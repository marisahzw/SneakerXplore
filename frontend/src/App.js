import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sneakers from './Pages/Sneakers';
import Home from './Pages/Home';
import Resell from './Pages/Resell';
import Calendar from './Pages/Calendar';
import LoginSignup from './Pages/LoginSignup';
import SneakerDetail from './Pages/SneakerDetail'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sneakers" element={<Sneakers />} /> 
          <Route path="/sneaker/:id" element={<SneakerDetail />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/resell" element={<Resell />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
