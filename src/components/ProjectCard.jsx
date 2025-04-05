// src/components/ProjectCard.jsx
import React from "react";
import {
  Box,
  Text,
  Badge,
  Flex,
  Progress,
  Icon,
  useColorModeValue,
  Tooltip,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import { FiClock, FiCalendar, FiUsers } from "react-icons/fi";

const ProjectCard = ({
  title,
  status,
  deadline,
  progress = 65,
  team = [],
  priority = "Medium",
}) => {
  const statusColor = {
    Ongoing: "green",
    Completed: "blue",
    Overdue: "red",
    "On Hold": "yellow",
    Planning: "purple",
  };

  const priorityColor = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box
      p={6}
      shadow="lg"
      bg={cardBg}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
        bg: hoverBg,
      }}
      position="relative"
      overflow="hidden">
      {/* Priority Indicator */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="6px"
        h="full"
        bg={`${priorityColor[priority]}.400`}
      />

      {/* Project Title */}
      <Text
        fontSize="xl"
        fontWeight="bold"
        mb={2}
        color={useColorModeValue("gray.800", "white")}>
        {title}
      </Text>

      {/* Progress Bar */}
      <Box mb={4}>
        <Flex
          justify="space-between"
          mb={1}>
          <Text
            fontSize="sm"
            color="gray.500">
            Progress
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={`${statusColor[status]}.500`}>
            {progress}%
          </Text>
        </Flex>
        <Progress
          value={progress}
          colorScheme={statusColor[status]}
          size="sm"
          borderRadius="full"
          hasStripe={status === "Ongoing"}
        />
      </Box>

      {/* Project Meta */}
      <Flex
        direction="column"
        gap={3}>
        {/* Deadline */}
        <Flex align="center">
          <Icon
            as={FiCalendar}
            mr={2}
            color="gray.500"
          />
          <Text
            fontSize="sm"
            color="gray.600">
            Deadline:{" "}
            <Text
              as="span"
              fontWeight="medium">
              {deadline}
            </Text>
          </Text>
        </Flex>

        {/* Status & Priority */}
        <Flex
          justify="space-between"
          align="center">
          <Tooltip label={`Project status: ${status}`}>
            <Badge
              colorScheme={statusColor[status]}
              px={3}
              py={1}
              borderRadius="full"
              textTransform="capitalize">
              {status}
            </Badge>
          </Tooltip>

          <Tooltip label={`Priority: ${priority}`}>
            <Flex align="center">
              <Icon
                as={FiClock}
                mr={1}
                color={`${priorityColor[priority]}.500`}
              />
              <Text
                fontSize="xs"
                color={`${priorityColor[priority]}.500`}>
                {priority}
              </Text>
            </Flex>
          </Tooltip>
        </Flex>

        {/* Team */}
        {team.length > 0 && (
          <Flex
            align="center"
            mt={2}>
            <Icon
              as={FiUsers}
              mr={2}
              color="gray.500"
            />
            <AvatarGroup
              size="sm"
              max={3}
              spacing={-2}>
              {team.map((member, index) => (
                <Avatar
                  key={index}
                  name={member.name}
                  src={member.avatar}
                  borderColor={cardBg}
                />
              ))}
            </AvatarGroup>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ProjectCard;
