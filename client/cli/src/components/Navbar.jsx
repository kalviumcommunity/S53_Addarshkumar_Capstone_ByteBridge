import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HStack,
  Image,
  Text,
  Button,
  Icon,
  useDisclosure,
  VStack,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

import { AiOutlineMenu } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { AppContext } from "./context/Parentcontext";
import { useRecoilState } from "recoil";
import { userState } from "../atom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(userState);
  
  let token = "";
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    token = tokenCookie.split("=")[1];
  } else {
    console.error("Token cookie not found");
  }

  if(token.length > 0){
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  const isMobile = useBreakpointValue({ base: true, md: false });

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
          <Button display={isAuthenticated ? "none" : "block"} colorScheme="orange">Login</Button>
        </Link>
        <Button onClick={onOpen} display={isAuthenticated ? "block" : "none"} colorScheme="red">Log out</Button>
          <Link to={"/profilepage"}>
        <Avatar boxSize={"40px"} src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" />
          </Link>  
      </HStack>

      {isMobile && (
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
      )}

      {isMobile && (
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
      )}

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to logout
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>{onClose();handleLogout();}} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Navbar;
