import React, { useState, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Input,
  Table,
  Checkbox,
  RadioGroup,
  Tabs,
  NativeSelect,
} from "@chakra-ui/react";
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
  ComposedChart,
  Area,
  Brush,
} from "recharts";
import { FaCaretUp, FaCaretDown, FaChartArea, FaDatabase } from "react-icons/fa";
import { performanceDummyData, performanceDummyDataByYear, sharesDummyData, stockDummyData, tradeDummyData } from "../../util/DummyData";
import { ChartControls, PerformanceData, StockDataPoint, StockInfo } from "../../util/Interface";
import { GiTrade } from "react-icons/gi";
import { GrDocumentPerformance } from "react-icons/gr";

const ShareGraph: React.FC = () => {
  const [stockInfo] = useState<StockInfo>({
    symbol: "Salik",
    name: "Salik",
    last: 5.51,
    high: 5.59,
    low: 5.47,
    change: -0.09,
    changePercent: -1.61,
    bid: 5.5,
    ask: 5.51,
    volume: 5151734,
  });

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

  const stockData: StockDataPoint[] = stockDummyData
  const shareData: { name: string; data: string }[] = sharesDummyData
  const tradeData: { volume: string; last: string; time: string }[] = tradeDummyData
  const performanceData: PerformanceData[] = performanceDummyData
  const [selectedPeriod, setSelectedPeriod] = useState<string>("normal");
  const performaceSelectOptions: { value: string; label: string }[] = [
    { value: "normal", label: "Share price development" },
    { value: "byYears", label: "Share price development by years" },
  ];
  const performanceDataByYrs: PerformanceData[] = performanceDummyDataByYear



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

  const updateControl = (key: keyof ChartControls, value: any) => {
    console.log(key, value);
    setControls((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateNestedControl = (parent: string, key: string, value: boolean) => {
    setControls((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof ChartControls],
        [key]: value,
      },
    }));
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

  const renderChart = (controll: boolean) => {
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
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0c5d56" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#008080" stopOpacity={0} />
          </linearGradient>

        </defs>

        {controll && (
          <Brush dataKey="date" height={30} stroke="#008080" />

        )}

        {controls.chartType === "mountain" && (
          <Area
            type="monotone"
            dataKey="close"
            stroke="#008080"
            fillOpacity={0.2}
            fill="url(#colorUv)"
          />
        )}

        {controls.chartType === "bar" && <Bar dataKey="close" fill="#4A5568" />}

        {(controls.chartType === "line" ||
          controls.chartType === "candlestick") && (
            <Line
              type="monotone"
              dataKey="close"
              stroke="#0c5d56"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              fill="url(#colorUv)"

            />
          )}

      
        {controls.showMovingAverages.ma10 && (
          <Line
            type="monotone"
            dataKey="ma10"
            stroke="#FF6B6B"
            strokeWidth={1}
            dot={false}
            fill="url(#colorUv)"
          />
        )}
        {controls.showMovingAverages.ma20 && (
          <Line
            type="monotone"
            dataKey="ma20"
            stroke="#4ECDC4"
            strokeWidth={1}
            dot={false}
            fill="url(#colorUv)"
          />
        )}
        {controls.showMovingAverages.ma50 && (
          <Line
            type="monotone"
            dataKey="ma50"
            stroke="#45B7D1"
            strokeWidth={1}
            dot={false}
            fill="url(#colorUv)"
          />
        )}
      </ChartComponent>
    );
  };

  const getTextColor = (change: number | null | undefined) => {
    if (change && change > 0) {
      return "green";
    } else if (change && change < 0) {
      return "red";
    } else {
      return "black";
    }
  };
  return (
    <Box mx="auto" p={6}  bg="white"
  
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
        Date & Time: 18 June 2025 13:58 (GMT+04:00)
      </Text>


      <Box mb={6} overflowX="auto">
        <Table.Root variant="outline" size="sm" >
          <Table.Header bg="teal">
            <Table.Row>
              <Table.ColumnHeader color="white">Share (AED)</Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">
                Last
              </Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">
                High
              </Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">
                Low
              </Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">
                (+/-)
              </Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">
                %
              </Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">
                Bid
              </Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">
                Ask
              </Table.ColumnHeader>
              <Table.ColumnHeader color="white" textAlign="center">
                Volume
              </Table.ColumnHeader>
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
      <Tabs.Root variant="enclosed" fitted defaultValue={"graph"} colorPalette="teal" >
        <Tabs.List flexDirection={{ base: 'column', md: 'row' }}
          overflowX={{ base: 'visible' }}
          flexWrap="nowrap"
          background="teal.700">
          <Tabs.Trigger value="graph" color="white"
            bg="transparent"
            borderRadius="md"
            px={4}
            py={3}
            fontSize="sm"
            fontWeight="medium"
            transition="all 0.2s"

            _selected={{
              bg: "white",
              color: "teal.600",
              fontWeight: "semibold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}><FaChartArea size={20}/>Share Graph</Tabs.Trigger>
          <Tabs.Trigger value="data" color="white"
            bg="transparent"
            borderRadius="md"
            px={4}
            py={3}
            fontSize="sm"
            fontWeight="medium"
            transition="all 0.2s"

            _selected={{
              bg: "white",
              color: "teal.600",
              fontWeight: "semibold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}><FaDatabase size={20}/>Share Data</Tabs.Trigger>
          <Tabs.Trigger value="trades" color="white"
            bg="transparent"
            borderRadius="md"
            px={4}
            py={3}
            fontSize="sm"
            fontWeight="medium"
            transition="all 0.2s"

            _selected={{
              bg: "white",
              color: "teal.600",
              fontWeight: "semibold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}><GiTrade size={20}/>Trades</Tabs.Trigger>
          <Tabs.Trigger value="performance" color="white"
            bg="transparent"
            borderRadius="md"
            px={4}
            py={3}
            fontSize="sm"
            fontWeight="medium"
            transition="all 0.2s"

            _selected={{
              bg: "white",
              color: "teal.600",
              fontWeight: "semibold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}><GrDocumentPerformance size={20} />Performance</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="graph">
          <Box bg="white"
            p={4}
            mb={4}
            borderRadius="xl"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
            border="1px solid"
            borderColor="gray.100"
            transition="all 0.3s ease"
            _hover={{
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              transform: "translateY(-2px)"
            }}>
            <RadioGroup.Root
              value={controls.timeRange}
              onValueChange={(e) => updateControl("timeRange", e.value)}
            >
              <Flex align="center" gap={4} mb={4} wrap="wrap">
                {[
                  { value: "1day", label: "1 day" },
                  { value: "5days", label: "5 days" },
                  { value: "3months", label: "3 months" },
                  { value: "6months", label: "6 months" },
                  { value: "1year", label: "1 year" },
                  { value: "3years", label: "3 years" },
                  { value: "custom", label: "Custom range" },
                ].map((option) => (
                  <RadioGroup.Item key={option.value} value={option.value}>
                
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemText fontSize="sm">
                      {option.label}
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </Flex>
            </RadioGroup.Root>

            <Box p={2} bg="gray.50" borderRadius="md">
              <Text fontSize="sm">
                22/05/2025{" "}
                <Text as="span" fontWeight="bold">
                  ■ Salik
                </Text>{" "}
                Open:
                <Text as="span" fontWeight="bold" color={"green.700"}>
                  5.50
                </Text>{" "}
                | High:
                <Text as="span" fontWeight="bold" color={"red.600"}>
                  5.65
                </Text>{" "}
                | Low:
                <Text as="span" fontWeight="bold">
                  5.47
                </Text>{" "}
                | Close:
                <Text as="span" fontWeight="bold">
                  5.60
                </Text>
              </Text>
            </Box>
          </Box>

          <Box
            h="400px"
            mb={4}

            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={2}
          >
            <ResponsiveContainer width="100%" height="100%">
              {renderChart(controls.lowerGraphs.hideShowVolume)}
            </ResponsiveContainer>
          </Box>



     
          <Flex gap={2} mb={4}>
            <Button bg="#53565a" color="white" size="sm">
              Detach Graph
            </Button>
            <Button bg="#53565a" color="white" size="sm">
              Download to Excel
            </Button>
            <Button bg="#53565a" color="white" size="sm">
              Print
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
           
            <Box>
              <Text fontWeight="bold" mb={2}>
                Indicators
              </Text>
              <VStack align="start" gap={1}>
                {Object.entries(controls.indicators).map(([key, value]) => (
                  <Checkbox.Root
                    key={key}
                    checked={value}
                    onCheckedChange={(details) =>
                      updateNestedControl("indicators", key, details.checked)
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label fontSize="sm" textTransform="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </VStack>
            </Box>

          
            <Box>
              <Text fontWeight="bold" mb={2}>
                Moving averages
              </Text>
              <VStack align="start" gap={1}>
                {Object.entries(controls.showMovingAverages).map(
                  ([key, value]) => (
                    <Checkbox.Root
                      key={key}
                      checked={value}
                      onCheckedChange={(details) =>
                        updateNestedControl(
                          "showMovingAverages",
                          key,
                          details.checked
                        )
                      }
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label fontSize="sm">
                        {key.replace("ma", "")} days
                      </Checkbox.Label>
                    </Checkbox.Root>
                  )
                )}
              </VStack>
              <Input placeholder="Insert period" size="sm" mt={2} />
            </Box>

        
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
                  {[
                    { value: "line", label: "Line Graph" },
                    { value: "bar", label: "Bar" },

                    { value: "mountain", label: "Mountain" },
                  ].map((option) => (
                    <RadioGroup.Item key={option.value} value={option.value}>
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemText fontSize="sm">
                        {option.label}
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </VStack>
              </RadioGroup.Root>
            </Box>

          
            <Box>
              <Text fontWeight="bold" mb={2}>
                Lower graphs
              </Text>
              <VStack align="start" gap={1}>
                {Object.entries(controls.lowerGraphs).map(([key, value]) => (
                  <Checkbox.Root
                    key={key}
                    checked={value}
                    onCheckedChange={(details) =>
                      updateNestedControl("lowerGraphs", key, details.checked)
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label fontSize="sm" textTransform="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </VStack>

              <Text fontWeight="bold" mt={4} mb={2}>
                Indices
              </Text>
              <VStack align="start" gap={1}>
                {Object.entries(controls.indices).map(([key, value]) => (
                  <Checkbox.Root
                    key={key}
                    checked={value}
                    onCheckedChange={(details) =>
                      updateNestedControl("indices", key, details.checked)
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label fontSize="sm">
                      {key === "dfmIndustrials"
                        ? "DFM Industrials"
                        : "DFM General Index"}
                    </Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </VStack>
            </Box>
          </SimpleGrid>
        </Tabs.Content>
        <Tabs.Content value="data">
          <Table.Root size="sm">
            <Table.Body>
              {shareData.map((item) => (
                <Table.Row key={item.name}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell textAlign="end">{item.data}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Tabs.Content>
        <Tabs.Content value="trades">
          <Table.Root size="sm" variant="outline">
            <Table.Header bg="teal" color="white">
              <Table.Row >
                <Table.ColumnHeader minW="200px" color="white">Time</Table.ColumnHeader>
                <Table.ColumnHeader minW="200px" textAlign="end" color="white">
                  Last
                </Table.ColumnHeader>
                <Table.ColumnHeader minW="200px" textAlign="end" color="white">
                  Volume
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tradeData.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.time}</Table.Cell>
                  <Table.Cell textAlign="end">{item.last}</Table.Cell>
                  <Table.Cell textAlign="end">{item.volume}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

        </Tabs.Content>
        <Tabs.Content value="performance">
          <Flex justify="end" align="center" mb={4}>
            <NativeSelect.Root size="sm" width="240px">
              <NativeSelect.Field
                value={selectedPeriod}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedPeriod(e.target.value)
                }
              >
                {performaceSelectOptions.map((items, index) => (
                  <option value={items.value} key={index}>
                    {items.label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Flex>
          {selectedPeriod == "normal" ? (
            <Table.Root size="sm" variant="outline">
              <Table.Header bg="teal">
                <Table.Row>
                  <Table.ColumnHeader minW="200px" color="white">
                    Instrument
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end" color="white">
                    1M change %
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end" color="white">
                    3M change %
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end" color="white">
                    52W change %
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end" color="white">
                    5 years change %
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end" color="white">
                    52W high & low
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {performanceData.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{item.instrument}</Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      color={getTextColor(item.change_1m)}
                    >
                      <Flex gap="2" align="center" justify={"end"}>
                        {item.change_1m
                          ? `${item.change_1m.toFixed(2)}% `
                          : "N/A"}
                        {item.change_1m && item.change_1m > 0 ? (
                          <FaCaretUp color="green" />
                        ) : (
                          <FaCaretDown color="red" />
                        )}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      color={getTextColor(item.change_3m)}
                    >
                      <Flex gap="2" align="center" justify={"end"}>
                        {item.change_3m
                          ? `${item.change_3m.toFixed(2)}% `
                          : "N/A"}
                        {item.change_3m && item.change_3m > 0 ? (
                          <FaCaretUp color="green" />
                        ) : (
                          <FaCaretDown color="red" />
                        )}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      color={getTextColor(item.change_52w)}
                    >
                      <Flex gap="2" align="center" justify={"end"}>
                        {item.change_52w
                          ? `${item.change_52w.toFixed(2)}% `
                          : "N/A"}
                        {item.change_52w && item.change_52w > 0 ? (
                          <FaCaretUp color="green" />
                        ) : (
                          <FaCaretDown color="red" />
                        )}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      color={getTextColor(item.change_5yrs)}
                    >
                      <Flex gap="2" align="center" justify={"end"}>
                        {item.change_5yrs
                          ? `${item.change_5yrs.toFixed(2)}% `
                          : "N/A"}
                        {item.change_5yrs && item.change_5yrs > 0 ? (
                          <FaCaretUp color="green" />
                        ) : (
                          <FaCaretDown color="red" />
                        )}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      <Flex gap="0" direction="column">
                        <div>H: {item.high_52w}</div>
                        <div>L: {item.low_52w}</div>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader minW="200px">
                    Instrument
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end">
                    2025
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end">
                    2024
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end">
                    2023
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end">
                    2022
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end">
                    2021
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {performanceDataByYrs.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{item.instrument}</Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      color={getTextColor(item.change_2025)}
                    >
                      <Flex gap="2" align="center" justify={"end"}>
                        {item.change_2025
                          ? `${item.change_2025.toFixed(2)}% `
                          : "N/A"}
                        {item.change_2025 && item.change_2025 > 0 ? (
                          <FaCaretUp color="green" />
                        ) : (
                          <FaCaretDown color="red" />
                        )}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      color={getTextColor(item.change_2024)}
                    >
                      <Flex gap="2" align="center" justify={"end"}>
                        {item.change_2024
                          ? `${item.change_2024.toFixed(2)}% `
                          : "N/A"}
                        {item.change_2024 && item.change_2024 > 0 ? (
                          <FaCaretUp color="green" />
                        ) : (
                          <FaCaretDown color="red" />
                        )}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      color={getTextColor(item.change_2023)}
                    >
                      <Flex gap="2" align="center" justify={"end"}>
                        {item.change_2023
                          ? `${item.change_2023.toFixed(2)}% `
                          : "N/A"}
                        {item.change_2023 && item.change_2023 > 0 ? (
                          <FaCaretUp color="green" />
                        ) : (
                          <FaCaretDown color="red" />
                        )}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      color={getTextColor(item.change_2022)}
                    >
                      <Flex gap="2" align="center" justify={"end"}>
                        {item.change_2022
                          ? `${item.change_2022.toFixed(2)}% `
                          : "N/A"}
                        {item.change_2022 &&
                          (item.change_2022 > 0 ? (
                            <FaCaretUp color="green" />
                          ) : (
                            <FaCaretDown color="red" />
                          ))}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      color={getTextColor(item.change_2021)}
                    >
                      <Flex gap="2" align="center" justify={"end"}>
                        {item.change_2021
                          ? `${item.change_2021.toFixed(2)}% `
                          : "N/A"}
                        {item.change_2021 &&
                          (item.change_2021 > 0 ? (
                            <FaCaretUp color="green" />
                          ) : (
                            <FaCaretDown color="red" />
                          ))}
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default ShareGraph;
