
import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Text,
    Table,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { MdBarChart, MdArrowBack } from 'react-icons/md';
import { ChartData, EstimateData, RatingFilter, ViewState } from '../../util/Interface';
import { FilterBar } from '../filterBar';
import { filterEstimatesRatings, filterRatings } from '../../util/filterRating';
import Disclaimer from '../Discalimer/Disclaimer';

const ConsensusEstimates: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewState>({ type: 'main' });

    const estimatesData: EstimateData[] = [
        {
            metric: 'Revenue',
            actual: 2292,
            estimates: {
                '2024': { median: 2292, contributors: 0 },
                '2025e': { average: 3048, median: 3048, high: 3048, low: 3048, contributors: 2 },
                '2026e': { average: 3305, median: 3305, high: 3305, low: 3305, contributors: 2 },
                '2027e': { average: 3550, median: 3550, high: 3550, low: 3550, contributors: 2 },
            },
            unit: 'AED Mn',
            date: '2024-12-01',
        },
        {
            metric: 'EBITDA',
            actual: 1579,
            estimates: {
                '2024': { median: 1579, contributors: 0 },
                '2025e': { average: 2103, median: 2103, high: 2123, low: 2082, contributors: 2 },
                '2026e': { average: 2313, median: 2313, high: 2327, low: 2298, contributors: 2 },
                '2027e': { average: 2629, median: 2629, high: 2769, low: 2488, contributors: 2 },
            },
            unit: 'AED Mn',
            date: '2024-12-01',
        },
        {
            metric: 'EBITDA margin',
            actual: 68.9,
            estimates: {
                '2024': { median: 68.9, contributors: 0 },
                '2025e': { average: 69.5, median: 69.5, high: 69.5, low: 69.5, contributors: 2 },
                '2026e': { average: 69.6, median: 69.6, high: 69.6, low: 69.6, contributors: 2 },
                '2027e': { average: 70.2, median: 70.2, high: 70.2, low: 70.2, contributors: 2 },
            },
            unit: '%',
            isPercentage: true,
            date: '2024-12-01',
        },
        {
            metric: 'Finance cost',
            actual: -208,
            estimates: {
                '2024': { median: -208, contributors: 0 },
                '2025e': { average: 31, median: 31, high: 31, low: 31, contributors: 2 },
                '2026e': { average: 56, median: 56, high: 56, low: 56, contributors: 2 },
                '2027e': { average: 88, median: 88, high: 88, low: 88, contributors: 2 },
            },
            unit: 'AED Mn',
            date: '2024-12-01',
        },
        {
            metric: 'Net profit',
            actual: 1165,
            estimates: {
                '2024': { median: 1165, contributors: 0 },
                '2025e': { average: 1567, median: 1567, high: 1567, low: 1567, contributors: 2 },
                '2026e': { average: 1780, median: 1780, high: 1780, low: 1780, contributors: 2 },
                '2027e': { average: 2032, median: 2032, high: 2032, low: 2032, contributors: 2 },
            },
            unit: 'AED Mn',
            date: '2024-12-01',
        },
        {
            metric: 'DPS',
            actual: 0.16,
            estimates: {
                '2024': { median: 0.16, contributors: 0 },
                '2025e': { average: 0.21, median: 0.21, high: 0.21, low: 0.21, contributors: 2 },
                '2026e': { average: 0.24, median: 0.24, high: 0.24, low: 0.24, contributors: 2 },
                '2027e': { average: 0.27, median: 0.27, high: 0.27, low: 0.27, contributors: 2 },
            },
            unit: 'AED',
            date: '2024-12-01',
        },
        {
            metric: 'EPS',
            actual: 0.16,
            estimates: {
                '2024': { median: 0.16, contributors: 0 },
                '2025e': { average: 0.21, median: 0.21, high: 0.21, low: 0.21, contributors: 2 },
                '2026e': { average: 0.24, median: 0.24, high: 0.24, low: 0.24, contributors: 2 },
                '2027e': { average: 0.27, median: 0.27, high: 0.27, low: 0.27, contributors: 2 },
            },
            unit: 'AED',
            date: '2024-12-01',
        },
    ];

    const years = ['2024', '2025e', '2026e', '2027e'];

    const handleChartClick = (metric: string) => {
        setCurrentView({
            type: 'chart',
            metric: metric,
            chartType: 'median'
        });
    };

    const handleColumnClick = (year: string) => {
        setCurrentView({
            type: 'summary',
            year: year
        });
    };

    const handleBackClick = () => {
        setCurrentView({ type: 'main' });
    };

    const formatValue = (value: number | undefined, unit: string, isPercentage?: boolean): string => {
        if (value === undefined) return '-';
        if (isPercentage) return `${value}%`;
        if (unit === 'AED Mn') return value.toLocaleString();
        return value.toString();
    };

    const getChartData = (metric: EstimateData): ChartData[] => {
        return years
            // .filter(year => year !== '2024')
            .map(year => {
                const estimate = metric.estimates[year];
                const value = estimate?.median || 0;
                return { year, value };
            });
    };

 
    const renderMainTable = (filteredData) => (
        <Table.Root variant="outline">
            <Table.Header bg="#008080">
                <Table.Row>
                    <Table.ColumnHeader color="white">
                        Median / actual ({estimatesData[0]?.unit})
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="white" w="120px"></Table.ColumnHeader>

                    {years.map(year => (
                        <Table.ColumnHeader key={year} color="white">
                            {year}
                        </Table.ColumnHeader>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {filteredData.map((metric:EstimateData) => (
                    <Table.Row key={metric.metric}>
                       
                        <Table.Cell>
                            <Text fontWeight="medium">{metric.metric}</Text>
                        </Table.Cell>
                        <Table.Cell>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleChartClick(metric.metric)}
                                p={1}
                            >
                                <MdBarChart size={18} />
                            </Button>
                        </Table.Cell>
                        {years.map(year => (
                            <Table.Cell key={year}>
                                <Flex align="center" gap={2}>
                                    
                                    <Text onClick={() => handleColumnClick(year)}>
                                        {year === '2024'
                                            ? formatValue(metric.actual, metric.unit, metric.isPercentage)
                                            : formatValue(metric.estimates[year]?.median, metric.unit, metric.isPercentage)
                                        }
                                    </Text>
                                </Flex>
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );

  
    const renderChartView = () => {
        const metric = estimatesData.find(m => m.metric === currentView.metric);
        if (!metric) return null;

        return (
            <Box w="full">
             
                <Table.Root variant="outline" mb={6}>
                    <Table.Header bg="#008080">
                        <Table.Row>
                            <Table.ColumnHeader color="white">
                                {metric.metric} ({metric.unit})
                            </Table.ColumnHeader>
                            {years.map(year => (
                                <Table.ColumnHeader key={year} color="white">
                                    {year}
                                </Table.ColumnHeader>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell fontWeight="semibold">Actual</Table.Cell>
                            <Table.Cell>
                                {formatValue(metric.actual, metric.unit, metric.isPercentage)}
                            </Table.Cell>
                            <Table.Cell>-</Table.Cell>
                            <Table.Cell>-</Table.Cell>
                            <Table.Cell>-</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell fontWeight="semibold">Average</Table.Cell>
                            <Table.Cell>-</Table.Cell>
                            {years.filter(year => year !== '2024').map(year => (
                                <Table.Cell key={year}>
                                    {formatValue(metric.estimates[year]?.average, metric.unit, metric.isPercentage)}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell fontWeight="semibold">Median</Table.Cell>
                            <Table.Cell>-</Table.Cell>
                            {years.filter(year => year !== '2024').map(year => (
                                <Table.Cell key={year}>
                                    {formatValue(metric.estimates[year]?.median, metric.unit, metric.isPercentage)}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell fontWeight="semibold">High</Table.Cell>
                            <Table.Cell>-</Table.Cell>
                            {years.filter(year => year !== '2024').map(year => (
                                <Table.Cell key={year}>
                                    {formatValue(metric.estimates[year]?.high, metric.unit, metric.isPercentage)}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell fontWeight="semibold">Low</Table.Cell>
                            <Table.Cell>-</Table.Cell>
                            {years.filter(year => year !== '2024').map(year => (
                                <Table.Cell key={year}>
                                    {formatValue(metric.estimates[year]?.low, metric.unit, metric.isPercentage)}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell fontWeight="semibold">Contributors</Table.Cell>
                            {years.map(year => (
                                <Table.Cell key={year}>
                                    {metric.estimates[year]?.contributors || 0}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    </Table.Body>
                </Table.Root>

               
                <Box h="400px" w="full" bg="white" p={4} borderRadius="md" border="1px solid" borderColor="gray.200">
                    <Text fontSize="md" fontWeight="semibold" mb={4} textAlign="center">
                        {metric.metric} ({metric.unit}, median)
                    </Text>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getChartData(metric)}>
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip
                                formatter={(value: any) => [
                                    formatValue(value, metric.unit, metric.isPercentage),
                                    'Median'
                                ]}
                            />
                            <Bar dataKey="value" fill="#008080" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        );
    };

    
    const renderSummaryView = () => {
        const year = currentView.year;
        if (!year ) return null;

        return (
            <Table.Root variant="outline">
                <Table.Header bg="#008080">
                    <Table.Row>
                        <Table.ColumnHeader color="white">Metric</Table.ColumnHeader>
                        <Table.ColumnHeader color="white">Average</Table.ColumnHeader>
                        <Table.ColumnHeader color="white">Median</Table.ColumnHeader>
                        <Table.ColumnHeader color="white">High</Table.ColumnHeader>
                        <Table.ColumnHeader color="white">Low</Table.ColumnHeader>
                        <Table.ColumnHeader color="white">Contr.</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {estimatesData.map((metric) => (
                        <Table.Row key={metric.metric}>
                            <Table.Cell fontWeight="medium">{metric.metric}</Table.Cell>
                            <Table.Cell>
                                {formatValue(metric.estimates[year]?.average, metric.unit, metric.isPercentage)}
                            </Table.Cell>
                            <Table.Cell>
                                {formatValue(metric.estimates[year]?.median, metric.unit, metric.isPercentage)}
                            </Table.Cell>
                            <Table.Cell>
                                {formatValue(metric.estimates[year]?.high, metric.unit, metric.isPercentage)}
                            </Table.Cell>
                            <Table.Cell>
                                {formatValue(metric.estimates[year]?.low, metric.unit, metric.isPercentage)}
                            </Table.Cell>
                            <Table.Cell>
                                {metric.estimates[year]?.contributors || 0}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        );
    };


    const [filteredData, setFilteredData] = useState<EstimateData[]>(estimatesData);
    const [filter, setFilter] = useState<RatingFilter>({ filterType: '14_days' });




  const applyFilter = () => {
        const newData = filterEstimatesRatings(estimatesData, filter);
        setFilteredData(newData);
    };
    return (
        <Box w="full" p={4}>
           
            <Flex justify="space-between" align="center" mb={4}>
                {currentView.type !== 'main' ? (
                    <Button
                        variant="subtle"
                        backgroundColor="#008080"
                        color="white"
                        size="sm"
                        onClick={handleBackClick}
                        
                    >
                        <MdArrowBack /> Back to Main view
                    </Button>
                ) : (
                    <span></span>
                )}
                <Text fontSize="sm" color="gray.600">
                    Last data input: Jun 13, 2025
                </Text>
            </Flex>

            {currentView.type === 'main' && renderMainTable(filteredData)}
            {currentView.type === 'chart' && renderChartView()}
            {currentView.type === 'summary' && renderSummaryView()}

            <FilterBar filter={filter} onChange={setFilter} onApply={applyFilter} />
            <Disclaimer />
        </Box>
    );
};

export default ConsensusEstimates;