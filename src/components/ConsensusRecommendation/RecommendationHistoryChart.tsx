import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import { RecommendationHistoryChartProps } from '../../util/Interface';
import { Box, Text } from '@chakra-ui/react';
const RecommendationHistoryChart: React.FC<RecommendationHistoryChartProps> = ({
    data,
    title = "Recommendation history",
    height = 400
}) => {
    const CustomYAxisTick = (props: any) => {
        const { x, y, payload } = props;
        const labels = ['', 'Buy', 'Outperform', 'Hold', 'Underperform', 'Sell'];

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={4}
                    textAnchor="end"
                    fill="#666"
                    fontSize="12"
                >
                    {labels[payload.value] || ''}
                </text>
            </g>
        );
    };

    const formatXAxisLabel = (tickItem: string) => {
        return tickItem;
    };

    return (
        <Box w="full">
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
                {title}
            </Text>

            <Box
                h={`${height}px`}
                bg="white"
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 60,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: '#666' }}
                            tickLine={{ stroke: '#ccc' }}
                            axisLine={{ stroke: '#ccc' }}
                            tickFormatter={formatXAxisLabel}
                        />

                        <YAxis
                            domain={[1, 5]}
                            ticks={[1, 2, 3, 4, 5]}
                            tick={<CustomYAxisTick />}
                            tickLine={{ stroke: '#ccc' }}
                            axisLine={{ stroke: '#ccc' }}
                        />

                        <ReferenceLine y={1} stroke="#22C55E" strokeDasharray="2 2" strokeOpacity={0.3} />
                        <ReferenceLine y={2} stroke="#84CC16" strokeDasharray="2 2" strokeOpacity={0.3} />
                        <ReferenceLine y={3} stroke="#F59E0B" strokeDasharray="2 2" strokeOpacity={0.3} />
                        <ReferenceLine y={4} stroke="#EF4444" strokeDasharray="2 2" strokeOpacity={0.3} />
                        <ReferenceLine y={5} stroke="#DC2626" strokeDasharray="2 2" strokeOpacity={0.3} />

                        <Line
                            type="stepAfter"
                            dataKey="recommendation"
                            stroke="#008080"
                            strokeWidth={3}
                            dot={{ fill: '#008080', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#008080' }}
                            fill="#008080"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};


export default RecommendationHistoryChart