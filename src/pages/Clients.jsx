// src/pages/ClientsPage.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Flex,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Progress,
  Divider,
  Button,
  Tag,
  TagLabel,
  Select,
  useToast,
  Icon,
  VStack, // Added VStack to imports
  Stack, // Added Stack as an alternative
} from "@chakra-ui/react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiUser,
  FiMoreVertical,
  FiStar,
} from "react-icons/fi";

const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const clients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      phone: "+1 (555) 123-4567",
      projects: 8,
      activeProjects: 3,
      totalSpent: 42500,
      lastContact: "2023-05-15",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      notes: "Prefers weekly updates",
      priority: "high",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@designstudio.io",
      phone: "+1 (555) 987-6543",
      projects: 12,
      activeProjects: 2,
      totalSpent: 68200,
      lastContact: "2023-06-02",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      notes: "Likes detailed proposals",
      priority: "medium",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily@marketingguru.com",
      phone: "+1 (555) 456-7890",
      projects: 5,
      activeProjects: 1,
      totalSpent: 18500,
      lastContact: "2023-04-28",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      notes: "Quick decision maker",
      priority: "high",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@startupventures.com",
      phone: "+1 (555) 234-5678",
      projects: 3,
      activeProjects: 0,
      totalSpent: 12000,
      lastContact: "2023-03-10",
      status: "inactive",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      notes: "Potential for more work next quarter",
      priority: "low",
    },
    {
      id: 5,
      name: "Jessica Kim",
      email: "jessica@creativeagency.com",
      phone: "+1 (555) 876-5432",
      projects: 15,
      activeProjects: 4,
      totalSpent: 92500,
      lastContact: "2023-06-10",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      notes: "Main client - 30% of revenue",
      priority: "high",
    },
    {
      id: 6,
      name: "Robert Taylor",
      email: "robert@enterprisesolutions.com",
      phone: "+1 (555) 345-6789",
      projects: 7,
      activeProjects: 2,
      totalSpent: 58700,
      lastContact: "2023-05-22",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/men/43.jpg",
      notes: "Technical projects specialist",
      priority: "medium",
    },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColor = {
    active: "green",
    inactive: "orange",
    prospective: "blue",
  };

  const priorityColor = {
    high: "red",
    medium: "orange",
    low: "green",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddClient = () => {
    toast({
      title: "Add new client",
      description: "Client creation form would open here",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

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
          Clients
          <Text
            as="span"
            fontSize="lg"
            color="gray.500"
            ml={2}>
            ({filteredClients.length})
          </Text>
        </Heading>

        <Button
          leftIcon={<FiPlus />}
          colorScheme="teal"
          onClick={handleAddClient}>
          Add Client
        </Button>
      </Flex>

      {/* Filters Section */}
      <Flex
        mb={8}
        gap={4}
        flexWrap="wrap">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg={cardBg}
          />
        </InputGroup>

        <Select
          placeholder="Filter by status"
          w="200px"
          bg={cardBg}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Clients</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="prospective">Prospective</option>
        </Select>
      </Flex>

      {/* Clients Grid */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}>
        {filteredClients.map((client) => (
          <Card
            key={client.id}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="md"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl",
            }}
            position="relative"
            overflow="hidden">
            {/* Priority Indicator */}
            {client.priority === "high" && (
              <Box
                position="absolute"
                top={2}
                right={2}
                bg={`${priorityColor[client.priority]}.500`}
                color="white"
                p={1}
                borderRadius="md"
                fontSize="xs"
                fontWeight="bold"
                zIndex="1">
                <FiStar size="14px" />
              </Box>
            )}

            <CardHeader pb={0}>
              <Flex align="center">
                <Avatar
                  size="lg"
                  name={client.name}
                  src={client.avatar}
                  mr={4}
                  border="2px solid"
                  borderColor={`${statusColor[client.status]}.300`}
                />
                <Box>
                  <Heading
                    size="md"
                    mb={1}>
                    {client.name}
                  </Heading>
                  <Badge
                    colorScheme={statusColor[client.status]}
                    variant="subtle"
                    px={2}
                    py={1}
                    borderRadius="full"
                    textTransform="capitalize">
                    {client.status}
                  </Badge>
                </Box>
              </Flex>
            </CardHeader>

            <CardBody>
              {/* Client Info */}
              <VStack
                align="stretch"
                spacing={3}>
                <Flex align="center">
                  <Icon
                    as={FiMail}
                    mr={3}
                    color="gray.500"
                  />
                  <Text
                    fontSize="sm"
                    color="gray.600">
                    {client.email}
                  </Text>
                </Flex>

                <Flex align="center">
                  <Icon
                    as={FiPhone}
                    mr={3}
                    color="gray.500"
                  />
                  <Text
                    fontSize="sm"
                    color="gray.600">
                    {client.phone}
                  </Text>
                </Flex>

                <Divider borderColor="gray.200" />

                {/* Stats */}
                <SimpleGrid
                  columns={2}
                  spacing={4}>
                  <Box>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      mb={1}>
                      Total Projects
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold">
                      {client.projects}
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      mb={1}>
                      Active Projects
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color={`${statusColor[client.status]}.500`}>
                      {client.activeProjects}
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      mb={1}>
                      Total Spent
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold">
                      {formatCurrency(client.totalSpent)}
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      mb={1}>
                      Last Contact
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="medium">
                      {new Date(client.lastContact).toLocaleDateString()}
                    </Text>
                  </Box>
                </SimpleGrid>

                {/* Client Engagement */}
                <Box mt={2}>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    mb={1}>
                    Engagement
                  </Text>
                  <Progress
                    value={(client.activeProjects / client.projects) * 100}
                    size="sm"
                    colorScheme={statusColor[client.status]}
                    borderRadius="full"
                  />
                </Box>

                {/* Notes */}
                {client.notes && (
                  <Box mt={2}>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      mb={1}>
                      Notes
                    </Text>
                    <Text
                      fontSize="sm"
                      fontStyle="italic">
                      {client.notes}
                    </Text>
                  </Box>
                )}
              </VStack>

              {/* Actions */}
              <Flex
                mt={6}
                justify="space-between">
                <Button
                  leftIcon={<FiMail />}
                  size="sm"
                  variant="outline"
                  colorScheme="teal">
                  Message
                </Button>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FiMoreVertical />}
                    size="sm"
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem>View Profile</MenuItem>
                    <MenuItem>Edit Client</MenuItem>
                    <MenuItem>View Projects</MenuItem>
                    <MenuItem color="red.500">Archive Client</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <Box
          textAlign="center"
          py={20}>
          <Text
            fontSize="xl"
            color="gray.500">
            No clients found matching your criteria
          </Text>
          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
            }}>
            Clear filters
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ClientsPage;
