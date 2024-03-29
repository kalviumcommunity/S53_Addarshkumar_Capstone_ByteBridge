import React from 'react'
import { Link } from 'react-router-dom'
import { HStack, Image ,Button ,Text, VStack} from '@chakra-ui/react'

const Homepage = () => {
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
          src="/Home.svg"
          alt="image"
          boxSize={["70%","60%","40%","40%"]}
        />
    </HStack>
    </>
  )
}

export default Homepage