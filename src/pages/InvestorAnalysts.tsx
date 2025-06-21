import React from 'react';
import {
  Box,
  Flex,
  Tabs,
} from '@chakra-ui/react';
import { AnalystWithRating } from '../components/AnalystList/AnalystList';
import { CompanyRating, RecommendationData } from '../util/Interface';
import ConsensusEstimates from '../components/ConsensusEstimate/ConsensuEstimates';
import ConsensusRecommendation from '../components/ConsensusRecommendation/ConsensusRecommendation';
import { dummycompanyRatingData } from '../util/DummyData';
import { MdOutlineAnalytics, MdOutlineTableChart, MdRecommend } from 'react-icons/md';

const InvestorAnalysts: React.FC = () => {
  const mockCompanyRatings: CompanyRating[] = dummycompanyRatingData

  const data: RecommendationData = {
    buy: 4.2,
    outperform: 3,
    hold: 2,
    underperform: 1,
    sell: 1
  };


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
              <MdOutlineAnalytics size={20} />  Analyst List with Rating
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
              <MdOutlineTableChart size={20} /> Consensus Estimates
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
              <MdRecommend size={20} />Recommendation OverView
            </Tabs.Trigger>
          </Tabs.List>

          <Box flex="1" overflowY="auto" px={{ base: 2, md: 4 }} py={4}>
            <Tabs.Content value="analysts">
              <AnalystWithRating data={mockCompanyRatings} />
            </Tabs.Content>

            <Tabs.Content value="consensus">
              <ConsensusEstimates />
            </Tabs.Content>

            <Tabs.Content value="details">
              <ConsensusRecommendation data={data} consensusValue={1.8} />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Box>
  );
};

export default InvestorAnalysts;