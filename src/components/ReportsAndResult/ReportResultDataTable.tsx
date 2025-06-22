import React, { useState, useMemo } from 'react';
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
            return `AED ${value.toFixed(1)}M`;
        case 'percentage':
            return `${value.toFixed(1)}%`;
        case 'number':
            return value.toFixed(1);
        default:
            return value.toString();
    }
};

export const DataTable: React.FC<DataTableProps> = ({ data, columns, title }) => {
    const [selectedYears, setSelectedYears] = useState<string[]>(['2022', '2023', '2024']);

   
    const availableYears = useMemo(() => {
        const years = new Set(
            data.map(item => {
                const year = item.period?.match(/\d{4}/)?.[0];
                return year;
            }).filter(Boolean)
        );
        return Array.from(years).sort();
    }, [data]);

    const filteredData = useMemo(() => {
        if (selectedYears.length === 0) return data;

        return data.filter(item => {
            const year = item.period?.match(/\d{4}/)?.[0];
            return year && selectedYears.includes(year);
        });
    }, [data, selectedYears]);

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
                {/* Header */}
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
                            <Table.Row bg="gray.50">
                                {columns.map((column) => (
                                    <Table.ColumnHeader
                                        key={column.key}
                                        fontWeight="600"
                                        color="gray.600"
                                        py={3}
                                        px={4}
                                    >
                                        {column.header}
                                    </Table.ColumnHeader>
                                ))}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {filteredData.map((row, index) => (
                                <Table.Row
                                    key={index}
                                    _hover={{ bg: "gray.50" }}
                                    transition="background-color 0.2s"
                                >
                                    {columns.map((column) => (
                                        <Table.Cell
                                            key={column.key}
                                            py={3}
                                            px={4}
                                            color="gray.700"
                                        >
                                            {formatValue(row[column.key], column.format)}
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