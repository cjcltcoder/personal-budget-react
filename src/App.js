import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import PieChart from './PieChart/PieChart';
import D3Chart from './D3Chart/D3Chart';

function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/" element={<HomePage />}/>
          <Route path="/chart" element={<PieChart />}/>
          <Route path="/d3chart" element={<D3Chart />}/>
        </Routes>
      </div>
      
      <Footer />
    </Router>
  );
}

export default App;
