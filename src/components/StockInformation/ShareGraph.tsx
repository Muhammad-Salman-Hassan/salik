import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Checkbox,
  RadioGroup,
  Input,
  Grid,
  GridItem,
  Card,
  HStack,
  VStack,

  Circle,
  SimpleGrid
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,

  ResponsiveContainer,
  Brush,
  ReferenceLine,

} from 'recharts';


interface StockData {
  date: string;
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface MovingAverageData extends StockData {
  ma10?: number;
  ma20?: number;
  ma50?: number;
  change?: number;
  changePercent?: number;
  earnings?: boolean;
  pressRelease?: boolean;
  dfmIndustrials?: number;
  dfmGeneralIndex?: number;
}

interface ChartConfig {
  earnings: boolean;
  pressReleases: boolean;
  periodHighLow: boolean;
  percentView: boolean;
  ma10: boolean;
  ma20: boolean;
  ma50: boolean;
  hideVolume: boolean;
  dailyChange: boolean;
  dfmIndustrials: boolean;
  dfmGeneralIndex: boolean;
}

interface TooltipData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change?: number;
  changePercent?: number;
  dfmIndustrials?: number;
  dfmGeneralIndex?: number;
}

interface ShareGraphProps {
  stockData: StockData[];
  earningsData?: string[];
  pressReleaseData?: string[];
}


const diagramTypeOptions = [
  { label: "Line Graph", value: "line" },
  { label: "Mountain", value: "mountain" }
];

const ShareGraph: React.FC<ShareGraphProps> = ({
  stockData,
  earningsData = [],
  pressReleaseData = []
}) => {
  // State management
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    earnings: true,
    pressReleases: false,
    periodHighLow: false,
    percentView: false,
    ma10: true,
    ma20: true,
    ma50: false,
    hideVolume: true,
    dailyChange: true,
    dfmIndustrials: false,
    dfmGeneralIndex: false
  });

  const [diagramType, setDiagramType] = useState<string>('line');
  const [customPeriod, setCustomPeriod] = useState<string>('');
  const [hoveredData, setHoveredData] = useState<TooltipData | null>(null);
  const [syncedHover, setSyncedHover] = useState<string | null>(null);
  const [brushRange, setBrushRange] = useState<{ startIndex?: number, endIndex?: number }>({});


  const bgColor = 'white';
  const textColor = 'gray.800';

  // Calculate period high/low
  const periodHighLow = useMemo(() => {
    const prices = stockData.map(d => d.close);
    return {
      high: Math.max(...prices),
      low: Math.min(...prices)
    };
  }, [stockData]);

  // Calculate moving averages
  const calculateMovingAverage = useCallback((data: StockData[], period: number): number[] => {
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        result.push(0);
      } else {
        const sum = data.slice(i - period + 1, i + 1).reduce((acc, item) => acc + item.close, 0);
        result.push(parseFloat((sum / period).toFixed(3)));
      }
    }
    return result;
  }, []);

  // Generate DFM data 
  const generateDFMData = useCallback((baseData: StockData[], variation: number) => {
    return baseData.map((item, index) => {
      const baseValue = item.close;
      const randomFactor = 1 + (Math.random() - 0.5) * variation;
      return parseFloat((baseValue * randomFactor).toFixed(3));
    });
  }, []);


  const enhancedData = useMemo((): MovingAverageData[] => {
    const ma10Values = calculateMovingAverage(stockData, 10);
    const ma20Values = calculateMovingAverage(stockData, 20);
    const ma50Values = calculateMovingAverage(stockData, 50);
    const dfmIndustrialsData = generateDFMData(stockData, 0.15);
    const dfmGeneralIndexData = generateDFMData(stockData, 0.12);

    return stockData.map((item, index) => ({
      ...item,
      open: parseFloat(item.open.toFixed(3)),
      high: parseFloat(item.high.toFixed(3)),
      low: parseFloat(item.low.toFixed(3)),
      close: parseFloat(item.close.toFixed(3)),
      ma10: ma10Values[index] || undefined,
      ma20: ma20Values[index] || undefined,
      ma50: ma50Values[index] || undefined,
      change: index > 0 ? parseFloat((item.close - stockData[index - 1].close).toFixed(3)) : 0,
      changePercent: index > 0 ? parseFloat((((item.close - stockData[index - 1].close) / stockData[index - 1].close) * 100).toFixed(2)) : 0,
      earnings: earningsData.includes(item.date),
      pressRelease: pressReleaseData.includes(item.date),
      dfmIndustrials: dfmIndustrialsData[index],
      dfmGeneralIndex: dfmGeneralIndexData[index]
    }));
  }, [stockData, calculateMovingAverage, generateDFMData, earningsData, pressReleaseData]);


  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      setSyncedHover(label);
      setHoveredData({
        date: label,
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
        volume: data.volume,
        change: data.change,
        changePercent: data.changePercent,
        dfmIndustrials: data.dfmIndustrials,
        dfmGeneralIndex: data.dfmGeneralIndex
      });

      return (
        <Card.Root size="sm" variant="elevated">
          <Card.Body p={3}>
            <Text fontWeight="bold" mb={2}>{label}</Text>
            <VStack align="start" gap={1}>
              <Text fontSize="sm">Open: {data.open?.toFixed(3)}</Text>
              <Text fontSize="sm">High: {data.high?.toFixed(3)}</Text>
              <Text fontSize="sm">Low: {data.low?.toFixed(3)}</Text>
              <Text fontSize="sm">Close: {data.close?.toFixed(3)}</Text>
              <Text fontSize="sm">Volume: {data.volume?.toLocaleString()}</Text>
              {data.change && (
                <Text fontSize="sm" color={data.change >= 0 ? 'green.500' : 'red.500'}>
                  Change: {data.change >= 0 ? '+' : ''}{data.change?.toFixed(3)} ({data.changePercent?.toFixed(2)}%)
                </Text>
              )}
              {/* Show DFM indices if enabled */}
              {chartConfig.dfmIndustrials && (
                <Text fontSize="sm" color="blue.800">DFM Industrials: {data.dfmIndustrials?.toFixed(3)}</Text>
              )}
              {chartConfig.dfmGeneralIndex && (
                <Text fontSize="sm" color="blue.600">DFM General Index: {data.dfmGeneralIndex?.toFixed(3)}</Text>
              )}
              {/* Show indicators */}
              {data.earnings && (
                <Text fontSize="xs" color="blue.600" fontWeight="bold">📊 E (Earnings)</Text>
              )}
              {data.pressRelease && (
                <Text fontSize="xs" color="purple.600" fontWeight="bold">📰 P (Press Release)</Text>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>
      );
    }
    return null;
  };

  // Handle checkbox changes
  const handleConfigChange = (key: keyof ChartConfig) => {
    setChartConfig(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };


  const formatVolume = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  // Custom dot component indicatoree
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;

    const dots = [];

    if (chartConfig.earnings && payload.earnings) {
      dots.push(
        <text key="earnings" x={cx} y={cy - 10} textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="bold">
          E
        </text>
      );
    }

    if (chartConfig.pressReleases && payload.pressRelease) {
      dots.push(
        <text key="press" x={cx} y={cy - 20} textAnchor="middle" fontSize="10" fill="#8b5cf6" fontWeight="bold">
          P
        </text>
      );
    }

    return <g>{dots}</g>;
  };

  // Handle brush when you change brush
  const handleBrushChange = (brushData: any) => {
    setBrushRange({
      startIndex: brushData?.startIndex,
      endIndex: brushData?.endIndex
    });
  };


  const handleSyncedHover = (label: string | null) => {
    setSyncedHover(label);
  };

  const formatYAxis = (value: number) => {
    return chartConfig.percentView ? `${parseFloat((value / 100).toFixed(3)).toString()}%` : parseFloat(value.toFixed(3)).toString();
  };


  const renderMainChart = () => {
    const commonProps = {
      data: enhancedData,
      margin: { top: 30, right: 30, left: 20, bottom: 5 },
      onMouseMove: (e: any) => {
        if (e && e.activeLabel) {
          handleSyncedHover(e.activeLabel);
        }
      },
      onMouseLeave: () => handleSyncedHover(null)
    };

    const chartElements = [];

    // Add main chart based on type
    switch (diagramType) {

      case 'mountain':
        chartElements.push(
          <AreaChart key="main" {...commonProps}>
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              horizontal
              vertical
            />
            <XAxis dataKey="date" stroke={textColor} />
            <YAxis domain={['dataMin - 0.05', 'dataMax + 0.05']} stroke={textColor} tickFormatter={formatYAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              fill="url(#colorGradient)"
              strokeWidth={2}
              dot={<CustomDot />}
            />


            {chartConfig.dfmIndustrials && (
              <Area
                type="monotone"
                dataKey="dfmIndustrials"
                stroke="#1e40af"
                fill="#1e40af"
                strokeWidth={2}
                opacity={0.3}
                dot={<CustomDot />}
              />)}
            {chartConfig.dfmGeneralIndex && (
              <Area
                type="monotone"
                dataKey="dfmGeneralIndex"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                opacity={0.3}
                strokeWidth={2}
                dot={<CustomDot />}
              />
            )}
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            {/* Period High/Low lines */}
            {chartConfig.periodHighLow && (
              <>
                <ReferenceLine y={periodHighLow.high} stroke="#22c55e" strokeDasharray="5 5" label="Period High" />
                <ReferenceLine y={periodHighLow.low} stroke="#ef4444" strokeDasharray="5 5" label="Period Low" />
              </>
            )}
          </AreaChart>
        );
        break;

      default:
        chartElements.push(
          <LineChart key="main" {...commonProps}>
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              horizontal
              vertical
            />
            <XAxis dataKey="date" stroke={textColor} />
            <YAxis domain={['dataMin - 0.05', 'dataMax + 0.05']} stroke={textColor} tickFormatter={formatYAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />

            {chartConfig.ma10 && (
              <Line
                type="monotone"
                dataKey="ma10"
                stroke="#f59e0b"
                strokeWidth={1}
                dot={false}
                strokeDasharray="5 5"
              />
            )}
            {chartConfig.ma20 && (
              <Line
                type="monotone"
                dataKey="ma20"
                stroke="#10b981"
                strokeWidth={1}
                dot={false}
                strokeDasharray="5 5"
              />
            )}
            {chartConfig.ma50 && (
              <Line
                type="monotone"
                dataKey="ma50"
                stroke="#8b5cf6"
                strokeWidth={1}
                dot={false}

                strokeDasharray="5 5"
              />
            )}

            {chartConfig.dfmIndustrials && (
              <Line
                type="monotone"
                dataKey="dfmIndustrials"
                stroke="#1e40af"
                strokeWidth={1}
                dot={false}
                name="DFM Industrials"
              />
            )}
            {chartConfig.dfmGeneralIndex && (
              <Line
                type="monotone"
                dataKey="dfmGeneralIndex"
                stroke="#0ea5e9"
                strokeWidth={1}
                dot={false}
                name="DFM General Index"
              />
            )}

            {chartConfig.periodHighLow && (
              <>
                <ReferenceLine y={periodHighLow.high} stroke="#22c55e" strokeDasharray="5 5" label="Period High" />
                <ReferenceLine y={periodHighLow.low} stroke="#ef4444" strokeDasharray="5 5" label="Period Low" />
              </>
            )}
            <Brush
              dataKey="date"
              height={30}
              stroke="#3b82f6"
              onChange={handleBrushChange}
              startIndex={brushRange.startIndex}
              endIndex={brushRange.endIndex}
            />
          </LineChart>
        );
        break;
    }

    return chartElements[0];
  };


  const renderLowerCharts = () => {


    const charts = [];


    if (!chartConfig.hideVolume) {
      charts.push(
        <Card.Root key="volume" mb={4} variant="outline">
          <Card.Body>
            <Text fontSize="sm" mb={2}>Volume: {hoveredData?.volume}</Text>
            <Box h="150px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={enhancedData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  onMouseMove={(e: any) => {
                    if (e && e.activeLabel) {
                      handleSyncedHover(e.activeLabel);
                    }
                  }}

                  onMouseLeave={() => handleSyncedHover(null)}
                >
                  <CartesianGrid
                    stroke="#e2e8f0"
                    strokeDasharray="3 3"
                    horizontal
                    vertical
                  />
                  <XAxis dataKey="date" stroke={textColor} />
                  <YAxis tickFormatter={formatVolume} stroke={textColor} />
                  <Tooltip formatter={(value: number) => [formatVolume(value), 'Volume']} />
                  <Bar dataKey="volume" fill="#64748b" />
                  <Brush
                    dataKey="date"
                    height={30}
                    stroke="#3b82f6"
                    onChange={handleBrushChange}
                    startIndex={brushRange.startIndex}
                    endIndex={brushRange.endIndex}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card.Body>
        </Card.Root>
      );
    }


    if (chartConfig.dailyChange) {
      charts.push(
        <Card.Root key="dailyChange" mb={4} variant="outline">
          <Card.Body>
            <Text fontSize="sm" mb={2}>Daily Change %: {hoveredData?.changePercent}</Text>
            <Box h="100px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={enhancedData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  onMouseMove={(e: any) => {
                    if (e && e.activeLabel) {
                      handleSyncedHover(e.activeLabel);
                    }
                  }}
                  onMouseLeave={() => handleSyncedHover(null)}
                >
                  <CartesianGrid
                    stroke="#e2e8f0"
                    strokeDasharray="3 3"
                    horizontal
                    vertical
                  />
                  <XAxis dataKey="date" stroke={textColor} />
                  <YAxis stroke={textColor} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="changePercent"
                    stroke="#6366f1"
                    strokeWidth={1}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="2 2" />
                  <Brush
                    dataKey="date"
                    height={30}
                    stroke="#3b82f6"
                    onChange={handleBrushChange}
                    startIndex={brushRange.startIndex}
                    endIndex={brushRange.endIndex}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card.Body>
        </Card.Root>
      );
    }

    return charts;
  };

  return (
    <Box w="full" p={6} bg={bgColor}>
      {/* Header with period selection */}
      <Flex mb={6} gap={4} align="center" wrap="wrap">
        <Text fontSize="sm" color={textColor}>23/12/2024 - 20/06/2025</Text>
        <HStack gap={4} align="center" wrap="wrap">
          <Flex align="center" gap={1}>
            <Circle size="3" bg="#3b82f6" />
            <Text fontSize="sm" color="black.600">Salik:</Text>
          </Flex>

          <Text fontSize="sm" color="blue.600">Open: {hoveredData?.open}</Text>
          <Text fontSize="sm" color="green.600">High: {hoveredData?.high}</Text>
          <Text fontSize="sm" color="red.600">Low: {hoveredData?.low}</Text>

          {chartConfig.dfmIndustrials && (
            <Flex align="center" gap={1}>
              <Circle size="3" bg="#1e40af" />
              <Text fontSize="sm" color="black.800">
                DFM Industrials: <span style={{ color: "orange" }}>{hoveredData?.dfmIndustrials}</span>
              </Text>
            </Flex>
          )}

          {chartConfig.dfmGeneralIndex && (
            <Flex align="center" gap={1}>
              <Circle size="3" bg="#0ea5e9" />
              <Text fontSize="sm" color="black.800">
                DFM General Index: <span style={{ color: "orangered" }}>{hoveredData?.dfmGeneralIndex}</span>
              </Text>
            </Flex>
          )}


        </HStack>

      </Flex>

      {/* Main Chart */}
      <Card.Root mb={4} variant="outline">
        <Card.Body>
          <Box h="400px">
            <ResponsiveContainer width="100%" height="100%">
              {renderMainChart()}
            </ResponsiveContainer>
          </Box>
        </Card.Body>
      </Card.Root>

      {/* Lower Charts */}
      {renderLowerCharts()}
      <Flex mb={4} >
        <SimpleGrid columns={{ base: 1, lg: 3, md: 2 }} gap={4} width="100%">
          <Button bg="teal" color="white" size="sm" width="100%">
            Detach Graph
          </Button>
          <Button bg="teal" color="white" size="sm" width="100%">
            Download to Excel
          </Button>
          <Button bg="teal" color="white" size="sm" width="100%">
            Print
          </Button>
        </SimpleGrid>
      </Flex>


      {/* Control Panel */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {/* Indicators */}
        <GridItem>
          <Card.Root variant="outline">
            <Card.Body>
              <Text fontWeight="bold" mb={3}>Indicators</Text>
              <VStack align="start" gap={2}>
                <Checkbox.Root
                  checked={chartConfig.earnings}
                  onCheckedChange={() => handleConfigChange('earnings')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Earnings</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root
                  checked={chartConfig.pressReleases}
                  onCheckedChange={() => handleConfigChange('pressReleases')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Press Releases</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root
                  checked={chartConfig.periodHighLow}
                  onCheckedChange={() => handleConfigChange('periodHighLow')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Period High/Low</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root
                  checked={chartConfig.percentView}
                  onCheckedChange={() => handleConfigChange('percentView')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>% view</Checkbox.Label>
                </Checkbox.Root>
              </VStack>
            </Card.Body>
          </Card.Root>
        </GridItem>

        {/* Moving Averages */}
        <GridItem>
          <Card.Root variant="outline">
            <Card.Body>
              <Text fontWeight="bold" mb={3}>Moving averages</Text>
              <VStack align="start" gap={2}>
                <Checkbox.Root
                  checked={chartConfig.ma10}
                  onCheckedChange={() => handleConfigChange('ma10')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>10 days</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root
                  checked={chartConfig.ma20}
                  onCheckedChange={() => handleConfigChange('ma20')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>20 days</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root
                  checked={chartConfig.ma50}
                  onCheckedChange={() => handleConfigChange('ma50')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>50 days</Checkbox.Label>
                </Checkbox.Root>
                {/* <Box>
                  <Text fontSize="sm" mb={1}>Insert period</Text>
                  <Input
                    size="sm"
                    value={customPeriod}
                    onChange={(e) => setCustomPeriod(e.target.value)}
                    placeholder="Days"
                  />
                </Box> */}
              </VStack>
            </Card.Body>
          </Card.Root>
        </GridItem>

        {/* Diagram Type */}
        <GridItem>
          <Card.Root variant="outline">
            <Card.Body>
              <Text fontWeight="bold" mb={3}>Diagram type</Text>
              <RadioGroup.Root value={diagramType} onValueChange={(details) => setDiagramType(details.value)}>
                <VStack align="start" gap={2}>
                  {diagramTypeOptions.map((item) => (
                    <RadioGroup.Item key={item.value} value={item.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </VStack>
              </RadioGroup.Root>
            </Card.Body>
          </Card.Root>
        </GridItem>

        {/* Lower Graphs & Indices */}
        <GridItem>
          <Card.Root variant="outline">
            <Card.Body>
              <Text fontWeight="bold" mb={3}>Lower graphs</Text>
              <VStack align="start" gap={2}>
                <Checkbox.Root
                  checked={!chartConfig.hideVolume}
                  onCheckedChange={() => handleConfigChange('hideVolume')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Hide/Show volume</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root
                  checked={chartConfig.dailyChange}
                  onCheckedChange={() => handleConfigChange('dailyChange')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Daily Change</Checkbox.Label>
                </Checkbox.Root>
              </VStack>

              <Text fontWeight="bold" mt={4} mb={3}>Indices</Text>
              <VStack align="start" gap={2}>
                <Checkbox.Root
                  checked={chartConfig.dfmIndustrials}
                  onCheckedChange={() => handleConfigChange('dfmIndustrials')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>DFM Industrials</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root
                  checked={chartConfig.dfmGeneralIndex}
                  onCheckedChange={() => handleConfigChange('dfmGeneralIndex')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>DFM General Index</Checkbox.Label>
                </Checkbox.Root>
              </VStack>
            </Card.Body>
          </Card.Root>
        </GridItem>
      </Grid>




    </Box>
  );
};

export default ShareGraph;