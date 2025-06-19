import React, { useState, useMemo } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    VStack,
    HStack,
    Table,
    ButtonGroup,
} from '@chakra-ui/react';
import {
    BarChart,
    Bar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    ReferenceLine,
} from 'recharts';
import {
    MdBarChart,
    MdShowChart,
    MdTrendingUp,
    MdTableChart
} from 'react-icons/md';
import { ChartType, ReturnData, ReturnTableData, TimeRange } from '../../util/Interface';



interface ReturnsChartProps {
    data?: ReturnData[];
    onTimeRangeChange?: (range: TimeRange) => void;
    onChartTypeChange?: (type: ChartType) => void;
}

const TotalReturn: React.FC<ReturnsChartProps> = ({
    data = [],
    onTimeRangeChange,
    onChartTypeChange
}) => {
    const [activeChart, setActiveChart] = useState<ChartType>('periodic');
    const [timeRange, setTimeRange] = useState<TimeRange>('1year');
    const [showTable, setShowTable] = useState(false);


    const parseReturnData = (): ReturnData[] => {
        const rawData = [
            { date: '14/06/2024', return: 9 },
            { date: '14/06/2025', return: 0.90 },
            { date: '14/06/2026', return: -1.50 },
            { date: '21/06/2024', return: 1.20 },
            { date: '24/06/2024', return: -2.10 },
            { date: '25/06/2024', return: 0.90 }
        ];

        let cumulativeReturn = 0;
        return rawData.map((item, index) => {
            cumulativeReturn += item.return;

            return {
                date: item.date,
                periodicReturn: item.return,
                cumulativeReturn: cumulativeReturn,
                annualReturn: item.return * (365 / (index + 1)) // Annualized calculation
            };
        });
    };

    const defaultData = data.length > 0 ? data : parseReturnData();

    const filteredData = useMemo(() => {
        const now = new Date();
        let cutoffDate = new Date();

        switch (timeRange) {
            case '1year':
                cutoffDate.setFullYear(now.getFullYear() - 1);
                break;
            case '3year':
                cutoffDate.setFullYear(now.getFullYear() - 3);
                break;
            default:
                return defaultData;
        }

        return defaultData.filter(item => {
            const itemDate = new Date(item.date.split('/').reverse().join('-'));
            return itemDate >= cutoffDate;
        });
    }, [defaultData, timeRange]);

    const tableData: ReturnTableData[] = filteredData.map((item, index) => ({
        period: `Period ${index + 1}`,
        periodicReturn: item.periodicReturn,
        cumulativeReturn: item.cumulativeReturn,
        annualReturn: item.annualReturn
    }));

    const handleChartChange = (type: ChartType) => {
        setActiveChart(type);
        if (onChartTypeChange) {
            onChartTypeChange(type);
        }
    };

    const handleTimeRangeChange = (range: TimeRange) => {
        setTimeRange(range);
        if (onTimeRangeChange) {
            onTimeRangeChange(range);
        }
    };

    const toggleTable = () => {
        setShowTable(!showTable);
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <Box bg="white" p={3} borderRadius="md" boxShadow="lg" border="1px solid" borderColor="gray.200">
                    <Text fontWeight="bold" mb={1}>{label}</Text>
                    <Text fontSize="sm" color={data.color}>
                        {activeChart === 'periodic' && `Periodic Return: ${data.value?.toFixed(2)}%`}
                        {activeChart === 'cumulative' && `Cumulative Return: ${data.value?.toFixed(2)}%`}
                        {activeChart === 'annual' && `Annual Return: ${data.value?.toFixed(2)}%`}
                    </Text>
                </Box>
            );
        }
        return null;
    };

    const renderChart = () => {
        const chartHeight = 400;

        if (activeChart === 'cumulative') {
            return (
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            tick={{ fontSize: 11 }}
                            label={{
                                value: '%',
                                angle: -90,
                                position: 'insideLeft',
                                style: { textAnchor: 'middle' }
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
                        <Area
                            type="monotone"
                            dataKey="cumulativeReturn"
                            stroke="#4A5568"
                            fill="#E2E8F0"
                            fillOpacity={0.6}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            );
        }

        return (
            <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11 }}
                        angle={360}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis
                        tick={{ fontSize: 11 }}
                        label={{
                            value: '%',
                            angle: 90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle' }
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={0} stroke="red" strokeDasharray="2 2" />
                    <Bar
                        dataKey={activeChart === 'periodic' ? 'periodicReturn' : 'annualReturn'}
                        fill="#008080"
                        radius={[2, 2, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    return (
        <Box w="full" p={4}>

            <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>

                <HStack gap={2}>
                    <Button
                        variant={activeChart === 'periodic' ? 'solid' : 'outline'}
                        size="sm"
                        onClick={() => handleChartChange('periodic')}
                        bg={activeChart === 'periodic' ? '#4A5568' : 'transparent'}
                        color={activeChart === 'periodic' ? 'white' : 'gray.600'}
                    >
                        <MdBarChart />
                    </Button>
                    <Button
                        variant={activeChart === 'cumulative' ? 'solid' : 'outline'}
                        size="sm"
                        onClick={() => handleChartChange('cumulative')}
                      
                        bg={activeChart === 'cumulative' ? '#4A5568' : 'transparent'}
                        color={activeChart === 'cumulative' ? 'white' : 'gray.600'}
                    >
                        <MdShowChart />
                    </Button>
                    <Button
                        variant={activeChart === 'annual' ? 'solid' : 'outline'}
                        size="sm"
                        onClick={() => handleChartChange('annual')}
                        // leftIcon={<MdTrendingUp />}
                        bg={activeChart === 'annual' ? '#4A5568' : 'transparent'}
                        color={activeChart === 'annual' ? 'white' : 'gray.600'}
                    >
                        <MdTrendingUp />
                    </Button>
                </HStack>

                {activeChart === 'cumulative' && (
                    <ButtonGroup size="sm" >
                        <Button
                            variant={timeRange === '1year' ? 'solid' : 'outline'}
                            onClick={() => handleTimeRangeChange('1year')}
                            bg={timeRange === '1year' ? '#4A5568' : 'transparent'}
                            color={timeRange === '1year' ? 'white' : 'gray.600'}
                        >
                            1 Year
                        </Button>
                        <Button
                            variant={timeRange === '3year' ? 'solid' : 'outline'}
                            onClick={() => handleTimeRangeChange('3year')}
                            bg={timeRange === '3year' ? '#4A5568' : 'transparent'}
                            color={timeRange === '3year' ? 'white' : 'gray.600'}
                        >
                            3 Year
                        </Button>
                    </ButtonGroup>
                )}

                {activeChart === 'cumulative' && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleTable}
                    >
                        {showTable ? 'Hide' : 'Show'} Table
                    </Button>
                )}
            </Flex>

            <Box
                h="400px"
                bg="white"
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                mb={showTable ? 6 : 0}
            >
                {renderChart()}
            </Box>

            {showTable && activeChart === 'cumulative' && (
                <Box overflowX="auto">
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                        Cumulative Returns Data
                    </Text>
                    <Table.Root variant="outline" size="sm">
                        <Table.Header bg="#008080">
                            <Table.Row>
                                <Table.ColumnHeader color="white">Period</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" textAlign="center">
                                    Periodic Return (%)
                                </Table.ColumnHeader>
                                <Table.ColumnHeader color="white" textAlign="center">
                                    Cumulative Return (%)
                                </Table.ColumnHeader>
                                <Table.ColumnHeader color="white" textAlign="center">
                                    Annualized Return (%)
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {tableData.map((row, index) => (
                                <Table.Row key={index} bg={index % 2 === 0 ? 'white' : 'gray.50'}>
                                    <Table.Cell py={3} fontWeight="medium">
                                        {row.period}
                                    </Table.Cell>
                                    <Table.Cell py={3} textAlign="center" color={row.periodicReturn >= 0 ? 'green.600' : 'red.600'}>
                                        {row.periodicReturn.toFixed(2)}%
                                    </Table.Cell>
                                    <Table.Cell py={3} textAlign="center" color={row.cumulativeReturn >= 0 ? 'green.600' : 'red.600'}>
                                        {row.cumulativeReturn.toFixed(2)}%
                                    </Table.Cell>
                                    <Table.Cell py={3} textAlign="center" color={row.annualReturn >= 0 ? 'green.600' : 'red.600'}>
                                        {row.annualReturn.toFixed(2)}%
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>
            )}


        </Box>
    );
};



export default TotalReturn;
