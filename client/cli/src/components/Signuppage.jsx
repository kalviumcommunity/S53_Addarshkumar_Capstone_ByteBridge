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
  FormErrorMessage,
  useToast
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signuppage = () => {
  const toast = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    toast({
      title: 'Account created.',
      description: "You are signed up successfully",
      status: 'success',
      position:'top',
      duration: 4000,
      isClosable: true,
      colorScheme:'blue'

    })
  };

  return (
    <VStack>
        <Heading fontSize="20px" mt="40px">
        Sign up
      </Heading>
      <Text mt="20px">
        Already have an account ?<Link to="/login">Login</Link>
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl mt="30px" maxW={["xs", "sm", "sm", "sm"]} isInvalid={errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" name="email" aria-label="Email address" {...register("email", { required: "Email is required" })} />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt="30px" maxW={["xs", "sm", "sm", "sm"]} isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" aria-label="Password" {...register("password", { required: "Password is required" })} />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>

        <Button mt="25px" w={["60%", "sm", "sm", "sm"]} colorScheme="blue" type="submit">
          Signup
        </Button>
      </form>

      <Text mt="20px">Or</Text>

      <HStack
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image
          loading="lazy"
          src="/google.png"
          boxSize="28px"
        />
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
          src="/microsoft.png"
          boxSize="28px"
        />
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
          src="/linkedin.png"
          boxSize="28px"
        />
        <Text>Continue with Linkedin</Text>
      </HStack>
    </VStack>
  );
};

export default Signuppage;
