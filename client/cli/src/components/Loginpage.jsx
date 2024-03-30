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
  useToast,
  FormErrorMessage
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Loginpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const onSubmit = (data) => {
    toast({
      title: "Logged in",
      description: "You are Logged in successfully",
      status: "success",
      position: "top",
      duration: 4000,
      isClosable: true,
      colorScheme: "blue",
    });
  };
  return (
    <VStack>
      <Heading fontSize="20px" mt="40px">
        Log in
      </Heading>

      <HStack
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image src="/google.png" boxSize="28px" />
        <Text>Continue with google</Text>
      </HStack>

      <HStack
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image src="/microsoft.png" boxSize="28px" />
        <Text>Continue with microsoft</Text>
      </HStack>

      <HStack
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image src="/linkedin.png" boxSize="28px" />
        <Text>Continue with Linkedin</Text>
      </HStack>

      <Text>Or continue with email</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mt="30px" maxW={["xs", "sm", "sm", "sm"]} isInvalid={errors.name}>
          <FormLabel>Your name</FormLabel>
          <Input type="text" aria-label="Your name" {...register("name", { required: "Name is required" })} />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt="30px" maxW={["xs", "sm", "sm", "sm"]} isInvalid={errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" aria-label="Email address" {...register("email", { required: "Email is required" })} />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt="30px" maxW={["xs", "sm", "sm", "sm"]} isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input type="password" aria-label="Password" {...register("password", { required: "Password is required" })} />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>

        <Button mt="30px" w={["60%", "sm", "sm", "sm"]} colorScheme="blue" type="submit">
          Login
        </Button>
        <Text mt="20px">
          Don't have an account ?<Link to="/signup">signup</Link>
        </Text>
      </form>
    </VStack>
  );
};

export default Loginpage;
