import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import InvestorHome from './pages/InvestorHome';
import InvestorAnalysts from './pages/InvestorAnalysts';
import StockInformation from './pages/StockInformation';
import InvestorDividends from './pages/InvestorDividends';
import Footer from './components/Footer';

function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* <Navbar /> */}
      <Box as="main" flex="1">
        <Routes>
          <Route path="/" element={<InvestorHome />} />
          <Route path="/investors/analysts" element={<InvestorAnalysts />} />
          {/* <Route path="/stock-information" element={<StockInformation />} />
          <Route path="/investors/dividends" element={<InvestorDividends />} /> */}
        </Routes>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

export default App;