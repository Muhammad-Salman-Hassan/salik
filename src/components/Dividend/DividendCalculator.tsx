import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    VStack,
    HStack,
    Input,
    SimpleGrid,
    Select,
    Portal,
    createListCollection,
} from '@chakra-ui/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts';
import { MdCalendarToday, MdPrint, MdDownload, MdClose } from 'react-icons/md';
import { ApiResponse, CalculationInputs, DividendCalculatorProps } from '../../util/Interface';



const DividendCalculator: React.FC<DividendCalculatorProps> = ({
    onCalculate,
    isLoading = false
}) => {
    const [inputs, setInputs] = useState<CalculationInputs>({
        dateOfInvestment: '29/09/2022',
        endDateOfInvestment: '18/06/2025',
        amountInvested: '2220',
        sharesPurchased: '1000',
        currency: 'Local Currency'
    });

    const [results, setResults] = useState<ApiResponse | null>(null);
    const [showResults, setShowResults] = useState(false);

    const sharePrice = React.useMemo(() => {
        const amount = parseFloat(inputs.amountInvested) || 0;
        const shares = parseFloat(inputs.sharesPurchased) || 1;
        return amount / shares;
    }, [inputs.amountInvested, inputs.sharesPurchased]);

    const handleInputChange = (field: keyof CalculationInputs, value: string) => {
        setInputs(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCalculate = async () => {
        if (onCalculate) {
            try {
                const response = await onCalculate(inputs);
                setResults(response);
                setShowResults(true);
            } catch (error) {
                console.error('Calculation error:', error);
            }
        } else {

            const mockResponse: ApiResponse = {
                investment: 2220,
                dividendsPaidOut: 5,
                dividendsFrequency: "Semi-Annual (2), Semi-Annual (3)",
                reinvested: {
                    dividendsTotal: 384,
                    yieldOnInvestment: 17.31,
                    annualizedYield: 6.04,
                    endShares: 1106,
                    totalReturn: 178.99
                },
                cashedOut: {
                    dividendsTotal: 367,
                    yieldOnInvestment: 16.54,
                    annualizedYield: 5.79,
                    endShares: 1000,
                    totalReturn: 168.79
                },
                chartData: [
                    { year: '2023', reinvested: 135, cashedOut: 135 },
                    { year: '2024', reinvested: 150, cashedOut: 150 },
                    { year: '2025', reinvested: 85, cashedOut: 85 }
                ]
            };
            setResults(mockResponse);
            setShowResults(true);
        }
    };

    const handleReset = () => {
        setResults(null);
        setShowResults(false);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExport = (format: 'jpg' | 'pdf') => {
        console.log(`Exporting as ${format.toUpperCase()}`);

    };

    const frameworks = createListCollection({
        items: [
            { label: "USD", value: "USD" },
            { label: "PKR", value: "PKR" }

        ],
    })
    return (
        <Box w="full" p={6} bg="gray.50" minH="100vh">
            <VStack align="stretch" gap={6} maxW="1200px" mx="auto">

                <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>

                        <VStack align="stretch" gap={4}>
                            <Box>
                                <Text mb={2} fontWeight="medium">Date of investment</Text>
                                <HStack>
                                    <Input
                                        value={inputs.dateOfInvestment}
                                        onChange={(e) => handleInputChange('dateOfInvestment', e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                    />
                                    <Button variant="outline" size="sm">
                                        <MdCalendarToday />
                                    </Button>
                                </HStack>
                            </Box>

                            <Box mt={4}>
                                <Text mb={2} fontWeight="medium">End date of investment</Text>
                                <HStack>
                                    <Input
                                        value={inputs.endDateOfInvestment}
                                        onChange={(e) => handleInputChange('endDateOfInvestment', e.target.value)}
                                        placeholder="DD/MM/YYYY"

                                    />
                                    <Button variant="outline" size="sm">
                                        <MdCalendarToday />
                                    </Button>
                                </HStack>
                            </Box>



                            <Box>
                                <Select.Root collection={frameworks} size="sm" width="100%" >
                                    <Select.HiddenSelect />
                                    <Select.Label>Select Currency</Select.Label>
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="Select Currency" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {frameworks.items.map((framework) => (
                                                    <Select.Item item={framework} key={framework.value}>
                                                        {framework.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                                {/* <Select
                                    value={inputs.currency}
                                    onChange={(e) => handleInputChange('currency', e.target.value)}
                                >
                                    <option value="Local Currency">Local Currency</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="AED">AED</option>
                                </Select> */}
                            </Box>
                        </VStack>


                        <VStack align="stretch" >
                            <Box>
                                <Text mb={2} fontWeight="medium">Shares purchased</Text>
                                <Input
                                    type="number"
                                    value={inputs.sharesPurchased}
                                    onChange={(e) => handleInputChange('sharesPurchased', e.target.value)}
                                />
                                <Text fontSize="sm" color="gray.600" mt={1}>
                                    Share Price {sharePrice.toFixed(2)} AED
                                </Text>
                            </Box>
                            <Box>
                                <Text mb={2} fontWeight="medium">Amount invested</Text>
                                <HStack>
                                    <Input
                                        type="number"
                                        value={inputs.amountInvested}
                                        onChange={(e) => handleInputChange('amountInvested', e.target.value)}
                                    />

                                </HStack>
                            </Box>
                            <Box pt={8}>
                                <Flex alignItems="flex-end" justifyContent="flex-end">
                                    <Button
                                        bg="#008080"
                                        color="white"
                                        size="lg"
                                        w="200px"
                                        onClick={handleCalculate}

                                        loading={isLoading}
                                        loadingText="Calculating..."
                                        _hover={{ bg: "#404347" }}
                                    >
                                        Calculate
                                    </Button>
                                </Flex>
                            </Box>
                        </VStack>
                    </SimpleGrid>
                </Box>


                {showResults && results && (
                    <Box bg="white" p={6} borderRadius="md" boxShadow="sm" position="relative">
                        <Button
                            position="absolute"
                            top={4}
                            right={4}
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                        >
                            <MdClose />
                        </Button>

                        <VStack align="stretch" gap={6}>

                            <Box>
                                <Text fontSize="lg" fontWeight="bold" mb={2}>
                                    Investment: {results.investment.toLocaleString()} AED
                                </Text>
                                <Text color="gray.600">
                                    Dividends paid out: {results.dividendsPaidOut} times ({results.dividendsFrequency})
                                </Text>
                            </Box>


                            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>

                                <Box bg="blue.50" p={4} borderRadius="md">
                                    <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
                                        Dividends reinvested
                                    </Text>
                                    <VStack align="center" gap={2}>
                                        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                                            {results.reinvested.dividendsTotal} <Text as="span" fontSize="sm">AED</Text>
                                        </Text>
                                        <Text fontSize="sm">
                                            {results.reinvested.yieldOnInvestment.toFixed(2)}%
                                        </Text>
                                        <Text fontSize="sm">
                                            {results.reinvested.annualizedYield.toFixed(2)}%
                                        </Text>
                                        <Text fontSize="sm">
                                            {results.reinvested.endShares}
                                        </Text>
                                        <Text fontSize="lg" fontWeight="bold" color="green.600">
                                            {results.reinvested.totalReturn.toFixed(2)}%
                                        </Text>
                                    </VStack>
                                </Box>

                                {/* Dividends Cashed Out */}
                                <Box bg="green.50" p={4} borderRadius="md">
                                    <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
                                        Dividends cashed out
                                    </Text>
                                    <VStack align="center" gap={2}>
                                        <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                            {results.cashedOut.dividendsTotal} <Text as="span" fontSize="sm">AED</Text>
                                        </Text>
                                        <Text fontSize="sm">
                                            {results.cashedOut.yieldOnInvestment.toFixed(2)}%
                                        </Text>
                                        <Text fontSize="sm">
                                            {results.cashedOut.annualizedYield.toFixed(2)}%
                                        </Text>
                                        <Text fontSize="sm">
                                            {results.cashedOut.endShares}
                                        </Text>
                                        <Text fontSize="lg" fontWeight="bold" color="green.600">
                                            {results.cashedOut.totalReturn.toFixed(2)}%
                                        </Text>
                                    </VStack>
                                </Box>
                            </SimpleGrid>


                            <Box bg="gray.50" p={4} borderRadius="md">
                                <VStack align="start" gap={1}>
                                    <Text fontSize="sm" fontWeight="bold">Dividends (total):</Text>
                                    <Text fontSize="sm">Yield on investment:</Text>
                                    <Text fontSize="sm">Annualized yield on investment:</Text>
                                    <Text fontSize="sm">End number of shares:</Text>
                                    <Text fontSize="sm" fontWeight="bold">Total return:</Text>
                                </VStack>
                            </Box>


                            <Box>
                                <Text fontSize="lg" fontWeight="bold" mb={4}>Dividends</Text>
                                <Box h="400px" bg="white" p={4} borderRadius="md" border="1px solid" borderColor="gray.200">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={results.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                                            <YAxis
                                                label={{ value: 'AED', angle: -90, position: 'insideLeft' }}
                                                tick={{ fontSize: 12 }}
                                            />
                                            <Tooltip
                                                formatter={(value: any, name: string) => [
                                                    `${value} AED`,
                                                    name === 'reinvested' ? 'Dividends with reinvestment' : 'Dividends without reinvestment'
                                                ]}
                                            />
                                            <Legend
                                                payload={[
                                                    { value: 'Dividends with reinvestment', type: 'rect', color: '#53565a' },
                                                    { value: 'Dividends without reinvestment', type: 'rect', color: '#8B8680' }
                                                ]}
                                            />
                                            <Bar dataKey="reinvested" fill="#008080" />
                                            <Bar dataKey="cashedOut" fill="#9cb8c2" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Box>


                            <HStack justify="flex-end" gap={2}>
                                <Button variant="outline" size="sm" onClick={handlePrint}>
                                    <MdPrint /> Print
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleExport('jpg')}>
                                    <MdDownload /> JPG
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                                    <MdDownload /> PDF
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};



export default DividendCalculator;
