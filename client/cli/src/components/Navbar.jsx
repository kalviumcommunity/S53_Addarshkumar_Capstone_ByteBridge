import React from "react";
import { Link } from "react-router-dom";
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
          loading="lazy"
          boxSize="50px"
          src="/logo.svg"
          alt="logo"
        />
        <Link to="/">
        <Text>Home</Text>
        </Link>
        <Text>Blog</Text>
        <Text>Contact us</Text>
        <Link to="/login">
        <Button colorScheme="orange">Login</Button>
        </Link>
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
          boxSize="50px"
          src="/logo.svg"
          alt="Dan Abramov"
        />

         <Link to="/login">
        <Button colorScheme="orange">Login</Button>
        </Link>
      </HStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="200px">
          <DrawerCloseButton />

          <DrawerBody mt="40px">
            <VStack h="60vh">
              <Link to="/">
              <Text mt="20px" onClick={onClose}>Home</Text>
              </Link>
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
