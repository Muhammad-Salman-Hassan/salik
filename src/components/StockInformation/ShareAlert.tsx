// SharePriceAlertForm.tsx
import {
  Box,
  Checkbox,
  Grid,
  Input,
  Text,
  Button,
  NativeSelect,
  Flex,
} from "@chakra-ui/react";
const performaceSelectOptions: { value: string; label: string }[] = [
  { value: "normal", label: "Share price development" },
  { value: "byYears", label: "Share price development by years" },
];
export default function SharePriceAlertForm() {
  return (
    <Box maxW="1200px" mx="auto" p={6}>
      {/* Share Price Alerts Section */}
      <Box mb={8}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Select Share Price Alerts:
        </Text>
        <Flex direction={"column"} gap={4}>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>Daily Closing Price</Checkbox.Label>
          </Checkbox.Root>
          <p>Send me the closing price at the end of the trading day.</p>
        </Flex>
        <Flex mt={4} gap={2}>
          <Grid gap={0} mt={4}>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Price Target</Checkbox.Label>
            </Checkbox.Root>
            <p>Alert me when the share price reaches the set price.</p>
            <Input placeholder="Set value for Variation % / Volume Target" />
          </Grid>
          <Grid gap={0} mt={4}>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Stop Loss</Checkbox.Label>
            </Checkbox.Root>
            <p>Alert me when the share price declines to the set price.</p>
            <Input placeholder="Set value for Variation % / Volume Target" />
          </Grid>
        </Flex>
        <Flex mt={4} gap={2}>
          <Grid gap={0} mt={4}>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Variation %</Checkbox.Label>
            </Checkbox.Root>
            <p>
              Alert me when the share price changes more than the set value.
            </p>
            <Input placeholder="Set value for Variation % / Volume Target" />
          </Grid>
          <Grid gap={0} mt={4}>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Volume Target</Checkbox.Label>
            </Checkbox.Root>
            <p>
              Alert me when the number of shares traded reaches the set value.
            </p>
            <Input placeholder="Set value for Variation % / Volume Target" />
          </Grid>
        </Flex>
      </Box>

      {/* <Divider my={6} /> */}

      {/* Subscription Section */}
      <Box mb={8} background={"gray.50"} p={6} borderRadius="md">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Please confirm your subscription
        </Text>
        <Text fontSize="sm" mb={4}>
          Fill in your information below. After you submit, you will receive an
          email with a link to activate your subscription. Fields marked with an
          asterisk (*) are required.
        </Text>

        <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap={4} mb={4}>
          <div>
            <label>Email</label>
            <Input />
          </div>
          <div>
            <label>First Name</label>
            <Input />
          </div>
          <div>
            <label>Last Name</label>
            <Input />
          </div>
          <div>
            <label>Profession</label>
            <NativeSelect.Root size="sm" width="240px">
              <NativeSelect.Field>
                {performaceSelectOptions.map((items, index) => (
                  <option value={items.value} key={index}>
                    {items.label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </div>
          <div>
            <label>Company</label>
            <Input />
          </div>
          <div>
            <label>Country</label>
            <NativeSelect.Root size="sm" width="240px">
              <NativeSelect.Field>
                {performaceSelectOptions.map((items, index) => (
                  <option value={items.value} key={index}>
                    {items.label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </div>
        </Grid>

        <Button colorScheme="gray">Submit</Button>
      </Box>

      {/* Modify/Unsubscribe Section */}
      <Box background={"gray.50"} p={6} borderRadius="md">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Modify or Unsubscribe:
        </Text>
        <Text fontSize="sm" mb={4}>
          If you are already a subscriber and would like to modify your
          subscription, input your email address below. After you submit, you
          will receive an email with a link to modify your subscription.
        </Text>

        <div>
          <label>Email</label>
          <Input />
        </div>
        <Button colorScheme="gray" mt={4}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
