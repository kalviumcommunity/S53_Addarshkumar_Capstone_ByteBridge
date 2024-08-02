import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./context/Parentcontext";
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
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebaseauth/config";

const Signuppage = () => {
  const [username, setUserName] = useState(null);
  const [useremail, setUserEmail] = useState(null);
  const [photoURL, setPhotoUrl] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (username && useremail && photoURL) {
        const data = {
          name: username,
          email: useremail,
          profileImg: photoURL,
        };

        try {
          const res = await axios.post(
            "https://s53-addarshkumar-capstone-bytebridge.onrender.com/third_part_signup",
            data
          );
          console.log(res);
          Cookies.set("token", res.data.token);
          toast({
            description: `${res.data.message}`,
            status: "success",
            position: "top",
            duration: 4000,
            isClosable: true,
            colorScheme: "blue",
          });
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 2000);
        } catch (err) {
          console.log(err);
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
        setPhotoUrl(data.user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlegithub = () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then((result) => {
        setUserEmail(result.user.email);
        setUserName(result.user.displayName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSubmit = async (data) => {
    try {
      data.profileImg =
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

        const res = await axios.post('https://s53-addarshkumar-capstone-bytebridge.onrender.com/signup', data);
        toast({
          description: res.data.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          description: err.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
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
        <FormControl
          mt="30px"
          maxW={["xs", "sm", "sm", "sm"]}
          isInvalid={errors.name}
        >
          <FormLabel>Your name</FormLabel>
          <Input
            type="text"
            aria-label="Your name"
            {...register("name", { required: "Name is required" })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mt="30px"
          maxW={["xs", "sm", "sm", "sm"]}
          isInvalid={errors.email}
        >
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            aria-label="Email address"
            {...register("email", { required: "Email is required" })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mt="30px"
          maxW={["xs", "sm", "sm", "sm"]}
          isInvalid={errors.password}
        >
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            aria-label="Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z]).{6,}$/,
                message:
                  "Password must be at least 6 characters long and contain at least one alphabet",
              },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt="25px"
          w={["60%", "sm", "sm", "sm"]}
          colorScheme="blue"
          type="submit"
        >
          Signup
        </Button>
      </form>

      <Text mt="20px">Or</Text>

      <HStack
        onClick={handleLogin}
        border="1px solid gray"
        w={["80%", "50%", "30%", "25%"]}
        borderRadius="25px"
        h="40px"
        justifyContent="space-evenly"
      >
        <Image loading="lazy" src="/google.png" boxSize="28px" />
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
        <Image loading="lazy" src="/github.png" boxSize="28px" />
        <Text>Continue with Github</Text>
      </HStack>
    </VStack>
  );
};

export default Signuppage;
