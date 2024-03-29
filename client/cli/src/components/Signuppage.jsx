import React from "react";
import {
  Heading,
  VStack,
  Text,
  Image,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Signuppage = () => {
  return (
    <VStack>
      <Heading fontSize="20px" mt="40px">
        Sign up
      </Heading>
      <Text mt="20px">
        Already have an account ?<Link to="/login">Login</Link>
      </Text>

      <FormControl mt="30px" maxW={["xs", "sm", "sm", "sm"]}>
        <FormLabel>Your name</FormLabel>
        <Input type="text" aria-label="Your name" />

        <FormLabel>Email address</FormLabel>
        <Input type="email" aria-label="Password" />

        <FormLabel>Password</FormLabel>
        <Input type="password" aria-label="Email" />
      </FormControl>

      <Button mt="25px" w={["60%", "sm", "sm", "sm"]} colorScheme="blue">
        Signup
      </Button>

      <Text
      mt="20px"
      >
        Or 
      </Text>

      <HStack
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image
        loading="lazy"
        src="/google.png" boxSize="28px" />
        <Text>Continue with google</Text>
      </HStack>

      <HStack
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image
        loading="lazy"
        src="/microsoft.png" boxSize="28px" />
        <Text>Continue with microsoft</Text>
      </HStack>

      <HStack
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image 
        loading="lazy"
        src="/linkedin.png" boxSize="28px" />
        <Text>Continue with Linkedin</Text>
      </HStack>
    </VStack>
  );
};

export default Signuppage;
