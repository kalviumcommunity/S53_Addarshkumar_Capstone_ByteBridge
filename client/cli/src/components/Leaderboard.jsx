import React, { useState, useEffect } from "react";
import { AppContext } from "./context/Parentcontext";
import { HStack, Image, Box, VStack, Text,Avatar, Heading } from "@chakra-ui/react";
import axios from "axios";
const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const getTopUsers = async () => {
    try {
      const res = await axios.get(
        "https://s53-addarshkumar-capstone-bytebridge.onrender.com/userlikes"
      );
      setTopUsers(res.data);
      console.log(topUsers);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTopUsers();
  }, []);

  return (
    <>
      <VStack w={"100%"} h={"100vh"} backgroundImage={"Leaderboard.svg"} justifyContent={"center"}>
      <Heading color="white" position={"absolute"} top={"20%"}  textAlign="center">Leaderboard</Heading>
        {topUsers.map((item,index) => (
          
          <Box
           key={index}
            bg="orange.500"
            textAlign={"center"}
            borderRadius={"50px"}
            w={["80%","70%","60%","40%"]}
            p={6}
            color="white"
          >
            <HStack w={["100%","100%","100%","100%"]} justifyContent={"space-between"}>
              <HStack w={"50%"} justifyContent={"space-between"}>

            <Text fontWeight={"600"} fontSize={"20px"}>{index+1}</Text>
            <Avatar boxSize={"14"}  src={item.userProfile} />
            <Text fontWeight={"600"} fontSize={"20px"}>{item.username}</Text>
              </HStack>
              <HStack>
                <Image src="hearticon.gif" />
                <Text fontWeight={"600"} fontSize={"20px"}>{item.totalLikes}</Text>
              </HStack>

            </HStack>
          </Box>
        ))}
      </VStack>
    </>
  );
};

export default Leaderboard;
