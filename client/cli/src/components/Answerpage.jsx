import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  VStack,
  HStack,
  Avatar,
  Text,
  Textarea,
  Button,
  SkeletonCircle,
  SkeletonText,
  Box,
  Icon,
  useToast,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { AppContext } from "./context/Parentcontext";

const Answerpage = () => {
  const toast=useToast();
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { userProfile } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState({});
  const { id } = useParams();

  let token = "";

  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    token = tokenCookie.split("=")[1];
  } else {
    console.error("Token cookie not found");
  }

  const handlePost = async () => {
    try {
      const data = {
        answer: value,
      };
      const res = await axios.post(
        `https://s53-addarshkumar-capstone-bytebridge.onrender.com/answer/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        description: `${res.data.message}`,
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
        colorScheme: "blue",
      });
      setValue("");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostLikes = async (answerId) => {
    try {
      const res = await axios.put(
        `https://s53-addarshkumar-capstone-bytebridge.onrender.com/postlikes/${answerId}`,
        { user_id: userProfile._id }
      );
      setIsLiked((prevLikedAnswers) => ({
        ...prevLikedAnswers,
        [answerId]: !prevLikedAnswers[answerId],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveLikes = async (answerId) => {
    try {
      const res = await axios.put(
        `https://s53-addarshkumar-capstone-bytebridge.onrender.com/removelikes/${answerId}`,
        { user_id: userProfile._id }
      );
      setIsLiked((prevLikedAnswers) => ({
        ...prevLikedAnswers,
        [answerId]: !prevLikedAnswers[answerId],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const res = await axios.get(
          `https://s53-addarshkumar-capstone-bytebridge.onrender.com/answer/${id}`
        );
        setQuestion(res.data.question);
        setAnswers(res.data.answerArray);
        const initialLikedAnswers = {};
        res.data.answerArray.forEach((answer) => {
          initialLikedAnswers[answer._id] =
            answer.like && answer.like.includes(userProfile._id);
        });
        setIsLiked(initialLikedAnswers);
      } catch (err) {
        console.log(err);
      }
    };
    getAnswers();
  }, [userProfile, isLiked]);

  return (
    <>
      <HStack
        mt={"50px"}
        ml={"5%"}
        w={"70%"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <Sidebar />
        <VStack>
          <Container
            overflowY={"scroll"}
            height={"80vh"}
            border={"1px"}
            minW={["xs", "xs", "600px", "800px"]}
            p={"10px"}
          >
            <Card
              w={["80%", "80%", "100%", "100%"]}
              className="card"
              padding={"10px"}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <VStack>
                <div>
                  <HStack>
                    <Avatar
                      name="Dan Abrahmov"
                      src={
                        question.profileimage
                          ? question.profileimage
                          : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                      }
                    />
                    <Text>
                      {question.username} <br />
                    </Text>
                  </HStack>
                  <br />

                  <div>{question.question}</div>
                  <img
                    src={question.questionImage ? question.questionImage : ""}
                    alt=""
                  />
                  <br />
                </div>
              </VStack>
            </Card>
            {answers.length > 0 ? (
              answers.map((item) => (
                <Card
                  key={item._id}
                  mt={"50px"}
                  w={["80%", "80%", "100%", "100%"]}
                  className="card"
                  padding={"10px"}
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <VStack w={"100%"} alignItems={"flex-start"}>
                    <div style={{ width: "100%" }}>
                      <HStack>
                        <Avatar
                          name="Dan Abrahmov"
                          src={item.profileimage?item.profileimage:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                        />
                        <Text>
                          {item.username} <br />
                        </Text>
                      </HStack>
                      <br />

                      <div>{item.answer}</div>
                      <br />
                      <HStack w={"15%"} justifyContent={"space-evenly"}>
                        {
                          isLiked[item._id]?(
                            <HStack>
                            <Image
                            boxSize={6}
                            src="/like.png"
                            onClick={()=>{handleRemoveLikes(item._id)}}
                            />
                            <span>{item.like?item.like.length:""}</span>
                            </ HStack>
                          ):(
                            <HStack>
                            <Image
                            src="/dislike.png"
                            boxSize={6}
                            onClick={()=>{handlePostLikes(item._id)}}
                            />
                            <span>{item.like?item.like.length:""}</span>
                             </HStack>
                          )
                        }
                        <Icon boxSize={"5"} as={FaCommentDots} />
                      </HStack>
                    </div>
                  </VStack>
                </Card>
              ))
            ) : (
              <Box padding="6" boxShadow="lg" bg="white" w="100%">
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            )}
          </Container>
          <HStack justifyContent={"center"}>
            <HStack mt={"30px"} w={"lg"} p={"10px"}>
              <Textarea
                onChange={(e) => setValue(e.target.value)}
                placeholder="You can type your Answer here"
              ></Textarea>
            </HStack>
            <Button onClick={handlePost} backgroundColor={"orange"}>
              post
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </>
  );
};

export default Answerpage;
