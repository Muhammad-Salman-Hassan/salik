import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import InvestorHome from './pages/InvestorHome';
import InvestorAnalysts from './pages/InvestorAnalysts';

import StockInformations from './pages/StockInformations';
import Dividends from './pages/Dividends';

function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* <Navbar /> */}
      <Box as="main" flex="1">
        <Routes>
          <Route path="/" element={<InvestorHome />} />
          <Route path="/investors/analysts" element={<InvestorAnalysts />} />
          <Route path="/investors/stock" element={<StockInformations />} />
          <Route path="/investors/dividends" element={<Dividends />} />
          
        </Routes>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

export default App;