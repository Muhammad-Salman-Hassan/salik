import React, { useState } from 'react';
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Text,
    VStack,
    SimpleGrid,
    Grid,
} from '@chakra-ui/react';
import { MdOutlineArrowDropUp } from 'react-icons/md';
import { ConsensusRecommendationProps, PriceHistoryPoint, RecommendationHistoryPoint, RecommendationPeriod, RatingFilter } from '../../util/Interface';
import { FilterBar } from '../filterBar';
import Disclaimer from '../Discalimer/Disclaimer';
import RecommendationsTable from './RecommendationTable';
import RecommendationHistoryChart from './RecommendationHistoryChart';
import TargetPriceHistory from './TargetPriceHistory';
import { filterRecommendationPeriods, filterRecommendationHistory, filterPriceHistory } from '../../util/filterRating';

const ConsensusRecommendation: React.FC<ConsensusRecommendationProps> = ({
    data,
    consensusValue = 2.17,
    showDetailed = true,
    title = "Consensus recommendation"
}) => {
    const total = data.buy + data.outperform + data.hold + data.underperform + data.sell;

    const percentages = {
        buy: total > 0 ? (data.buy / total) * 100 : 0,
        outperform: total > 0 ? (data.outperform / total) * 100 : 0,
        hold: total > 0 ? (data.hold / total) * 100 : 0,
        underperform: total > 0 ? (data.underperform / total) * 100 : 0,
        sell: total > 0 ? (data.sell / total) * 100 : 0,
    };

    const getRecommendationColors = () => ({
        buy: '#22C55E',
        outperform: '#84CC16',
        hold: '#F59E0B',
        underperform: '#EF4444',
        sell: '#DC2626'
    });

    const colors = getRecommendationColors();

    const getArrowPosition = (value: number) => {
        return ((value - 1) / 4) * 100;
    };

    const maxValue = Math.max(data.buy, data.outperform, data.hold, data.underperform, data.sell);

    const tableData: RecommendationPeriod[] = [
        {
            period: "1 yr.",
            average: 1.44,
            buy: 7,
            outperform: 0,
            hold: 2,
            underperform: 0,
            sell: 0
        },
        {
            period: "6 mo.",
            average: 2.00,
            buy: 7,
            outperform: 1,
            hold: 4,
            underperform: 0,
            sell: 1
        },
        {
            period: "3 mo.",
            average: 2.42,
            buy: 5,
            outperform: 0,
            hold: 5,
            underperform: 1,
            sell: 1
        },
        {
            period: "1 mo.",
            average: 2.08,
            buy: 5,
            outperform: 1,
            hold: 6,
            underperform: 0,
            sell: 0
        },
        {
            period: "Current",
            average: 2.17,
            buy: 5,
            outperform: 0,
            hold: 7,
            underperform: 0,
            sell: 0
        }
    ];

    // Sample history data - step chart showing recommendation changes
    const historyData: RecommendationHistoryPoint[] = [
        { month: "Jul", date: new Date("2024-07-01"), recommendation: 1, recommendationType: "Buy" },
        { month: "Aug", date: new Date("2024-08-01"), recommendation: 1, recommendationType: "Buy" },
        { month: "Sep", date: new Date("2024-09-01"), recommendation: 1, recommendationType: "Buy" },
        { month: "Oct", date: new Date("2024-10-01"), recommendation: 1, recommendationType: "Buy" },
        { month: "Nov", date: new Date("2024-11-01"), recommendation: 1, recommendationType: "Buy" },
        { month: "Dec", date: new Date("2024-12-01"), recommendation: 1.5, recommendationType: "Buy" },
        { month: "2025", date: new Date("2025-01-01"), recommendation: 2, recommendationType: "Outperform" },
        { month: "Feb", date: new Date("2025-02-01"), recommendation: 2, recommendationType: "Outperform" },
        { month: "Mar", date: new Date("2025-03-01"), recommendation: 2.3, recommendationType: "Outperform" },
        { month: "Apr", date: new Date("2025-04-01"), recommendation: 2.1, recommendationType: "Outperform" },
        { month: "May", date: new Date("2025-05-01"), recommendation: 2.1, recommendationType: "Outperform" },
        { month: "Jun", date: new Date("2025-06-01"), recommendation: 2.17, recommendationType: "Outperform" },
        { month: "Jul", date: new Date("2025-07-01"), recommendation: 2.17, recommendationType: "Outperform" },
    ];

    const sampleData: PriceHistoryPoint[] = [
        { month: "Jul", date: new Date("2024-07-01"), targetPrice: 3.50, closingPrice: 3.50 },
        { month: "Aug", date: new Date("2024-08-01"), targetPrice: 3.50, closingPrice: 3.45 },
        { month: "Sep", date: new Date("2024-09-01"), targetPrice: 3.70, closingPrice: 3.60 },
        { month: "Oct", date: new Date("2024-10-01"), targetPrice: 4.20, closingPrice: 4.10 },
        { month: "Nov", date: new Date("2024-11-01"), targetPrice: 4.90, closingPrice: 4.80 },
        { month: "Dec", date: new Date("2024-12-01"), targetPrice: 5.40, closingPrice: 5.60 },
        { month: "2025", date: new Date("2025-01-01"), targetPrice: 5.20, closingPrice: 5.10 },
        { month: "Feb", date: new Date("2025-02-01"), targetPrice: 5.00, closingPrice: 4.90 },
        { month: "Mar", date: new Date("2025-03-01"), targetPrice: 5.70, closingPrice: 5.60 },
        { month: "Apr", date: new Date("2025-04-01"), targetPrice: 5.20, closingPrice: 5.10 },
        { month: "May", date: new Date("2025-05-01"), targetPrice: 5.20, closingPrice: 5.15 },
        { month: "Jun", date: new Date("2025-06-01"), targetPrice: 5.80, closingPrice: 5.75 },
        { month: "Jul", date: new Date("2025-07-01"), targetPrice: 5.70, closingPrice: 5.60 },
    ];

    const [filter, setFilter] = useState<RatingFilter>({ filterType: '14_days' });
    const [filteredTableData, setFilteredTableData] = useState<RecommendationPeriod[]>(tableData);
    const [filteredHistoryData, setFilteredHistoryData] = useState<RecommendationHistoryPoint[]>(historyData);
    const [filteredPriceData, setFilteredPriceData] = useState<PriceHistoryPoint[]>(sampleData);

    const applyFilter = () => {
        setFilteredTableData(filterRecommendationPeriods(tableData, filter));
        setFilteredHistoryData(filterRecommendationHistory(historyData, filter));
        setFilteredPriceData(filterPriceHistory(sampleData, filter));
    };

    return (
        <Box w="full" p={4} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={8}>
                <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                    <Box textAlign="center">
                        <Text fontSize="xl" fontWeight="bold" mb={2}>
                            Current Price
                        </Text>
                        <Text fontSize="2xl" color="green.500" fontWeight="bold">
                            $5.60
                        </Text>
                    </Box>
                </Box>

                <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                    <Box textAlign="center">
                        <Text fontSize="xl" fontWeight="bold" mb={2}>
                          Recommendation
                        </Text>
                        <Text fontSize="2xl" color="blue.500" fontWeight="bold">
                           OUTPERFORM
                        </Text>
                    </Box>
                </Box>

                <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                    <Box textAlign="center">
                        <Text fontSize="xl" fontWeight="bold" mb={2}>
                         Target price
                        </Text>
                        <Text fontSize="2xl" color="purple.500" fontWeight="bold">
                            6.19 AED
                        </Text>
                    </Box>
                </Box>
            </Grid>

            <Text fontSize="lg" fontWeight="semibold" mb={4}>
                {title}
            </Text>

            <Box mb={16}>
                <Flex
                    h="40px"
                    borderRadius="md"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="gray.300"
                    position="relative"
                >

                    <Box
                        bg={colors.buy}
                        flex={percentages.buy || 20}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontSize="sm"
                        fontWeight="semibold"
                    >
                        <Text>(1)Buy</Text>
                    </Box>


                    <Box
                        bg={colors.outperform}
                        flex={percentages.outperform || 20}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontSize="sm"
                        fontWeight="semibold"
                    >
                        <Text>(2)Outperform</Text>
                    </Box>

                 
                    <Box
                        bg={colors.hold}
                        flex={percentages.hold || 20}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontSize="sm"
                        fontWeight="semibold"
                    >
                        <Text>(3)Hold</Text>
                    </Box>


                    <Box
                        bg={colors.underperform}
                        flex={percentages.underperform || 20}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontSize="sm"
                        fontWeight="semibold"
                    >
                        <Text>(4)Underperform</Text>
                    </Box>


                    <Box
                        bg={colors.sell}
                        flex={percentages.sell || 20}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontSize="sm"
                        fontWeight="semibold"
                    >
                        <Text>(5)Sell</Text>
                    </Box>
                </Flex>

                <Box position="relative" mt={2}>
                    <Box
                        position="absolute"
                        left={`${getArrowPosition(consensusValue)}%`}
                        transform="translateX(-50%)"
                        textAlign="center"
                    >
                        <MdOutlineArrowDropUp style={{ fontSize: "20px" }} />
                        <Text fontSize="sm" fontWeight="bold" color="black">
                            {consensusValue}
                        </Text>
                    </Box>
                </Box>
            </Box>


            {showDetailed && (
                <Box>
                    <Text fontSize="md" fontWeight="semibold" mb={3}>
                        Detailed recommendation
                    </Text>

                    <Box bg="gray.50" p={4} borderRadius="md">
                        {[
                            { label: 'Buy', value: data.buy, color: colors.buy },
                            { label: 'Outperform', value: data.outperform, color: colors.outperform },
                            { label: 'Hold', value: data.hold, color: colors.hold },
                            { label: 'Underperform', value: data.underperform, color: colors.underperform },
                            { label: 'Sell', value: data.sell, color: colors.sell },
                        ].map((item, index) => (
                            <Flex key={index} align="center" mb={2} gap={4}>
                                <Text minW="100px" fontSize="sm">
                                    {item.label}
                                </Text>
                                <Text minW="20px" fontSize="sm" fontWeight="semibold">
                                    {item.value}
                                </Text>
                                <Box flex="1" position="relative">
                                    <Box
                                        h="20px"
                                        bg={item.color}
                                        borderRadius="sm"
                                        width={maxValue > 0 ? `${(item.value / maxValue) * 100}%` : '0%'}
                                        minW={item.value > 0 ? "20px" : "0px"}
                                    />
                                </Box>
                            </Flex>
                        ))}
                    </Box>
                </Box>
            )}
            <VStack align="stretch" gap={8} w="full">
                <FilterBar filter={filter} onChange={setFilter} onApply={applyFilter} />
                
                <RecommendationsTable data={filteredTableData} />

                <RecommendationHistoryChart data={filteredHistoryData} />

                <TargetPriceHistory
                    data={filteredPriceData}
                    height={300}
                    currency="AED"
                />
            </VStack>
            <Disclaimer />
        </Box>
    );
};

export default ConsensusRecommendation;


