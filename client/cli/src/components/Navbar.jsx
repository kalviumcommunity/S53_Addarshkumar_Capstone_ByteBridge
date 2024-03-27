import React from "react";
import {
  HStack,
  Image,
  Text,
  Button,
  Icon,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        display={["none", "flex", "flex", "flex"]}
        justifyContent="space-evenly"
        backgroundColor="black"
        color="white"
        h="10vh"
      >
        <Image
          borderRadius="full"
          boxSize="50px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjrdiWzNbAl_PBwut_OctY7yndfy81qNZ7RA&usqp=CAU"
          alt="Dan Abramov"
        />
        <Text>Home</Text>
        <Text>Blog</Text>
        <Text>About us</Text>
        <Text>Contact us</Text>
        <Button colorScheme="orange">Login</Button>
      </HStack>

      <HStack
        display={["flex", "none", "none", "none"]}
        justifyContent="space-evenly"
        backgroundColor="black"
        color="white"
        h="10vh"
      >
        <Icon onClick={onOpen} boxSize={6} as={AiOutlineMenu} />
        <Image
          borderRadius="full"
          boxSize="50px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjrdiWzNbAl_PBwut_OctY7yndfy81qNZ7RA&usqp=CAU"
          alt="Dan Abramov"
        />

        <Button colorScheme="orange">Login</Button>
      </HStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="200px">
          <DrawerCloseButton />

          <DrawerBody mt="40px">
            <VStack h="60vh">
              <Text mt="20px" onClick={onClose}>Home</Text>
              <Text mt="20px" onClick={onClose}>Blog</Text>
              <Text mt="20px" onClick={onClose}>contact us</Text>
              <Text mt="20px" onClick={onClose}>About us</Text>
              <Icon mt="30px" boxSize={6} as={CiLogout} />
            </VStack>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
