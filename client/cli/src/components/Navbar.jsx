import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDisclosure, HStack, Image, Text, Button, Icon, VStack, Avatar, useBreakpointValue, Drawer, DrawerBody, DrawerFooter, DrawerOverlay, DrawerContent, DrawerCloseButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { AppContext } from "./context/Parentcontext";
import { useRecoilState } from "recoil";
import { userState } from "../atom";

import { BsQuestionSquare } from "react-icons/bs";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdLeaderboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const Navbar = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose
  } = useDisclosure();
  
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(userState);
  const { photoURL, isUser, handleLogout,userProfile } = useContext(AppContext);
  
  let token = "";
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    token = tokenCookie.split("=")[1];
  }  

  if (token.length > 0) {
    setIsAuthenticated(true);
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
        <Image loading="lazy" boxSize="50px" src="/logo.svg" alt="logo" />
        <Link to="/">
          <Text>Home</Text>
        </Link>
        <Link to={"/blogpage"}>
        <Text>Blog</Text>
        </Link>
        <Text>Contact us</Text>

        <Link to="/login">
          <Button display={isAuthenticated ? "none" : "block"} colorScheme="orange">Login</Button>
        </Link>
        <Button onClick={onAlertOpen} display={isAuthenticated ? "block" : "none"} colorScheme="red">Log out</Button>
        <Link to={"/profilepage"}>
          <Avatar boxSize={"40px"} src={photoURL && isAuthenticated ? photoURL :userProfile.profileImg} />
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
          <Icon onClick={onDrawerOpen} boxSize={6} as={AiOutlineMenu} />
          <Image boxSize="50px" src="/logo.svg" alt="Dan Abramov" />

          <Link to="/login">
          <Button display={isAuthenticated ? "none" : "block"} colorScheme="orange">Login</Button>
          </Link>
          <Button onClick={onAlertOpen} display={isAuthenticated ? "block" : "none"} colorScheme="red">Log out</Button>
        </HStack>
      )}

      {isMobile && (
        <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
          <DrawerOverlay />
          <DrawerContent maxW="200px">
            <DrawerCloseButton />

            <DrawerBody mt="40px">
              <VStack h="60vh">
                <Link to="/">
                  <Text mt="20px" onClick={onDrawerClose}>Home</Text>
                </Link>
                <Text mt="20px" onClick={onDrawerClose}>Blog</Text>
                <Text mt="20px" onClick={onDrawerClose}>contact us</Text>
                <Text mt="20px" onClick={onDrawerClose}>About us</Text>
                <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"6"} as={BsQuestionSquare} />
          <Link to={"/questionpage"}>
            <Text>Ask questions</Text>
          </Link>
        </HStack>

        <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"4"} as={BsFillQuestionSquareFill} />
          <Text>Questions</Text>
        </HStack>

        <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"6"} as={MdLeaderboard} />
          <Text>Leaderboard</Text>
        </HStack>

        <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"6"} as={FaUsers} />
          <Text>Users</Text>
        </HStack>
                <Icon mt="30px" boxSize={6} as={CiLogout} />
              </VStack>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <AlertDialog isOpen={isAlertOpen} onClose={onAlertClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to logout
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => { onAlertClose(); handleLogout(); }} ml={3}>
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
