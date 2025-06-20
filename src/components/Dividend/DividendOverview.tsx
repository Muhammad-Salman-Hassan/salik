import React from 'react';
import {
    Box,
    Flex,
    Text,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import { DividendDashboardProps, DividendOverviewData } from '../../util/Interface';
import { dividendOverviewdummydata } from '../../util/DummyData';



const DividendOverview: React.FC<DividendDashboardProps> = ({ data }) => {

    const defaultData: DividendOverviewData = dividendOverviewdummydata

    const displayData = data || defaultData;


    const DividendOverviewCard = ({ children, ...props }: { children: React.ReactNode } & any) => (
        <Box
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
            border="1px solid"
            borderColor="gray.100"
            transition="all 0.3s ease"
            _hover={{
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                transform: "translateY(-2px)"
            }}
            {...props}
        >
            {children}
        </Box>
    );


    const MiniAreaChart = ({ data, height = 80 }: { data: any[], height?: number }) => (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0c5d56" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#008080" stopOpacity={0} />
                    </linearGradient>
                  
                </defs>
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#008080"
                    // fill="#0c5d56"
                    fillOpacity={0.2}
                    fill="url(#colorUv)"
                    strokeWidth={2}
                />
                
            </AreaChart>
        </ResponsiveContainer>
    );

    return (
        <Box bg="gray.50" minH="100vh">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>

                <DividendOverviewCard>
                    <VStack align="start" gap={4}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.700">
                            Latest Dividend
                        </Text>
                        <Box>
                            <Text fontSize="3xl" fontWeight="bold" color="gray.900">
                                {displayData.latestDividend.amount.toFixed(3)}
                            </Text>
                            <Text fontSize="lg" color="gray.600" mt={-1}>
                                {displayData.latestDividend.currency} per share
                            </Text>
                        </Box>
                        <VStack align="start" gap={1} fontSize="sm" color="gray.600">
                            <Text>Ex-dividend date: <Text as="span" fontWeight="semibold">{displayData.latestDividend.exDividendDate}</Text></Text>
                            <Text>Payment date: <Text as="span" fontWeight="semibold">{displayData.latestDividend.paymentDate}</Text></Text>
                            <Text>Type: <Text as="span" fontWeight="semibold">{displayData.latestDividend.type}</Text></Text>
                        </VStack>
                    </VStack>
                </DividendOverviewCard>


                <DividendOverviewCard>
                    <VStack align="start" gap={4}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.700">
                            Dividend Yield
                        </Text>
                        <Box>
                            <Flex align="baseline" gap={2}>
                                <Text fontSize="3xl" fontWeight="bold" color="green.600">
                                    {displayData.dividendYield.currentYield.toFixed(2)}
                                </Text>
                                <Text fontSize="lg" color="gray.600">
                                    % dividend yield
                                    <Text as="sup" fontSize="xs">1</Text>
                                </Text>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex align="baseline" gap={2}>
                                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                                    {displayData.dividendYield.monthlyDividend.toFixed(3)}
                                </Text>
                                <Text fontSize="md" color="gray.600">
                                    {displayData.dividendYield.currency} 12-month dividend
                                </Text>
                            </Flex>
                        </Box>
                    </VStack>
                </DividendOverviewCard>

                <DividendOverviewCard>
                    <VStack align="start" gap={3}>
                        <Flex justify="space-between" align="center" w="full">
                            <Text fontSize="lg" fontWeight="bold" color="gray.700">
                                Total return 12 months
                                <Text as="sup" fontSize="xs">2</Text>
                            </Text>
                            <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                +{displayData.totalReturns.twelveMonths.toFixed(2)} %
                            </Text>
                        </Flex>
                        <Box w="full" h="80px">
                            <MiniAreaChart data={displayData.chartData.twelveMonths} />
                        </Box>
                    </VStack>
                </DividendOverviewCard>

                <DividendOverviewCard>
                    <VStack align="start" gap={3}>
                        <Flex justify="space-between" align="center" w="full">
                            <Text fontSize="lg" fontWeight="bold" color="gray.700">
                                Total return 3 years
                                <Text as="sup" fontSize="xs">2</Text>
                            </Text>
                            <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                +{displayData.totalReturns.threeYears.toFixed(2)} %
                            </Text>
                        </Flex>
                        <Box w="full" h="80px">
                            <MiniAreaChart data={displayData.chartData.threeYears} />
                        </Box>
                    </VStack>
                </DividendOverviewCard>

                <DividendOverviewCard>
                    <VStack align="start" gap={4}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.700">
                            Annual Dividend, EUR
                        </Text>
                        <Box w="full" h="200px">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={displayData.annualDividend} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                    <XAxis
                                        dataKey="year"
                                        tick={{ fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis hide />
                                    <Bar
                                        dataKey="amount"
                                        fill="#008080"
                                        radius={[4, 4, 0, 0]}
                                        label={{
                                            position: 'top',
                                            fontSize: 10,
                                            fill: '#374151'
                                        }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </VStack>
                </DividendOverviewCard>

                <DividendOverviewCard>
                    <VStack align="start" gap={4}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.700">
                            Annual Dividend Yield
                            <Text as="sup" fontSize="xs">3</Text>, %
                        </Text>
                        <Box w="full" h="200px">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={displayData.annualDividendYield} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                    <XAxis
                                        dataKey="year"
                                        tick={{ fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis hide />
                                    <Bar
                                        dataKey="yield"
                                        fill="#008080"
                                        radius={[4, 4, 0, 0]}
                                        label={{
                                            position: 'top',
                                            fontSize: 10,
                                            fill: '#374151'
                                        }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </VStack>
                </DividendOverviewCard>
            </SimpleGrid>

            <Box mt={8} p={4} bg="white" borderRadius="xl" boxShadow="sm">
                <VStack align="start" gap={1} fontSize="xs" color="gray.500">
                    <Text><Text as="sup">1</Text> Current dividend yield based on last 12 months</Text>
                    <Text><Text as="sup">2</Text> Total return includes dividends and capital appreciation</Text>
                    <Text><Text as="sup">3</Text> Annual dividend yield calculated at year-end share price</Text>
                </VStack>
            </Box>
        </Box>
    );
};



export default DividendOverview;



//     latestDividend: {
//       amount: 0.0826,
//       currency: 'AED',
//       exDividendDate: '18/04/2025',
//       paymentDate: '28/04/2025',
//       type: 'Semi-Annual'
//     },
//     dividendYield: {
//       currentYield: 1.85,
//       monthlyDividend: 0.165,
//       currency: 'AED'
//     },
//     totalReturns: {
//       twelveMonths: 45.20,
//       threeYears: 89.15
//     },
//     annualDividend: [
//       { year: '2020', amount: 0.12 },
//       { year: '2021', amount: 0.135 },
//       { year: '2022', amount: 0.15 },
//       { year: '2023', amount: 0.165 },
//       { year: '2024', amount: 0.17 }
//     ],
//     annualDividendYield: [
//       { year: '2020', yield: 1.20 },
//       { year: '2021', yield: 1.45 },
//       { year: '2022', yield: 1.68 },
//       { year: '2023', yield: 1.85 },
//       { year: '2024', yield: 1.92 }
//     ],
//     chartData: {
//       twelveMonths: [
//         { month: 'Jan', value: 2.1 },
//         { month: 'Feb', value: 5.8 },
//         { month: 'Mar', value: 12.4 },
//         { month: 'Apr', value: 18.9 },
//         { month: 'May', value: 25.2 },
//         { month: 'Jun', value: 32.1 },
//         { month: 'Jul', value: 36.8 },
//         { month: 'Aug', value: 40.5 },
//         { month: 'Sep', value: 42.9 },
//         { month: 'Oct', value: 44.1 },
//         { month: 'Nov', value: 44.8 },
//         { month: 'Dec', value: 45.20 }
//       ],
//       threeYears: [
//         { month: '2022 Q1', value: 12.5 },
//         { month: '2022 Q2', value: 25.8 },
//         { month: '2022 Q3', value: 38.2 },
//         { month: '2022 Q4', value: 48.7 },
//         { month: '2023 Q1', value: 58.1 },
//         { month: '2023 Q2', value: 68.9 },
//         { month: '2023 Q3', value: 75.4 },
//         { month: '2023 Q4', value: 81.2 },
//         { month: '2024 Q1', value: 84.8 },
//         { month: '2024 Q2', value: 87.1 },
//         { month: '2024 Q3', value: 88.5 },
//         { month: '2024 Q4', value: 89.15 }
//       ]
//     }
//   };