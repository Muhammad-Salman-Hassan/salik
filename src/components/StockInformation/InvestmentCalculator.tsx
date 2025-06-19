import React, { useMemo, useState } from "react";
import {
  Box,
  Text,
  Tabs,
  RadioGroup,
  VStack,
  Flex,
  Grid,
  Input,
  Button,
  NativeSelect,
  Table,
  Container,
  Card,
  HStack,
} from "@chakra-ui/react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { ChartControls, StockDataPoint, StockStat } from "../../util/Interface";
import { investmentStockDummyData, stocckStatsEndDummyData, stockStatsDummyData } from "../../util/DummyData";

const InvestmentCalculator: React.FC = () => {
  const stockData: StockDataPoint[] = investmentStockDummyData;

  const [controls, setControls] = useState<ChartControls>({
    timeRange: "6months",
    chartType: "line",
    showVolume: true,
    showMovingAverages: {
      ma10: false,
      ma20: false,
      ma50: false,
    },
    indicators: {
      earnings: false,
      pressReleases: false,
      periodHighLow: false,
      percentView: false,
    },
    lowerGraphs: {
      hideShowVolume: true,
      dailyChange: false,
    },
    indices: {
      dfmIndustrials: false,
      dfmGeneralIndex: false,
    },
  });

  const [hideGraph, setHideGraph] = useState(false);
  const [showShareGraph, setShowShareGraph] = useState(false);

  const stockStats: StockStat[] = stockStatsDummyData;
  const stockStatsEnd: StockStat[] = stocckStatsEndDummyData;

  const calculateMovingAverage = (data: StockDataPoint[], period: number) => {
    return data.map((point, index) => {
      if (index < period - 1) return { ...point, ma: null };

      const sum = data
        .slice(index - period + 1, index + 1)
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg="white"
          p={3}
          borderRadius="md"
          boxShadow="xl"
          border="1px solid"
          borderColor="gray.200"
          fontSize="sm"
        >
          <Text fontWeight="bold" mb={2} color="gray.700">
            {label}
          </Text>
          <VStack align="start" gap={1}>
            <Text>Open: <Text as="span" fontWeight="semibold">{data.open?.toFixed(2)}</Text></Text>
            <Text>High: <Text as="span" fontWeight="semibold" color="green.600">{data.high?.toFixed(2)}</Text></Text>
            <Text>Low: <Text as="span" fontWeight="semibold" color="red.600">{data.low?.toFixed(2)}</Text></Text>
            <Text>Close: <Text as="span" fontWeight="semibold">{data.close?.toFixed(2)}</Text></Text>
            <Text>Volume: <Text as="span" fontWeight="semibold">{data.volume?.toLocaleString()}</Text></Text>
          </VStack>
        </Box>
      );
    }
    return null;
  };

  const renderChart = () => {
    const ChartComponent =
      controls.chartType === "mountain"
        ? ComposedChart
        : controls.chartType === "bar"
          ? BarChart
          : LineChart;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={dataWithMA} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 11 }}
            stroke="#666"
          />
          <YAxis
            domain={["dataMin - 0.1", "dataMax + 0.1"]}
            tick={{ fontSize: 11 }}
            stroke="#666"
          />
          <Tooltip content={<CustomTooltip />} />
          {controls.chartType === "mountain" && (
            <Area
              type="monotone"
              dataKey="close"
              stroke="#3182ce"
              fill="#bee3f8"
              fillOpacity={0.6}
            />
          )}

          {controls.chartType === "bar" && (
            <Bar dataKey="close" fill="#3182ce" radius={[2, 2, 0, 0]} />
          )}

          {(controls.chartType === "line" || controls.chartType === "candlestick") && (
            <Line
              type="linear"
              dataKey="close"
              stroke="#3182ce"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#3182ce" }}
            />
          )}

          {controls.showMovingAverages.ma10 && (
            <Line
              type="monotone"
              dataKey="ma10"
              stroke="#FF6B6B"
              strokeWidth={2}
              dot={false}
            />
          )}
          {controls.showMovingAverages.ma20 && (
            <Line
              type="monotone"
              dataKey="ma20"
              stroke="#4ECDC4"
              strokeWidth={2}
              dot={false}
            />
          )}
          {controls.showMovingAverages.ma50 && (
            <Line
              type="monotone"
              dataKey="ma50"
              stroke="#45B7D1"
              strokeWidth={2}
              dot={false}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  const updateControl = (key: keyof ChartControls, value: any) => {
    setControls((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const ResultsSection = () => (
    <Card.Root mt={6} p={6} bg="gray.50">
      {/* Tables Section */}
      <Flex 
        direction={{ base: "column", lg: "row" }} 
        gap={6} 
        mb={6}
      >
        <Box flex={1}>
          <Table.Root size="sm" variant="outline" bg="white" borderRadius="md" overflow="hidden">
            <Table.Header bg="blue.500">
              <Table.Row>
                <Table.ColumnHeader color="white" fontWeight="bold" py={3}>
                  Initial Investment - June 19, 2024
                </Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stockStats.map((item, index) => (
                <Table.Row key={index} _hover={{ bg: "gray.50" }}>
                  <Table.Cell py={3} fontWeight="medium">{item.label}</Table.Cell>
                  <Table.Cell textAlign="end" fontWeight="semibold" color="blue.600">
                    {item.value}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        <Box flex={1}>
          <Table.Root size="sm" variant="outline" bg="white" borderRadius="md" overflow="hidden">
            <Table.Header bg="green.500">
              <Table.Row>
                <Table.ColumnHeader color="white" fontWeight="bold" py={3}>
                  End Value - June 19, 2025
                </Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stockStatsEnd.map((item, index) => (
                <Table.Row key={index} _hover={{ bg: "gray.50" }}>
                  <Table.Cell py={3} fontWeight="medium">{item.label}</Table.Cell>
                  <Table.Cell textAlign="end" fontWeight="semibold" color="green.600">
                    {item.value}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>

      {/* Chart Controls */}
      <Box mb={4}>
        <Text fontSize="sm" fontWeight="medium" mb={3} color="gray.700">
          Chart Type:
        </Text>
        <RadioGroup.Root
          value={controls.chartType}
          onValueChange={(details) => updateControl("chartType", details.value)}
        >
          <HStack gap={6}>
            {[
              { value: "line", label: "Line Graph" },
              { value: "bar", label: "Bar Chart" },
              { value: "mountain", label: "Area Chart" },
            ].map((option) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                cursor="pointer"
              >
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemText fontSize="sm" fontWeight="medium">
                  {option.label}
                </RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
      </Box>

      {/* Chart Container */}
      <Card.Root bg="white" p={4}>
        <Box height="400px" width="100%">
          {renderChart()}
        </Box>
      </Card.Root>
    </Card.Root>
  );

  return (
    <Card.Root 
        bg="white"
        p={{ base: 4, md: 6, lg: 8 }}
        borderRadius="xl"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
        border="1px solid"
        borderColor="gray.100"
        transition="all 0.3s ease"
        _hover={{
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          transform: "translateY(-2px)"
        }}
      >
        <Text fontSize="sm" color="gray.600" mb={6}>
          Salik - Data starting from 29/09/2022
        </Text>

        <Tabs.Root defaultValue="amount" variant="enclosed">
          <Tabs.List bg="gray.100" rounded="lg" p={1} mb={6}>
            <Tabs.Trigger 
              value="amount" 
              px={4} 
              py={2} 
              fontWeight="medium"
              _selected={{ bg: "white", boxShadow: "sm" }}
            >
              By Amount Invested
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="share" 
              px={4} 
              py={2} 
              fontWeight="medium"
              _selected={{ bg: "white", boxShadow: "sm" }}
            >
              By Share Bought
            </Tabs.Trigger>
            <Tabs.Indicator rounded="md" />
          </Tabs.List>

          <Tabs.Content value="amount">
            <Card.Root bg="gray.50" p={6} mb={4}>
              <Flex 
                direction={{ base: "column", md: "row" }} 
                gap={4} 
                align={{ base: "stretch", md: "end" }}
                wrap={{ base: "nowrap", lg: "wrap" }}
              >
                <VStack align="start" flex={1} minW="200px">
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    Date of Investment
                  </Text>
                  <Input type="date" bg="white" />
                </VStack>

                <VStack align="start" flex={1} minW="200px">
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    End Date of Investment
                  </Text>
                  <Input type="date" bg="white" />
                </VStack>

                <VStack align="start" flex={1} minW="180px">
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    Choose Currency
                  </Text>
                  <NativeSelect.Root>
                    <NativeSelect.Field bg="white">
                      <option value="aed">AED - UAE Dirham</option>
                      <option value="usd">USD - US Dollar</option>
                      <option value="eur">EUR - Euro</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </VStack>

                <VStack align="start" flex={1} minW="200px">
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    Amount Invested
                  </Text>
                  <Input placeholder="Enter amount" bg="white" />
                </VStack>

                <Button
                  colorScheme="blue"
                  size="lg"
                  px={8}
                  onClick={() => setHideGraph(true)}
                  alignSelf={{ base: "stretch", md: "end" }}
                >
                  Calculate
                </Button>
              </Flex>
            </Card.Root>

            {hideGraph && <ResultsSection />}
          </Tabs.Content>

          <Tabs.Content value="share">
            <Card.Root bg="gray.50" p={6} mb={4}>
              <VStack gap={6} align="stretch" maxW="600px">
                <VStack align="start" gap={4}>
                  <VStack align="start" w="full">
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      Date of Investment
                    </Text>
                    <Input type="date" bg="white" />
                  </VStack>
                  
                  <VStack align="start" w="full">
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      End Date of Investment
                    </Text>
                    <Input type="date" bg="white" />
                  </VStack>
                </VStack>

                <Flex 
                  direction={{ base: "column", md: "row" }} 
                  gap={4} 
                  align={{ base: "stretch", md: "end" }}
                >
                  <VStack align="start" flex={1}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      Number of Shares
                    </Text>
                    <Input placeholder="Enter number of shares" bg="white" />
                  </VStack>

                  <VStack align="start" flex={1}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      Choose Currency
                    </Text>
                    <NativeSelect.Root>
                      <NativeSelect.Field bg="white">
                        <option value="aed">AED - UAE Dirham</option>
                        <option value="usd">USD - US Dollar</option>
                        <option value="eur">EUR - Euro</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </VStack>

                  <Button
                    colorScheme="blue"
                    size="lg"
                    px={8}
                    onClick={() => setShowShareGraph(true)}
                    alignSelf={{ base: "stretch", md: "end" }}
                  >
                    Calculate
                  </Button>
                </Flex>
              </VStack>
            </Card.Root>

            {(hideGraph || showShareGraph) && <ResultsSection />}
          </Tabs.Content>
        </Tabs.Root>
      </Card.Root>
  );
};

export default InvestmentCalculator;