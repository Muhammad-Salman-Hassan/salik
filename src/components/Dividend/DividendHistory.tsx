
import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Select,
    Table,
    Portal,
    createListCollection,
} from '@chakra-ui/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend,
    ComposedChart,
    Line,
    LineChart
} from 'recharts';
import { AnnualData, DividendData, DividendPerShareProps, DividendTableData } from '../../util/Interface';


const DividendPerShare: React.FC<DividendPerShareProps> = ({
    chartData = [],
    tableData = [],
  
    onViewChange
}) => {
    const [selectedView, setSelectedView] = useState('payout');

    // Default Payout Data
    const defaultChartData: DividendData[] = [
        {
            date: '14/04/2023',
            value: 0.065,
            type: 'Semi-Annual',
            color: '#008080'
        },
        {
            date: '18/08/2023',
            value: 0.070,
            type: 'Semi-Annual',
            color: '#9cb8c2'
        }
    ];

    const defaultTableData: DividendTableData[] = [
        {
            financialPeriod: '2024',
            type: 'Semi-Annual',
            dividendAdjusted: 0.0826,
            exDividendDate: '18/04/2025',
            registryCloseDate: '21/04/2025',
            paymentDate: '28/04/2025'
        },
        {
            financialPeriod: '2024',
            type: 'Semi-Annual',
            dividendAdjusted: 0.070,
            exDividendDate: '22/08/2024',
            registryCloseDate: '25/08/2024',
            paymentDate: '01/09/2024'
        },
        {
            financialPeriod: '2023',
            type: 'Semi-Annual',
            dividendAdjusted: 0.0733,
            exDividendDate: '09/04/2024',
            registryCloseDate: '15/04/2024',
            paymentDate: '22/04/2024'
        },
        {
            financialPeriod: '2023',
            type: 'Semi-Annual',
            dividendAdjusted: 0.0731,
            exDividendDate: '18/08/2023',
            registryCloseDate: '21/08/2023',
            paymentDate: '07/09/2023'
        },
        {
            financialPeriod: '2022',
            type: 'Semi-Annual',
            dividendAdjusted: 0.0655,
            exDividendDate: '14/04/2023',
            registryCloseDate: '17/04/2023',
            paymentDate: '27/04/2023'
        }
    ];

    const defaultAnnualData: AnnualData[] = [
        {
            year: '2022',
            semiAnnual1: 0.0655,
            semiAnnual2: 0.0000,
            dividendYield: 2.1,
            totalDividend: 0.0655
        },
        {
            year: '2023',
            semiAnnual1: 0.0731,
            semiAnnual2: 0.0733,
            dividendYield: 4.8,
            totalDividend: 0.1464
        },
        {
            year: '2024',
            semiAnnual1: 0.070,
            semiAnnual2: 0.0826,
            dividendYield: 5.2,
            totalDividend: 0.1526
        }
    ];

    const displayChartData = chartData.length > 0 ? chartData : defaultChartData;
    const displayTableData = tableData.length > 0 ? tableData : defaultTableData;
    const displayAnnualData = defaultAnnualData.length > 0 ? defaultAnnualData : defaultAnnualData;

    const handleViewChange = (value: string) => {
        setSelectedView(value);
        if (onViewChange) {
            onViewChange(value);
        }
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            
            if (selectedView === 'annual') {
                return (
                    <Box bg="white" p={3} borderRadius="md" boxShadow="lg" border="1px solid" borderColor="gray.200">
                        <Text fontWeight="bold" mb={1}>{label}</Text>
                        <Text fontSize="sm">Total Dividend: {data.totalDividend?.toFixed(4)} AED</Text>
                        <Text fontSize="sm">Dividend Yield: {data.dividendYield?.toFixed(1)}%</Text>
                        <Text fontSize="sm">Semi-Annual 1: {data.semiAnnual1?.toFixed(4)} AED</Text>
                        <Text fontSize="sm">Semi-Annual 2: {data.semiAnnual2?.toFixed(4)} AED</Text>
                    </Box>
                );
            } else {
                return (
                    <Box bg="white" p={3} borderRadius="md" boxShadow="lg" border="1px solid" borderColor="gray.200">
                        <Text fontWeight="bold" mb={1}>{label}</Text>
                        <Text fontSize="sm">Dividend: {data.value?.toFixed(4)} AED</Text>
                        <Text fontSize="sm">Type: {data.type}</Text>
                    </Box>
                );
            }
        }
        return null;
    };

    const frameworks = createListCollection({
        items: [
            { label: "PAY OUT", value: "payout" },
            { label: "Annual", value: "annual" }
        ],
    });

  
    const renderPayoutChart = () => {
        const chartDataFormatted = displayChartData.map((item) => ({
            name: item.date,
            value: item.value,
            type: item.type,
            fill: item.color
        }));

        return (
            <BarChart
                data={chartDataFormatted}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                barCategoryGap="25%"
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    interval={0}
                    height={60}
                />
                <YAxis
                    domain={[0, 0.100]}
                    tick={{ fontSize: 11 }}
                    label={{
                        value: 'AED',
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fontSize: '12px' }
                    }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    payload={[
                        { value: 'Semi-Annual', type: 'rect', color: '#008080' },
                        { value: 'Semi-Annual', type: 'rect', color: '#9cb8c2' }
                    ]}
                    wrapperStyle={{ paddingTop: '20px' }}
                />
                <Bar
                    dataKey="value"
                    radius={[2, 2, 0, 0]}
                />
            </BarChart>
        );
    };

    const renderAnnualChart = () => {
        return (
            <ComposedChart
                data={displayAnnualData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                barCategoryGap="25%"
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11 }}
                    interval={0}
                    height={60}
                />
                <YAxis
                    yAxisId="left"
                    domain={[0, 0.20]}
                    tick={{ fontSize: 11 }}
                    label={{
                        value: 'AED',
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fontSize: '12px' }
                    }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 6]}
                    tick={{ fontSize: 11 }}
                    label={{
                        value: '%',
                        angle: 90,
                        position: 'insideRight',
                        style: { textAnchor: 'middle', fontSize: '12px' }
                    }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    payload={[
                        { value: 'Semi-Annual', type: 'rect', color: '#4a5568' },
                        { value: 'Semi-Annual', type: 'rect', color: '#7a8084' },
                        { value: 'Dividend Yield%', type: 'line', color: '#008080' }
                    ]}
                    wrapperStyle={{ paddingTop: '20px' }}
                />
                <Bar
                    yAxisId="left"
                    dataKey="semiAnnual1"
                    stackId="dividends"
                    fill="#4a5568"
                    radius={[0, 0, 0, 0]}
                />
                <Bar
                    yAxisId="left"
                    dataKey="semiAnnual2"
                    stackId="dividends"
                    fill="#7a8084"
                    radius={[2, 2, 0, 0]}
                />
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="dividendYield"
                    stroke="#008080"
                    strokeWidth={2}
                    dot={{ fill: '#008080', strokeWidth: 2, r: 4 }}
                />
            </ComposedChart>
        );
    };

    const renderPayoutTable = () => (
        <Table.Root variant="outline" size="sm">
            <Table.Header bg="#008080">
                <Table.Row>
                    <Table.ColumnHeader color="white" py={4}>
                        Financial Period
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Type
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Dividend (adj.), AED
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Ex-dividend date
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Registry closedate
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Payment date
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {displayTableData.map((row, index) => (
                    <Table.Row key={index} bg={index % 2 === 0 ? 'white' : 'gray.50'}>
                        <Table.Cell py={3} fontWeight="medium">
                            {row.financialPeriod}
                        </Table.Cell>
                        <Table.Cell py={3}>
                            {row.type}
                        </Table.Cell>
                        <Table.Cell py={3} textAlign="center">
                            {row.dividendAdjusted.toFixed(4)}
                        </Table.Cell>
                        <Table.Cell py={3} textAlign="center">
                            {row.exDividendDate}
                        </Table.Cell>
                        <Table.Cell py={3} textAlign="center">
                            {row.registryCloseDate}
                        </Table.Cell>
                        <Table.Cell py={3} textAlign="center">
                            {row.paymentDate}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );

    const renderAnnualTable = () => (
        <Table.Root variant="outline" size="sm">
            <Table.Header bg="#008080">
                <Table.Row>
                    <Table.ColumnHeader color="white" py={4}>
                        Financial Period
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Type
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Dividend (adj.), AED
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Ex-dividend date
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Registry closedate
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" py={4}>
                        Payment date
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {displayTableData.map((row, index) => (
                    <Table.Row key={index} bg={index % 2 === 0 ? 'white' : 'gray.50'}>
                        <Table.Cell py={3} fontWeight="medium">
                            {row.financialPeriod}
                        </Table.Cell>
                        <Table.Cell py={3}>
                            {row.type}
                        </Table.Cell>
                        <Table.Cell py={3} textAlign="center">
                            {row.dividendAdjusted.toFixed(4)}
                        </Table.Cell>
                        <Table.Cell py={3} textAlign="center">
                            {row.exDividendDate}
                        </Table.Cell>
                        <Table.Cell py={3} textAlign="center">
                            {row.registryCloseDate}
                        </Table.Cell>
                        <Table.Cell py={3} textAlign="center">
                            {row.paymentDate}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );

    return (
        <Box w="full" p={4}>
            <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="xl" fontWeight="bold">Dividend per Share</Text>
                <Flex align="center" gap={2}>
                    <Text fontSize="sm" color="gray.600">View:</Text>
                    <Select.Root 
                        collection={frameworks} 
                        size="sm" 
                        width="150px"
                        value={[selectedView]}
                        onValueChange={(e) => handleViewChange(e.value[0])}
                    >
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Select View" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {frameworks.items.map((framework) => (
                                        <Select.Item item={framework} key={framework.value}>
                                            {framework.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </Flex>
            </Flex>

            <Box h="400px" mb={8} bg="white" p={4} borderRadius="md" border="1px solid" borderColor="gray.200">
                <ResponsiveContainer width="100%" height="100%">
                    {selectedView === 'annual' ? renderAnnualChart() : renderPayoutChart()}
                </ResponsiveContainer>
            </Box>

          
            <Box overflowX="auto">
                {selectedView === 'annual' ? renderAnnualTable() : renderPayoutTable()}
            </Box>
        </Box>
    );
};

export default DividendPerShare;