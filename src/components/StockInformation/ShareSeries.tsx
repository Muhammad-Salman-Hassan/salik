import React from "react";
import { Box, Flex, Table } from "@chakra-ui/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ShareSeries: React.FC = () => {
  const tableData: { label: string; value: string | number }[] = [
    { label: "Time", value: "18/06/2025 14:57 (GMT+04:00)" },
    { label: "Currency", value: "AED" },
    { label: "Market", value: "Dubai" },
    { label: "ISIN", value: "AEE01110S227" },
    { label: "Industry", value: "Transportation" },
    { label: "Symbol", value: "SALIK" },
    { label: "Bid", value: 5.49 },
    { label: "Ask", value: 5.54 },
    { label: "Open", value: 5.59 },
    { label: "Last", value: 5.5 },
    { label: "Change +/-", value: -0.1 },
    { label: "Change %", value: -1.79 },
    { label: "High", value: 5.59 },
    { label: "Low", value: 5.47 },
    { label: "Volume", value: 6605615 },
    { label: "Previous Close", value: 5.6 },
    { label: "52 Weeks High", value: 5.99 },
    { label: "52 Weeks Low", value: 3.26 },
    { label: "YTD %", value: 3.7 },
    { label: "52 Weeks %", value: 69.7 },
    { label: "Number of Shares", value: 7500000000 },
    { label: "Market Cap (AED Million)", value: 41250.0 },
  ];
  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader minW="200px">Share snapshot</Table.ColumnHeader>
            <Table.ColumnHeader minW="200px" textAlign="end">
              Salik
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.label}</Table.Cell>
              <Table.Cell textAlign="end">
                {item.label.includes("%") || item.label.includes("Change") ? (
                  <Flex
                    gap="2"
                    align="center"
                    justify={"end"}
                    color={Number(item.value) > 0 ? "green" : "red"}
                  >
                    {item.value}
                    {item.value &&
                      (Number(item.value) > 0 ? (
                        <FaCaretUp color="green" />
                      ) : (
                        <FaCaretDown color="red" />
                      ))}
                  </Flex>
                ) : (
                  item.value
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ShareSeries;
