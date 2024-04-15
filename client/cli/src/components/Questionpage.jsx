import { Textarea, Button, VStack, Text, useToast, HStack,Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { imageDb } from "./firebaseauth/config";
import {ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import axios from "axios";

const Questionpage = () => {
  const toast = useToast();
  const [value, setValue] = useState("");
  const [image,setImage]=useState("");

  let token = "";

  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    token = tokenCookie.split("=")[1];
  } else {
    console.error("Token cookie not found");
  }

  const handleUpload=()=>{
     const imageRef=ref(imageDb,`files/${v4()}`);
     uploadBytes(imageRef,image)
    
  }

  const postData = async () => {
    const data = {
      question: value,
    };

    try {
      const res = await axios.post("http://localhost:4000/question", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        description: `${res.data.message}`,
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
        colorScheme: "blue",
      });
    } catch (error) {
      console.error("Error while posting question:", error);
    }
  };

  return (
    <>
      <VStack>
        <Text fontSize={"25px"} fontWeight={"600"}>
          You can post your questions from here
        </Text>

        <Textarea
          onChange={(e) => setValue(e.target.value)}
          maxW={["80%", "80%", "60%", "50%"]}
        />
        <HStack>

        <Input type="file" onChange={(e)=>setImage(e.target.files[0])} />
        <Button onClick={handleUpload} colorScheme="orange">upload</Button>
        </HStack>
        <Button onClick={postData} colorScheme="blue">
          post
        </Button>
      </VStack>
    </>
  );
};

export default Questionpage;
