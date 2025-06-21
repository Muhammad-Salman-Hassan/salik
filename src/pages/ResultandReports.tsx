import React from 'react';
import {
    Box,
    Flex,
    Tabs,

} from '@chakra-ui/react';
import FinancialDocuments from '../components/ReportsAndResult/FinancialReport';
import { dummyPeriodDataResult } from '../util/DummyData';
import { GiCash } from 'react-icons/gi';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { HiOutlineDocumentReport } from "react-icons/hi";

const InvestorsReport: React.FC = () => {
    const yearWiseData = dummyPeriodDataResult


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
                <Tabs.Root defaultValue="analysts" fitted variant="enclosed" colorPalette="teal">
                    <Tabs.List
                        flexDirection={{ base: 'column', md: 'row' }}
                        overflowX={{ base: 'visible' }}
                        flexWrap="nowrap"
                        background="teal"
                    >
                        <Tabs.Trigger value="analysts" w={{ base: '100%', md: 'auto' }}
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
                            }}>
                            <GiCash size={20} />Financial Results
                        </Tabs.Trigger>
                        <Tabs.Trigger value="consensus" w={{ base: '100%', md: 'auto' }}
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
                            }}>
                           <MdOutlineCalendarMonth size={20} /> Annual Reports
                        </Tabs.Trigger>
                        <Tabs.Trigger value="details" w={{ base: '100%', md: 'auto' }}
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
                            }}>
                           <HiOutlineDocumentReport size={20}/> Other Reports
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Box flex="1" overflowY="auto" py={4}>
                        <Tabs.Content value="analysts">
                            <FinancialDocuments data={yearWiseData} />
                        </Tabs.Content>

                        <Tabs.Content value="consensus">
                            <FinancialDocuments data={yearWiseData} />

                        </Tabs.Content>

                        <Tabs.Content value="details">
                            <FinancialDocuments data={yearWiseData} />

                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            </Flex>
        </Box>
    );
};

export default InvestorsReport;