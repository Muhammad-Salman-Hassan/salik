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
  CardHeader,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  Progress,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FaCalendarAlt, FaMoneyBillAlt, FaChartLine, FaDownload } from 'react-icons/fa';

interface DividendRecord {
  year: number;
  quarter: string;
  exDate: string;
  payDate: string;
  amount: number;
  yield: number;
}

const DividendMetric: React.FC<{
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
}> = ({ label, value, change, isPositive, subtext }) => {
  return (
    <Stat textAlign="center">
      <StatLabel fontSize="sm" color="gray.500">
        {label}
      </StatLabel>
      <StatNumber fontSize="2xl" fontWeight="bold">
        {value}
      </StatNumber>
      {change && (
        <StatHelpText>
          <StatArrow type={isPositive ? 'increase' : 'decrease'} />
          {change}
        </StatHelpText>
      )}
      {subtext && (
        <Text fontSize="xs" color="gray.400">
          {subtext}
        </Text>
      )}
    </Stat>
  );
};

const InvestorDividends: React.FC = () => {
  const heroBg = useColorModeValue('gray.50', 'gray.900');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.800');

  const dividendHistory: DividendRecord[] = [
    { year: 2024, quarter: 'Q4', exDate: '2024-12-15', payDate: '2024-12-31', amount: 0.85, yield: 2.2 },
    { year: 2024, quarter: 'Q3', exDate: '2024-09-15', payDate: '2024-09-30', amount: 0.82, yield: 2.1 },
    { year: 2024, quarter: 'Q2', exDate: '2024-06-15', payDate: '2024-06-30', amount: 0.82, yield: 2.0 },
    { year: 2024, quarter: 'Q1', exDate: '2024-03-15', payDate: '2024-03-31', amount: 0.79, yield: 1.9 },
    { year: 2023, quarter: 'Q4', exDate: '2023-12-15', payDate: '2023-12-31', amount: 0.79, yield: 2.0 },
    { year: 2023, quarter: 'Q3', exDate: '2023-09-15', payDate: '2023-09-30', amount: 0.76, yield: 1.9 },
    { year: 2023, quarter: 'Q2', exDate: '2023-06-15', payDate: '2023-06-30', amount: 0.76, yield: 1.8 },
    { year: 2023, quarter: 'Q1', exDate: '2023-03-15', payDate: '2023-03-31', amount: 0.73, yield: 1.8 },
  ];

  const annualDividends = [
    { year: '2020', dividend: 2.80, yield: 2.0, growth: 8.5 },
    { year: '2021', dividend: 2.95, yield: 2.1, growth: 5.4 },
    { year: '2022', dividend: 3.05, yield: 2.0, growth: 3.4 },
    { year: '2023', dividend: 3.04, yield: 1.9, growth: -0.3 },
    { year: '2024', dividend: 3.28, yield: 2.1, growth: 7.9 },
  ];

  const upcomingDividends = [
    { quarter: 'Q1 2025', exDate: 'Mar 15, 2025', payDate: 'Mar 31, 2025', estimatedAmount: '$0.86' },
    { quarter: 'Q2 2025', exDate: 'Jun 15, 2025', payDate: 'Jun 30, 2025', estimatedAmount: '$0.86' },
    { quarter: 'Q3 2025', exDate: 'Sep 15, 2025', payDate: 'Sep 30, 2025', estimatedAmount: '$0.86' },
    { quarter: 'Q4 2025', exDate: 'Dec 15, 2025', payDate: 'Dec 31, 2025', estimatedAmount: '$0.86' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={heroBg} py={16}>
        <Container maxW="7xl">
          <VStack spacing={8} textAlign="center" maxW="4xl" mx="auto">
            <VStack spacing={4}>
              <Badge colorScheme="green" px={4} py={2} borderRadius="full" fontSize="sm">
                Quarterly Dividend Paid Since 2010
              </Badge>
              <Heading
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="bold"
                lineHeight="shorter"
              >
                Dividend{' '}
                <Text as="span" color="brand.500">
                  Information
                </Text>
              </Heading>
              <Text fontSize="xl" color="gray.600" lineHeight="tall">
                InvestorCorp has maintained a consistent dividend policy, delivering 
                reliable returns to shareholders for over a decade.
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Current Dividend Metrics */}
      <Box py={16} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Current Dividend Metrics</Heading>
              <Text fontSize="lg" color="gray.600">
                Key dividend statistics and performance indicators
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} w="full">
              <DividendMetric
                label="Current Yield"
                value="2.1%"
                change="0.2%"
                isPositive={true}
                subtext="Based on current price"
              />
              <DividendMetric
                label="Annual Dividend"
                value="$3.28"
                change="7.9%"
                isPositive={true}
                subtext="TTM dividend per share"
              />
              <DividendMetric
                label="Payout Ratio"
                value="38.8%"
                subtext="Sustainable level"
              />
              <DividendMetric
                label="5-Year Growth"
                value="4.1%"
                subtext="CAGR since 2019"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Next Dividend Alert */}
      <Box py={8} bg={heroBg}>
        <Container maxW="7xl">
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="xl"
            p={8}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Next Dividend Payment
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Ex-Dividend Date: <strong>March 15, 2025</strong><br />
              Payment Date: <strong>March 31, 2025</strong><br />
              Estimated Amount: <strong>$0.86 per share</strong>
            </AlertDescription>
          </Alert>
        </Container>
      </Box>

      {/* Dividend History Chart */}
      <Box py={16} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Dividend History</Heading>
              <Text fontSize="lg" color="gray.600">
                Annual dividend payments and yield over time
              </Text>
            </VStack>
            <Card bg={cardBg} shadow="md" borderRadius="xl" w="full">
              <CardHeader>
                <Heading size="md">Annual Dividend Trend</Heading>
              </CardHeader>
              <CardBody>
                <Box h="400px">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={annualDividends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="dividend" fill="#0066cc" />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="yield" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: '#10B981' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>

      {/* Quarterly Dividend History */}
      <Box py={16} bg={heroBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Quarterly Dividend History</Heading>
              <Text fontSize="lg" color="gray.600">
                Detailed quarterly dividend payments and key dates
              </Text>
            </VStack>
            <Card bg={cardBg} shadow="md" borderRadius="xl" w="full">
              <CardHeader>
                <HStack justify="space-between" align="center">
                  <Heading size="md">Recent Dividend Payments</Heading>
                  <Button size="sm" leftIcon={<FaDownload />} variant="outline">
                    Export History
                  </Button>
                </HStack>
              </CardHeader>
              <CardBody>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Period</Th>
                        <Th>Ex-Dividend Date</Th>
                        <Th>Payment Date</Th>
                        <Th isNumeric>Amount</Th>
                        <Th isNumeric>Yield</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dividendHistory.map((record, index) => (
                        <Tr key={index}>
                          <Td fontWeight="semibold">
                            {record.year} {record.quarter}
                          </Td>
                          <Td>{record.exDate}</Td>
                          <Td>{record.payDate}</Td>
                          <Td isNumeric fontWeight="bold">
                            ${record.amount.toFixed(2)}
                          </Td>
                          <Td isNumeric>{record.yield.toFixed(1)}%</Td>
                          <Td>
                            <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                              Paid
                            </Badge>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>

      {/* Upcoming Dividends */}
      <Box py={16} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Upcoming Dividend Schedule</Heading>
              <Text fontSize="lg" color="gray.600">
                Projected dividend payments for 2025
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
              {upcomingDividends.map((dividend, index) => (
                <Card key={index} bg={cardBg} shadow="md" borderRadius="xl">
                  <CardBody p={6}>
                    <VStack spacing={4} textAlign="center">
                      <Badge
                        colorScheme={index === 0 ? 'green' : 'blue'}
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                      >
                        {dividend.quarter}
                      </Badge>
                      <VStack spacing={2}>
                        <Heading size="md" color="brand.500">
                          {dividend.estimatedAmount}
                        </Heading>
                        <Text fontSize="sm" color="gray.600">
                          Ex-Date: {dividend.exDate}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Pay Date: {dividend.payDate}
                        </Text>
                      </VStack>
                      {index === 0 && (
                        <Badge colorScheme="orange" px={2} py={1} borderRadius="full" fontSize="xs">
                          Next Payment
                        </Badge>
                      )}
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Dividend Investment Programs */}
      <Box py={16} bg={heroBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Dividend Investment Programs</Heading>
              <Text fontSize="lg" color="gray.600">
                Maximize your investment returns with our dividend programs
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              <Card bg={cardBg} shadow="md" borderRadius="xl">
                <CardHeader>
                  <VStack spacing={2} align="start">
                    <HStack>
                      <FaMoneyBillAlt color="var(--chakra-colors-brand-500)" />
                      <Heading size="md">Dividend Reinvestment Plan (DRIP)</Heading>
                    </HStack>
                  </VStack>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack spacing={4} align="start">
                    <Text color="gray.600" lineHeight="tall">
                      Automatically reinvest your dividends to purchase additional shares 
                      without paying brokerage fees.
                    </Text>
                    <VStack spacing={2} align="start" w="full">
                      <HStack>
                        <Text fontSize="sm" fontWeight="semibold">Benefits:</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">• No brokerage fees</Text>
                      <Text fontSize="sm" color="gray.600">• Compound growth potential</Text>
                      <Text fontSize="sm" color="gray.600">• Fractional share purchases</Text>
                      <Text fontSize="sm" color="gray.600">• Easy enrollment and management</Text>
                    </VStack>
                    <Button colorScheme="brand" size="sm" leftIcon={<FaCalendarAlt />}>
                      Enroll in DRIP
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
              <Card bg={cardBg} shadow="md" borderRadius="xl">
                <CardHeader>
                  <VStack spacing={2} align="start">
                    <HStack>
                      <FaChartLine color="var(--chakra-colors-brand-500)" />
                      <Heading size="md">Direct Stock Purchase Plan</Heading>
                    </HStack>
                  </VStack>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack spacing={4} align="start">
                    <Text color="gray.600" lineHeight="tall">
                      Purchase shares directly from InvestorCorp without going through 
                      a broker, with low fees and flexible investment amounts.
                    </Text>
                    <VStack spacing={2} align="start" w="full">
                      <HStack>
                        <Text fontSize="sm" fontWeight="semibold">Features:</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">• Minimum investment: $100</Text>
                      <Text fontSize="sm" color="gray.600">• Low transaction fees</Text>
                      <Text fontSize="sm" color="gray.600">• Automatic investing options</Text>
                      <Text fontSize="sm" color="gray.600">• Online account management</Text>
                    </VStack>
                    <Button colorScheme="brand" size="sm" leftIcon={<FaCalendarAlt />}>
                      Learn More
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Dividend Policy */}
      <Box py={16} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Dividend Policy</Heading>
              <Text fontSize="lg" color="gray.600" maxW="3xl">
                Our commitment to returning value to shareholders through consistent dividend payments
              </Text>
            </VStack>
            <Card bg={cardBg} shadow="md" borderRadius="xl" w="full">
              <CardBody p={8}>
                <VStack spacing={6} align="start">
                  <Text fontSize="lg" lineHeight="tall">
                    InvestorCorp is committed to returning value to shareholders through regular dividend payments. 
                    Our dividend policy reflects our confidence in the company's long-term prospects and our 
                    commitment to generating sustainable cash flows.
                  </Text>
                  <Divider />
                  <VStack spacing={4} align="start" w="full">
                    <Heading size="md">Key Policy Points:</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                      <VStack spacing={3} align="start">
                        <Text fontSize="sm" fontWeight="semibold">Payment Schedule</Text>
                        <Text fontSize="sm" color="gray.600">
                          Quarterly dividends are typically paid in the last month of each quarter
                        </Text>
                      </VStack>
                      <VStack spacing={3} align="start">
                        <Text fontSize="sm" fontWeight="semibold">Target Payout Ratio</Text>
                        <Text fontSize="sm" color="gray.600">
                          Maintain a payout ratio of 35-45% of earnings to ensure sustainability
                        </Text>
                      </VStack>
                      <VStack spacing={3} align="start">
                        <Text fontSize="sm" fontWeight="semibold">Growth Objective</Text>
                        <Text fontSize="sm" color="gray.600">
                          Target annual dividend growth of 3-5% subject to business performance
                        </Text>
                      </VStack>
                      <VStack spacing={3} align="start">
                        <Text fontSize="sm" fontWeight="semibold">Board Review</Text>
                        <Text fontSize="sm" color="gray.600">
                          Dividend payments are reviewed quarterly by the Board of Directors
                        </Text>
                      </VStack>
                    </SimpleGrid>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>

      {/* Tax Information */}
      <Box py={16} bg={heroBg}>
        <Container maxW="7xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="xl">Tax Information</Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Important tax considerations for dividend payments
            </Text>
            <Alert
              status="warning"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="xl"
              p={6}
              maxW="4xl"
            >
              <AlertIcon boxSize="30px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Tax Advisory Notice
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Dividend payments may be subject to taxation. The tax treatment depends on your individual 
                circumstances and jurisdiction. Please consult with a qualified tax professional for advice 
                specific to your situation.
              </AlertDescription>
            </Alert>
            <HStack spacing={4}>
              <Button size="lg" variant="outline" leftIcon={<FaDownload />}>
                Download Tax Forms
              </Button>
              <Button size="lg" variant="outline">
                Tax Center
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default InvestorDividends;