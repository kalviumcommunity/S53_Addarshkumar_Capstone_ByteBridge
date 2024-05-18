import { Textarea, Button, VStack, Text, useToast, HStack, Input } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { imageDb } from "./firebaseauth/config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { AppContext } from "./context/Parentcontext";
import Loginpage from "./Loginpage";

const Questionpage = () => {
  const { imageUrl} = useContext(AppContext);
  const toast = useToast();
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const [currImage,setCurrImage]=useState("");

  let token = "";

  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    token = tokenCookie.split("=")[1];
  } else {
    console.error("Token cookie not found");
  }

  const handleUpload = async () => {
    const imageRef = ref(imageDb, `files/${v4()}`);
    setCurrImage(imageRef._location.path_);
    await uploadBytes(imageRef, image);
     window.location.reload()
  };

  useEffect(()=>{
     localStorage.setItem("img_id",currImage)
  },[currImage])

  const postData = async () => {
    try {
      const data = {
        question: value,
        questionImage: imageUrl[0],
      };

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
      {token.length > 0 ? (
        <VStack>
          <Text fontSize={"25px"} fontWeight={"600"}>
            You can post your questions from here
          </Text>

          <Textarea
            onChange={(e) => setValue(e.target.value)}
            maxW={["80%", "80%", "60%", "50%"]}
          />
          <HStack>
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Button onClick={handleUpload} colorScheme="orange">
              Upload
            </Button>
          </HStack>
          <Button onClick={postData} colorScheme="blue">
            Post
          </Button>
         
        </VStack>
      ) : (
        <Loginpage />
      )}
    </>
  );
};

export default Questionpage;
