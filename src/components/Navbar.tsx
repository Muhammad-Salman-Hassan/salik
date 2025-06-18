import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
} from '@chakra-ui/react';
// import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
}

const NavLink = ({ children, to }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      as={RouterLink}
      // to={to}
      px={2}
      py={1}
      rounded="md"
      color={isActive ? 'brand.500' : 'gray.600'}
      fontWeight={isActive ? 'semibold' : 'medium'}
      _hover={{
        textDecoration: 'none',
        color: 'brand.500',
        transform: 'translateY(-1px)',
      }}
      transition="all 0.2s"
    >
      {children}
    </Link>
  );
};

const Navbar: React.FC = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const { colorMode, toggleColorMode } = useColorMode();
  
  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    
  );
};

export default Navbar;