import { Box, Flex } from "@chakra-ui/react"
import StockChart from "../components/StockInformation/StockInformation"


const StockInformations = () => {
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
                <StockChart />
            </Flex>
        </Box>
    )
}

export default StockInformations