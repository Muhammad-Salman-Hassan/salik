import React, { useState } from 'react';
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  Select,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const StockMetric: React.FC<{
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
}> = ({ label, value, change, isPositive, subtext }) => {
  return (
    <Stat>
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

const StockInformation: React.FC = () => {
  const heroBg = useColorModeValue('gray.50', 'gray.900');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.800');

  const [selectedPeriod, setSelectedPeriod] = useState('1Y');

  // Sample stock data
  const stockData = [
    { date: '2024-01', price: 145.32, volume: 2.1 },
    { date: '2024-02', price: 149.87, volume: 2.3 },
    { date: '2024-03', price: 152.45, volume: 2.0 },
    { date: '2024-04', price: 148.92, volume: 2.4 },
    { date: '2024-05', price: 154.33, volume: 2.2 },
    { date: '2024-06', price: 151.78, volume: 2.1 },
    { date: '2024-07', price: 157.42, volume: 2.5 },
    { date: '2024-08', price: 153.89, volume: 2.3 },
    { date: '2024-09', price: 159.67, volume: 2.6 },
    { date: '2024-10', price: 155.34, volume: 2.4 },
    { date: '2024-11', price: 161.23, volume: 2.7 },
    { date: '2024-12', price: 156.78, volume: 2.8 },
  ];

  const volumeData = [
    { date: '2024-01', volume: 2.1 },
    { date: '2024-02', volume: 2.3 },
    { date: '2024-03', volume: 2.0 },
    { date: '2024-04', volume: 2.4 },
    { date: '2024-05', volume: 2.2 },
    { date: '2024-06', volume: 2.1 },
    { date: '2024-07', volume: 2.5 },
    { date: '2024-08', volume: 2.3 },
    { date: '2024-09', volume: 2.6 },
    { date: '2024-10', volume: 2.4 },
    { date: '2024-11', volume: 2.7 },
    { date: '2024-12', volume: 2.8 },
  ];

  const historicalData = [
    { period: '2020', high: 128.45, low: 89.32, close: 124.67, volume: '18.5M' },
    { period: '2021', high: 142.89, low: 118.23, close: 138.45, volume: '22.1M' },
    { period: '2022', high: 151.34, low: 128.91, close: 143.78, volume: '25.3M' },
    { period: '2023', high: 159.87, low: 142.56, close: 152.34, volume: '28.7M' },
    { period: '2024', high: 164.50, low: 148.23, close: 156.78, volume: '31.2M' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={heroBg} py={16}>
        <Container maxW="7xl">
          <VStack spacing={8} textAlign="center" maxW="4xl" mx="auto">
            <VStack spacing={4}>
              <Badge colorScheme="green" px={4} py={2} borderRadius="full" fontSize="sm">
                NYSE: INVT
              </Badge>
              <Heading
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="bold"
                lineHeight="shorter"
              >
                Stock{' '}
                <Text as="span" color="brand.500">
                  Information
                </Text>
              </Heading>
              <Text fontSize="xl" color="gray.600" lineHeight="tall">
                Real-time stock data, charts, and comprehensive financial information
                for InvestorCorp shares.
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Real-time Stock Data */}
      <Box py={16} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Current Stock Performance</Heading>
              <Text fontSize="lg" color="gray.600">
                Live market data updated every 15 minutes
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={6} w="full">
              <StockMetric
                label="Current Price"
                value="$156.78"
                change="2.34%"
                isPositive={true}
              />
              <StockMetric
                label="Day's Range"
                value="$154.12 - $158.45"
                subtext="Today's high/low"
              />
              <StockMetric
                label="Market Cap"
                value="$45.2B"
                change="1.2%"
                isPositive={true}
              />
              <StockMetric
                label="Volume"
                value="2.8M"
                change="15.3%"
                isPositive={true}
                subtext="Avg: 2.3M"
              />
              <StockMetric
                label="52-Week High"
                value="$164.50"
                subtext="Mar 15, 2024"
              />
              <StockMetric
                label="52-Week Low"
                value="$128.90"
                subtext="Jan 8, 2024"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Charts */}
      <Box py={16} bg={heroBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Price Charts</Heading>
              <HStack spacing={4}>
                <Select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} size="sm" maxW="120px">
                  <option value="1D">1 Day</option>
                  <option value="1W">1 Week</option>
                  <option value="1M">1 Month</option>
                  <option value="3M">3 Months</option>
                  <option value="1Y">1 Year</option>
                  <option value="5Y">5 Years</option>
                </Select>
              </HStack>
            </VStack>
            <Tabs variant="enclosed" colorScheme="brand" w="full">
              <TabList>
                <Tab>Price Chart</Tab>
                <Tab>Volume</Tab>
                <Tab>Historical Data</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Card bg={cardBg} shadow="md" borderRadius="xl">
                    <CardHeader>
                      <Heading size="md">Stock Price Trend ({selectedPeriod})</Heading>
                    </CardHeader>
                    <CardBody>
                      <Box h="400px">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={stockData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="price" 
                              stroke="#0066cc" 
                              strokeWidth={2}
                              dot={{ fill: '#0066cc' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardBody>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card bg={cardBg} shadow="md" borderRadius="xl">
                    <CardHeader>
                      <Heading size="md">Trading Volume ({selectedPeriod})</Heading>
                    </CardHeader>
                    <CardBody>
                      <Box h="400px">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={volumeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="volume" fill="#0066cc" />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardBody>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card bg={cardBg} shadow="md" borderRadius="xl">
                    <CardHeader>
                      <Heading size="md">Historical Performance</Heading>
                    </CardHeader>
                    <CardBody>
                      <TableContainer>
                        <Table variant="simple">
                          <Thead>
                            <Tr>
                              <Th>Year</Th>
                              <Th isNumeric>High</Th>
                              <Th isNumeric>Low</Th>
                              <Th isNumeric>Close</Th>
                              <Th isNumeric>Avg Volume</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {historicalData.map((row, index) => (
                              <Tr key={index}>
                                <Td fontWeight="semibold">{row.period}</Td>
                                <Td isNumeric>${row.high}</Td>
                                <Td isNumeric>${row.low}</Td>
                                <Td isNumeric>${row.close}</Td>
                                <Td isNumeric>{row.volume}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </CardBody>
                  </Card>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Container>
      </Box>

      {/* Key Ratios & Metrics */}
      <Box py={16} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Key Financial Ratios</Heading>
              <Text fontSize="lg" color="gray.600">
                Important metrics for investment analysis
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              <Card bg={cardBg} shadow="md" borderRadius="xl">
                <CardHeader>
                  <Heading size="md">Valuation Ratios</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6}>
                    <HStack justify="space-between" w="full">
                      <Text>Price-to-Earnings (P/E)</Text>
                      <Text fontWeight="bold">18.5x</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Price-to-Book (P/B)</Text>
                      <Text fontWeight="bold">3.2x</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Price-to-Sales (P/S)</Text>
                      <Text fontWeight="bold">5.1x</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Enterprise Value/EBITDA</Text>
                      <Text fontWeight="bold">12.3x</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>PEG Ratio</Text>
                      <Text fontWeight="bold">1.4x</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
              <Card bg={cardBg} shadow="md" borderRadius="xl">
                <CardHeader>
                  <Heading size="md">Profitability Metrics</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6}>
                    <HStack justify="space-between" w="full">
                      <Text>Return on Equity (ROE)</Text>
                      <Text fontWeight="bold">17.2%</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Return on Assets (ROA)</Text>
                      <Text fontWeight="bold">8.9%</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Gross Margin</Text>
                      <Text fontWeight="bold">42.3%</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Operating Margin</Text>
                      <Text fontWeight="bold">18.7%</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Net Margin</Text>
                      <Text fontWeight="bold">12.4%</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Stock Information */}
      <Box py={16} bg={heroBg}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Stock Details</Heading>
              <Text fontSize="lg" color="gray.600">
                Essential information about InvestorCorp shares
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              <Card bg={cardBg} shadow="md" borderRadius="xl">
                <CardHeader>
                  <Heading size="md">Trading Information</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4}>
                    <HStack justify="space-between" w="full">
                      <Text>Stock Symbol</Text>
                      <Badge colorScheme="brand" px={3} py={1} borderRadius="full">
                        NYSE: INVT
                      </Badge>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Shares Outstanding</Text>
                      <Text fontWeight="bold">288.3M</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Float</Text>
                      <Text fontWeight="bold">275.1M</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Beta</Text>
                      <Text fontWeight="bold">1.15</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Average Volume (30d)</Text>
                      <Text fontWeight="bold">2.3M</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
              <Card bg={cardBg} shadow="md" borderRadius="xl">
                <CardHeader>
                  <Heading size="md">Dividend Information</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4}>
                    <HStack justify="space-between" w="full">
                      <Text>Dividend Yield</Text>
                      <Text fontWeight="bold" color="green.500">2.1%</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Annual Dividend</Text>
                      <Text fontWeight="bold">$3.28</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Ex-Dividend Date</Text>
                      <Text fontWeight="bold">Mar 15, 2025</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Payment Date</Text>
                      <Text fontWeight="bold">Mar 31, 2025</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Payout Ratio</Text>
                      <Text fontWeight="bold">38.8%</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Investment Tools */}
      <Box py={16} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="xl">Investment Tools & Resources</Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Access additional tools and resources to support your investment decisions
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
              <Button size="lg" variant="outline" h="auto" p={6}>
                <VStack spacing={2}>
                  <Text fontWeight="bold">Stock Calculator</Text>
                  <Text fontSize="sm" color="gray.600">
                    Calculate potential returns
                  </Text>
                </VStack>
              </Button>
              <Button size="lg" variant="outline" h="auto" p={6}>
                <VStack spacing={2}>
                  <Text fontWeight="bold">Dividend Reinvestment</Text>
                  <Text fontSize="sm" color="gray.600">
                    DRIP program details
                  </Text>
                </VStack>
              </Button>
              <Button size="lg" variant="outline" h="auto" p={6}>
                <VStack spacing={2}>
                  <Text fontWeight="bold">Stock Alerts</Text>
                  <Text fontSize="sm" color="gray.600">
                    Set price notifications
                  </Text>
                </VStack>
              </Button>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default StockInformation;