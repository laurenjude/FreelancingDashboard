// src/pages/ProjectsPage.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  useColorModeValue,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
  Icon,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import ProjectCard from "../components/ProjectCard";

const project = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const toast = useToast();
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Website Redesign",
      status: "Ongoing",
      deadline: "2023-12-15",
      progress: 65,
      budget: 12500,
      client: "FashionHub Inc.",
      team: [
        { name: "You", role: "Lead Developer" },
        { name: "Sarah", role: "UI Designer" },
        { name: "Mike", role: "Backend Dev" },
      ],
      priority: "High",
      description: "Complete redesign of product pages and checkout flow",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      status: "Ongoing",
      deadline: "2023-12-30",
      progress: 35,
      budget: 18200,
      client: "MetroBank",
      team: [
        { name: "You", role: "Project Manager" },
        { name: "Alex", role: "Mobile Dev" },
      ],
      priority: "High",
      description: "New features for money transfers and biometric auth",
    },
    {
      id: 3,
      title: "Marketing Dashboard",
      status: "Upcoming",
      deadline: "2024-01-15",
      progress: 10,
      budget: 8500,
      client: "GrowthMarketing LLC",
      team: [
        { name: "You", role: "Full-stack Dev" },
        { name: "Jessica", role: "Data Analyst" },
      ],
      priority: "Medium",
      description: "Analytics dashboard with real-time data visualization",
    },
    {
      id: 4,
      title: "CMS Implementation",
      status: "Completed",
      deadline: "2023-11-20",
      progress: 100,
      budget: 9600,
      client: "NewsPortal Ltd.",
      team: [{ name: "You", role: "WordPress Expert" }],
      priority: "Low",
      description: "Migration from custom solution to WordPress",
    },
    {
      id: 5,
      title: "IoT Smart Home System",
      status: "On Hold",
      deadline: "2024-02-28",
      progress: 25,
      budget: 22500,
      client: "SmartLiving Tech",
      team: [
        { name: "You", role: "IoT Specialist" },
        { name: "David", role: "Hardware Engineer" },
      ],
      priority: "Medium",
      description: "Integration of smart devices with mobile control",
    },
    {
      id: 6,
      title: "Portfolio Website",
      status: "Completed",
      deadline: "2023-10-10",
      progress: 100,
      budget: 4200,
      client: "Creative Studio",
      team: [{ name: "You", role: "Designer & Developer" }],
      priority: "Low",
      description: "Minimalist portfolio for design agency",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColor = {
    Ongoing: "blue",
    Upcoming: "purple",
    Completed: "green",
    "On Hold": "orange",
    Cancelled: "red",
  };

  const priorityColor = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAddProject = () => {
    toast({
      title: "Add new project",
      description: "Project creation form would open here",
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
          Projects
          <Text
            as="span"
            fontSize="lg"
            color="gray.500"
            ml={2}>
            ({filteredProjects.length})
          </Text>
        </Heading>

        <Button
          leftIcon={<FiPlus />}
          colorScheme="teal"
          onClick={handleAddProject}>
          New Project
        </Button>
      </Flex>

      {/* Filters Section */}
      <Flex
        mb={8}
        gap={4}
        flexWrap="wrap">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <Icon
              as={FiSearch}
              color="gray.300"
            />
          </InputLeftElement>
          <Input
            placeholder="Search projects..."
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
          <option value="all">All Projects</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </Select>
      </Flex>

      {/* Projects Tabs */}
      <Tabs
        variant="enclosed"
        mb={8}>
        <TabList>
          <Tab>All Projects</Tab>
          <Tab>Ongoing</Tab>
          <Tab>Upcoming</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={6}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  status={project.status}
                  deadline={formatDate(project.deadline)}
                  progress={project.progress}
                  client={project.client}
                  budget={project.budget}
                  team={project.team}
                  priority={project.priority}
                  description={project.description}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px={0}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={6}>
              {filteredProjects
                .filter((p) => p.status === "Ongoing")
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    deadline={formatDate(project.deadline)}
                  />
                ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px={0}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={6}>
              {filteredProjects
                .filter((p) => p.status === "Upcoming")
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    deadline={formatDate(project.deadline)}
                  />
                ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px={0}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={6}>
              {filteredProjects
                .filter((p) => p.status === "Completed")
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    deadline={formatDate(project.deadline)}
                  />
                ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Box
          textAlign="center"
          py={20}>
          <Text
            fontSize="xl"
            color="gray.500">
            No projects found matching your criteria
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

export default project;
