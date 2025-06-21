import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import ShareGraph from "./ShareGraph";
import ShareSeries from "./ShareSeries";
import SharePriceAlertForm from "./ShareAlert";
import SharePriceLookup from "./SharePriceLookup";
import InvestmentCalculator from "./InvestmentCalculator";
import { MdCandlestickChart, MdPriceChange } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import { BsCalculator } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
const StockChart: React.FC = () => {
    return (
        <Box w="full" h="full" p={{ base: 3, md: 6 }} >

            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Stock information
            </Text>
            <Tabs.Root defaultValue="graph" fitted variant="enclosed" colorPalette="teal">
                <Tabs.List flexDirection={{ base: 'column', md: 'row' }}
                    overflowX={{ base: 'visible' }}
                    flexWrap="nowrap"
                    background="teal">
                    <Tabs.Trigger value="graph" w={{ base: '100%', md: 'auto' }}
                        color="white"
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
                        }}><MdCandlestickChart size={20} />Share graph</Tabs.Trigger>
                    <Tabs.Trigger value="Series" w={{ base: '100%', md: 'auto' }}
                        color="white"
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
                        }}><FaChartSimple />
                        Share Series</Tabs.Trigger>
                    <Tabs.Trigger value="Lookup" w={{ base: '100%', md: 'auto' }}
                        color="white"
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
                        }}><MdPriceChange size={20} />Share Price Lookup</Tabs.Trigger>
                    <Tabs.Trigger value="Calculator" w={{ base: '100%', md: 'auto' }}
                        color="white"
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
                        }}><BsCalculator />Investment Calculator</Tabs.Trigger>
                    <Tabs.Trigger value="Alert" w={{ base: '100%', md: 'auto' }}
                        color="white"
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
                        }}><FaBell size={20} />Share Alert</Tabs.Trigger>
                </Tabs.List>
                {/* <Box flex="1" overflowY="auto" px={{ base: 2, md: 4 }} py={4}> */}
                <Tabs.Content value="graph">
                    <ShareGraph />
                </Tabs.Content>
                <Tabs.Content value="Series">
                    <ShareSeries />
                </Tabs.Content>
                <Tabs.Content value="Lookup">
                    <SharePriceLookup />
                </Tabs.Content>
                <Tabs.Content value="Calculator">
                    <InvestmentCalculator />
                </Tabs.Content>
                <Tabs.Content value="Alert">
                    <SharePriceAlertForm />
                </Tabs.Content>
                {/* </Box> */}
                {/* content */}
            </Tabs.Root>
        </Box>
    );
};

export default StockChart;
