import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Input,
  Table,
  Checkbox,
  RadioGroup,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  ComposedChart,
  Area,
  AreaChart,
} from 'recharts';

// Types
interface StockDataPoint {
  date: string;
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma10?: number | null;
  ma20?: number | null;
  ma50?: number | null;
}

interface StockInfo {
  symbol: string;
  name: string;
  last: number;
  high: number;
  low: number;
  change: number;
  changePercent: number;
  bid: number;
  ask: number;
  volume: number;
}

interface ChartControls {
  timeRange: '1day' | '5days' | '3months' | '6months' | '1year' | '3years' | 'custom';
  customStartDate?: string;
  customEndDate?: string;
  chartType: 'line' | 'bar' | 'candlestick' | 'mountain';
  showVolume: boolean;
  showMovingAverages: {
    ma10: boolean;
    ma20: boolean;
    ma50: boolean;
  };
  indicators: {
    earnings: boolean;
    pressReleases: boolean;
    periodHighLow: boolean;
    percentView: boolean;
  };
  lowerGraphs: {
    hideShowVolume: boolean;
    dailyChange: boolean;
  };
  indices: {
    dfmIndustrials: boolean;
    dfmGeneralIndex: boolean;
  };
}

const StockChart: React.FC = () => {
  const [stockInfo] = useState<StockInfo>({
    symbol: 'Salik',
    name: 'Salik',
    last: 5.51,
    high: 5.59,
    low: 5.47,
    change: -0.09,
    changePercent: -1.61,
    bid: 5.50,
    ask: 5.51,
    volume: 5151734
  });

  const [controls, setControls] = useState<ChartControls>({
    timeRange: '6months',
    chartType: 'line',
    showVolume: true,
    showMovingAverages: {
      ma10: false,
      ma20: false,
      ma50: false
    },
    indicators: {
      earnings: false,
      pressReleases: false,
      periodHighLow: false,
      percentView: false
    },
    lowerGraphs: {
      hideShowVolume: true,
      dailyChange: false
    },
    indices: {
      dfmIndustrials: false,
      dfmGeneralIndex: false
    }
  });


  const stockData: StockDataPoint[] = [
    { date: "20/5", timestamp: new Date("2025-05-20T10:00:00Z"), open: 5.10, high: 5.15, low: 5.05, close: 5.12, volume: 3200000 },
    { date: "21/5", timestamp: new Date("2025-05-21T10:00:00Z"), open: 5.12, high: 5.18, low: 5.10, close: 5.14, volume: 4100000 },
    { date: "22/5", timestamp: new Date("2025-05-22T10:00:00Z"), open: 5.14, high: 5.20, low: 5.11, close: 5.17, volume: 3800000 },
    { date: "23/5", timestamp: new Date("2025-05-23T10:00:00Z"), open: 5.17, high: 5.22, low: 5.13, close: 5.16, volume: 2900000 },
    { date: "24/5", timestamp: new Date("2025-05-24T10:00:00Z"), open: 5.16, high: 5.19, low: 5.10, close: 5.11, volume: 3300000 },
    { date: "25/5", timestamp: new Date("2025-05-25T10:00:00Z"), open: 5.11, high: 5.18, low: 5.08, close: 5.15, volume: 3600000 },
    { date: "26/5", timestamp: new Date("2025-05-26T10:00:00Z"), open: 5.15, high: 5.20, low: 5.12, close: 5.18, volume: 3000000 },
    { date: "27/5", timestamp: new Date("2025-05-27T10:00:00Z"), open: 5.18, high: 5.22, low: 5.16, close: 5.19, volume: 4100000 },
    { date: "28/5", timestamp: new Date("2025-05-28T10:00:00Z"), open: 5.19, high: 5.24, low: 5.15, close: 5.20, volume: 3900000 },
    { date: "29/5", timestamp: new Date("2025-05-29T10:00:00Z"), open: 5.20, high: 5.23, low: 5.17, close: 5.21, volume: 3500000 },
    { date: "30/5", timestamp: new Date("2025-05-30T10:00:00Z"), open: 5.21, high: 5.25, low: 5.19, close: 5.23, volume: 3700000 },
    { date: "31/5", timestamp: new Date("2025-05-31T10:00:00Z"), open: 5.23, high: 5.26, low: 5.20, close: 5.24, volume: 3400000 },
    { date: "1/6", timestamp: new Date("2025-06-01T10:00:00Z"), open: 5.24, high: 5.28, low: 5.22, close: 5.27, volume: 3900000 },
    { date: "2/6", timestamp: new Date("2025-06-02T10:00:00Z"), open: 5.27, high: 5.30, low: 5.23, close: 5.25, volume: 3100000 },
    { date: "3/6", timestamp: new Date("2025-06-03T10:00:00Z"), open: 5.25, high: 5.29, low: 5.20, close: 5.21, volume: 3800000 },
    { date: "4/6", timestamp: new Date("2025-06-04T10:00:00Z"), open: 5.21, high: 5.22, low: 5.15, close: 5.18, volume: 4000000 },
    { date: "5/6", timestamp: new Date("2025-06-05T10:00:00Z"), open: 5.18, high: 5.20, low: 5.14, close: 5.16, volume: 2900000 },
    { date: "6/6", timestamp: new Date("2025-06-06T10:00:00Z"), open: 5.16, high: 5.19, low: 5.13, close: 5.17, volume: 3100000 },
    { date: "7/6", timestamp: new Date("2025-06-07T10:00:00Z"), open: 5.17, high: 5.22, low: 5.15, close: 5.20, volume: 2700000 },
    { date: "8/6", timestamp: new Date("2025-06-08T10:00:00Z"), open: 5.20, high: 5.23, low: 5.18, close: 5.21, volume: 3500000 },
    { date: "9/6", timestamp: new Date("2025-06-09T10:00:00Z"), open: 5.21, high: 5.25, low: 5.20, close: 5.23, volume: 3900000 },
    { date: "10/6", timestamp: new Date("2025-06-10T10:00:00Z"), open: 5.23, high: 5.27, low: 5.22, close: 5.25, volume: 4200000 },
    { date: "11/6", timestamp: new Date("2025-06-11T10:00:00Z"), open: 5.25, high: 5.28, low: 5.24, close: 5.27, volume: 3300000 },
    { date: "12/6", timestamp: new Date("2025-06-12T10:00:00Z"), open: 5.27, high: 5.30, low: 5.25, close: 5.28, volume: 4100000 },
    { date: "13/6", timestamp: new Date("2025-06-13T10:00:00Z"), open: 5.28, high: 5.31, low: 5.26, close: 5.29, volume: 2900000 },
    { date: "14/6", timestamp: new Date("2025-06-14T10:00:00Z"), open: 5.29, high: 5.32, low: 5.27, close: 5.30, volume: 3600000 },
    { date: "15/6", timestamp: new Date("2025-06-15T10:00:00Z"), open: 5.30, high: 5.34, low: 5.29, close: 5.33, volume: 3000000 },
    { date: "16/6", timestamp: new Date("2025-06-16T10:00:00Z"), open: 5.33, high: 5.36, low: 5.31, close: 5.35, volume: 3200000 },
    { date: "17/6", timestamp: new Date("2025-06-17T10:00:00Z"), open: 5.35, high: 5.39, low: 5.34, close: 5.38, volume: 3700000 },
    { date: "18/6", timestamp: new Date("2025-06-18T10:00:00Z"), open: 5.38, high: 5.40, low: 5.36, close: 5.39, volume: 3900000 }
  ];
  
  

  // Calculate moving averages
  const calculateMovingAverage = (data: StockDataPoint[], period: number) => {
    return data.map((point, index) => {
      if (index < period - 1) return { ...point, ma: null };
      
      const sum = data.slice(index - period + 1, index + 1)
        .reduce((acc, curr) => acc + curr.close, 0);
      
      return { ...point, ma: sum / period };
    });
  };

  const dataWithMA = useMemo(() => {
    let result = stockData;
    
    if (controls.showMovingAverages.ma10) {
      const ma10Data = calculateMovingAverage(stockData, 10);
      result = result.map((point, i) => ({ ...point, ma10: ma10Data[i].ma }));
    }
    
    if (controls.showMovingAverages.ma20) {
      const ma20Data = calculateMovingAverage(stockData, 20);
      result = result.map((point, i) => ({ ...point, ma20: ma20Data[i].ma }));
    }
    
    if (controls.showMovingAverages.ma50) {
      const ma50Data = calculateMovingAverage(stockData, 50);
      result = result.map((point, i) => ({ ...point, ma50: ma50Data[i].ma }));
    }
    
    return result;
  }, [stockData, controls.showMovingAverages]);

  const updateControl = (key: keyof ChartControls, value: any) => {
    console.log(key,value)
    setControls(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateNestedControl = (parent: string, key: string, value: boolean) => {
    setControls(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof ChartControls],
        [key]: value
      }
    }));
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box bg="white" p={3} borderRadius="md" boxShadow="lg" border="1px solid" borderColor="gray.200">
          <Text fontWeight="bold" mb={1}>{label}</Text>
          <Text fontSize="sm">Open: {data.open?.toFixed(2)}</Text>
          <Text fontSize="sm">High: {data.high?.toFixed(2)}</Text>
          <Text fontSize="sm">Low: {data.low?.toFixed(2)}</Text>
          <Text fontSize="sm">Close: {data.close?.toFixed(2)}</Text>
          <Text fontSize="sm">Volume: {data.volume?.toLocaleString()}</Text>
        </Box>
      );
    }
    return null;
  };

  const renderChart = () => {
    const ChartComponent = controls.chartType === 'mountain' ? 
      ComposedChart : 
      controls.chartType === 'bar' ? 
        BarChart : 
        LineChart;

    return (
      <ChartComponent data={dataWithMA}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} tick={{ fontSize: 11 }} />
        <Tooltip content={<CustomTooltip />} />
        
        {/* Render chart elements based on type */}
        {controls.chartType === 'mountain' && (
          <Area
            type="monotone"
            dataKey="close"
            stroke="#4A5568"
            fill="#E2E8F0"
            fillOpacity={0.6}
          />
        )}
        
        {controls.chartType === 'bar' && (
          <Bar dataKey="close" fill="#4A5568" />
        )}
        
        {(controls.chartType === 'line' || controls.chartType === 'candlestick') && (
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#4A5568" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 4 }}
          />
        )}
        
        {/* Moving averages for all chart types */}
        {controls.showMovingAverages.ma10 && (
          <Line type="monotone" dataKey="ma10" stroke="#FF6B6B" strokeWidth={1} dot={false} />
        )}
        {controls.showMovingAverages.ma20 && (
          <Line type="monotone" dataKey="ma20" stroke="#4ECDC4" strokeWidth={1} dot={false} />
        )}
        {controls.showMovingAverages.ma50 && (
          <Line type="monotone" dataKey="ma50" stroke="#45B7D1" strokeWidth={1} dot={false} />
        )}
      </ChartComponent>
    );
  };

  return (
    <Box w="full" p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>Stock information</Text>
      
    

      {/* Date & Time */}
      <Text fontSize="sm" color="gray.600" mb={4}>
        Date & Time: 18 June 2025 13:58 (GMT+04:00)
      </Text>

      {/* Stock Info Table */}
      <Box mb={6} overflowX="auto">
        <Table.Root variant="outline" size="sm">
          <Table.Header bg="#53565a">
            <Table.Row>
              <Table.ColumnHeader color="white">Share (AED)</Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">Last</Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">High</Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">Low</Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">(+/-)</Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">%</Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">Bid</Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">Ask</Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">Volume</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{stockInfo.name}</Table.Cell>
              <Table.Cell textAlign="center">{stockInfo.last}</Table.Cell>
              <Table.Cell textAlign="center">{stockInfo.high}</Table.Cell>
              <Table.Cell textAlign="center">{stockInfo.low}</Table.Cell>
              <Table.Cell textAlign="center" color="red.500">
                {stockInfo.change.toFixed(2)}▼
              </Table.Cell>
              <Table.Cell textAlign="center" color="red.500">
                {stockInfo.changePercent.toFixed(2)}▼
              </Table.Cell>
              <Table.Cell textAlign="center">{stockInfo.bid}</Table.Cell>
              <Table.Cell textAlign="center">{stockInfo.ask}</Table.Cell>
              <Table.Cell textAlign="center">
                {stockInfo.volume.toLocaleString()}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>

     

      {/* Time Range Controls */}
      <RadioGroup.Root
        value={controls.timeRange}
        onValueChange={(details) => updateControl('timeRange', details.value)}
      >
        <Flex align="center" gap={4} mb={4} wrap="wrap">
          {[
            { value: '1day', label: '1 day' },
            { value: '5days', label: '5 days' },
            { value: '3months', label: '3 months' },
            { value: '6months', label: '6 months' },
            { value: '1year', label: '1 year' },
            { value: '3years', label: '3 years' },
            { value: 'custom', label: 'Custom range' }
          ].map(option => (
            <RadioGroup.Item key={option.value} value={option.value}>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText fontSize="sm">{option.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </Flex>
      </RadioGroup.Root>

      {/* Stock Price Info */}
      <Box mb={4} p={2} bg="gray.50" borderRadius="md">
        <Text fontSize="sm">
          22/05/2025 <Text as="span" fontWeight="bold">■ Salik</Text> Open: 
          <Text as="span" fontWeight="bold">5.50</Text> | High: 
          <Text as="span" fontWeight="bold">5.65</Text> | Low: 
          <Text as="span" fontWeight="bold">5.47</Text> | Close: 
          <Text as="span" fontWeight="bold">5.60</Text>
        </Text>
      </Box>

      {/* Main Chart */}
      <Box h="400px" mb={4} border="1px solid" borderColor="gray.200" borderRadius="md" p={2}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </Box>

      {/* Volume Chart with Brush for Main Chart Interaction */}
      {controls.lowerGraphs.hideShowVolume && (
        <Box h="150px" mb={4} border="1px solid" borderColor="gray.200" borderRadius="md" p={2}>
          <Text fontSize="sm" mb={2}>Volume (shares): 12,128,862</Text>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
              data={stockData}
              onMouseMove={(state: any) => {
                if (state && state.activeTooltipIndex !== undefined) {
                  // You can add interaction logic here if needed
                  // This simulates the volume chart affecting the main chart
                }
              }}
            >
              <CartesianGrid strokeDasharray="2 2" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                formatter={(value: any) => [value?.toLocaleString(), 'Volume']}
                labelStyle={{ color: '#333' }}
              />
              
              {/* Volume bars */}
              <Bar 
                dataKey="volume" 
                fill="#4A5568" 
                fillOpacity={0.7}
                stroke="#4A5568"
                strokeWidth={1}
              />
              
              {/* Mini price line overlay */}
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#E53E3E" 
                strokeWidth={1} 
                dot={false}
                yAxisId="right"
              />
              
              {/* Right Y-axis for price overlay */}
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fontSize: 9 }} 
                domain={['dataMin - 0.1', 'dataMax + 0.1']}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      )}

      {/* Action Buttons */}
      <Flex gap={2} mb={4}>
        <Button bg="#53565a" color="white" size="sm">Detach Graph</Button>
        <Button bg="#53565a" color="white" size="sm">Download to Excel</Button>
        <Button bg="#53565a" color="white" size="sm">Print</Button>
      </Flex>

      {/* Controls Panel */}
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
        {/* Indicators */}
        <Box>
          <Text fontWeight="bold" mb={2}>Indicators</Text>
          <VStack align="start" gap={1}>
            {Object.entries(controls.indicators).map(([key, value]) => (
              <Checkbox.Root
                key={key}
                checked={value}
                onCheckedChange={(details) => updateNestedControl('indicators', key, details.checked)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label fontSize="sm" textTransform="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Checkbox.Label>
              </Checkbox.Root>
            ))}
          </VStack>
        </Box>

        {/* Moving Averages */}
        <Box>
          <Text fontWeight="bold" mb={2}>Moving averages</Text>
          <VStack align="start" gap={1}>
            {Object.entries(controls.showMovingAverages).map(([key, value]) => (
              <Checkbox.Root
                key={key}
                checked={value}
                onCheckedChange={(details) => updateNestedControl('showMovingAverages', key, details.checked)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label fontSize="sm">{key.replace('ma', '')} days</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </VStack>
          <Input placeholder="Insert period" size="sm" mt={2} />
        </Box>

        {/* Diagram Type */}
        <Box>
          <Text fontWeight="bold" mb={2}>Diagram type</Text>
          <RadioGroup.Root
            value={controls.chartType}
            onValueChange={(details) => updateControl('chartType', details.value)}
          >
            <VStack align="start" gap={1}>
              {[
                { value: 'line', label: 'Line Graph' },
                { value: 'bar', label: 'Bar' },
                { value: 'candlestick', label: 'Candlestick' },
                { value: 'mountain', label: 'Mountain' }
              ].map(option => (
                <RadioGroup.Item key={option.value} value={option.value}>
                  <RadioGroup.ItemIndicator />
                  
                  <RadioGroup.ItemText fontSize="sm">{option.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </VStack>
          </RadioGroup.Root>
        </Box>

        {/* Lower Graphs & Indices */}
        <Box>
          <Text fontWeight="bold" mb={2}>Lower graphs</Text>
          <VStack align="start" gap={1}>
            {Object.entries(controls.lowerGraphs).map(([key, value]) => (
              <Checkbox.Root
                key={key}
                checked={value}
                onCheckedChange={(details) => updateNestedControl('lowerGraphs', key, details.checked)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label fontSize="sm" textTransform="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Checkbox.Label>
              </Checkbox.Root>
            ))}
          </VStack>
          
          <Text fontWeight="bold" mt={4} mb={2}>Indices</Text>
          <VStack align="start" gap={1}>
            {Object.entries(controls.indices).map(([key, value]) => (
              <Checkbox.Root
                key={key}
                checked={value}
                onCheckedChange={(details) => updateNestedControl('indices', key, details.checked)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label fontSize="sm">
                  {key === 'dfmIndustrials' ? 'DFM Industrials' : 'DFM General Index'}
                </Checkbox.Label>
              </Checkbox.Root>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default StockChart;