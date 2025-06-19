import React from 'react';
import {
  Box,

} from '@chakra-ui/react';
import { Link } from 'react-router-dom';



const InvestorHome: React.FC = () => {

  return (
    <Box>
      <Link to="/investors/analysts">Go to page</Link>
      <br />
      <Link to="/investors/dividends">Go to Dividend Page</Link>
      <br />
      <Link to="/investors/stock">Go to Stock Page</Link>
    </Box>
  );
};

export default InvestorHome;