import React, { useState } from "react";
import {auth,provider} from "./firebaseauth/config";
import { signInWithPopup,GithubAuthProvider  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
import axios from "axios"

const Signuppage = () => {
  const [value,setValue]=useState("");

  const toast = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate=useNavigate();

  const handlesignup=()=>{
    signInWithPopup(auth,provider).then((data)=>{
      setValue(data)
      navigate("/")
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const handlegithub = () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSubmit = async(data) => {
    try{
      const res =await axios.post("https://s53-addarshkumar-capstone-bytebridge.onrender.com/signup",data);
      document.cookie=`token=${res.data.token}`
      toast({
        description:`${res.data.message}`,
        status: 'success',
        position:'top',
        duration: 4000,
        isClosable: true,
        colorScheme:'blue'
  
      })
    }
    catch(err){
      console.log(err);
    }
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
      <FormControl mt="30px" maxW={["xs", "sm", "sm", "sm"]} isInvalid={errors.name}>
          <FormLabel>Your name</FormLabel>
          <Input type="text" aria-label="Your name" {...register("name", { required: "Name is required" })} />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>

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
       onClick={handlesignup}
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
        onClick={handlegithub}
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image
          loading="lazy"
          src="/github.png"
          boxSize="28px"
        />
        <Text>Continue with Github</Text>
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
          src="/phone.png"
          boxSize="28px"
        />
      <Link to={"/phonelogin"}>
        <Text>Continue with phone</Text>
</Link>
      </HStack>
    </VStack>
  );
};

export default Signuppage;
