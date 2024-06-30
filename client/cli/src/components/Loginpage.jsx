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
  FormErrorMessage,
} from "@chakra-ui/react";
import React,{ useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithPopup,GithubAuthProvider} from "firebase/auth";
import { auth, provider } from "./firebaseauth/config";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "./context/Parentcontext";

const Loginpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate=useNavigate();
  const [username, setUserName] = useState(null);
  const [useremail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (username && useremail) {
        const data = {
          name: username,
          email: useremail,
        };

        try {
          const res = await axios.post("https://s53-addarshkumar-capstone-bytebridge.onrender.com/login", data);
          console.log(res);
          Cookies.set("token", res.data.token);
          toast({
            description:`${res.data.message}`,
            status: "success",
            position: "top",
            duration: 4000,
            isClosable: true,
            colorScheme: "blue",
          });
          setTimeout(()=>{

            navigate("/");
            window.location.reload();
          },2000)
        } catch (err) {
          toast({
            description:`${err.response.data.message}`,
            position: "top",
            duration: 4000,
            isClosable: true,
            colorScheme: "red",
          });
        }
      }
    };

    fetchData();
  }, [username, useremail]);

  const handleLogin = async () => {
    await signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data);
        setUserName(data.user.displayName);
        setUserEmail(data.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const handlegithub = () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then((result) => {
        setUserEmail(result.user.email)
        setUserName(result.user.displayName)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSubmit = async(data) => {
    try{
      
      const res=await axios.post("https://s53-addarshkumar-capstone-bytebridge.onrender.com/login",data);
      Cookies.set("token",res.data.token);
      toast({
        description:`${res.data.message}`,
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
        colorScheme: "blue",
      });
      setTimeout(()=>{

        navigate("/");
        window.location.reload();
      },2000)
    }
    catch(err){
      if (err.response && err.response.status === 429) {
        toast({
          description: "Too many requests, please try again later.",
          position: "top",
          duration: 4000,
          isClosable: true,
          colorScheme: "red",
        });
      } else {
        toast({
          description: `${err.response.data.message}`,
          position: "top",
          duration: 4000,
          isClosable: true,
          colorScheme: "red",
        });
      }
    }
    
  };
  return (
    <VStack>
      <Heading fontSize="20px" mt="40px">
        Log in
      </Heading>

      <HStack
        onClick={handleLogin}
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
       onClick={handlegithub}
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image src="/github.png" boxSize="28px" />
        <Text>Continue with Github </Text>
      </HStack>

      <Text>Or continue with email</Text>

      <form onSubmit={handleSubmit(onSubmit)}>

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
