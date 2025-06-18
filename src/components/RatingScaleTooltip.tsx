import React from 'react';
import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { 
    TooltipContent, 
    TooltipRoot, 
    TooltipTrigger 
} from '@chakra-ui/react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { RatingScaleTooltipProps } from '../util/Interface';

const getColorForRating = (num: number) => {
  switch (num) {
    case 1:
      return 'green.500';
    case 2:
      return 'green.600';
    case 3:
      return 'orange.300';
    case 4:
      return 'orange.500';
    case 5:
      return 'red.600';
    default:
      return 'gray.500';
  }
};

const getTextColor = (label: string) => {
  switch (label) {
    case 'Buy':
      return 'green.500';
    case 'Hold':
      return 'orange.400';
    case 'Sell':
      return 'red.500';
    default:
      return 'gray.700';
  }
};

export const RatingScaleTooltip: React.FC<RatingScaleTooltipProps> = ({ value, label }) => {
  return (
    <TooltipRoot 
      positioning={{ 
        placement: "right",
        offset: { mainAxis: 8, crossAxis: 0 },
        strategy: "fixed"
      }}
      closeOnClick={false}
      openDelay={300}
      closeDelay={200}
      interactive={true}
    >
      <TooltipTrigger asChild>
        <Text
          fontWeight="bold"
          cursor="pointer"
          color={getTextColor(label)}
          display="inline-block"
          position="relative"
        >
          {label}
        </Text>
      </TooltipTrigger>
      
      <TooltipContent 
        bg="white" 
        border="1px solid" 
        borderColor="gray.200"
        borderRadius="md"
        boxShadow="lg"
        p={2}
        maxW="none"
        zIndex={9999}
        position="fixed"
      >
        <Flex direction="column" align="center" gap={1}>
          {/* Arrow row – arrow appears above the matching number */}
          <Flex gap={0}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Box
                key={`arrow-${num}`}
                w="24px"
                h="12px"
                display="flex"
                justifyContent="center"
                alignItems="flex-end"
              >
                {value === num && (
                  <MdOutlineArrowDropDown 
                    color="black" 
                    size={14}
                    style={{ marginBottom: '-1px' }}
                  />
                )}
              </Box>
            ))}
          </Flex>

          {/* Rating boxes row */}
          <Flex gap={0}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Box
                key={num}
                bg={num === value ? "black" : getColorForRating(num)}
                color="white"
                w="24px"
                h="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                fontWeight="bold"
                border={num === value ? '2px solid black' : '1px solid gray.300'}
                _first={{ borderLeftRadius: 'sm' }}
                _last={{ borderRightRadius: 'sm' }}
              >
                {num}
              </Box>
            ))}
          </Flex>

          {/* Labels row */}
          <Flex justify="space-between" w="120px" fontSize="2xs" mt={1}>
            <Text color="green.600" fontWeight="semibold">Buy</Text>
            <Text color="red.600" fontWeight="semibold">Sell</Text>
          </Flex>
        </Flex>
      </TooltipContent>
    </TooltipRoot>
  );
};