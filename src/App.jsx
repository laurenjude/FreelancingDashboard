// src/App.jsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  SimpleGrid,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { keyframes } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";
import ProfileOverview from "./components/ProfileOverview";
import EarningStats from "./components/EarningsStats";
import ProjectCard from "./components/ProjectCard";
import FeedbackCard from "./components/FeedbackCard";

import ClientsPage from "./pages/Clients";
import Earnings from "./pages/Earnings";
import Settings from "./pages/Settings";
import Project from "./pages/project";

// Define animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Custom theme with beautiful background
const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bgGradient:
          props.colorMode === "dark"
            ? "linear(to-br, gray.900 0%, gray.800 50%, gray.900 100%)"
            : "linear(to-br, teal.50 0%, purple.50 50%, blue.50 100%)",
        bgSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        minHeight: "100vh",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        transition: "all 0.2s ease",
        _hover: {
          transform: "scale(1.05)",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
    },
    Card: {
      baseStyle: {
        transition: "all 0.3s ease",
        _hover: {
          transform: "translateY(-5px)",
          boxShadow: "xl",
        },
      },
    },
  },
});

// Placeholder components for routing
const Dashboard = () => {
  return (
    <Box
      px={6}
      py={8}
      animation={`${fadeIn} 0.5s ease-out`}>
      <Heading
        mb={6}
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        color="teal.500">
        Freelancer Dashboard
      </Heading>

      {/* Profile Section */}
      <Grid
        templateColumns={{ base: "1fr", md: "3fr 1fr" }}
        gap={6}>
        <ProfileCard
          name="John Doe"
          profession="Freelance Developer"
          location="San Francisco, CA"
          totalProjects={15}
          avatarSrc="/avatar.png"
          animation={`${slideUp} 0.5s ease-out`}
        />
        <ProfileOverview />
      </Grid>

      {/* Earnings Stats - Fixed Mobile Alignment */}
      <Box mt={8}>
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 2, lg: 3 }}
          spacing={6}>
          <EarningStats
            totalEarnings="$5,200"
            completedProjects="15"
            totalClients="8"
            bg="linear-gradient(to-r, teal.400, blue.500)"
            borderRadius="xl"
            boxShadow="lg"
            animation={`${slideUp} 0.6s ease-out`}
          />
        </SimpleGrid>
      </Box>

      {/* Projects and Feedback Section */}
      <Grid
        templateColumns={{ base: "1fr", md: "2fr 1fr" }}
        gap={6}
        mt={8}>
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            mb={4}
            color="blue.600">
            Ongoing Projects
          </Text>
          <ProjectCard
            title="Project 1"
            status="Ongoing"
            deadline="Dec 15, 2023"
            bg="blue.100"
            boxShadow="md"
            animation={`${slideUp} 0.7s ease-out`}
          />
          <ProjectCard
            title="Project 2"
            status="Ongoing"
            deadline="Dec 30, 2023"
            bg="purple.100"
            boxShadow="md"
            animation={`${slideUp} 0.8s ease-out`}
          />
        </Box>

        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            mb={4}
            color="purple.600">
            Client Feedback
          </Text>
          <FeedbackCard
            message="Great job on the project! Will work with you again."
            clientName="Client 1"
            rating="5 stars"
            bg="yellow.100"
            borderRadius="md"
            animation={`${slideUp} 0.7s ease-out`}
          />
          <FeedbackCard
            message="Excellent communication and work. Highly recommend!"
            clientName="Client 2"
            rating="4.5 stars"
            bg="green.100"
            borderRadius="md"
            animation={`${slideUp} 0.8s ease-out`}
          />
        </Box>
      </Grid>
    </Box>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/projects"
              element={<Project />}
            />
            <Route
              path="/clients"
              element={<ClientsPage />}
            />
            <Route
              path="/earnings"
              element={<Earnings />}
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
