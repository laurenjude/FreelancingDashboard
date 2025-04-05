// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Button,
  useDisclosure,
  useColorModeValue,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const navShadow = useColorModeValue(
    "0 4px 12px 0 rgba(0, 0, 0, 0.08)",
    "0 4px 12px 0 rgba(0, 0, 0, 0.25)"
  );

  return (
    <Box
      bg={bgColor}
      px={6} // Increased horizontal padding
      py={4} // Increased vertical padding
      shadow={navShadow}
      position="sticky"
      top={0}
      zIndex={999}
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="container.xl" // Added max width for larger screens
        mx="auto" // Center align on wide screens
      >
        {/* Logo Section */}
        <Link to="/">
          <Flex align="center">
            <Text
              fontSize="2xl" // Larger font size
              fontWeight="extrabold" // Extra bold weight
              bgGradient="linear(to-r, teal.400, teal.600)" // Gradient text
              bgClip="text" // Apply gradient to text
              letterSpacing="tight" // Tighter letter spacing
            >
              Freelancer Dashboard
            </Text>
          </Flex>
        </Link>

        {/* Desktop Navigation */}
        <HStack
          spacing={8} // Increased spacing between items
          display={{ base: "none", md: "flex" }}>
          {[
            { path: "/projects", label: "Projects" },
            { path: "/clients", label: "Clients" },
            { path: "/earnings", label: "Earnings" },
            { path: "/settings", label: "Settings" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}>
              <Button
                variant="ghost"
                colorScheme="teal"
                size="md"
                fontWeight="semibold"
                _hover={{
                  transform: "translateY(-2px)",
                  textDecoration: "underline",
                }}
                transition="all 0.2s">
                {item.label}
              </Button>
            </Link>
          ))}
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon boxSize={6} />} // Larger icon
          size="lg"
          variant="outline"
          colorScheme="teal"
          onClick={onOpen}
          display={{ base: "flex", md: "none" }}
        />

        {/* Mobile Drawer */}
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size="xs">
          <DrawerOverlay backdropFilter="blur(4px)" />
          <DrawerContent bg={bgColor}>
            <DrawerCloseButton
              size="lg"
              mt={2}
            />
            <DrawerHeader
              borderBottom="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              pb={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient="linear(to-r, teal.400, teal.600)"
                bgClip="text">
                Freelancer Dashboard
              </Text>
            </DrawerHeader>
            <DrawerBody py={8}>
              <VStack
                align="stretch"
                spacing={6}>
                {[
                  { path: "/", label: "Dashboard" },
                  { path: "/projects", label: "Projects" },
                  { path: "/clients", label: "Clients" },
                  { path: "/earnings", label: "Earnings" },
                  { path: "/settings", label: "Settings" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}>
                    <Button
                      w="full"
                      justifyContent="flex-start"
                      variant="ghost"
                      colorScheme="teal"
                      size="lg"
                      px={4}
                      py={6}
                      _hover={{
                        bg: useColorModeValue("teal.50", "teal.900"),
                      }}>
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Navbar;
