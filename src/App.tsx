import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import InvestorHome from './pages/InvestorHome';
import InvestorAnalysts from './pages/InvestorAnalysts';
import StockInformations from './pages/StockInformations';
import Dividends from './pages/Dividends';
import InvestorsReport from './pages/ResultandReports';

function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">

      <Box as="main" flex="1">
        <Routes>
          <Route path="/" element={<InvestorHome />} />
          <Route path="/investors/analysts" element={<InvestorAnalysts />} />
          <Route path="/investors/stock" element={<StockInformations />} />
          <Route path="/investors/dividends" element={<Dividends />} />
          <Route path="/investors/results" element={<InvestorsReport />} />
          
        </Routes>
      </Box>
    
    </Box>
  );
}

export default App;