// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  useToast,
  Avatar,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Switch,
  Badge,
  Divider,
  Icon,
  InputGroup,
  InputRightElement,
  Tooltip,
  Select,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCreditCard,
  FiBell,
  FiGlobe,
  FiSave,
  FiUpload,
  FiShield,
  FiDollarSign,
} from "react-icons/fi";

const Settings = () => {
  const [name, setName] = useState("Lauren Jude");
  const [email, setEmail] = useState("lauren.jude@example.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("UTC-5");
  const [timezone, setTimezone] = useState(() => {
    return localStorage.getItem("timezone") || "UTC-5";
  });
  const [avatar, setAvatar] = useState("");
  const toast = useToast();
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully saved",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // In a real app, save to localStorage/API
    localStorage.setItem(
      "userSettings",
      JSON.stringify({
        name,
        email,
        notificationsEnabled,
        darkMode,
        currency,
        timezone,
      })
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      p={{ base: 4, md: 8 }} // Smaller padding on mobile
      minH="100vh"
      overflowX="hidden" // Prevent horizontal scrolling
      maxW="100vw" // Ensure content doesn't exceed viewport
    >
      <Flex
        justify="space-between"
        align="center"
        mb={8}>
        <Heading
          fontSize="3xl"
          fontWeight="bold">
          Account Settings
        </Heading>
        <Button
          leftIcon={<FiSave />}
          colorScheme="teal"
          onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Flex>

      <Tabs
        variant="enclosed"
        onChange={(index) => setActiveTab(index)}>
        <TabList>
          <Tab>
            <Icon
              as={FiUser}
              mr={2}
            />
            Profile
          </Tab>
          <Tab>
            <Icon
              as={FiShield}
              mr={2}
            />
            Security
          </Tab>
          <Tab>
            <Icon
              as={FiBell}
              mr={2}
            />
            Notifications
          </Tab>
          <Tab>
            <Icon
              as={FiGlobe}
              mr={2}
            />
            Preferences
          </Tab>
        </TabList>
        <TabPanels>
          {/* Profile Tab */}
          <TabPanel px={0}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md"
              mb={6}>
              <Heading
                size="md"
                mb={6}>
                Personal Information
              </Heading>

              <Flex
                direction={{ base: "column", md: "row" }}
                gap={8}>
                <Box>
                  <Flex
                    direction="column"
                    align="center">
                    <Avatar
                      size="xl"
                      name={name}
                      src={avatar}
                      mb={4}
                      border="4px solid"
                      borderColor="teal.100"
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="avatar-upload"
                      display="none"
                    />
                    <Button
                      as="label"
                      htmlFor="avatar-upload"
                      leftIcon={<FiUpload />}
                      variant="outline"
                      colorScheme="teal"
                      cursor="pointer">
                      Change Photo
                    </Button>
                  </Flex>
                </Box>

                <Stack
                  spacing={4}
                  flex={1}>
                  <FormControl id="name">
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </FormControl>

                  <FormControl id="email">
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </FormControl>

                  <FormControl id="bio">
                    <FormLabel>Bio</FormLabel>
                    <Input
                      as="textarea"
                      minH="100px"
                      placeholder="Tell clients about yourself and your services"
                    />
                  </FormControl>
                </Stack>
              </Flex>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md">
              <Heading
                size="md"
                mb={6}>
                Professional Information
              </Heading>
              <Stack spacing={4}>
                <FormControl id="profession">
                  <FormLabel>Profession/Title</FormLabel>
                  <Input
                    value="FullStack Developer"
                    placeholder="Your professional title"
                  />
                </FormControl>

                <FormControl id="hourly-rate">
                  <FormLabel>Hourly Rate</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.500">
                      <Icon as={FiDollarSign} />
                    </InputLeftElement>
                    <Input
                      type="number"
                      value="85"
                      placeholder="Your standard hourly rate"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="skills">
                  <FormLabel>Skills</FormLabel>
                  <Input
                    value="Reactjs,Nodejs,"
                    placeholder="Your key skills separated by commas"
                  />
                </FormControl>
              </Stack>
            </Box>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel px={0}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md"
              mb={6}>
              <Heading
                size="md"
                mb={6}>
                Password & Authentication
              </Heading>
              <Stack spacing={6}>
                <FormControl id="current-password">
                  <FormLabel>Current Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your current password"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl id="new-password">
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                    />
                    <InputRightElement>
                      <Tooltip label="Use 8+ characters with mix of letters, numbers & symbols">
                        <Icon
                          as={FiBell}
                          color="gray.500"
                        />
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    mt={2}>
                    Password strength: <Badge colorScheme="green">Strong</Badge>
                  </Text>
                </FormControl>

                <FormControl id="confirm-password">
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                  />
                </FormControl>

                <Button
                  colorScheme="teal"
                  alignSelf="flex-start"
                  leftIcon={<FiLock />}>
                  Update Password
                </Button>
              </Stack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md">
              <Heading
                size="md"
                mb={6}>
                Two-Factor Authentication
              </Heading>
              <Flex
                justify="space-between"
                align="center">
                <Box>
                  <Text fontWeight="bold">2FA Status</Text>
                  <Text
                    fontSize="sm"
                    color="gray.500">
                    Add an extra layer of security to your account
                  </Text>
                </Box>
                <Switch
                  size="lg"
                  colorScheme="teal"
                />
              </Flex>
            </Box>
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel px={0}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md">
              <Heading
                size="md"
                mb={6}>
                Notification Preferences
              </Heading>
              <Stack spacing={6}>
                <Flex
                  justify="space-between"
                  align="center">
                  <Box>
                    <Text fontWeight="bold">Email Notifications</Text>
                    <Text
                      fontSize="sm"
                      color="gray.500">
                      Receive important updates via email
                    </Text>
                  </Box>
                  <Switch
                    isChecked={notificationsEnabled}
                    onChange={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                    colorScheme="teal"
                  />
                </Flex>

                <Divider />

                <Flex
                  justify="space-between"
                  align="center">
                  <Box>
                    <Text fontWeight="bold">Project Updates</Text>
                    <Text
                      fontSize="sm"
                      color="gray.500">
                      Notify me about project milestones and changes
                    </Text>
                  </Box>
                  <Switch
                    defaultChecked
                    colorScheme="teal"
                  />
                </Flex>

                <Divider />

                <Flex
                  justify="space-between"
                  align="center">
                  <Box>
                    <Text fontWeight="bold">Payment Alerts</Text>
                    <Text
                      fontSize="sm"
                      color="gray.500">
                      Get notified about payments and invoices
                    </Text>
                  </Box>
                  <Switch
                    defaultChecked
                    onChange={() => {}}
                    colorScheme="teal"
                  />
                </Flex>

                <Divider />

                <Flex
                  justify="space-between"
                  align="center">
                  <Box>
                    <Text fontWeight="bold">Promotional Offers</Text>
                    <Text
                      fontSize="sm"
                      color="gray.500">
                      Receive occasional product updates and offers
                    </Text>
                  </Box>
                  <Switch colorScheme="teal" />
                </Flex>
              </Stack>
            </Box>
          </TabPanel>

          {/* Preferences Tab */}
          <TabPanel px={0}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md"
              mb={6}>
              <Heading
                size="md"
                mb={6}>
                Display & Language
              </Heading>
              <Stack spacing={4}>
                <Flex
                  justify="space-between"
                  align="center">
                  <Box>
                    <Text fontWeight="bold">Dark Mode</Text>
                    <Text
                      fontSize="sm"
                      color="gray.500">
                      Switch between light and dark theme
                    </Text>
                  </Box>
                  <Switch
                    isChecked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    colorScheme="teal"
                  />
                </Flex>

                <FormControl id="timezone">
                  <FormLabel>Timezone</FormLabel>
                  <Select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}>
                    <option>Eastern Time (UTC-5)</option>
                    <option>Central Time (UTC-6)</option>
                    <option>Mountain Time (UTC-7)</option>
                    <option>Pacific Time (UTC-8)</option>
                  </Select>
                </FormControl>
              </Stack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md">
              <Heading
                size="md"
                mb={6}>
                Payment & Currency
              </Heading>
              <Stack spacing={4}>
                <FormControl id="currency">
                  <FormLabel>Default Currency</FormLabel>
                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                  </Select>
                </FormControl>

                <FormControl id="payment-methods">
                  <FormLabel>Payment Methods</FormLabel>
                  <Stack spacing={3}>
                    <Flex
                      align="center"
                      p={3}
                      borderWidth="1px"
                      borderRadius="md">
                      <Icon
                        as={FiCreditCard}
                        mr={3}
                        color="green.500"
                      />
                      <Text>Visa ending in 4242</Text>
                    </Flex>
                    <Flex
                      align="center"
                      p={3}
                      borderWidth="1px"
                      borderRadius="md">
                      <Icon
                        as={FiCreditCard}
                        mr={3}
                        color="blue.500"
                      />
                      <Text>PayPal: lauren.jude@example.com</Text>
                    </Flex>
                    <Button
                      leftIcon={<FiBell />}
                      variant="outline">
                      Add Payment Method
                    </Button>
                  </Stack>
                </FormControl>
              </Stack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Settings;
