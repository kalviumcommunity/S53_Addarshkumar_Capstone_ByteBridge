import React from 'react'
import { Box,HStack,Heading,VStack,Text,Icon } from '@chakra-ui/react'
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <>
    <Box
    mt="20vh"
    h="40vh"
    bgSize="cover"
    bgPosition="center" 
  >
  </Box>
  <HStack
  backgroundColor='#231942'
  color="white"
  h={["100vh","none","40vh","40vh"]}
  display={["grid","grid","grid","grid"]}
  gridTemplateColumns={["repeat(1,1fr)","repeat(1,1fr)","repeat(3,1fr)","repeat(3,1fr)"]}
  justifyContent="space-evenly"
  >
    <VStack 
     alignItems="start"
     ml={["6px","10px","30px","30px"]}
    >
        <Text
        fontWeight="600"
        fontSize="20px"
        >
            Byte Bridge
        </Text>
       <Text>
        
        This website aims to create a supportive <br />
        environment for students.It features a Q&A <br />
         platform where students can ask coding - <br />
         related questions and receive answers from <br />
        peers.
       </Text>
    </VStack>

    <VStack
       ml={["6px","10px","30px","30px"]}
       alignItems="start">
      <Text>Get in touch with us -</Text>
      <HStack mt="10px" align="center">
        <Icon boxSize={6} as={IoLocationOutline} />
        <Text>Near LPU, Jalandhar, Punjab, India</Text>
      </HStack>
      <HStack mt="10px" align="center">
        <Icon boxSize={6} as={FaPhone} />
        <Text>+91 9234440694</Text>
      </HStack>
      <HStack mt="10px" align="center">
        <Icon boxSize={6} as={MdOutlineMail} />
        <Text>addarsh.kumar@kalvium.community</Text>
      </HStack>
    </VStack>

    <VStack 
       alignItems="start"
       ml={["6px","10px","30px","30px"]}
    >
        <Text>

        Unlock your potential. Follow us <br />
         for daily inspiration, valuable <br />
          resources, and exciting updates. <br />
           Connect now!
        </Text>
        <HStack 
        w="15vw"
        mt="5px"
        justifyContent="space-evenly"
        >
        <Icon boxSize={8} as={FaTwitter} />
        <Icon boxSize={8} as={FaInstagramSquare} />
        <Icon boxSize={8} as={FaWhatsapp} />
        <Icon boxSize={8} as={CiLinkedin} />
        </HStack>

    </VStack>
  </HStack>

    </>
  )
}

export default Footer