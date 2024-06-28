import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
  HStack,
  VStack,
  Icon,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { BsQuestionSquare } from "react-icons/bs";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdLeaderboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaBuysellads } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";


const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <>
      <VStack
        h={"50vh"}
        justifyContent={"space-between"}
        pl={["5%", "5%", "5%", "5%"]}
      >

        <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"6"} as={BsQuestionSquare} />
          <Link to={"/questionpage"}>
            <Text>Ask questions</Text>
          </Link>
        </HStack>

        <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"6"} as={BsPencilSquare} />
          <Link to={"/blogpostpage"}>
            <Text>Post Blogs</Text>
          </Link>
        </HStack>

        <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"4"} as={BsFillQuestionSquareFill} />
          <Link to={"/"}>
            <Text>Questions</Text>
          </Link>
        </HStack>

        <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"6"} as={MdLeaderboard} />
          <Link to={"/leaderboard"}>
          <Text>Leaderboard</Text>
          </Link>
        </HStack>
    
         
        <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"6"} as={FaUsers} />
          <Link to={"/profilepage"}>
          <Text>Your Profile</Text>
          </Link>
        </HStack>

        <HStack className="nav-icon" width={"120%"}>
          <Icon boxSize={"6"} as={FaBuysellads} />
          <Link to={"/adformpage"}>
          <Text>Show Ads</Text>
          </Link>
        </HStack>

        
        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Logout
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You want to logout
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    onClose();
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
      </VStack>
    </>
  );
};

export default Sidebar;
