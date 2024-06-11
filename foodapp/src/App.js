import './App.css';
import Homepage from './Components/Homepage/Homepage.js';
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer.js';
import { StoreProvider } from './store/StoreContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Components/AboutUs/AboutUs';

function App() {
  return (
    // <Homepage></Homepage>
    <StoreProvider>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer></Footer>
    </StoreProvider>
  );
}

export default App;
