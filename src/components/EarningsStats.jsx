// src/components/EarningStats.jsx
import React from "react";
import {
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";

const EarningStats = ({ totalEarnings, completedProjects, totalClients }) => {
  return (
    <Box
      p={4}
      display="flex"
      justifyContent="space-around"
      flexWrap="wrap" // Added for better mobile responsiveness
    >
      <Stat
        bg="white"
        shadow="lg" // Increased shadow for more depth
        borderRadius="lg" // Larger border radius
        p={6} // Increased padding
        flex="1"
        m={2}
        textAlign="center"
        borderLeft="5px solid" // Added accent border
        borderColor="blue.400" // Blue accent
        transition="all 0.2s" // Smooth hover effect
        _hover={{
          transform: "translateY(-2px)",
          shadow: "xl",
        }}>
        <StatLabel
          fontSize="lg"
          color="gray.600"
          fontWeight="medium">
          Total Earnings
        </StatLabel>
        <StatNumber
          fontSize="2xl"
          color="blue.600"
          my={2}>
          {totalEarnings}
        </StatNumber>
        <StatHelpText
          color="blue.500"
          fontSize="sm">
          This month
        </StatHelpText>
      </Stat>

      <Stat
        bg="white"
        shadow="lg"
        borderRadius="lg"
        p={6}
        flex="1"
        m={2}
        textAlign="center"
        borderLeft="5px solid"
        borderColor="green.400" // Green accent
        transition="all 0.2s"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "xl",
        }}>
        <StatLabel
          fontSize="lg"
          color="gray.600"
          fontWeight="medium">
          Completed Projects
        </StatLabel>
        <StatNumber
          fontSize="2xl"
          color="green.600"
          my={2}>
          {completedProjects}
        </StatNumber>
        <StatHelpText
          color="green.500"
          fontSize="sm">
          This year
        </StatHelpText>
      </Stat>

      <Stat
        bg="white"
        shadow="lg"
        borderRadius="lg"
        p={6}
        flex="1"
        m={2}
        textAlign="center"
        borderLeft="5px solid"
        borderColor="purple.400" // Purple accent
        transition="all 0.2s"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "xl",
        }}>
        <StatLabel
          fontSize="lg"
          color="gray.600"
          fontWeight="medium">
          Total Clients
        </StatLabel>
        <StatNumber
          fontSize="2xl"
          color="purple.600"
          my={2}>
          {totalClients}
        </StatNumber>
        <StatHelpText
          color="purple.500"
          fontSize="sm">
          Active clients
        </StatHelpText>
      </Stat>
    </Box>
  );
};

export default EarningStats;
