// src/components/FeedbackCard.jsx
import React from "react";
import { Box, Text, Badge, Flex, Stack, Avatar } from "@chakra-ui/react";

const FeedbackCard = ({ message, clientName, rating }) => {
  return (
    <Box
      p={6}
      shadow="lg"
      bg="white"
      borderRadius="xl"
      borderTop="4px solid"
      borderColor="teal.400"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
      }}
      position="relative"
      overflow="hidden">
      {/* Decorative quote icon */}
      <Box
        position="absolute"
        top={2}
        right={4}
        fontSize="6xl"
        color="gray.100"
        zIndex="0">
        "
      </Box>

      <Stack spacing={4}>
        <Text
          fontSize="md"
          color="gray.700"
          fontStyle="italic"
          position="relative"
          zIndex="1">
          "{message}"
        </Text>

        <Flex
          align="center"
          justify="space-between">
          <Flex align="center">
            <Avatar
              name={clientName}
              size="sm"
              bg="teal.500"
              color="white"
              mr={3}
            />
            <Text
              fontWeight="semibold"
              color="gray.800">
              {clientName}
            </Text>
          </Flex>

          <Badge
            colorScheme="yellow"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="md"
            boxShadow="sm">
            ⭐ {rating}
          </Badge>
        </Flex>
      </Stack>
    </Box>
  );
};

export default FeedbackCard;
