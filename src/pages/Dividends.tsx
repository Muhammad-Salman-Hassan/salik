import { Box, Flex, Tabs, Text } from "@chakra-ui/react"
import ShareDividendTable from "../components/Dividend/ShareDividend"
import DividendCalculator from "../components/Dividend/DividendCalculator"
import DividendPerShare from "../components/Dividend/DividendHistory"

const Dividends = () => {
    return (
        <Box minH="100vh" p={{ base: 3, md: 6 }}>
            <Flex
                direction="column"
                maxW={{ base: '100%', md: '90%', lg: '1500px' }}
                mx="auto"
                h="full"
                borderRadius="lg"
                overflow="hidden"
            >
                <Box >

                    <Text fontSize={20} fontWeight="bold" mb={5}>
                        Disclaimer
                    </Text>
                    <Text fontSize={18} fontWeight="light" mb={5}>
                        The Company intends to pay 100% of the net profit available for distribution as dividends twice each fiscal year, in April and October.
                    </Text>
                    <Text fontSize={18} fontWeight="light" mb={5}>
                        This dividend policy is subject to consideration of the Board of the cash management requirements of the Company’s business for operating expenses, interest expense and anticipated capital expenditures and investments.                  </Text>
                    <Text fontSize={18} fontWeight="light" mb={5}>
                        In addition, the Company expects that the Board will also consider market conditions, the then current operating environment in the Company’s markets, and the Board’s outlook for the Company’s business and growth opportunities.                </Text>

                </Box>

                <ShareDividendTable />
            </Flex>
            <Flex
                direction="column"
                maxW={{ base: '100%', md: '90%', lg: '1500px' }}
                mx="auto"
                h="full"
                borderRadius="lg"
                overflow="hidden"
            >
                <Tabs.Root defaultValue="analysts" fitted variant="enclosed" colorPalette="teal">
                    <Tabs.List
                        flexDirection={{ base: 'column', md: 'row' }}
                        overflowX={{ base: 'visible' }}
                        flexWrap="nowrap"
                    >
                        <Tabs.Trigger value="analysts" w={{ base: '100%', md: 'auto' }}>
                            Analyst List with Rating
                        </Tabs.Trigger>
                        <Tabs.Trigger value="consensus" w={{ base: '100%', md: 'auto' }}>
                           Dividend History
                        </Tabs.Trigger>
                        <Tabs.Trigger value="details" w={{ base: '100%', md: 'auto' }}>
                            Dividend Calculator
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Box flex="1" overflowY="auto" px={{ base: 2, md: 4 }} py={4}>
                        <Tabs.Content value="analysts">
                            TEST
                        </Tabs.Content>

                        <Tabs.Content value="consensus">
                           <DividendPerShare/>
                        </Tabs.Content>

                        <Tabs.Content value="details">
                            <DividendCalculator />
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            </Flex>
        </Box >
    )
}

export default Dividends