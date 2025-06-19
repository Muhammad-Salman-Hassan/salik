import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import ShareGraph from "./ShareGraph";
import ShareSeries from "./ShareSeries";
import SharePriceAlertForm from "./ShareAlert";

const StockChart: React.FC = () => {
  return (
    <Box w="full" p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Stock information
      </Text>
      <Tabs.Root defaultValue="graph">
        <Tabs.List>
          <Tabs.Trigger value="graph">Share graph</Tabs.Trigger>
          <Tabs.Trigger value="Series">Share Series</Tabs.Trigger>
          <Tabs.Trigger value="Lookup">Share Price Lookup</Tabs.Trigger>
          <Tabs.Trigger value="Calculator">Investment Calculator</Tabs.Trigger>
          <Tabs.Trigger value="Alert">Share Alert</Tabs.Trigger>
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
        {/* content */}
      </Tabs.Root>
    </Box>
  );
};

export default StockChart;
