import React from 'react';
import {
  Box,

} from '@chakra-ui/react';
import { Link } from 'react-router-dom';



const InvestorHome: React.FC = () => {

  return (
    <Box>
    <Link to="/investors/analysts">Go to page</Link>
    </Box>
  );
};

export default InvestorHome;