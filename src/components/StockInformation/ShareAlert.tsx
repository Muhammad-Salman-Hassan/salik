import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Grid,
  Input,
  Text,
  Button,
  Select,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Stack,
  Container,
  Field,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { FormData } from '../../util/Interface';
import AlertOption from './AlertOption';



const professionOptions = createListCollection({
  items: [
    { value: "", label: "Select Profession" },
    { value: "investor", label: "Individual Investor" },
    { value: "analyst", label: "Financial Analyst" },
    { value: "advisor", label: "Investment Advisor" },
    { value: "manager", label: "Portfolio Manager" },
    { value: "trader", label: "Trader" },
    { value: "other", label: "Other" },
  ]
});

const countryOptions = createListCollection({
  items: [
    { value: "", label: "Select Country" },
    { value: "ae", label: "United Arab Emirates" },
    { value: "sa", label: "Saudi Arabia" },
    { value: "qa", label: "Qatar" },
    { value: "kw", label: "Kuwait" },
    { value: "bh", label: "Bahrain" },
    { value: "om", label: "Oman" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ]
});

export default function SharePriceAlertForm() {
  const [formData, setFormData] = useState<FormData>({
    alerts: {
      dailyClosing: false,
      priceTarget: false,
      priceTargetValue: '',
      stopLoss: false,
      stopLossValue: '',
      variation: false,
      variationValue: '',
      volumeTarget: false,
      volumeTargetValue: '',
    },
    subscription: {
      email: '',
      firstName: '',
      lastName: '',
      profession: '',
      company: '',
      country: '',
    },
    modifyEmail: '',
  });

  const handleAlertChange = (field: string, value: boolean | string) => {
    setFormData(prev => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        [field]: value
      }
    }));
  };

  const handleSubscriptionChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        [field]: value
      }
    }));
  };



  return (
    <Container  py={{ base: 4, md: 8 }}>
      <Box
        mx="auto"
        bg="white"
        p={{ base: 4, md: 6, lg: 8 }}
        borderRadius="xl"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
        border="1px solid"
        borderColor="gray.100"
        transition="all 0.3s ease"
        _hover={{
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          transform: "translateY(-2px)"
        }}
      >
        {/* Share Price Alerts Section */}
        <Box mb={{ base: 6, md: 8 }}>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={{ base: 4, md: 6 }}>
            Select Share Price Alerts:
          </Text>

          <VStack gap={{ base: 4, md: 5 }} align="stretch">
            {/* Daily Closing Price */}
            <AlertOption
              id="dailyClosing"
              label="Daily Closing Price"
              description="Send me the closing price at the end of the trading day."
              checked={formData.alerts.dailyClosing}
              onCheckChange={(checked) => handleAlertChange('dailyClosing', checked)}
            />

            {/* Price Target and Stop Loss */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, md: 5 }}>
              <AlertOption
                id="priceTarget"
                label="Price Target"
                description="Alert me when the share price reaches the set price."
                checked={formData.alerts.priceTarget}
                showInput={true}
                inputValue={formData.alerts.priceTargetValue}
                inputPlaceholder="Enter target price (e.g., 5.50)"
                onCheckChange={(checked) => handleAlertChange('priceTarget', checked)}
                onInputChange={(value) => handleAlertChange('priceTargetValue', value)}
              />

              <AlertOption
                id="stopLoss"
                label="Stop Loss"
                description="Alert me when the share price declines to the set price."
                checked={formData.alerts.stopLoss}
                showInput={true}
                inputValue={formData.alerts.stopLossValue}
                inputPlaceholder="Enter stop loss price (e.g., 4.50)"
                onCheckChange={(checked) => handleAlertChange('stopLoss', checked)}
                onInputChange={(value) => handleAlertChange('stopLossValue', value)}
              />
            </SimpleGrid>

            {/* Variation % and Volume Target */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, md: 5 }}>
              <AlertOption
                id="variation"
                label="Variation %"
                description="Alert me when the share price changes more than the set percentage."
                checked={formData.alerts.variation}
                showInput={true}
                inputValue={formData.alerts.variationValue}
                inputPlaceholder="Enter percentage (e.g., 5%)"
                onCheckChange={(checked) => handleAlertChange('variation', checked)}
                onInputChange={(value) => handleAlertChange('variationValue', value)}
              />

              <AlertOption
                id="volumeTarget"
                label="Volume Target"
                description="Alert me when the number of shares traded reaches the set value."
                checked={formData.alerts.volumeTarget}
                showInput={true}
                inputValue={formData.alerts.volumeTargetValue}
                inputPlaceholder="Enter volume (e.g., 1,000,000)"
                onCheckChange={(checked) => handleAlertChange('volumeTarget', checked)}
                onInputChange={(value) => handleAlertChange('volumeTargetValue', value)}
              />
            </SimpleGrid>
          </VStack>
        </Box>

        {/* Subscription Section */}
        <Box
          mb={{ base: 6, md: 8 }}
          bg="gray.50"
          p={{ base: 4, md: 6 }}
          borderRadius="lg"
        >
          <VStack align="start" gap={{ base: 4, md: 6 }}>
            <Box>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
                Please confirm your subscription
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" lineHeight="1.5">
                Fill in your information below. After you submit, you will receive an
                email with a link to activate your subscription. Fields marked with an
                asterisk (*) are required.
              </Text>
            </Box>

            <Stack gap={{ base: 4, md: 5 }} w="full">
              {/* First Row - Email (full width) */}
              <Field.Root >
                <Field.Label fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                  Email *
                </Field.Label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.subscription.email}
                  onChange={(e) => handleSubscriptionChange('email', e.target.value)}
                  size={{ base: "md", md: "lg" }}
                  bg="white"
                />
              </Field.Root>

              {/* Second Row - Name Fields */}
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 5 }}>
                <Field.Root >
                  <Field.Label fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                    First Name *
                  </Field.Label>
                  <Input
                    placeholder="Enter your first name"
                    value={formData.subscription.firstName}
                    onChange={(e) => handleSubscriptionChange('firstName', e.target.value)}
                    size={{ base: "md", md: "lg" }}
                    bg="white"
                  />
                </Field.Root>

                <Field.Root >
                  <Field.Label fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                    Last Name *
                  </Field.Label>
                  <Input
                    placeholder="Enter your last name"
                    value={formData.subscription.lastName}
                    onChange={(e) => handleSubscriptionChange('lastName', e.target.value)}
                    size={{ base: "md", md: "lg" }}
                    bg="white"
                  />
                </Field.Root>
              </SimpleGrid>

              {/* Third Row - Profession and Company */}
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 5 }}>
                <Field.Root>
                  <Field.Label fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                    Profession
                  </Field.Label>

                  <Select.Root collection={professionOptions}>
                    <Select.HiddenSelect />

                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select framework" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {professionOptions.items.map((framework) => (
                            <Select.Item item={framework} key={framework.value}>
                              {framework.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>

                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                    Company
                  </Field.Label>
                  <Input
                    placeholder="Enter your company name"
                    value={formData.subscription.company}
                    onChange={(e) => handleSubscriptionChange('company', e.target.value)}
                    size={{ base: "md", md: "lg" }}
                    bg="white"
                  />
                </Field.Root>
              </SimpleGrid>

              {/* Fourth Row - Country */}
              <Field.Root>
                <Field.Label fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                  Country
                </Field.Label>
                <Select.Root collection={countryOptions}>
                  <Select.HiddenSelect />

                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select framework" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {countryOptions.items.map((framework) => (
                          <Select.Item item={framework} key={framework.value}>
                            {framework.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root>
            </Stack>

            <Button
              colorScheme="blue"
              size={{ base: "md", md: "lg" }}
              px={{ base: 6, md: 8 }}
              alignSelf={{ base: "stretch", md: "flex-start" }}
            >
              Submit Subscription
            </Button>
          </VStack>
        </Box>

        {/* Modify/Unsubscribe Section */}
        <Box bg="gray.50" p={{ base: 4, md: 6 }} borderRadius="lg">
          <VStack align="start" gap={{ base: 4, md: 5 }}>
            <Box>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
                Modify or Unsubscribe:
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" lineHeight="1.5">
                If you are already a subscriber and would like to modify your
                subscription, input your email address below. After you submit, you
                will receive an email with a link to modify your subscription.
              </Text>
            </Box>

            <Field.Root maxW={{ base: "full", md: "400px" }}>
              <Field.Label fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                Email Address
              </Field.Label>
              <Input
                type="email"
                placeholder="Enter your registered email"
                value={formData.modifyEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, modifyEmail: e.target.value }))}
                size={{ base: "md", md: "lg" }}
                bg="white"
              />
            </Field.Root>

            <Button
              variant="outline"
              colorScheme="gray"
              size={{ base: "md", md: "lg" }}
              px={{ base: 6, md: 8 }}
            >
              Submit Modification Request
            </Button>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}