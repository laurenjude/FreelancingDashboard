import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  useColorModeValue,
  useToast,
  Button,
  Icon,
  Stack,
  Badge,
} from "@chakra-ui/react";
import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiDownload,
  FiFilter,
  FiBarChart2,
  FiUser,
} from "react-icons/fi";
import EarningStats from "../components/EarningsStats";
// Import necessary Recharts components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const EarningsPage = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [activeTab, setActiveTab] = useState("overview");
  const toast = useToast();
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  // Sample data
  const earningsData = {
    monthly: {
      total: 5200,
      completedProjects: 15,
      totalClients: 8,
      recurring: 3200,
      oneTime: 2000,
      growth: 12.5,
      chartData: [
        { month: "Jan", earnings: 3200 },
        { month: "Feb", earnings: 4100 },
        { month: "Mar", earnings: 3800 },
        { month: "Apr", earnings: 5200 },
      ],
    },
    quarterly: {
      total: 15800,
      completedProjects: 42,
      totalClients: 12,
      recurring: 9800,
      oneTime: 6000,
      growth: 8.2,
      chartData: [
        { quarter: "Q1", earnings: 15800 },
        { quarter: "Q2", earnings: 14200 },
        { quarter: "Q3", earnings: 18500 },
        { quarter: "Q4", earnings: 21000 },
      ],
    },
    yearly: {
      total: 69500,
      completedProjects: 165,
      totalClients: 28,
      recurring: 42000,
      oneTime: 27500,
      growth: 18.3,
      chartData: [
        { year: "2020", earnings: 52000 },
        { year: "2021", earnings: 58000 },
        { year: "2022", earnings: 69500 },
      ],
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownloadReport = () => {
    toast({
      title: "Download initiated",
      description: "Your earnings report is being prepared",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    // In a real app, this would trigger a report download
  };

  const currentData = earningsData[timeRange];

  // Determine the appropriate key for the x-axis based on timeRange
  const xAxisKey =
    timeRange === "monthly"
      ? "month"
      : timeRange === "quarterly"
      ? "quarter"
      : "year";

  return (
    <Box
      p={8}
      bg={pageBg}
      minH="100vh">
      {/* Header Section */}
      <Flex
        justify="space-between"
        align="center"
        mb={8}>
        <Heading
          fontSize="3xl"
          fontWeight="bold">
          Earnings Dashboard
          <Badge
            ml={3}
            colorScheme="green"
            fontSize="sm"
            px={2}
            py={1}>
            <Icon
              as={FiTrendingUp}
              mr={1}
            />
            {currentData.growth}% growth
          </Badge>
        </Heading>

        <Flex
          align="center"
          gap={4}>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            bg={cardBg}
            w="150px">
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </Select>
          <Button
            leftIcon={<FiDownload />}
            colorScheme="teal"
            onClick={handleDownloadReport}>
            Export
          </Button>
        </Flex>
      </Flex>

      {/* Stats Grid */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={6}
        mb={8}>
        <EarningStats
          title="Total Earnings"
          value={formatCurrency(currentData.total)}
          change={currentData.growth}
          icon={FiDollarSign}
          colorScheme="green"
        />
        <EarningStats
          title="Recurring Income"
          value={formatCurrency(currentData.recurring)}
          change={8.2}
          icon={FiTrendingUp}
          colorScheme="blue"
        />
        <EarningStats
          title="One-Time Projects"
          value={formatCurrency(currentData.oneTime)}
          change={-3.5}
          icon={FiTrendingDown}
          colorScheme="orange"
        />
        <EarningStats
          title="Active Clients"
          value={currentData.totalClients}
          change={5.7}
          icon={FiUser}
          colorScheme="purple"
        />
      </SimpleGrid>

      {/* Tabs Section */}
      <Tabs
        variant="enclosed"
        mb={8}
        onChange={(index) =>
          setActiveTab(index === 0 ? "overview" : "breakdown")
        }>
        <TabList>
          <Tab>
            <Icon
              as={FiBarChart2}
              mr={2}
            />
            Overview
          </Tab>
          <Tab>
            <Icon
              as={FiFilter}
              mr={2}
            />
            Detailed Breakdown
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md"
              mb={6}>
              <Heading
                size="md"
                mb={4}>
                Earnings Trend
              </Heading>
              <Box h="300px">
                <ResponsiveContainer
                  width="100%"
                  height="100%">
                  <BarChart data={currentData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="earnings"
                      fill="#8884d8"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel px={0}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="md"
              mb={6}>
              <Heading
                size="md"
                mb={4}>
                Income Distribution
              </Heading>
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={6}>
                <Box
                  flex={1}
                  h="300px">
                  <ResponsiveContainer
                    width="100%"
                    height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Recurring", value: currentData.recurring },
                          { name: "One-Time", value: currentData.oneTime },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#82ca9d"
                        label>
                        {[
                          { name: "Recurring", value: currentData.recurring },
                          { name: "One-Time", value: currentData.oneTime },
                        ].map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? "#8884d8" : "#82ca9d"}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box flex={1}>
                  <Stack spacing={4}>
                    <Box>
                      <Text
                        fontWeight="bold"
                        mb={1}>
                        Recurring Income
                      </Text>
                      <Text
                        fontSize="xl"
                        color="blue.500">
                        {formatCurrency(currentData.recurring)}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.500">
                        {(
                          (currentData.recurring / currentData.total) *
                          100
                        ).toFixed(1)}
                        % of total
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        fontWeight="bold"
                        mb={1}>
                        One-Time Projects
                      </Text>
                      <Text
                        fontSize="xl"
                        color="orange.500">
                        {formatCurrency(currentData.oneTime)}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.500">
                        {(
                          (currentData.oneTime / currentData.total) *
                          100
                        ).toFixed(1)}
                        % of total
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        fontWeight="bold"
                        mb={1}>
                        Avg. Project Value
                      </Text>
                      <Text fontSize="xl">
                        {formatCurrency(
                          currentData.total / currentData.completedProjects
                        )}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.500">
                        Based on {currentData.completedProjects} projects
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              </Flex>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Recent Transactions */}
      <Box
        bg={cardBg}
        p={6}
        borderRadius="xl"
        boxShadow="md">
        <Heading
          size="md"
          mb={4}>
          Recent Transactions
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={6}>
          {[
            {
              id: 1,
              client: "TechCorp",
              amount: 1200,
              date: "2023-04-15",
              type: "Recurring",
              status: "Completed",
            },
            {
              id: 2,
              client: "DesignStudio",
              amount: 850,
              date: "2023-04-10",
              type: "One-Time",
              status: "Completed",
            },
            {
              id: 3,
              client: "MarketingHub",
              amount: 1500,
              date: "2023-04-05",
              type: "Recurring",
              status: "Pending",
            },
          ].map((transaction) => (
            <Box
              key={transaction.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              borderColor="gray.200">
              <Flex
                justify="space-between"
                mb={2}>
                <Text fontWeight="bold">{transaction.client}</Text>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="green.500">
                  {formatCurrency(transaction.amount)}
                </Text>
              </Flex>
              <Flex
                justify="space-between"
                color="gray.500"
                fontSize="sm">
                <Text>
                  <Icon
                    as={FiCalendar}
                    mr={1}
                  />
                  {new Date(transaction.date).toLocaleDateString()}
                </Text>
                <Badge
                  colorScheme={
                    transaction.status === "Completed"
                      ? "green"
                      : transaction.status === "Pending"
                      ? "orange"
                      : "gray"
                  }>
                  {transaction.status}
                </Badge>
              </Flex>
              <Text
                mt={2}
                fontSize="sm">
                Type:{" "}
                <Badge
                  variant="subtle"
                  colorScheme="blue">
                  {transaction.type}
                </Badge>
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default EarningsPage;
