import {
  Textarea,
  Button,
  VStack,
  Text,
  useToast,
  HStack,
  Input,
  Spinner,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { imageDb } from "./firebaseauth/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { AppContext } from "./context/Parentcontext";
import Loginpage from "./Loginpage";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Questionpage = () => {
  const { imageUrl, setImageUrl, userProfile,dimensions } = useContext(AppContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const imageRef = ref(imageDb, `files/${v4()}`);
      await uploadBytes(imageRef, image);
      const newImageUrl = await getDownloadURL(imageRef);
      setImageUrl([newImageUrl]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error while posting question:", error);
    }
  };

  return (
    <>
      {token.length > 0 ? (
        <HStack
          m={["none","none","30px","30px"]}
          w={"90%"}
          alignItems={"flex-start"}
        >
          {dimensions.width > 780 ? <Sidebar /> : ""}

          <VStack w={"70%"}>
            <Text fontSize={"25px"} fontWeight={"600"}>
              You can post your questions from here
            </Text>

            <Textarea
              onChange={(e) => setValue(e.target.value)}
              maxW={["80%", "80%", "60%", "60%"]}
            />
            <HStack>
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Button
                isLoading={isLoading}
                onClick={handleUpload}
                colorScheme="orange"
              >
                Upload
              </Button>
            </HStack>
            <Button onClick={postData} colorScheme="blue">
              Post
            </Button>
          </VStack>
        </HStack>
      ) : (
        <Loginpage />
      )}
    </>
  );
};

export default Questionpage;
