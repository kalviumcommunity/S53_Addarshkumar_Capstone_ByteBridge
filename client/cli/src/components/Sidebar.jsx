import React from 'react'
import "./Sidebar.css"

import { HStack,VStack,Icon,Text,useDisclosure,Button } from '@chakra-ui/react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'
import { MdHome } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdLeaderboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
       
   <VStack
    h={"55vh"} 
    justifyContent={"space-between"}  
    pl={["5%","5%","5%","5%"]}
   >
    <HStack className="nav-icon" width={"120%"}>
    <Icon boxSize={"6"} as={MdHome} />
    <Text>Home</Text>
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

    <HStack className="nav-icon" width={"120%"} >
    <Icon boxSize={"6"} as={IoIosTrendingUp} />
    <Text>Trending</Text>
    </HStack>

    <HStack onClick={onOpen} className="nav-icon" width={"120%"}>
    <Icon boxSize={"6"} as={CiLogout} />
    <Text>Logout</Text>
    </HStack>
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
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

   </VStack>

    </>
  )
}

export default Sidebar