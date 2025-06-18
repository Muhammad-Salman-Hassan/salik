import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bg} borderTop="1px" borderColor={borderColor}>
      <Container as={Stack} maxW="7xl" py={8} spacing={4}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold" color="brand.500">
            Brand
          </Text>
          <HStack spacing={6}>
            <Link href="#" isExternal>
              <FaTwitter size="20" />
            </Link>
            <Link href="#" isExternal>
              <FaLinkedin size="20" />
            </Link>
            <Link href="#" isExternal>
              <FaGithub size="20" />
            </Link>
          </HStack>
        </Stack>
        <Divider />
        <Text fontSize="sm" color="gray.500" textAlign="center">
          © 2024 Brand. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;