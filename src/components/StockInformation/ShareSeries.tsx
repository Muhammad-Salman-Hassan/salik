import React from "react";
import { Box, Flex, Table } from "@chakra-ui/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { shareSeriesDummyData } from "../../util/DummyData";

const ShareSeries: React.FC = () => {
  const tableData: { label: string; value: string | number }[] = shareSeriesDummyData
  return (
    <Box maxW="100%" mx="auto"  bg="white"
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
      <Table.Root size="sm" variant="outline">
        <Table.Header bg="teal">
          <Table.Row>
            <Table.ColumnHeader minW="200px" color="white">Share snapshot</Table.ColumnHeader>
            <Table.ColumnHeader minW="200px" textAlign="end" color="white">
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
