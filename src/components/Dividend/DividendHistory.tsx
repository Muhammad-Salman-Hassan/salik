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
} from 'recharts';
import { DividendData, DividendPerShareProps, DividendTableData } from '../../util/Interface';



const DividendPerShare: React.FC<DividendPerShareProps> = ({
    chartData = [],
    tableData = [],
    onViewChange
}) => {
    const [selectedView, setSelectedView] = useState('Payouts');

    const ChartData: DividendData[] = [
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


    const TableData: DividendTableData[] = [
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
        }
    ];

    const displayChartData = chartData.length > 0 ? chartData : ChartData;
    const displayTableData = tableData.length > 0 ? tableData : TableData;

    const handleViewChange = (value: string) => {
        setSelectedView(value);
        if (onViewChange) {
            onViewChange(value);
        }
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <Box bg="white" p={3} borderRadius="md" boxShadow="lg" border="1px solid" borderColor="gray.200">
                    <Text fontWeight="bold" mb={1}>{label}</Text>
                    <Text fontSize="sm">Dividend: {data.value.toFixed(4)} AED</Text>
                    <Text fontSize="sm">Type: {data.type}</Text>
                </Box>
            );
        }
        return null;
    };

    const chartDataFormatted = displayChartData.map((item, index) => ({
        name: item.date,
        value: item.value,
        type: item.type,
        fill: item.color
    }));


    const frameworks = createListCollection({
        items: [
            { label: "PAY OUT", value: "payout" }

        ],
    })
    return (
        <Box w="full" p={4}>

            <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="xl" fontWeight="bold">Dividend per Share</Text>
                <Flex align="center" gap={2}>
                    <Text fontSize="sm" color="gray.600">View:</Text>
                    <Select.Root collection={frameworks} size="sm" width="320px" >
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Select Currency" />
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
                </ResponsiveContainer>
            </Box>


            <Box overflowX="auto">
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
            </Box>
        </Box>
    );
};



export default DividendPerShare;