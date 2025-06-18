import React from 'react';
import {
  Box,
  Flex,
  Tabs,
  Text,
} from '@chakra-ui/react';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@chakra-ui/react';
import { AnalystWithRating } from '../components/AnalystList/AnalystList';
import { ChartDataPoint, CompanyRating, RecommendationData } from '../util/Interface';
import ConsensusEstimates from '../components/ConsensusEstimate/ConsensuEstimates';
import ConsensusRecommendation from '../components/ConsensusRecommendation/ConsensusRecommendation';

const InvestorAnalysts: React.FC = () => {
  const mockCompanyRatings: CompanyRating[] = [
    {
      company: 'Acme Corp',
      analyst: {
        name: 'Joice Smith',
        email: 'joice@usoman.com',
        phone: '+968 2476 3311',
        lastRatingDate: '2025-05-26',
      },
      country: 'Oman',
      ratingValue: 1,
      rating: 'Buy',
      date: '2025-05-26',
    },
    {
      company: 'Globex Inc',
      analyst: {
        name: 'Mark Johnson',
        email: 'mark@globex.com',
        phone: '+1 202 555 0133',
        lastRatingDate: '2025-03-15',
      },
      country: 'USA',
      rating: 'Hold',
      ratingValue: 2,
      date: '2025-03-15',
    },
    {
      company: 'TechWave Ltd',
      analyst: {
        name: 'Alina Ray',
        email: 'alina@techwave.co.uk',
        phone: '+44 20 7946 0999',
        lastRatingDate: '2024-12-01',
      },
      country: 'UK',
      ratingValue: 5,
      rating: 'Sell',
      date: '2024-12-01',
    },
  ];

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
          >
            <Tabs.Trigger value="analysts" w={{ base: '100%', md: 'auto' }}>
              Analyst List with Rating
            </Tabs.Trigger>
            <Tabs.Trigger value="consensus" w={{ base: '100%', md: 'auto' }}>
              Consensus Estimates
            </Tabs.Trigger>
            <Tabs.Trigger value="details" w={{ base: '100%', md: 'auto' }}>
              Recommendation OverView
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