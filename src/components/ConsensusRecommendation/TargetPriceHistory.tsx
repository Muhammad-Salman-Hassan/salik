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
    Tooltip
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

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <Box
                    bg="white"
                    p={4}
                    borderRadius="lg"
                    boxShadow="xl"
                    border="1px solid"
                    borderColor="gray.200"
                    minW="200px"
                >
                    <Text fontWeight="bold" mb={3} color="gray.700" borderBottom="1px solid" borderColor="gray.100" pb={2}>
                        {label}
                    </Text>
                    {payload.map((entry: any, index: number) => (
                        <Flex key={index} align="center" justify="space-between" mb={2}>
                            <Flex align="center" gap={2}>
                                <Box
                                    w="12px"
                                    h="3px"
                                    bg={entry.dataKey === 'targetPrice' ? '#008080' : '#4A5568'}
                                    borderRadius="sm"
                                />
                                <Text fontSize="sm" color="gray.600">
                                    {entry.dataKey === 'targetPrice' ? 'Target price' : 'Closing price'}:
                                </Text>
                            </Flex>
                            <Text fontSize="sm" fontWeight="semibold" color={entry.color}>
                                {entry.value?.toFixed(2)} {currency}
                            </Text>
                        </Flex>
                    ))}

                   
                    {payload.length === 2 && (
                        <Box mt={3} pt={2} borderTop="1px solid" borderColor="gray.100">
                            <Flex justify="space-between">
                                <Text fontSize="xs" color="gray.500">Difference:</Text>
                                <Text
                                    fontSize="xs"
                                    fontWeight="semibold"
                                    color={
                                        (payload[0]?.value || 0) - (payload[1]?.value || 0) >= 0
                                            ? 'green.600'
                                            : 'red.600'
                                    }
                                >
                                    {((payload[0]?.value || 0) - (payload[1]?.value || 0)).toFixed(2)} {currency}
                                </Text>
                            </Flex>
                        </Box>
                    )}
                </Box>
            );
        }
        return null;
    };

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
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: '#008080',
                                strokeWidth: 1,
                                strokeDasharray: '5 5'
                            }}
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
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0c5d56" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="#008080" stopOpacity={0} />
                            </linearGradient>

                        </defs>

                        <Area
                            type="monotone"
                            dataKey="targetPrice"
                            stroke="none"
                            fill="url(#colorUv)"

                            fillOpacity={0.3}
                        />


                        <Line
                            type="monotone"
                            dataKey="closingPrice"
                            stroke="#008080"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#008080' }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default TargetPriceHistory