import { Box, Checkbox, HStack, Input, Text, VStack } from "@chakra-ui/react";

const AlertOption = ({
    id,
    label,
    description,
    checked,
    showInput = false,
    inputValue = '',
    inputPlaceholder = '',
    onCheckChange,
    onInputChange
}: {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    showInput?: boolean;
    inputValue?: string;
    inputPlaceholder?: string;
    onCheckChange: (checked: boolean) => void;
    onInputChange?: (value: string) => void;
}) => (
    <Box
        p={{ base: 4, md: 5 }}
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        bg={checked ? "blue.50" : "white"}
        transition="all 0.2s"
        _hover={{ borderColor: "blue.300", bg: checked ? "blue.50" : "gray.50" }}
    >
        <VStack align="start" gap={3}>
            <Checkbox.Root
                checked={checked}
                onCheckedChange={(details) => onCheckChange(details.checked)}
            >
                <HStack gap={3}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <VStack align="start" gap={1}>

                        <Checkbox.Label fontSize="sm">
                            {label}
                        </Checkbox.Label>
                        <Checkbox.Label fontSize="sm">
                            {description}
                        </Checkbox.Label>


                    </VStack>
                </HStack>
            </Checkbox.Root>

            {showInput && checked && (
                <Input
                    placeholder={inputPlaceholder}
                    value={inputValue}
                    onChange={(e) => onInputChange?.(e.target.value)}
                    size={{ base: "sm", md: "md" }}
                    bg="white"
                    borderColor="blue.200"
                    _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                />
            )}
        </VStack>
    </Box>
);

export default AlertOption