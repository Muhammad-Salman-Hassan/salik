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
  Tooltip,
  Brush
} from "recharts";
import { FaCaretDown, FaCaretUp, FaEyeSlash } from "react-icons/fa";
import { sharePricelookupdummydata, sharePricelookupTabledummydata } from "../../util/DummyData";
import { ChartControls, StockDataPoint } from "../../util/Interface";
import { GiGrapes } from "react-icons/gi";
import { BsGraphDown } from "react-icons/bs";

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
  const formatYAxisLabel = (value: number) => {
    return value.toFixed(2);
  };
  const renderChart = () => {
    const ChartComponent =
      controls.chartType === "mountain"
        ? ComposedChart
        : controls.chartType === "bar"
          ? BarChart
          : LineChart;

    return (
      <ChartComponent data={dataWithMA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis
          domain={["dataMin - 0.1", "dataMax + 0.1"]}
          tick={{ fontSize: 11 }}
          tickFormatter={formatYAxisLabel}
        />
        <Tooltip content={<CustomTooltip />} />

        {controls.chartType === "mountain" && (
          <Area
            type="linear"
            dataKey="close"
            stroke="#4A5568"
            fill="#008080"
            fillOpacity={0.3}
          />
        )}

        {controls.chartType === "bar" && <Bar dataKey="close" fill="#008080" />}

        {(controls.chartType === "line" ||
          controls.chartType === "candlestick") && (
            <Line
              type="monotone"
              dataKey="close"
              stroke="#008080"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          )}

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
            type="linear"
            dataKey="ma20"
            stroke="#008080"
            strokeWidth={1}
            dot={false}
          />
        )}
        {controls.showMovingAverages.ma50 && (
          <Line
            type="linear"
            dataKey="ma50"
            stroke="#008080"
            strokeWidth={1}
            dot={false}
          />
        )}
        <Brush dataKey="date" height={30} stroke="#008080" />

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
          <Text fontSize="sm" color={"green.500"}>Open: {data.open?.toFixed(2)}</Text>
          <Text fontSize="sm" color={'green.600'}>High: {data.high?.toFixed(2)}</Text>
          <Text fontSize="sm" color={"red.500"}>Low: {data.low?.toFixed(2)}</Text>
          <Text fontSize="sm" color={"red.500"}>Close: {data.close?.toFixed(2)}</Text>
          <Text fontSize="sm" color={"blue.500"}>Volume: {data.volume?.toLocaleString()}</Text>
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
    <Box
      borderTop="1px"
      bg="white"
      p={6}
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
              <Box mb={4}>
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
                w="100%"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                overflow="hidden"
              >
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </Box>
            </>
          ) : (
            <Box mt={4}>
              <Flex
                direction={{ base: "column", lg: "row" }}
                gap={4}
                align={{ base: "stretch", lg: "start" }}
                w="100%"
              >
                <Box
                  flex="1"
                  minW="300px"
                  background="gray.50"
                  borderRadius="md"
                  p={4}
                >
                  <Table.Root size="sm" variant="outline">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>
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
                </Box>

                <Box
                  flex="1"
                  minW="300px"
                  textAlign="center"
                  p={6}
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
                  <Heading size="4xl">Close Price</Heading>
                  <Heading size="6xl">5.50AED</Heading>
                </Box>
              </Flex>
            </Box>
          )}
        </Tabs.Content>

        <Tabs.Content value="share">
          <Flex gap={4} direction={"column"} w={"100%"} maxW="400px">
            <Grid mt={4}>
              <small>Select time period</small>
              <Flex gap={2} align="center" wrap="wrap">
                From: <Input placeholder="Select Date" type="date" flex="1" minW="150px" />
                To: <Input placeholder="Select Date" type="date" flex="1" minW="150px" />
              </Flex>
            </Grid>
            <Flex gap={2} align="end" wrap="wrap">
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

            <Box mt={4} w="100%">
              <Table.Root size="sm" variant="outline" mb={4}>
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

              <Flex justifyContent={"center"} alignItems={"center"} mb={4}>
                <Button colorScheme="teal">
                  <BsGraphDown /> Download Graph
                </Button>
              </Flex>
              {/* Main Price Chart */}
              <Box
                h="400px"
                w="100%"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                borderBottomRadius="none"
                p={4}
                overflow="hidden"
                bg="white"
              >

                <ResponsiveContainer width="100%" height="100%">

                  {renderChart()}
                </ResponsiveContainer>
              </Box>


            </Box>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default SharePriceLookup;