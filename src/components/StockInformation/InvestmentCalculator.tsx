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
import { ChartControls, StockDataPoint, StockStat } from "../../util/Interface";
import { investmentStockDummyData, stocckStatsEndDummyData, stockStatsDummyData } from "../../util/DummyData";


const InvestmentCalculator: React.FC = () => {
  const stockData: StockDataPoint[] = investmentStockDummyData

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
              type="linear"
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

  const updateControl = (key: keyof ChartControls, value: any) => {

    setControls((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [hideGraph, setHideGraph] = useState(false);
  const [showShareGraph, setShowShareGraph] = useState(false);

  const stockStats: StockStat[] = stockStatsDummyData
  const stockStatsEnd: StockStat[] = stocckStatsEndDummyData

  return (
    <Box borderTop="1px"  bg="white"
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
      {/* <Container as={Stack} maxW="7xl" py={8}> */}
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
              Calculate
            </Button>
          </Flex>
          {hideGraph && (
            <>
              {" "}
              <Box
              
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
                              {item.value}
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
               
                mt={4}
                borderColor="gray.200"
                borderRadius="md"
                p={2}
              >
                <Flex gap={4}>
                  <Table.Root size="sm" variant="outline">
                    <Table.Header bg={'teal'}>
                      <Table.Row>
                        <Table.ColumnHeader color={"white"}>
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
                              {item.value}
                            </Flex>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                  <Table.Root size="sm" variant="outline" >
                    <Table.Header bg={'teal'}>
                      <Table.Row>
                        <Table.ColumnHeader color={"white"}>
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
      {/* </Container> */}
    </Box>
  );
};

export default InvestmentCalculator;
