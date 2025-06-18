import {
    VStack,
    Table,
    Text,
    Box,
    Link,
    Flex,
    useDisclosure,
    Collapsible,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CompanyRating, RatingFilter } from '../../util/Interface';
import { filterRatings } from '../../util/filterRating';
import { FilterBar } from '../filterBar';
import { FaRegFileExcel, FaRegFilePdf } from 'react-icons/fa';
import { RatingScaleTooltip } from '../RatingScaleTooltip';
import Disclaimer from '../Discalimer/Disclaimer';


export const AnalystWithRating = ({ data }: { data: CompanyRating[] }) => {
    const [filter, setFilter] = useState<RatingFilter>({ filterType: '14_days' });
    const [analystVisibleIndex, setAnalystVisibleIndex] = useState<number | null>(null);
    const [filteredData, setFilteredData] = useState<CompanyRating[]>(data);

    const [isOpen, setOpen] = useState(false)
    const onToggle = () => {
        setOpen(!isOpen)
    }
    const applyFilter = () => {
        const newData = filterRatings(data, filter);
        setFilteredData(newData);
    };

    return (
        <VStack align="start" gap={6} p={4} w="full">
            <Box w="full" overflowX="auto">
                <Table.Root variant="outline">
                    <Table.Header bg="#008080">
                        <Table.Row>
                            <Table.ColumnHeader color="white">Company</Table.ColumnHeader>
                            <Table.ColumnHeader color="white">Analyst</Table.ColumnHeader>
                            <Table.ColumnHeader color="white">Country</Table.ColumnHeader>
                            <Table.ColumnHeader color="white">Rating</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredData.map((item, i) => (
                            <Table.Row key={i}>
                                <Table.Cell fontWeight="bold">{item.company}</Table.Cell>
                                <Table.Cell  style={{width:"30%"}}>
                                    <Text
                                        fontWeight="light"
                                        cursor="pointer"
                                        onClick={() =>
                                            setAnalystVisibleIndex(i === analystVisibleIndex ? null : i)
                                        }
                                        style={{width:"50%"}}
                                        color="#008080"
                                        textDecoration="underline"
                                    >
                                        {item.analyst.name}
                                    </Text>
                                    <Collapsible.Root open={analystVisibleIndex === i} style={{width:"max-content"}}>
                                        <Collapsible.Content style={{width:"max-content"}}>
                                            <Box fontSize="sm" color="gray.600"   mt={2}>
                                                <Text>Email: {item.analyst.email}</Text>
                                                <Text>Tel: {item.analyst.phone}</Text>
                                                <Text>Last rating input: {item.analyst.lastRatingDate}</Text>
                                            </Box>
                                        </Collapsible.Content>
                                    </Collapsible.Root>
                                </Table.Cell>
                                <Table.Cell>{item.country}</Table.Cell>
                                <Table.Cell>
                                    <RatingScaleTooltip value={item.ratingValue} label={item.rating} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>

            <FilterBar filter={filter} onChange={setFilter} onApply={applyFilter} />
            <Disclaimer />
            {/* <Box w="100%" fontSize="sm" mt={6} bg="gray.50" p={4} borderRadius="md">
                <Flex justifyContent="space-between">
                    <Text fontSize={20}>Disclaimer</Text>
                    <Text mb={3} fontWeight="semibold">
                        <Flex alignItems="center">
                            <span> Download:&nbsp;</span>
                            <Link href="/your-download-path.pdf" color="teal.600" target="_blank">
                                <FaRegFilePdf color='red' fontSize="20" />
                            </Link>
                            <Link href="/your-download-path.xlsx" color="teal.600" target="_blank">
                                <FaRegFileExcel color='green' fontSize="20" />
                            </Link>
                        </Flex>
                    </Text>
                </Flex>


                <Text mb={2}>
                    Salik (hereafter referred to as "The Company") is followed by the analyst(s) listed above.
                    Please note that any opinions, estimates or forecasts regarding The Company's performance
                    made by these analysts are theirs alone and do not represent opinions, forecasts or predictions
                    of The Company or its management. The Company does not by its reference above or distribution
                    imply its endorsement of or concurrence with such information, conclusions or recommendations.
                    <Link onClick={onToggle} mt={2} display="inline-block" color="teal.600" fontWeight="semibold">
                        {isOpen ? 'Read less' : 'Read more'}
                    </Link>
                </Text>

                {isOpen && <>
                    <Text mb={2}>
                        The information on these web pages does not represent opinions, forecasts or predictions of
                        The Company nor its management. The Company has no control over the content, quality, nature or
                        reliability of any such third party web pages, and shall have no liability whatsoever in respect
                        to the information provided on these web pages. A link to a third party web page does not imply
                        any endorsement, investigation or verification by The Company of any information contained on
                        this web page, and the information is not intended to imply any endorsement of or provide any
                        investment advice.
                    </Text>

                    <Text mb={2}>
                        Euroland.com AS does not represent or warrant that any information anywhere on these web pages
                        is accurate or complete and it should not be relied upon as such. The information on these web
                        pages is provided for informational purposes only. Any information on these web pages is of an
                        indicative nature and does not, and is not intended to, constitute an offer, solicitation,
                        invitation or recommendation to buy, sell or deliver (directly or indirectly) any securities
                        or derivatives thereon...
                    </Text>
                </>}


            </Box> */}
        </VStack>
    );
};
