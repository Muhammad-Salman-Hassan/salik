import React from 'react';
import {
    Box,
    Text,
    Table,
} from '@chakra-ui/react';

import { RecommendationsTableProps } from '../../util/Interface';
const RecommendationsTable: React.FC<RecommendationsTableProps> = ({
    data,
    title = "Recommendations"
}) => {
    return (
        <Box w="full" mb={8}>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
                {title}
            </Text>

            <Table.Root  size="sm" variant="outline">
                <Table.Header bg="#008080">
                    <Table.Row bg="#008080">
                        <Table.ColumnHeader color="white" py={3}></Table.ColumnHeader>
                        {data.map((period, index) => (
                            <Table.ColumnHeader key={index} color="white" textAlign="center" py={3}>
                                {period.period}
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {/* Average Row */}
                    <Table.Row bg="gray.50">
                        <Table.Cell fontWeight="semibold" py={3}>Average</Table.Cell>
                        {data.map((period, index) => (
                            <Table.Cell key={index} textAlign="center" py={3}>
                                {period.average.toFixed(2)}
                            </Table.Cell>
                        ))}
                    </Table.Row>

                    {/* Buy Row */}
                    <Table.Row>
                        <Table.Cell py={3}>1 Buy</Table.Cell>
                        {data.map((period, index) => (
                            <Table.Cell key={index} textAlign="center" py={3}>
                                {period.buy}
                            </Table.Cell>
                        ))}
                    </Table.Row>

                    {/* Outperform Row */}
                    <Table.Row bg="gray.50">
                        <Table.Cell py={3}>2 Outperform</Table.Cell>
                        {data.map((period, index) => (
                            <Table.Cell key={index} textAlign="center" py={3}>
                                {period.outperform}
                            </Table.Cell>
                        ))}
                    </Table.Row>

                    {/* Hold Row */}
                    <Table.Row>
                        <Table.Cell py={3}>3 Hold</Table.Cell>
                        {data.map((period, index) => (
                            <Table.Cell key={index} textAlign="center" py={3}>
                                {period.hold}
                            </Table.Cell>
                        ))}
                    </Table.Row>

                    {/* Underperform Row */}
                    <Table.Row bg="gray.50">
                        <Table.Cell py={3}>4 Underperform</Table.Cell>
                        {data.map((period, index) => (
                            <Table.Cell key={index} textAlign="center" py={3}>
                                {period.underperform}
                            </Table.Cell>
                        ))}
                    </Table.Row>

                    {/* Sell Row */}
                    <Table.Row>
                        <Table.Cell py={3}>5 Sell</Table.Cell>
                        {data.map((period, index) => (
                            <Table.Cell key={index} textAlign="center" py={3}>
                                {period.sell}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </Box>
    );
};


export default RecommendationsTable;