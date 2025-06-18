import React from 'react';
import {
    Box,
    Text,
    Flex,
} from '@chakra-ui/react';
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    ComposedChart,
} from 'recharts';
import { TargetPriceHistoryProps } from '../../util/Interface';
const TargetPriceHistory: React.FC<TargetPriceHistoryProps> = ({
    data,
    title = "Target price history",
    height = 300,
    currency = "AED",
    showLegend = true
}) => {
    const formatYAxisLabel = (value: number) => {
        return value.toFixed(2);
    };

    const formatTooltipValue = (value: any, name: string) => {
        return [`${value.toFixed(2)} ${currency}`, name];
    };

    // Custom Legend Component
    const CustomLegend = () => (
        <Flex align="center" justify="center" gap={6} mb={4}>
            <Flex align="center" gap={2}>
                <Box w="20px" h="3px" bg="gray.300" borderRadius="sm" />
                <Text fontSize="sm" color="gray.600">Target price</Text>
            </Flex>
            <Flex align="center" gap={2}>
                <Box w="20px" h="3px" bg="#4A5568" borderRadius="sm" />
                <Text fontSize="sm" color="gray.600">Closing price</Text>
            </Flex>
        </Flex>
    );

    return (
        <Box w="full">
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
                {title}
            </Text>

            {showLegend && <CustomLegend />}

            <Box
                h={`${height}px`}
                bg="white"
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: '#666' }}
                            tickLine={{ stroke: '#ccc' }}
                            axisLine={{ stroke: '#ccc' }}
                        />

                        <YAxis
                            domain={['dataMin - 0.5', 'dataMax + 0.5']}
                            tick={{ fontSize: 12, fill: '#666' }}
                            tickLine={{ stroke: '#ccc' }}
                            axisLine={{ stroke: '#ccc' }}
                            tickFormatter={formatYAxisLabel}
                            label={{
                                value: currency,
                                angle: -90,
                                position: 'insideLeft',
                                style: { textAnchor: 'middle', fontSize: '12px', fill: '#666' }
                            }}
                        />

                        {/* Target Price Area */}
                        <Area
                            type="monotone"
                            dataKey="targetPrice"
                            stroke="none"
                            fill="#E2E8F0"
                            fillOpacity={0.8}
                        />

                        {/* Closing Price Line */}
                        <Line
                            type="monotone"
                            dataKey="closingPrice"
                            stroke="#4A5568"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#4A5568' }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default TargetPriceHistory