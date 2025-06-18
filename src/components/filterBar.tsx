import {
    Box,
    Button,
    Flex,
    Input,
    Text,
} from '@chakra-ui/react';
import { 
    RadioGroup
} from '@chakra-ui/react';
import React from 'react';
import { RatingFilter, RatingFilterOption } from '../util/Interface';

const ratingFilterOptions: { label: string; value: RatingFilterOption }[] = [
    { label: '14 days', value: '14_days' },
    { label: '1 month', value: '1_month' },
    { label: '3 months', value: '3_months' },
    { label: '6 months', value: '6_months' },
    { label: '1 year', value: '1_year' },
];

interface Props {
    filter: RatingFilter;
    onChange: (filter: RatingFilter) => void;
    onApply: () => void;
}

export const FilterBar: React.FC<Props> = ({ filter, onChange, onApply }) => {
    return (
        <Box bg="#ECECEC" p={4} w="full" mt={5}>
            <Text fontWeight="bold">Recalculate data above,</Text>
            <Text mb={2}>show ratings not older than:</Text>

            <RadioGroup.Root
                value={filter.filterType}
                onValueChange={(details) => onChange({ filterType: details.value as RatingFilterOption })}
            >
                <Flex wrap="wrap" gap={4} mb={4}>
                    {ratingFilterOptions.map((item) => (
                         <RadioGroup.Item key={item.value} value={item.value}>
                         <RadioGroup.ItemHiddenInput />
                         <RadioGroup.ItemIndicator />
                         <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                       </RadioGroup.Item>
                    ))}
                    <RadioGroup.Item value="custom">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>Custom</RadioGroup.ItemText>
                    </RadioGroup.Item>
                </Flex>
            </RadioGroup.Root>

            <Flex wrap="wrap" gap={4} align="center">
                <Text minW="120px">or select date here:</Text>
                <Input
                    type="date"
                    w="160px"
                    value={filter.customDate ?? ''}
                    onChange={(e) =>
                        onChange({ filterType: 'custom', customDate: e.target.value })
                    }
                />
                <Button variant="outline" onClick={onApply}>
                    Show data
                </Button>
            </Flex>
        </Box>
    );
};
