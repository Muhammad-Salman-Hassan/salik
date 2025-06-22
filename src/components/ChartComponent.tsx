import React, { useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,

    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    ComposedChart,
    Brush
} from "recharts";
import { Box, Checkbox, HStack, Text } from '@chakra-ui/react';

const COLORS = ['#4a5568', '#1a365d', '#38a169', '#d69e2e', '#e53e3e', '#805ad5', '#dd6b20', '#319795'];

const formatTooltipValue = (value: any, format?: string): string => {
    if (format === 'currency') return `AED ${value}M`;
    if (format === 'percentage') return `${value}%`;
    return value.toString();
};

export type ChartType = 'line' | 'bar' | 'area' | 'pie';

export interface ChartConfig {
    title: string;
    dataKey: string;
    color: string;
    format?: 'currency' | 'percentage' | 'number';
}

export interface ChartProps {
    data: any[];
    configs: ChartConfig[];
    type: ChartType;
    title: string;
    height?: number;
}

export const ChartComponent: React.FC<ChartProps> = ({
    data,
    configs,
    type,
    title,
    height = 400
}) => {
    const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>(
        configs.reduce((acc, config) => ({ ...acc, [config.dataKey]: true }), {})
    );

    const toggleSeries = (dataKey: string) => {
        setVisibleSeries(prev => ({
            ...prev,
            [dataKey]: !prev[dataKey]
        }));
    };

    // Separate configs by format for dual-axis rendering
    const currencyConfigs = configs.filter(config => config.format === 'currency');
    const percentageConfigs = configs.filter(config => config.format === 'percentage');
    const numberConfigs = configs.filter(config => config.format === 'number');

    const CustomLegend = () => (
        <Box mt={4}>
            <HStack gap={6} justify="center" wrap="wrap">
                {configs.map((config, index) => (
                    <Checkbox.Root
                        key={config.dataKey}
                        checked={visibleSeries[config.dataKey]}
                        onCheckedChange={() => toggleSeries(config.dataKey)}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <HStack gap={2}>
                            <Box
                                w={3}
                                h={3}
                                bg={config.color || COLORS[index % COLORS.length]}
                                borderRadius="sm"
                            />
                            <Checkbox.Label fontSize="sm" color="gray.700">
                                {config.title}
                            </Checkbox.Label>
                        </HStack>
                    </Checkbox.Root>
                ))}
            </HStack>
        </Box>
    );

    const renderChart = () => {
        const hasPercentages = percentageConfigs.length > 0;
        const hasCurrency = currencyConfigs.length > 0;
        const needsDualAxis = hasPercentages && (hasCurrency || numberConfigs.length > 0);

        switch (type) {
            case 'line':
                if (needsDualAxis) {
                    return (
                        <ComposedChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="period"
                                stroke="#718096"
                                fontSize={12}
                                height={60}
                            />
                            <YAxis
                                yAxisId="left"
                                stroke="#718096"
                                fontSize={12}
                                label={{
                                    value: 'AED million',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { textAnchor: 'middle', fontSize: '12px' }
                                }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#718096"
                                fontSize={12}
                                label={{
                                    value: '%',
                                    angle: 90,
                                    position: 'insideRight',
                                    style: { textAnchor: 'middle', fontSize: '12px' }
                                }}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                                formatter={(value, name) => {
                                    const config = configs.find(c => c.dataKey === name);
                                    return [formatTooltipValue(value, config?.format), config?.title || name];
                                }}
                            />

                            {/* Currency and Number lines on left axis */}
                            {[...currencyConfigs, ...numberConfigs].map((config, index) =>
                                visibleSeries[config.dataKey] && (
                                    <Line
                                        key={config.dataKey}
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey={config.dataKey}
                                        stroke={config.color || COLORS[index % COLORS.length]}
                                        strokeWidth={2}
                                        dot={{ fill: config.color || COLORS[index % COLORS.length], strokeWidth: 2, r: 4 }}
                                        name={config.title}
                                    />
                                )
                            )}

                            {/* Percentage lines on right axis */}
                            {percentageConfigs.map((config, index) =>
                                visibleSeries[config.dataKey] && (
                                    <Line
                                        key={config.dataKey}
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey={config.dataKey}
                                        stroke={config.color || COLORS[(currencyConfigs.length + numberConfigs.length + index) % COLORS.length]}
                                        strokeWidth={2}
                                        dot={{ fill: config.color || COLORS[(currencyConfigs.length + numberConfigs.length + index) % COLORS.length], strokeWidth: 2, r: 4 }}
                                        name={config.title}
                                    />
                                )
                            )}
                            <Brush dataKey="period" height={30} stroke="#008080" />

                        </ComposedChart>
                    );
                } else {
                    return (
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="period"
                                stroke="#718096"
                                fontSize={12}
                                height={60}
                            />
                            <YAxis stroke="#718096" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                                formatter={(value, name) => {
                                    const config = configs.find(c => c.dataKey === name);
                                    return [formatTooltipValue(value, config?.format), config?.title || name];
                                }}
                            />

                            {configs.map((config, index) =>
                                visibleSeries[config.dataKey] && (
                                    <Line
                                        key={config.dataKey}
                                        type="monotone"
                                        dataKey={config.dataKey}
                                        stroke={config.color || COLORS[index % COLORS.length]}
                                        strokeWidth={2}
                                        dot={{ fill: config.color || COLORS[index % COLORS.length], strokeWidth: 2, r: 4 }}
                                        name={config.title}
                                    />
                                )
                            )}
                            <Brush dataKey="period" height={30} stroke="#008080" />

                        </LineChart>
                    );
                }

            case 'bar':
                if (needsDualAxis) {
                    return (
                        <ComposedChart data={data} barCategoryGap="20%">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="period"
                                stroke="#718096"
                                fontSize={11}
                                height={60}
                                interval={0}
                            />
                            <YAxis
                                yAxisId="left"
                                stroke="#718096"
                                fontSize={12}
                                label={{
                                    value: 'AED million',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { textAnchor: 'middle', fontSize: '12px' }
                                }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#718096"
                                fontSize={12}
                                label={{
                                    value: '%',
                                    angle: 90,
                                    position: 'insideRight',
                                    style: { textAnchor: 'middle', fontSize: '12px' }
                                }}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                                formatter={(value, name) => {
                                    const config = configs.find(c => c.dataKey === name);
                                    return [formatTooltipValue(value, config?.format), config?.title || name];
                                }}
                            />

                            {/* Currency and Number bars on left axis */}
                            {[...currencyConfigs, ...numberConfigs].map((config, index) =>
                                visibleSeries[config.dataKey] && (
                                    <Bar
                                        key={config.dataKey}
                                        yAxisId="left"
                                        dataKey={config.dataKey}
                                        fill={config.color || COLORS[index % COLORS.length]}
                                        name={config.title}
                                        radius={[2, 2, 0, 0]}
                                    />
                                )
                            )}

                            {/* Percentage lines on right axis */}
                            {percentageConfigs.map((config, index) =>
                                visibleSeries[config.dataKey] && (
                                    <Line
                                        key={config.dataKey}
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey={config.dataKey}
                                        stroke={config.color || COLORS[(currencyConfigs.length + numberConfigs.length + index) % COLORS.length]}
                                        strokeWidth={3}
                                        dot={{ fill: config.color || COLORS[(currencyConfigs.length + numberConfigs.length + index) % COLORS.length], strokeWidth: 2, r: 4 }}
                                        name={config.title}
                                    />
                                )
                            )}
                            <Brush dataKey="period" height={30} stroke="#008080" />

                        </ComposedChart>
                    );
                } else {
                    return (
                        <BarChart data={data} barCategoryGap="20%">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="period"
                                stroke="#718096"
                                fontSize={11}
                                height={60}
                                interval={0}
                            />
                            <YAxis stroke="#718096" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                                formatter={(value, name) => {
                                    const config = configs.find(c => c.dataKey === name);
                                    return [formatTooltipValue(value, config?.format), config?.title || name];
                                }}
                            />

                            {configs.map((config, index) =>
                                visibleSeries[config.dataKey] && (
                                    <Bar
                                        key={config.dataKey}
                                        dataKey={config.dataKey}
                                        fill={config.color || COLORS[index % COLORS.length]}
                                        name={config.title}
                                        radius={[2, 2, 0, 0]}
                                    />
                                )
                            )}
                        <Brush dataKey="period" height={30} stroke="#008080" />

                        </BarChart>
                    );
                }

            case 'area':
                if (needsDualAxis) {
                    return (
                        <ComposedChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="period"
                                stroke="#718096"
                                fontSize={12}
                                height={60}
                            />
                            <YAxis
                                yAxisId="left"
                                stroke="#718096"
                                fontSize={12}
                                label={{
                                    value: 'AED million',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { textAnchor: 'middle', fontSize: '12px' }
                                }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#718096"
                                fontSize={12}
                                label={{
                                    value: '%',
                                    angle: 90,
                                    position: 'insideRight',
                                    style: { textAnchor: 'middle', fontSize: '12px' }
                                }}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                                formatter={(value, name) => {
                                    const config = configs.find(c => c.dataKey === name);
                                    return [formatTooltipValue(value, config?.format), config?.title || name];
                                }}
                            />

                            {/* Currency and Number areas on left axis */}
                            {[...currencyConfigs, ...numberConfigs].map((config, index) =>
                                visibleSeries[config.dataKey] && (
                                    <Area
                                        key={config.dataKey}
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey={config.dataKey}
                                        stackId="1"
                                        stroke={config.color || COLORS[index % COLORS.length]}
                                        fill={config.color || COLORS[index % COLORS.length]}
                                        fillOpacity={0.3}
                                        name={config.title}
                                    />
                                )
                            )}

                            {/* Percentage lines on right axis */}
                            {percentageConfigs.map((config, index) =>
                                visibleSeries[config.dataKey] && (
                                    <Line
                                        key={config.dataKey}
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey={config.dataKey}
                                        stroke={config.color || COLORS[(currencyConfigs.length + numberConfigs.length + index) % COLORS.length]}
                                        strokeWidth={2}
                                        dot={{ fill: config.color || COLORS[(currencyConfigs.length + numberConfigs.length + index) % COLORS.length], strokeWidth: 2, r: 4 }}
                                        name={config.title}
                                    />
                                )
                            )}
                            <Brush dataKey="period" height={30} stroke="#008080" />

                        </ComposedChart>
                    );
                } else {
                    return (
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="period"
                                stroke="#718096"
                                fontSize={12}
                                height={60}
                            />
                            <YAxis stroke="#718096" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                                formatter={(value, name) => {
                                    const config = configs.find(c => c.dataKey === name);
                                    return [formatTooltipValue(value, config?.format), config?.title || name];
                                }}
                            />

                            {configs.map((config, index) =>
                                visibleSeries[config.dataKey] && (
                                    <Area
                                        key={config.dataKey}
                                        type="monotone"
                                        dataKey={config.dataKey}
                                        stackId="1"
                                        stroke={config.color || COLORS[index % COLORS.length]}
                                        fill={config.color || COLORS[index % COLORS.length]}
                                        fillOpacity={0.3}
                                        name={config.title}
                                    />
                                )
                            )}
                            <Brush dataKey="period" height={30} stroke="#008080" />

                        </AreaChart>
                    );
                }


            default:
                return null;
        }
    };

    return (
        <Box
            bg="white"
            borderRadius="12px"
            p={6}
            boxShadow="0 4px 20px rgba(0,0,0,0.1)"
            m={5}
        >
            <Text
                mb={5}
                color="gray.800"
                fontSize="xl"
                fontWeight="600"
            >
                {title}
            </Text>

            <Box h={`${height}px`}>
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </Box>

            <CustomLegend />
        </Box>
    );
};