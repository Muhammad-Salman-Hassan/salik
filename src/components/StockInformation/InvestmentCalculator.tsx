import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Tabs,
  Tooltip,
  RadioGroup,
  VStack,
  Flex,
  Grid,
  Input,
  Button,
  NativeSelect,
  Table,
  Heading,
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
} from "recharts";
import { FaCaretDown, FaCaretUp, FaEyeSlash } from "react-icons/fa";
interface ChartControls {
  timeRange:
    | "1day"
    | "5days"
    | "3months"
    | "6months"
    | "1year"
    | "3years"
    | "custom";
  customStartDate?: string;
  customEndDate?: string;
  chartType: "line" | "bar" | "candlestick" | "mountain";
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

const InvestmentCalculator: React.FC = () => {
  const stockData: StockDataPoint[] = [
    {
      date: "20/5",
      timestamp: new Date("2025-05-20T10:00:00Z"),
      open: 5.1,
      high: 5.15,
      low: 5.05,
      close: 5.12,
      volume: 3200000,
    },
    {
      date: "21/5",
      timestamp: new Date("2025-05-21T10:00:00Z"),
      open: 5.12,
      high: 5.18,
      low: 5.1,
      close: 5.14,
      volume: 4100000,
    },
    {
      date: "22/5",
      timestamp: new Date("2025-05-22T10:00:00Z"),
      open: 5.14,
      high: 5.2,
      low: 5.11,
      close: 5.17,
      volume: 3800000,
    },
    {
      date: "23/5",
      timestamp: new Date("2025-05-23T10:00:00Z"),
      open: 5.17,
      high: 5.22,
      low: 5.13,
      close: 5.16,
      volume: 2900000,
    },
    {
      date: "24/5",
      timestamp: new Date("2025-05-24T10:00:00Z"),
      open: 5.16,
      high: 5.19,
      low: 5.1,
      close: 5.11,
      volume: 3300000,
    },
    {
      date: "25/5",
      timestamp: new Date("2025-05-25T10:00:00Z"),
      open: 5.11,
      high: 5.18,
      low: 5.08,
      close: 5.15,
      volume: 3600000,
    },
    {
      date: "26/5",
      timestamp: new Date("2025-05-26T10:00:00Z"),
      open: 5.15,
      high: 5.2,
      low: 5.12,
      close: 5.18,
      volume: 3000000,
    },
    {
      date: "27/5",
      timestamp: new Date("2025-05-27T10:00:00Z"),
      open: 5.18,
      high: 5.22,
      low: 5.16,
      close: 5.19,
      volume: 4100000,
    },
    {
      date: "28/5",
      timestamp: new Date("2025-05-28T10:00:00Z"),
      open: 5.19,
      high: 5.24,
      low: 5.15,
      close: 5.2,
      volume: 3900000,
    },
    {
      date: "29/5",
      timestamp: new Date("2025-05-29T10:00:00Z"),
      open: 5.2,
      high: 5.23,
      low: 5.17,
      close: 5.21,
      volume: 3500000,
    },
    {
      date: "30/5",
      timestamp: new Date("2025-05-30T10:00:00Z"),
      open: 5.21,
      high: 5.25,
      low: 5.19,
      close: 5.23,
      volume: 3700000,
    },
    {
      date: "31/5",
      timestamp: new Date("2025-05-31T10:00:00Z"),
      open: 5.23,
      high: 5.26,
      low: 5.2,
      close: 5.24,
      volume: 3400000,
    },
    {
      date: "1/6",
      timestamp: new Date("2025-06-01T10:00:00Z"),
      open: 5.24,
      high: 5.28,
      low: 5.22,
      close: 5.27,
      volume: 3900000,
    },
    {
      date: "2/6",
      timestamp: new Date("2025-06-02T10:00:00Z"),
      open: 5.27,
      high: 5.3,
      low: 5.23,
      close: 5.25,
      volume: 3100000,
    },
    {
      date: "3/6",
      timestamp: new Date("2025-06-03T10:00:00Z"),
      open: 5.25,
      high: 5.29,
      low: 5.2,
      close: 5.21,
      volume: 3800000,
    },
    {
      date: "4/6",
      timestamp: new Date("2025-06-04T10:00:00Z"),
      open: 5.21,
      high: 5.22,
      low: 5.15,
      close: 5.18,
      volume: 4000000,
    },
    {
      date: "5/6",
      timestamp: new Date("2025-06-05T10:00:00Z"),
      open: 5.18,
      high: 5.2,
      low: 5.14,
      close: 5.16,
      volume: 2900000,
    },
    {
      date: "6/6",
      timestamp: new Date("2025-06-06T10:00:00Z"),
      open: 5.16,
      high: 5.19,
      low: 5.13,
      close: 5.17,
      volume: 3100000,
    },
    {
      date: "7/6",
      timestamp: new Date("2025-06-07T10:00:00Z"),
      open: 5.17,
      high: 5.22,
      low: 5.15,
      close: 5.2,
      volume: 2700000,
    },
    {
      date: "8/6",
      timestamp: new Date("2025-06-08T10:00:00Z"),
      open: 5.2,
      high: 5.23,
      low: 5.18,
      close: 5.21,
      volume: 3500000,
    },
    {
      date: "9/6",
      timestamp: new Date("2025-06-09T10:00:00Z"),
      open: 5.21,
      high: 5.25,
      low: 5.2,
      close: 5.23,
      volume: 3900000,
    },
    {
      date: "10/6",
      timestamp: new Date("2025-06-10T10:00:00Z"),
      open: 5.23,
      high: 5.27,
      low: 5.22,
      close: 5.25,
      volume: 4200000,
    },
    {
      date: "11/6",
      timestamp: new Date("2025-06-11T10:00:00Z"),
      open: 5.25,
      high: 5.28,
      low: 5.24,
      close: 5.27,
      volume: 3300000,
    },
    {
      date: "12/6",
      timestamp: new Date("2025-06-12T10:00:00Z"),
      open: 5.27,
      high: 5.3,
      low: 5.25,
      close: 5.28,
      volume: 4100000,
    },
    {
      date: "13/6",
      timestamp: new Date("2025-06-13T10:00:00Z"),
      open: 5.28,
      high: 5.31,
      low: 5.26,
      close: 5.29,
      volume: 2900000,
    },
    {
      date: "14/6",
      timestamp: new Date("2025-06-14T10:00:00Z"),
      open: 5.29,
      high: 5.32,
      low: 5.27,
      close: 5.3,
      volume: 3600000,
    },
    {
      date: "15/6",
      timestamp: new Date("2025-06-15T10:00:00Z"),
      open: 5.3,
      high: 5.34,
      low: 5.29,
      close: 5.33,
      volume: 3000000,
    },
    {
      date: "16/6",
      timestamp: new Date("2025-06-16T10:00:00Z"),
      open: 5.33,
      high: 5.36,
      low: 5.31,
      close: 5.35,
      volume: 3200000,
    },
    {
      date: "17/6",
      timestamp: new Date("2025-06-17T10:00:00Z"),
      open: 5.35,
      high: 5.39,
      low: 5.34,
      close: 5.38,
      volume: 3700000,
    },
    {
      date: "18/6",
      timestamp: new Date("2025-06-18T10:00:00Z"),
      open: 5.38,
      high: 5.4,
      low: 5.36,
      close: 5.39,
      volume: 3900000,
    },
  ];
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
  const renderChart = () => {
    const ChartComponent =
      controls.chartType === "mountain"
        ? ComposedChart
        : controls.chartType === "bar"
        ? BarChart
        : LineChart;

    return (
      <ChartComponent data={dataWithMA}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis
          domain={["dataMin - 0.1", "dataMax + 0.1"]}
          tick={{ fontSize: 11 }}
        />
        <Tooltip content={<CustomTooltip />} />

        {/* Render chart elements based on type */}
        {controls.chartType === "mountain" && (
          <Area
            type="monotone"
            dataKey="close"
            stroke="#4A5568"
            fill="#E2E8F0"
            fillOpacity={0.6}
          />
        )}

        {controls.chartType === "bar" && <Bar dataKey="close" fill="#4A5568" />}

        {(controls.chartType === "line" ||
          controls.chartType === "candlestick") && (
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
          <Line
            type="monotone"
            dataKey="ma10"
            stroke="#FF6B6B"
            strokeWidth={1}
            dot={false}
          />
        )}
        {controls.showMovingAverages.ma20 && (
          <Line
            type="monotone"
            dataKey="ma20"
            stroke="#4ECDC4"
            strokeWidth={1}
            dot={false}
          />
        )}
        {controls.showMovingAverages.ma50 && (
          <Line
            type="monotone"
            dataKey="ma50"
            stroke="#45B7D1"
            strokeWidth={1}
            dot={false}
          />
        )}
      </ChartComponent>
    );
  };
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg="white"
          p={3}
          borderRadius="md"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <Text fontWeight="bold" mb={1}>
            {label}
          </Text>
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
  const tableData: { label: string; value: string | number }[] = [
    { label: "Open", value: "5.59" },
    { label: "Day's High", value: " 5.59" },
    { label: "Day's Low", value: "5.47" },
    { label: "Volume", value: "6,605,615" },
  ];
  const updateControl = (key: keyof ChartControls, value: any) => {
    console.log(key, value);
    setControls((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [hideGraph, setHideGraph] = useState(false);
  const [showShareGraph, setShowShareGraph] = useState(false);
  interface StockStat {
    label: string;
    value: string;
  }
  const stockStats: StockStat[] = [
    {
      label: "Value (AED)",
      value: "19.80",
    },
    {
      label: "Share Price (AED)",
      value: "3.30",
    },
    {
      label: "Shares bought",
      value: "6",
    },
  ];
  const stockStatsEnd: StockStat[] = [
    {
      label: "Value (AED)",
      value: "33.00",
    },
    {
      label: "Share Price (AED)",
      value: "5.50",
    },
    {
      label: "Change (AED)",
      value: "13.20",
    },
    {
      label: "Change (%)",
      value: "66.67",
    },
    {
      label: "Annualized change (%)",
      value: "66.67",
    },
  ];
  const getTextColor = (change: number | null | undefined) => {
    if (Number(change) && Number(change) > 0) {
      return "green";
    } else if (Number(change) && Number(change) < 0) {
      return "red";
    } else {
      return "black";
    }
  };
  return (
    <Box borderTop="1px">
      <Container as={Stack} maxW="7xl" py={8}>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Salik - Data starting from 29/09/2022
        </Text>
        <Tabs.Root defaultValue="amount" variant="plain">
          <Tabs.List bg="bg.muted" rounded="l3" p="1">
            <Tabs.Trigger value="amount">By Amount Invested</Tabs.Trigger>
            <Tabs.Trigger value="share">By Share bought</Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="amount">
            <Flex gap={4} align={"end"} mb={4}>
              <Grid mt={4}>
                <small>Date of investment</small>
                <Input placeholder="Select Date" type="date" />
              </Grid>
              <Grid mt={4}>
                <small>End date of investment</small>
                <Input placeholder="Select Date" type="date" />
              </Grid>
              <Grid mt={4}>
                <small>Choose currency</small>
                <NativeSelect.Root w={170}>
                  <NativeSelect.Field>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Grid>
              <Grid mt={4}>
                <small>Amount invested</small>
                <Input placeholder="Select Date" />
              </Grid>
              <Button
                colorScheme="gray"
                mt={4}
                onClick={() => setHideGraph(true)}
              >
                Show Data
              </Button>
            </Flex>
            {hideGraph && (
              <>
                {" "}
                <Box
                  h="400px"
                  mt={4}
                  borderColor="gray.200"
                  borderRadius="md"
                  p={2}
                >
                  <Flex gap={4}>
                    <Table.Root size="sm" variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>
                            Initial investment 19 June 2024
                          </Table.ColumnHeader>
                          <Table.ColumnHeader></Table.ColumnHeader>
                          <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {stockStats.map((item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>{item.label}</Table.Cell>
                            <Table.Cell textAlign="end">
                              <Flex gap="2" align="center" justify={"end"}>
                                {item.valuex}
                              </Flex>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                    <Table.Root size="sm" variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>
                            End value 19 June 2025
                          </Table.ColumnHeader>
                          <Table.ColumnHeader></Table.ColumnHeader>
                          <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {stockStatsEnd.map((item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>{item.label}</Table.Cell>
                            <Table.Cell textAlign="end">
                              <Flex gap="2" align="center" justify={"end"}>
                                {item.value}
                              </Flex>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Flex>
                  <Box mt={4} mb={2}>
                    <RadioGroup.Root
                      value={controls.chartType}
                      onValueChange={(details) =>
                        updateControl("chartType", details.value)
                      }
                    >
                      <VStack align="start" gap={1}>
                        <Flex gap={4}>
                          {[
                            { value: "line", label: "Line Graph" },
                            { value: "bar", label: "Bar" },
                            { value: "candlestick", label: "Candlestick" },
                            { value: "mountain", label: "Mountain" },
                          ].map((option) => (
                            <RadioGroup.Item
                              key={option.value}
                              value={option.value}
                            >
                              <RadioGroup.ItemIndicator />
                              <RadioGroup.ItemHiddenInput />
                              <RadioGroup.ItemText fontSize="sm">
                                {option.label}
                              </RadioGroup.ItemText>
                            </RadioGroup.Item>
                          ))}
                        </Flex>
                      </VStack>
                    </RadioGroup.Root>
                  </Box>
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                  </ResponsiveContainer>
                </Box>
              </>
            )}
          </Tabs.Content>
          <Tabs.Content value="share">
            <Flex gap={4} direction={"column"} w={"600px"}>
              <Grid mt={4}>
                <Flex gap={2} align={"start"} direction={"column"}>
                  <Text w={410}>Date of investment: </Text>
                  <Input placeholder="Select Date" type="date" />
                  <Text w={490}>End date of investment: </Text>
                  <Input placeholder="Select Date" type="date" />
                </Flex>
              </Grid>
              <Flex gap={2} align="end">
                <Grid>
                  <small>Number of shares invested</small>
                  <Input placeholder="Select Date" w={235} />
                </Grid>
                <Grid>
                  <small>Choose currency</small>
                  <NativeSelect.Root w={270}>
                    <NativeSelect.Field>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Grid>
                <Button
                  colorScheme="gray"
                  mt={4}
                  onClick={() => setShowShareGraph(true)}
                >
                  Submit
                </Button>
              </Flex>
            </Flex>
            {hideGraph && (
              <>
                {" "}
                <Box
                  h="400px"
                  mt={4}
                  borderColor="gray.200"
                  borderRadius="md"
                  p={2}
                >
                  <Flex gap={4}>
                    <Table.Root size="sm" variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>
                            Initial investment 19 June 2024
                          </Table.ColumnHeader>
                          <Table.ColumnHeader></Table.ColumnHeader>
                          <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {stockStats.map((item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>{item.label}</Table.Cell>
                            <Table.Cell textAlign="end">
                              <Flex gap="2" align="center" justify={"end"}>
                                {item.valuex}
                              </Flex>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                    <Table.Root size="sm" variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>
                            End value 19 June 2025
                          </Table.ColumnHeader>
                          <Table.ColumnHeader></Table.ColumnHeader>
                          <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {stockStatsEnd.map((item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>{item.label}</Table.Cell>
                            <Table.Cell textAlign="end">
                              <Flex gap="2" align="center" justify={"end"}>
                                {item.value}
                              </Flex>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Flex>
                  <Box mt={4} mb={2}>
                    <RadioGroup.Root
                      value={controls.chartType}
                      onValueChange={(details) =>
                        updateControl("chartType", details.value)
                      }
                    >
                      <VStack align="start" gap={1}>
                        <Flex gap={4}>
                          {[
                            { value: "line", label: "Line Graph" },
                            { value: "bar", label: "Bar" },
                            { value: "candlestick", label: "Candlestick" },
                            { value: "mountain", label: "Mountain" },
                          ].map((option) => (
                            <RadioGroup.Item
                              key={option.value}
                              value={option.value}
                            >
                              <RadioGroup.ItemIndicator />
                              <RadioGroup.ItemHiddenInput />
                              <RadioGroup.ItemText fontSize="sm">
                                {option.label}
                              </RadioGroup.ItemText>
                            </RadioGroup.Item>
                          ))}
                        </Flex>
                      </VStack>
                    </RadioGroup.Root>
                  </Box>
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                  </ResponsiveContainer>
                </Box>
              </>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  );
};

export default InvestmentCalculator;
