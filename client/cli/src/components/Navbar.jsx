import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  useDisclosure,
  HStack,
  Image,
  Text,
  Button,
  Icon,
  VStack,
  Avatar,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { FaBlog } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { AppContext } from "./context/Parentcontext";
import { useRecoilState } from "recoil";
import { userState } from "../atom";

import { BsQuestionSquare } from "react-icons/bs";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdLeaderboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

const Navbar = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(userState);
  const { photoURL, isUser, handleLogout, userProfile } =
    useContext(AppContext);

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
          <Button
            display={isAuthenticated ? "none" : "block"}
            colorScheme="orange"
          >
            Login
          </Button>
        </Link>
        <Button
          onClick={onAlertOpen}
          display={isAuthenticated ? "block" : "none"}
          colorScheme="red"
        >
          Log out
        </Button>
        <Link to={"/profilepage"}>
          <Avatar
            boxSize={"40px"}
            src={
              photoURL && isAuthenticated ? photoURL : userProfile.profileImg
            }
          />
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
            <Button
              display={isAuthenticated ? "none" : "block"}
              colorScheme="orange"
            >
              Login
            </Button>
          </Link>
          <Button
            onClick={onAlertOpen}
            display={isAuthenticated ? "block" : "none"}
            colorScheme="red"
          >
            Log out
          </Button>
        </HStack>
      )}

      {isMobile && (
        <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
          <DrawerOverlay />
          <DrawerContent maxW="200px">
            <DrawerCloseButton />

            <DrawerBody mt="40px">
              <VStack h="70vh">
                <HStack className="nav-icon" width={"120%"}>
                  <Icon boxSize={"6"} as={IoMdHome} />
                  <Link to={"/"}>
                    <Text onClick={onDrawerClose}>Home</Text>
                  </Link>
                </HStack>
                <HStack className="nav-icon" width={"120%"}>
                  <Icon boxSize={"6"} as={FaBlog} />
                  <Link to={"/blogpage"}>
                    <Text onClick={onDrawerClose}>Blog</Text>
                  </Link>
                </HStack>
                <HStack className="nav-icon" width={"120%"}>
                  <Icon boxSize={"6"} as={IoIosContact} />
                  <Link to={"/questionpage"}>
                    <Text onClick={onDrawerClose}>Contact Us</Text>
                  </Link>
                </HStack>

                <HStack className="nav-icon" width={"120%"}>
                  <Icon boxSize={"6"} as={BsQuestionSquare} />
                  <Link to={"/questionpage"}>
                    <Text onClick={onDrawerClose}>Ask questions</Text>
                  </Link>
                </HStack>

                <HStack className="nav-icon" width={"120%"}>
                  <Icon boxSize={"6"} as={BsPencilSquare} />
                  <Link to={"/blogpostpage"}>
                    <Text onClick={onDrawerClose}>Post Blogs</Text>
                  </Link>
                </HStack>

                <HStack className="nav-icon" width={"120%"}>
                  <Icon boxSize={"4"} as={BsFillQuestionSquareFill} />
                  <Text onClick={onDrawerClose}>Questions</Text>
                </HStack>

                <HStack className="nav-icon" width={"120%"}>
                  <Icon boxSize={"6"} as={MdLeaderboard} />
                  <Link to={"/leaderboard"}>
                    <Text onClick={onDrawerClose}>Leaderboard</Text>
                  </Link>
                </HStack>

                <HStack className="nav-icon" width={"120%"}>
                  <Icon boxSize={"6"} as={FaUsers} />
                  <Link to={"/profilepage"}>
                    <Text onClick={onDrawerClose}>Your Profile</Text>
                  </Link>
                </HStack>
              </VStack>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <AlertDialog isOpen={isAlertOpen} onClose={onAlertClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You want to logout</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onAlertClose}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onAlertClose();
                  handleLogout();
                }}
                ml={3}
              >
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
