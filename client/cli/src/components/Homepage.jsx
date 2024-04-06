import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HStack, Image ,Button ,Text, VStack, Icon} from '@chakra-ui/react'
import Sidebar from './Sidebar';


const Homepage = () => {
  const [selected,setSelected]=useState(null);

  const handleFocus=(option)=>{
    setSelected(option);
  }
  return (
    <>
    <HStack 
    display={["flex","flex","flex","flex"]}
    flexDirection={["column-reverse","column-reverse","row","row"]}
    mt="20px"
    justifyContent="space-evenly"
    >
      <VStack
      alignItems="start"
      >

      <Text
      mt={["30px","30px","none",'none']}
      fontWeight='600'
      fontSize={["18px","20px","40px","40px"]}
      >
        Welcome to Byte Bridge
      </Text>
      <Text
      fontSize={["12px","15px","none","none"]}
      >
       Your Hub for Coding Knowledge!
        Ask questions, share insights, <br />
         and engage with peers in a  
         supportive learning community.
      </Text>
      <Link to="/signup">
      <Button
      colorScheme="blue"
      mt="20px"
      w={["90%","none","none","none"]}
      >
        Create Account
      </Button>
      </Link>
      </VStack>
    <Image
          loading="lazy"
          src="/Home.svg"
          alt="image"
          boxSize={["70%","60%","40%","40%"]}
        />
    </HStack>
    <HStack m={'5%'} alignItems="flex-start">
  <Sidebar />
  <VStack>
    <HStack cursor={"pointer"} w={"500px"} justifyContent={"space-evenly"}>
      <VStack onClick={()=>{handleFocus("recent")}}>
      <Text>
        Recent questions
      </Text>
      <div  style={{"width":"166px" , "height":"4px" ,"backgroundColor":selected=="recent"?"orange":"white"}}>

      </div>
      </VStack>

      <VStack onClick={()=>{handleFocus("most")}}>
      <Text>
        Most answered
      </Text>
      <div  style={{"width":"166px" , "height":"4px" ,"backgroundColor":selected=="most"?"orange":"white"}}>

</div>
      </VStack>

      <VStack onClick={()=>{handleFocus("trending")}}>
      <Text>
        Trending
      </Text>
      <div style={{"width":"166px" , "height":"4px" ,"backgroundColor":selected=="trending"?"orange":"white"}}>

</div>
      </VStack>
    </HStack>
  </VStack>
  

    </HStack>

    </>
  )
}

export default Homepage