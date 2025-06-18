import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Avatar,
  Badge,
  useColorModeValue,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from '@chakra-ui/react';
import { FaHeart, FaUsers, FaGlobe, FaRocket } from 'react-icons/fa';

const TeamMember: React.FC<{
  name: string;
  role: string;
  image: string;
  bio: string;
}> = ({ name, role, image, bio }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Card bg={cardBg} shadow="md" borderRadius="xl">
      <CardBody p={6}>
        <VStack spacing={4}>
          <Avatar size="xl" src={image} name={name} />
          <VStack spacing={1}>
            <Heading size="md">{name}</Heading>
            <Badge colorScheme="brand" px={3} py={1} borderRadius="full">
              {role}
            </Badge>
          </VStack>
          <Text textAlign="center" color="gray.600" fontSize="sm">
            {bio}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

const ValueCard: React.FC<{ icon: any; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Card bg={cardBg} shadow="md" borderRadius="xl">
      <CardBody p={8}>
        <VStack spacing={4} align="start">
          <Box
            p={3}
            bg="brand.50"
            borderRadius="lg"
            display="inline-block"
          >
            <Box as={icon} w={6} h={6} color="brand.500" />
          </Box>
          <Heading size="md">{title}</Heading>
          <Text color="gray.600" lineHeight="tall">
            {description}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

const About: React.FC = () => {
  const heroBg = useColorModeValue('gray.50', 'gray.900');
  const sectionBg = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={heroBg} py={20}>
        <Container maxW="7xl">
          <VStack spacing={8} textAlign="center" maxW="4xl" mx="auto">
            <Heading
              fontSize={{ base: '4xl', md: '5xl' }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              About Our{' '}
              <Text as="span" color="brand.500">
                Journey
              </Text>
            </Heading>
            <Text fontSize="xl" color="gray.600" lineHeight="tall">
              We're a passionate team of innovators, designers, and developers
              dedicated to creating exceptional digital experiences that transform
              businesses and delight users worldwide.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Story Section */}
      <Box py={20} bg={sectionBg}>
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
            <VStack spacing={6} align="start">
              <Heading size="xl">Our Story</Heading>
              <Text color="gray.600" lineHeight="tall" fontSize="lg">
                Founded in 2020 with a simple mission: to make technology more
                accessible and powerful for businesses of all sizes. What started
                as a small team of developers has grown into a global company
                serving thousands of clients worldwide.
              </Text>
              <Text color="gray.600" lineHeight="tall" fontSize="lg">
                We believe in the power of innovation, collaboration, and
                continuous learning. Every day, we work to push the boundaries
                of what's possible and help our clients achieve their dreams.
              </Text>
              <StatGroup>
                <Stat>
                  <StatLabel>Founded</StatLabel>
                  <StatNumber>2020</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Team Members</StatLabel>
                  <StatNumber>50+</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Countries</StatLabel>
                  <StatNumber>25+</StatNumber>
                </Stat>
              </StatGroup>
            </VStack>
            <Box>
              <SimpleGrid columns={2} spacing={4}>
                <Box bg="brand.50" h="200px" borderRadius="xl" />
                <Box bg="gray.100" h="150px" borderRadius="xl" mt={8} />
                <Box bg="gray.200" h="150px" borderRadius="xl" />
                <Box bg="brand.100" h="200px" borderRadius="xl" mt={8} />
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box py={20} bg={heroBg}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Our Values</Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                The principles that guide everything we do and shape our culture.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              <ValueCard
                icon={FaHeart}
                title="Passion"
                description="We love what we do and it shows in every project we deliver."
              />
              <ValueCard
                icon={FaUsers}
                title="Collaboration"
                description="Great things happen when talented people work together."
              />
              <ValueCard
                icon={FaGlobe}
                title="Innovation"
                description="We constantly explore new technologies and approaches."
              />
              <ValueCard
                icon={FaRocket}
                title="Excellence"
                description="We strive for perfection in everything we create."
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Team Section */}
      <Box py={20} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Meet Our Team</Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                The brilliant minds behind our success.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              <TeamMember
                name="Sarah Johnson"
                role="CEO & Founder"
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                bio="Visionary leader with 15+ years of experience in tech and business strategy."
              />
              <TeamMember
                name="Michael Chen"
                role="CTO"
                image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                bio="Tech innovator passionate about building scalable and robust systems."
              />
              <TeamMember
                name="Emily Rodriguez"
                role="Head of Design"
                image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                bio="Creative director focused on user-centered design and beautiful experiences."
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box py={20} bg={heroBg}>
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
            <VStack spacing={6} align="start">
              <Heading size="xl">Our Expertise</Heading>
              <Text color="gray.600" lineHeight="tall" fontSize="lg">
                We've honed our skills across various technologies and industries
                to deliver exceptional results for our clients.
              </Text>
              <VStack spacing={4} w="full" align="start">
                <Box w="full">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="medium">Frontend Development</Text>
                    <Text fontSize="sm" color="gray.600">95%</Text>
                  </HStack>
                  <Progress value={95} colorScheme="brand" borderRadius="full" />
                </Box>
                <Box w="full">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="medium">Backend Development</Text>
                    <Text fontSize="sm" color="gray.600">90%</Text>
                  </HStack>
                  <Progress value={90} colorScheme="brand" borderRadius="full" />
                </Box>
                <Box w="full">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="medium">UI/UX Design</Text>
                    <Text fontSize="sm" color="gray.600">88%</Text>
                  </HStack>
                  <Progress value={88} colorScheme="brand" borderRadius="full" />
                </Box>
                <Box w="full">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="medium">DevOps & Cloud</Text>
                    <Text fontSize="sm" color="gray.600">85%</Text>
                  </HStack>
                  <Progress value={85} colorScheme="brand" borderRadius="full" />
                </Box>
              </VStack>
            </VStack>
            <Box>
              <SimpleGrid columns={1} spacing={6}>
                <Card bg={useColorModeValue('white', 'gray.800')} p={6}>
                  <CardBody>
                    <VStack spacing={4}>
                      <Heading size="lg" color="brand.500">500+</Heading>
                      <Text textAlign="center">Projects Completed</Text>
                    </VStack>
                  </CardBody>
                </Card>
                <Card bg={useColorModeValue('white', 'gray.800')} p={6}>
                  <CardBody>
                    <VStack spacing={4}>
                      <Heading size="lg" color="brand.500">98%</Heading>
                      <Text textAlign="center">Client Satisfaction</Text>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;