import React, { useState } from 'react';
import {
    Box,
    Card,
    Text,
    VStack,
    HStack,
    Container,
    SimpleGrid,
    Badge,
    IconButton,
    Flex,
    Heading,
    Button,
    Collapsible,
} from '@chakra-ui/react';
import {
    FiDownload,
    FiFileText,
    FiBarChart,
    FiFolder,
    FiChevronUp,
    FiChevronDown,
    FiCalendar,
    FiExternalLink
} from 'react-icons/fi';
import { dummyPeriodDataResult } from '../../util/DummyData';
import { Document, ReportProps, YearData } from '../../util/Interface';





const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
        case 'earnings':
            return FiBarChart;
        case 'datasheet':
            return FiFileText;
        case 'financial':
            return FiBarChart;
        case 'presentation':
            return FiBarChart;
        case 'all':
            return FiFolder;
        default:
            return FiFileText;
    }
};

const getDocumentTypeLabel = (type: Document['type']) => {
    switch (type) {
        case 'earnings':
            return 'Earnings Release';
        case 'datasheet':
            return 'Datasheet';
        case 'financial':
            return 'Financial Statements';
        case 'presentation':
            return 'Presentation';
        case 'all':
            return 'All Files';
        default:
            return 'Document';
    }
};

const FinancialDocuments: React.FC<ReportProps> = ({ data }) => {
    const [expandedYears, setExpandedYears] = useState<string[]>(['2025']);
    const [expandedPeriods, setExpandedPeriods] = useState<string[]>(['']);

    const toggleYear = (year: string) => {
        setExpandedYears(prev =>
            prev.includes(year)
                ? prev.filter(y => y !== year)
                : [...prev, year]
        );
    };

    const togglePeriod = (period: string) => {
        setExpandedPeriods(prev =>
            prev.includes(period)
                ? prev.filter(p => p !== period)
                : [...prev, period]
        );
    };

    const handleDownload = (document: Document) => {
        const link = window.document.createElement('a');
        link.href = document.url;
        link.download = `${document.name}.pdf`;
        link.target = '_blank';
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
    };

    const DocumentItem: React.FC<{ document: Document; periodColor: string }> = ({
        document,
        periodColor
    }) => {
        const Icon = getDocumentIcon(document.type);

        return (
            <Card.Root
                p={4}
                bg="white"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                transition="all 0.2s"
                _hover={{
                    borderColor: `${periodColor}.300`,
                    boxShadow: "md",
                    transform: "translateY(-1px)"
                }}
                cursor="pointer"
            >
                <Flex justify="space-between" align="start">
                    <HStack gap={3} flex={1}>
                        <Box
                            p={2}
                            bg={`${periodColor}.50`}
                            borderRadius="md"
                            color={`${periodColor}.600`}
                        >
                            <Icon size={20} />
                        </Box>

                        <VStack align="start" gap={1} flex={1}>
                            <HStack gap={2}>
                                <Text fontWeight="semibold" fontSize="sm" lineHeight="1.2">
                                    {getDocumentTypeLabel(document.type)}
                                </Text>
                                {document.isNew && (
                                    <Badge colorScheme="green" size="sm">
                                        New
                                    </Badge>
                                )}
                            </HStack>

                            <HStack gap={4} fontSize="xs" color="gray.600">
                                <Text>{document.size}</Text>
                                <Text>{document.downloadCount.toLocaleString()} downloads</Text>
                            </HStack>
                        </VStack>
                    </HStack>

                    <HStack gap={2}>
                        <IconButton
                            size="sm"
                            variant="ghost"
                            colorScheme={periodColor}
                            aria-label="View document"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(document.url, '_blank');
                            }}
                        >
                            <FiExternalLink size={16} />
                        </IconButton>

                        <IconButton
                            size="sm"
                            variant="outline"
                            colorScheme={periodColor}
                            aria-label="Download document"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(document);
                            }}
                            _hover={{
                                bg: `${periodColor}.50`
                            }}
                        >
                            <FiDownload size={16} />
                        </IconButton>
                    </HStack>
                </Flex>
            </Card.Root>
        );
    };

    return (
        <Box bg="white"
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
            <VStack gap={8} align="stretch">

                <Box textAlign="start">
                    <Heading size="lg" mb={2} color="gray.800">
                        Financial Documents
                    </Heading>
                    <Text color="gray.600" fontSize="md">
                        Access quarterly and annual financial reports, presentations, and data sheets
                    </Text>
                </Box>


                {data.map((yearData) => (
                    <VStack key={yearData.year} gap={6} align="stretch">

                        <Flex justify="space-between" align="center" py={4}>
                            <HStack gap={3}>
                                <FiCalendar color="gray.600" size={20} />
                                <Heading size="md" color="gray.700">
                                    {yearData.year}
                                </Heading>
                                <Badge colorScheme="blue" variant="subtle">
                                    {yearData.periods.length} periods
                                </Badge>
                            </HStack>

                            <Button
                                variant="ghost"
                                size="sm"
                                color="gray.600"
                                onClick={() => toggleYear(yearData.year)}

                            >
                                {expandedYears.includes(yearData.year) ? <FiChevronUp /> : <FiChevronDown />} {expandedYears.includes(yearData.year) ? 'Collapse Year' : 'Expand Year'}
                            </Button>
                        </Flex>


                        <Collapsible.Root open={expandedYears.includes(yearData.year)}>
                            <Collapsible.Content>
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                                    {yearData.periods.map((periodData) => (
                                        <Card.Root
                                            key={periodData.period}
                                            bg="gray.50"
                                            borderRadius="xl"
                                            overflow="hidden"
                                            border="1px solid"
                                            borderColor="gray.200"
                                            transition="all 0.3s"
                                            _hover={{
                                                boxShadow: "lg",
                                                transform: "translateY(-2px)"
                                            }}
                                        >

                                            <Box
                                                bg={`teal`}
                                                color="white"
                                                p={6}
                                                textAlign="center"

                                            >


                                                <Text
                                                    fontSize="lg"
                                                    fontWeight="bold"
                                                    position="relative"
                                                    zIndex={2}
                                                >
                                                    {periodData.period}
                                                </Text>
                                            </Box>

                                            <Collapsible.Root open={expandedPeriods.includes(periodData.period)}>
                                                <Collapsible.Content>
                                                    <VStack gap={3} p={4} align="stretch">
                                                        {periodData.documents.map((document) => (
                                                            <DocumentItem
                                                                key={document.id}
                                                                document={document}
                                                                periodColor={periodData.color}
                                                            />
                                                        ))}
                                                    </VStack>
                                                </Collapsible.Content>
                                            </Collapsible.Root>


                                            <Box p={4} pt={expandedPeriods.includes(periodData.period) ? 0 : 4}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    width="full"
                                                    colorScheme={periodData.color}
                                                    rightIcon={
                                                        expandedPeriods.includes(periodData.period)
                                                            ? <FiChevronUp />
                                                            : <FiChevronDown />
                                                    }
                                                    onClick={() => togglePeriod(periodData.period)}
                                                >
                                                    {expandedPeriods.includes(periodData.period) ? 'Show Less' : 'Show More'}
                                                </Button>
                                            </Box>
                                        </Card.Root>
                                    ))}
                                </SimpleGrid>
                            </Collapsible.Content>
                        </Collapsible.Root>
                    </VStack>
                ))}


            </VStack>
        </Box>

    );
};

export default FinancialDocuments;