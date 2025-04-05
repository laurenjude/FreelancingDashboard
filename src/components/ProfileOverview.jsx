// src/components/ProfileOverview.jsx
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
  Progress,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, StarIcon } from "@chakra-ui/icons";

const ProfileOverview = () => {
  const [profile, setProfile] = useState({
    name: "Lauren Jude",
    title: "FullSTack Developer",
    location: "Lagos, Nigeria",
    joinDate: "January 2021",
    totalProjects: "50",
    completionRate: 92,
    rating: 4.8,
    avatarSrc: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempAvatar, setTempAvatar] = useState("");
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("freelancerProfileOverview");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem("freelancerProfileOverview", JSON.stringify(profile));
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

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(profile.rating);
    const hasHalfStar = profile.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon
            key={i}
            color="gold"
            boxSize={4}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarIcon
            key={i}
            color="gold"
            boxSize={4}
            opacity={0.7}
          />
        );
      } else {
        stars.push(
          <StarIcon
            key={i}
            color="gray.300"
            boxSize={4}
          />
        );
      }
    }
    return stars;
  };

  return (
    <Box
      maxW="lg"
      borderWidth={1}
      borderRadius="2xl"
      overflow="hidden"
      p={8}
      boxShadow="xl"
      bg={cardBg}
      borderColor={borderColor}
      position="relative"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "2xl",
      }}>
      {/* Edit Button */}
      <Tooltip label={isEditing ? "Save changes" : "Edit profile"}>
        <IconButton
          aria-label={isEditing ? "Save profile" : "Edit profile"}
          icon={isEditing ? <CheckIcon /> : <EditIcon />}
          position="absolute"
          top={6}
          right={6}
          colorScheme="teal"
          size="sm"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          zIndex={1}
        />
      </Tooltip>

      {/* Profile Header */}
      <HStack
        spacing={6}
        align="flex-start"
        mb={6}>
        <Box position="relative">
          <Avatar
            size="xl"
            src={tempAvatar || profile.avatarSrc}
            name={profile.name}
            border="4px solid"
            borderColor="teal.100"
            boxShadow="md"
            bg="teal.50"
          />
          {isEditing && (
            <Box
              position="absolute"
              bottom={-2}
              right={-2}
              bg="white"
              borderRadius="full"
              p={1}
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200">
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
                pointerEvents="none"
                leftIcon={<EditIcon boxSize={3} />}>
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
            color="teal.600">
            {profile.name}
          </Heading>
          {isEditing ? (
            <Input
              value={profile.title}
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
              size="sm"
              fontWeight="medium"
            />
          ) : (
            <Badge
              colorScheme="teal"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              fontWeight="medium">
              {profile.title}
            </Badge>
          )}

          <HStack mt={2}>
            {renderStars()}
            <Text
              fontSize="sm"
              color="gray.500">
              {profile.rating.toFixed(1)}
            </Text>
          </HStack>
        </VStack>
      </HStack>

      {/* Divider with decorative element */}
      <Flex
        align="center"
        my={4}>
        <Divider borderColor="teal.100" />
        <Box
          px={4}
          color="teal.300">
          ✨
        </Box>
        <Divider borderColor="teal.100" />
      </Flex>

      {/* Profile Details */}
      <VStack
        align="start"
        spacing={4}>
        <DetailItem
          label="📍 Location"
          value={profile.location}
          isEditing={isEditing}
          onChange={(value) => setProfile({ ...profile, location: value })}
        />

        <DetailItem
          label="📅 Joined"
          value={profile.joinDate}
          isEditing={isEditing}
          onChange={(value) => setProfile({ ...profile, joinDate: value })}
        />

        <DetailItem
          label="🏆 Projects"
          value={`${profile.totalProjects} completed`}
          isEditing={isEditing}
          onChange={(value) =>
            setProfile({ ...profile, totalProjects: value.replace(/\D/g, "") })
          }
          isNumeric
        />

        <Box
          w="full"
          pt={2}>
          <Flex
            justify="space-between"
            mb={1}>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="gray.600">
              Completion Rate:
            </Text>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="teal.600">
              {profile.completionRate}%
            </Text>
          </Flex>
          <Progress
            value={profile.completionRate}
            size="sm"
            colorScheme="teal"
            borderRadius="full"
            hasStripe
          />
        </Box>
      </VStack>

      {isEditing && (
        <Button
          mt={6}
          w="full"
          colorScheme="teal"
          variant="outline"
          onClick={handleSave}>
          Save Profile
        </Button>
      )}
    </Box>
  );
};

// Reusable detail item component
const DetailItem = ({ label, value, isEditing, onChange, isNumeric }) => {
  return (
    <Flex
      w="full"
      align="center">
      <Text
        fontSize="sm"
        fontWeight="medium"
        color="gray.600"
        minW="100px">
        {label}
      </Text>
      {isEditing ? (
        <Input
          value={isNumeric ? value.replace(/\D/g, "") : value}
          onChange={(e) => onChange(e.target.value)}
          size="sm"
          ml={2}
          type={isNumeric ? "number" : "text"}
        />
      ) : (
        <Text
          fontSize="md"
          color="gray.800"
          ml={2}
          fontWeight="medium">
          {value}
        </Text>
      )}
    </Flex>
  );
};

export default ProfileOverview;
