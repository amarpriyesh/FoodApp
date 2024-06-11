import './App.css';
import Header from './Components/Header/Header.js';
import Homepage from './Components/Homepage/Homepage.js';
import Footer from './Components/Footer/Footer.js';
import { StoreProvider } from './store/StoreContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Components/AboutUs/AboutUs';
import AIChat from "./Components/AIChat/index.js";
import { useLocation } from 'react-router-dom';



function App() {
  const location = useLocation();
  return (
    // <Homepage></Homepage>
    <StoreProvider>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/aichat" element={<AIChat />} />
      </Routes>
      {location.pathname !== '/aichat' && <Footer />}
    </StoreProvider>
  );
}

export default App;
