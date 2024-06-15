import React, { useState, useEffect } from 'react'
import { AppContext } from './context/Parentcontext'
import {HStack,Image,Box, VStack, Text} from "@chakra-ui/react"
import axios from 'axios';
const Leaderboard = () => {

  const [topUsers,setTopUsers]=useState([]);
  const getTopUsers=async()=>{
    try{
      const res=await axios.get("https://s53-addarshkumar-capstone-bytebridge.onrender.com/userlikes");
      setTopUsers(res.data);
      console.log(topUsers);

    }
    catch(err){
      console.log(err);
    }

  }
  useEffect(()=>{
    getTopUsers();
  },[])

  return (
    <>
<VStack
justifyContent={"center"}
>
<Image h={"40vh"} src='https://img.freepik.com/free-vector/realistic-illustration-gold-cup-with-red-ribbon-winner-leader-champion_1262-13474.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717632000&semt=ais_user'></Image>
{
  topUsers.map((item)=>(

<Box bg='green' textAlign={"center"} borderRadius={"15px"} w='30%' p={4} color='white'>
  <Text>{item.username}</Text>
</Box>
  ))
}
</VStack>
    </>
  )
}

export default Leaderboard