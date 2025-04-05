// src/components/ProfileCard.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Input,
  IconButton,
  useToast,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";

const ProfileCard = () => {
  const [profile, setProfile] = useState({
    name: "Lauren Jude",
    profession: "Fullstack DEVELOPER",
    location: "lagos, Nigeria",
    totalProjects: "50",
    avatarSrc: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempAvatar, setTempAvatar] = useState("");
  const toast = useToast();

  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("freelancerProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("freelancerProfile", JSON.stringify(profile));
  }, [profile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (tempAvatar) {
      setProfile({ ...profile, avatarSrc: tempAvatar });
      setTempAvatar("");
    }
    setIsEditing(false);
    toast({
      title: "Profile updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      borderWidth={1}
      borderRadius="xl"
      overflow="hidden"
      p={6}
      boxShadow="lg"
      bg="white"
      position="relative"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-2px)",
        transition: "all 0.3s ease",
      }}>
      {/* Edit Button */}
      <IconButton
        aria-label="Edit profile"
        icon={isEditing ? <CheckIcon /> : <EditIcon />}
        position="absolute"
        top={4}
        right={4}
        colorScheme="teal"
        size="sm"
        onClick={isEditing ? handleSave : () => setIsEditing(true)}
      />

      <HStack
        spacing={6}
        align="flex-start">
        <Box position="relative">
          <Avatar
            size="xl"
            src={tempAvatar || profile.avatarSrc}
            name={profile.name}
            border="3px solid"
            borderColor="teal.200"
            boxShadow="md"
          />
          {isEditing && (
            <Box
              position="absolute"
              bottom={0}
              right={0}
              bg="white"
              borderRadius="full"
              p={1}
              boxShadow="md">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                opacity={0}
                position="absolute"
                width="100%"
                height="100%"
                top={0}
                left={0}
                cursor="pointer"
                zIndex={1}
              />
              <Button
                size="xs"
                colorScheme="teal"
                variant="solid"
                pointerEvents="none">
                Change
              </Button>
            </Box>
          )}
        </Box>

        <VStack
          align="start"
          spacing={1}>
          <Heading
            size="lg"
            fontWeight="bold"
            color="gray.800">
            {profile.name}
          </Heading>
          <Badge
            colorScheme="teal"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="sm">
            {profile.profession}
          </Badge>
        </VStack>
      </HStack>

      <Divider
        my={4}
        borderColor="gray.200"
      />

      <VStack
        align="start"
        spacing={3}>
        <Flex align="center">
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="gray.600"
            minW="120px">
            📍 Location:
          </Text>
          <Text
            fontSize="md"
            color="gray.800"
            ml={2}>
            {profile.location}
          </Text>
        </Flex>

        <Flex align="center">
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="gray.600"
            minW="120px">
            🏆 Projects:
          </Text>
          <Text
            fontSize="md"
            color="gray.800"
            ml={2}>
            {profile.totalProjects} completed
          </Text>
        </Flex>

        {isEditing && (
          <Box
            w="full"
            mt={4}>
            <Text
              fontSize="sm"
              color="gray.500"
              mb={2}>
              Update your profile information:
            </Text>
            <VStack spacing={3}>
              <Input
                placeholder="Profession"
                value={profile.profession}
                onChange={(e) =>
                  setProfile({ ...profile, profession: e.target.value })
                }
              />
              <Input
                placeholder="Location"
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
              />
              <Input
                placeholder="Total Projects"
                value={profile.totalProjects}
                onChange={(e) =>
                  setProfile({ ...profile, totalProjects: e.target.value })
                }
              />
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ProfileCard;
