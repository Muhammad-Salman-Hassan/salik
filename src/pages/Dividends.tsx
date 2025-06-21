import { Box, Flex, Tabs, Text } from "@chakra-ui/react"
import ShareDividendTable from "../components/Dividend/ShareDividend"
import DividendCalculator from "../components/Dividend/DividendCalculator"
import DividendPerShare from "../components/Dividend/DividendHistory"
import TotalReturn from "../components/Dividend/TotalReturn"
import DividendOverview from "../components/Dividend/DividendOverview"
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { MdAssignmentReturn, MdHistory } from "react-icons/md"
import { IoCalculatorSharp } from "react-icons/io5";
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
                mt={4}
            >
                <Tabs.Root defaultValue="analysts" fitted variant="enclosed" >
                    <Tabs.List
                        flexDirection={{ base: 'column', md: 'row' }}
                        overflowX={{ base: 'visible' }}
                        flexWrap="nowrap"
                        background={"teal"}

                    >
                        <Tabs.Trigger value="overview"
                            w={{ base: '100%', md: 'auto' }}
                            color="white"
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
                            }}
                        >
                            <FaMagnifyingGlassChart size={20} /> OverView
                        </Tabs.Trigger>
                        <Tabs.Trigger value="analysts" w={{ base: '100%', md: 'auto' }} color="white"
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
                            }}>
                            <MdAssignmentReturn size={20} />Total Returns
                        </Tabs.Trigger>
                        <Tabs.Trigger value="consensus" w={{ base: '100%', md: 'auto' }} color="white"
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
                            }}>
                            <MdHistory size={20} /> Dividend History
                        </Tabs.Trigger>
                        <Tabs.Trigger value="details" w={{ base: '100%', md: 'auto' }} color="white"
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
                            }}>
                           <IoCalculatorSharp size={20} /> Dividend Calculator
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Box flex="1" overflowY="auto" py={4}>
                        <Tabs.Content value="overview">
                            <DividendOverview />
                        </Tabs.Content>
                        <Tabs.Content value="analysts">
                            <TotalReturn />
                        </Tabs.Content>

                        <Tabs.Content value="consensus">
                            <DividendPerShare />
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