import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Stack,
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
  Tooltip
} from "recharts";
import { FaCaretDown, FaCaretUp, FaEyeSlash } from "react-icons/fa";
import { sharePricelookupdummydata, sharePricelookupTabledummydata } from "../../util/DummyData";
import { ChartControls, StockDataPoint } from "../../util/Interface";


const SharePriceLookup: React.FC = () => {
  const stockData: StockDataPoint[] = sharePricelookupTabledummydata

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
    date: string | null;
  }
  const stockStats: StockStat[] = sharePricelookupdummydata
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
    <Box borderTop="1px" bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        transform: "translateY(-2px)"
      }}>

      <Text fontSize="sm" color="gray.600" mb={4}>
        Salik - Data starting from 09/29/2022
      </Text>
      <Tabs.Root defaultValue="historical" variant="plain">
        <Tabs.List bg="bg.muted" rounded="l3" p="1">
          <Tabs.Trigger value="historical">
            Historical Share Price
          </Tabs.Trigger>
          <Tabs.Trigger value="share">Share Price Download</Tabs.Trigger>
          <Tabs.Indicator rounded="l2" />
        </Tabs.List>
        <Tabs.Content value="historical">
          <Flex gap={4} align={"end"} mb={4}>
            <Grid mt={4}>
              <small>Select the date to find price.</small>
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
            <Button
              colorScheme="gray"
              mt={4}
              onClick={() => setHideGraph(true)}
            >
              Submit
            </Button>
            {hideGraph && (
              <Button colorScheme="gray" onClick={() => setHideGraph(false)}>
                <FaEyeSlash /> Hide
              </Button>
            )}
          </Flex>
          {!hideGraph ? (
            <>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Diagram type
                </Text>
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
              <Box
                h="400px"
                mt={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                p={2}
              >
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </Box>
            </>
          ) : (
            <Flex
              justify="space-between"
              align="center"
              mt={2}
              w="100%"
              background={"gray.50"}

              borderRadius="md"
            >
              <Table.Root size="sm" w="600px" variant="outline">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader minW="200px">
                      June/18/2025
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {tableData.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        {item.label}: {item.value}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
              <Box w={"600px"} textAlign="center" p={6}
                borderRadius="xl"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
                border="1px solid"
                borderColor="gray.100"
                transition="all 0.3s ease"
                _hover={{
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                  transform: "translateY(-2px)"
                }}>
                <Heading size="4xl">Close Price</Heading>
                <Heading size="6xl">5.50AED</Heading>
              </Box>
            </Flex>
          )}
        </Tabs.Content>
        <Tabs.Content value="share">
          <Flex gap={4} direction={"column"} w={"200px"}>
            <Grid mt={4}>
              <small>Select time period</small>
              <Flex gap={2} align="center">
                {" "}
                From: <Input placeholder="Select Date" type="date" />
                To: <Input placeholder="Select Date" type="date" />
              </Flex>
            </Grid>
            <Flex gap={2} align="end">
              <Grid>
                <small>Choose currency</small>
                <NativeSelect.Root w={170}>
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
          {showShareGraph && (
            <Box
              // h="400px"
              mt={4}
              borderColor="gray.200"
              borderRadius="md"
              p={2}
            >
              <Table.Root size="sm" variant="outline" mb={3}>
                <Table.Body>
                  {stockStats.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{item.label}</Table.Cell>
                      <Table.Cell
                        textAlign="end"
                        color={
                          item.label.includes("%") && getTextColor(item.value)
                        }
                      >
                        <Flex gap="2" align="center" justify={"end"}>
                          {item.value ? `${item.value}% ` : "N/A"}
                          {item.label.includes("%") &&
                            (+item.value > 0 ? (
                              <FaCaretUp color="green" />
                            ) : (
                              <FaCaretDown color="red" />
                            ))}
                        </Flex>
                      </Table.Cell>
                      <Table.Cell textAlign="end">{item.date}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
              <ResponsiveContainer width="100%" height="100%" >
                {renderChart()}
              </ResponsiveContainer>
            </Box>
          )}
        </Tabs.Content>
      </Tabs.Root>

    </Box>
  );
};

export default SharePriceLookup;
