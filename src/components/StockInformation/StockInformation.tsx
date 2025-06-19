import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import ShareGraph from "./ShareGraph";
import ShareSeries from "./ShareSeries";
import SharePriceAlertForm from "./ShareAlert";

const StockChart: React.FC = () => {
    return (
        <Box w="full" p={4} >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Stock information
            </Text>
            <Tabs.Root defaultValue="graph" colorPalette="teal" fitted variant="enclosed" >
                <Tabs.List flexDirection={{ base: 'column', md: 'row' }}
                    overflowX={{ base: 'visible' }}
                    flexWrap="nowrap"
                    background="teal">
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
                        }}>Share graph</Tabs.Trigger>
                    <Tabs.Trigger value="Series" color="white"
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
                        }}>Share Series</Tabs.Trigger>
                    <Tabs.Trigger value="Lookup" color="white"
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
                        }}>Share Price Lookup</Tabs.Trigger>
                    <Tabs.Trigger value="Calculator" color="white"
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
                        }}>Investment Calculator</Tabs.Trigger>
                    <Tabs.Trigger value="Alert" color="white"
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
                        }}>Share Alert</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="graph">
                    <ShareGraph />
                </Tabs.Content>
                <Tabs.Content value="Series">
                    <ShareSeries />
                </Tabs.Content>
                <Tabs.Content value="Lookup">
                    Lookup
                </Tabs.Content>
                <Tabs.Content value="Calculator">
                    Lookup
                </Tabs.Content>
                <Tabs.Content value="Alert">
                    <SharePriceAlertForm />
                </Tabs.Content>
                <Flex justify="flex-end">
                    <Box height="10" width="230px" marginTop={22}>
                        Supplied by ©EUROLAND IR Data delayed at least 15 minutes Terms of
                        Service | Cookie Policy
                    </Box>
                </Flex>

            </Tabs.Root>
        </Box>
    );
};

export default StockChart;
