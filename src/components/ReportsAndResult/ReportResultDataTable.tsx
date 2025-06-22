import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Table,
    Heading,
    Checkbox,
    Flex,
    VStack,
    HStack,
    Text
} from '@chakra-ui/react';

interface Column {
    key: string;
    header: string;
    format?: 'currency' | 'percentage' | 'number';
}

interface DataTableProps {
    data: any[];
    columns: Column[];
    title: string;
}

const formatValue = (value: any, format?: string): string => {
    if (value === null || value === undefined) return '-';

    switch (format) {
        case 'currency':
            return `${value.toFixed(1)}`;
        case 'percentage':
            return `${value.toFixed(1)}`;
        case 'number':
            return value.toFixed(1);
        default:
            return value.toString();
    }
};

export const DataTable: React.FC<DataTableProps> = ({ data, columns, title }) => {
    const availableYears = useMemo(() => {
        const years = new Set(
            data.map(item => {
                const year = item.period;
                return year;
            }).filter(Boolean)
        );

        return Array.from(years).sort();
    }, [data]);

    // Initialize with all available years selected
    const [selectedYears, setSelectedYears] = useState<string[]>(availableYears);

    // Update selectedYears when availableYears changes (e.g., when data prop changes)
    useEffect(() => {
        setSelectedYears(availableYears);
    }, [availableYears]);

    const getUnitLabel = (format?: string): string => {
        switch (format) {
            case 'currency':
                return 'AED million';
            case 'percentage':
                return '%';
            case 'number':
                return 'AED million';
            default:
                return '';
        }
    };

    const filteredYears = useMemo(() => {
        return availableYears.filter(year => selectedYears.includes(year));
    }, [availableYears, selectedYears]);

    const dataByYear = useMemo(() => {
        const grouped: { [key: string]: any } = {};
        data.forEach(item => {
            const year = item.period;
            if (year) {
                grouped[year] = item;
            }
        });
        return grouped;
    }, [data]);

    const transposedData = useMemo(() => {
        const metricColumns = columns.filter(col => col.key !== 'period');

        return metricColumns.map(column => {
            const row: any = {
                metric: column.header,
                format: column.format,
                unit: getUnitLabel(column.format)
            };

            filteredYears.forEach(year => {
                const yearData = dataByYear[year];
                row[year] = yearData ? yearData[column.key] : null;
            });

            return row;
        });
    }, [columns, filteredYears, dataByYear]);

    const handleYearToggle = (year: string, checked: boolean) => {
        if (checked) {
            setSelectedYears(prev => [...prev, year]);
        } else {
            setSelectedYears(prev => prev.filter(y => y !== year));
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedYears([...availableYears]);
        } else {
            setSelectedYears([]);
        }
    };

    return (
        <Box
            bg="white"
            borderRadius="xl"
            p={6}
            boxShadow="0 4px 20px rgba(0,0,0,0.1)"
            my={5}
        >
            <VStack align="stretch" gap={5}>
                <Heading
                    size="lg"
                    color="gray.700"
                    fontWeight="600"
                >
                    {title}
                </Heading>

                <Box overflowX="auto">
                    <Table.Root size="sm" variant="outline">
                        <Table.Header>
                            <Table.Row bg="gray.600">
                                <Table.ColumnHeader
                                    fontWeight="600"
                                    color="white"
                                    py={3}
                                    px={4}
                                    minW="200px"
                                    bg={"teal"}
                                >

                                </Table.ColumnHeader>

                                <Table.ColumnHeader
                                    fontWeight="600"
                                    bg={"teal"}
                                    color="white"
                                    py={3}
                                    px={4}
                                    minW="120px"
                                    textAlign="center"
                                >

                                </Table.ColumnHeader>

                                {filteredYears.map((year) => (
                                    <Table.ColumnHeader
                                        key={year}
                                        fontWeight="600"
                                        color="white"
                                        py={3}
                                        px={4}
                                        bg={'teal'}
                                        textAlign="center"
                                    >
                                        {year}
                                    </Table.ColumnHeader>
                                ))}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {transposedData.map((row, index) => (
                                <Table.Row
                                    key={index}
                                    _hover={{ bg: "gray.50" }}
                                    transition="background-color 0.2s"
                                >
                                    <Table.Cell
                                        py={3}
                                        px={4}
                                        color="gray.700"
                                        fontWeight="500"
                                    >
                                        {row.metric}
                                    </Table.Cell>

                                    <Table.Cell
                                        py={3}
                                        px={4}
                                        color="gray.600"
                                        fontStyle="italic"
                                        textAlign="center"
                                    >
                                        {row.unit}
                                    </Table.Cell>

                                    {filteredYears.map((year) => (
                                        <Table.Cell
                                            key={year}
                                            py={3}
                                            px={4}
                                            color="gray.700"
                                            textAlign="center"
                                        >
                                            {formatValue(row[year], row.format)}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>

                <Box>
                    <HStack gap={6} wrap="wrap">
                        <Checkbox.Root
                            checked={selectedYears.length === availableYears.length}
                            onCheckedChange={(details) => handleSelectAll(details.checked)}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label fontWeight="500">All</Checkbox.Label>
                        </Checkbox.Root>

                        {availableYears.map((year) => (
                            <Checkbox.Root
                                key={year}
                                checked={selectedYears.includes(year)}
                                onCheckedChange={(details) => handleYearToggle(year, details.checked)}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                                <Checkbox.Label fontWeight="500">{year}</Checkbox.Label>
                            </Checkbox.Root>
                        ))}
                    </HStack>
                </Box>
            </VStack>
        </Box>
    );
};