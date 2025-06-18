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
  Icon,
  useColorModeValue,
  Button,
  List,
  ListItem,
  ListIcon,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import {
  FaCode,
  FaMobile,
  FaCloud,
  FaPalette,
  FaSearch,
  FaShieldAlt,
  FaCheck,
  FaArrowRight,
} from 'react-icons/fa';

const ServiceCard: React.FC<{
  icon: any;
  title: string;
  description: string;
  features: string[];
  price: string;
  popular?: boolean;
}> = ({ icon, title, description, features, price, popular }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = popular ? 'brand.500' : useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Card
      bg={cardBg}
      shadow="md"
      borderRadius="xl"
      border="2px"
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'xl',
      }}
      transition="all 0.3s ease"
    >
      {popular && (
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme="brand"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
        >
          Most Popular
        </Badge>
      )}
      <CardBody p={8}>
        <VStack spacing={6} align="start" h="full">
          <VStack spacing={4} align="start">
            <Box
              p={3}
              bg="brand.50"
              borderRadius="lg"
              display="inline-block"
            >
              <Icon as={icon} w={6} h={6} color="brand.500" />
            </Box>
            <VStack spacing={2} align="start">
              <Heading size="md">{title}</Heading>
              <Text color="gray.600" lineHeight="tall">
                {description}
              </Text>
            </VStack>
          </VStack>
          
          <Box w="full">
            <Text fontSize="3xl" fontWeight="bold" color="brand.500" mb={2}>
              {price}
            </Text>
            <List spacing={3}>
              {features.map((feature, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={FaCheck} color="green.500" />
                  <Text fontSize="sm">{feature}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
          
          <Button
            w="full"
            size="lg"
            variant={popular ? 'solid' : 'outline'}
            rightIcon={<FaArrowRight />}
            mt="auto"
          >
            Get Started
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

const ProcessStep: React.FC<{
  step: number;
  title: string;
  description: string;
}> = ({ step, title, description }) => {
  return (
    <VStack spacing={4} textAlign="center">
      <Box
        w={12}
        h={12}
        bg="brand.500"
        color="white"
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="lg"
        fontWeight="bold"
      >
        {step}
      </Box>
      <VStack spacing={2}>
        <Heading size="md">{title}</Heading>
        <Text color="gray.600" fontSize="sm" maxW="250px">
          {description}
        </Text>
      </VStack>
    </VStack>
  );
};

const Services: React.FC = () => {
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
              Our{' '}
              <Text as="span" color="brand.500">
                Services
              </Text>
            </Heading>
            <Text fontSize="xl" color="gray.600" lineHeight="tall">
              From concept to deployment, we offer comprehensive digital solutions
              that help your business thrive in the modern world.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box py={20} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">What We Do</Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                Our comprehensive suite of services covers every aspect of digital transformation.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              <ServiceCard
                icon={FaCode}
                title="Web Development"
                description="Custom web applications built with modern technologies and best practices."
                features={[
                  'Custom Web Applications',
                  'E-commerce Solutions',
                  'API Development',
                  'Performance Optimization',
                  'SEO Optimization',
                ]}
                price="$5,000+"
              />
              <ServiceCard
                icon={FaMobile}
                title="Mobile Development"
                description="Native and cross-platform mobile apps that deliver exceptional user experiences."
                features={[
                  'iOS & Android Apps',
                  'Cross-platform Solutions',
                  'App Store Optimization',
                  'Push Notifications',
                  'Offline Functionality',
                ]}
                price="$8,000+"
                popular
              />
              <ServiceCard
                icon={FaPalette}
                title="UI/UX Design"
                description="Beautiful, intuitive designs that convert visitors into customers."
                features={[
                  'User Experience Design',
                  'Visual Design',
                  'Prototyping',
                  'Design Systems',
                  'Usability Testing',
                ]}
                price="$3,000+"
              />
              <ServiceCard
                icon={FaCloud}
                title="Cloud Solutions"
                description="Scalable cloud infrastructure and deployment solutions."
                features={[
                  'Cloud Migration',
                  'Auto-scaling Setup',
                  'Database Management',
                  'Security Configuration',
                  '24/7 Monitoring',
                ]}
                price="$2,000+"
              />
              <ServiceCard
                icon={FaSearch}
                title="Digital Marketing"
                description="Comprehensive digital marketing strategies to grow your online presence."
                features={[
                  'SEO Optimization',
                  'Content Marketing',
                  'Social Media Management',
                  'PPC Campaigns',
                  'Analytics & Reporting',
                ]}
                price="$1,500/mo"
              />
              <ServiceCard
                icon={FaShieldAlt}
                title="Security & Compliance"
                description="Protect your business with comprehensive security solutions."
                features={[
                  'Security Audits',
                  'Compliance Management',
                  'Data Protection',
                  'Penetration Testing',
                  'Security Training',
                ]}
                price="$4,000+"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Process Section */}
      <Box py={20} bg={heroBg}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Our Process</Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                A proven methodology that ensures successful project delivery every time.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              <ProcessStep
                step={1}
                title="Discovery"
                description="We start by understanding your business goals, challenges, and vision."
              />
              <ProcessStep
                step={2}
                title="Planning"
                description="Detailed project planning with timelines, milestones, and resource allocation."
              />
              <ProcessStep
                step={3}
                title="Development"
                description="Agile development process with regular updates and client feedback."
              />
              <ProcessStep
                step={4}
                title="Launch"
                description="Thorough testing, deployment, and ongoing support for your success."
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Industries Section */}
      <Box py={20} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Industries We Serve</Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                We have experience working with clients across various industries.
              </Text>
            </VStack>
            <Tabs variant="enclosed" colorScheme="brand" w="full">
              <TabList>
                <Tab>E-commerce</Tab>
                <Tab>Healthcare</Tab>
                <Tab>Finance</Tab>
                <Tab>Education</Tab>
                <Tab>Real Estate</Tab>
              </TabList>
              <TabPanels>
                <TabPanel py={8}>
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} alignItems="center">
                    <VStack spacing={4} align="start">
                      <Heading size="lg">E-commerce Solutions</Heading>
                      <Text color="gray.600" lineHeight="tall">
                        We help businesses create powerful online stores that drive sales
                        and provide exceptional shopping experiences. From custom
                        e-commerce platforms to marketplace integrations, we've got you covered.
                      </Text>
                      <List spacing={2}>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Custom shopping cart development
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Payment gateway integration
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Inventory management systems
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Mobile-responsive design
                        </ListItem>
                      </List>
                    </VStack>
                    <Box bg="gray.100" h="300px" borderRadius="xl" />
                  </SimpleGrid>
                </TabPanel>
                <TabPanel py={8}>
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} alignItems="center">
                    <VStack spacing={4} align="start">
                      <Heading size="lg">Healthcare Technology</Heading>
                      <Text color="gray.600" lineHeight="tall">
                        Secure, compliant healthcare solutions that improve patient care
                        and streamline operations. We understand HIPAA requirements
                        and build with privacy and security in mind.
                      </Text>
                      <List spacing={2}>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          HIPAA-compliant systems
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Electronic health records
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Telemedicine platforms
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Patient management systems
                        </ListItem>
                      </List>
                    </VStack>
                    <Box bg="gray.100" h="300px" borderRadius="xl" />
                  </SimpleGrid>
                </TabPanel>
                <TabPanel py={8}>
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} alignItems="center">
                    <VStack spacing={4} align="start">
                      <Heading size="lg">Financial Services</Heading>
                      <Text color="gray.600" lineHeight="tall">
                        Secure, scalable financial applications that meet regulatory
                        requirements. From banking platforms to investment tools,
                        we build with security and compliance at the forefront.
                      </Text>
                      <List spacing={2}>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Banking applications
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Payment processing systems
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Risk management tools
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Regulatory compliance
                        </ListItem>
                      </List>
                    </VStack>
                    <Box bg="gray.100" h="300px" borderRadius="xl" />
                  </SimpleGrid>
                </TabPanel>
                <TabPanel py={8}>
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} alignItems="center">
                    <VStack spacing={4} align="start">
                      <Heading size="lg">Education Technology</Heading>
                      <Text color="gray.600" lineHeight="tall">
                        Innovative educational platforms that enhance learning experiences.
                        From learning management systems to interactive educational apps,
                        we help educators reach their students more effectively.
                      </Text>
                      <List spacing={2}>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Learning management systems
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Student information systems
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Online assessment tools
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Interactive learning apps
                        </ListItem>
                      </List>
                    </VStack>
                    <Box bg="gray.100" h="300px" borderRadius="xl" />
                  </SimpleGrid>
                </TabPanel>
                <TabPanel py={8}>
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} alignItems="center">
                    <VStack spacing={4} align="start">
                      <Heading size="lg">Real Estate Technology</Heading>
                      <Text color="gray.600" lineHeight="tall">
                        Comprehensive real estate solutions that streamline property
                        management, sales, and customer relationships. From CRM systems
                        to virtual tour platforms, we help real estate professionals succeed.
                      </Text>
                      <List spacing={2}>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Property management systems
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          CRM for real estate
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Virtual tour platforms
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheck} color="green.500" />
                          Lead generation tools
                        </ListItem>
                      </List>
                    </VStack>
                    <Box bg="gray.100" h="300px" borderRadius="xl" />
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Services;