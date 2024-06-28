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
  Image,
  Grid,
  Collapse,
  Input,
  Badge
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { AppContext } from "./context/Parentcontext";

const Answerpage = () => {
  const toast = useToast();
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { userProfile, dimensions, adsData } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState({});
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [selectedComment,setSelectedComment]=useState(null);
  const [commentData,setCommentData]=useState("");
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

  const handlePostComment=async(id)=>{
    try{
      const res=await axios.post(`http://localhost:4000/comments/${id}`,{comment:commentData},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res);
    }
    catch(err){
      console.log(err);
    }

  }

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
          `http://localhost:4000/answer/${id}`
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

  useEffect(() => {
    if (adsData && adsData.length > 0 && adsData[0].imageUrls.length > 0) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prevIndex) =>
          prevIndex === adsData[0].imageUrls.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [adsData]);

  const openComment=(id)=>{
    setSelectedComment(selectedComment === id ? null : id);
  }

  return (
    <>
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(1,1fr)",
          "70% 30%",
        ]}
        mt={"50px"}
        ml={["none", "none", "3%", "3%"]}
      >
        <HStack alignItems={"flex-start"}>
          {dimensions.width > 480 ? <Sidebar /> : ""}

          <VStack
            w={["100%", "80%", "100%", "100%"]}
            justifyContent={"flex-start"}
          >
            <Container
              overflowY={"scroll"}
              height={"80vh"}
              border={"1px"}
              minW={["xs", "xs", "80%", "80%"]}
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
              {
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
                            src={
                              item.profileimage
                                ? item.profileimage
                                : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                            }
                          />
                          <Text>
                            {item.username} <br />
                          </Text>
                        </HStack>
                        <br />

                        <div>{item.answer}</div>
                        <br />
                        <HStack w={"15%"} justifyContent={"space-evenly"}>
                          {isLiked[item._id] ? (
                            <HStack>
                              <Image
                                boxSize={6}
                                src="/like.png"
                                onClick={() => {
                                  handleRemoveLikes(item._id);
                                }}
                              />
                              <span>{item.like ? item.like.length : ""}</span>
                            </HStack>
                          ) : (
                            <HStack>
                              <Image
                                src="/dislike.png"
                                boxSize={6}
                                onClick={() => {
                                  handlePostLikes(item._id);
                                }}
                              />
                              <span>{item.like ? item.like.length : ""}</span>
                            </HStack>
                          )}
                          <Icon
                            onClick={()=>{openComment(item._id)}}
                            boxSize={"5"}
                            as={FaCommentDots}
                          />
                        </HStack>
                          <Collapse in={selectedComment===item._id} animateOpacity>
                            <Box
                              p="40px"
                              color="black"
                              mt="4"
                              bg="gray.200"
                              rounded="md"
                              shadow="md"
                            >
                              
                              {
                               item.comments.map((comment)=>(
                                <>
                                <HStack>
                                <Avatar boxSize={"8"} src={comment.userProfile} />
                                <Text>{comment.username}</Text>
                                </HStack>
                                <Text>{comment.comment}</Text>
                                <br />

                                </>
                               ))
                              }
                              <HStack>
                              <Input onChange={(e)=>{setCommentData(e.target.value)}} placeholder="Enter Your Comments" border={"1px solid gray"} type="text" />
                              <Button colorScheme="teal" onClick={()=>{handlePostComment(item._id)}}>Post</Button>
                              </HStack>
                            </Box>
                          </Collapse>
                      </div>
                    </VStack>
                  </Card>
                ))
              
              }
            </Container>
            <HStack w={"80%"} justifyContent={"flex-start"}>
              <HStack mt={"30px"} w={["xm", "md", "lg", "lg"]} p={"10px"}>
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
        <HStack >
          {adsData.map((ads, index) => (
            <VStack h={"100%"} w={"100%"} justifyContent={"center"} key={index}>
              <HStack>
              <Badge colorScheme='red'>Ads</Badge>
              <Text fontSize={"20px"} fontWeight={'500'}>{ads.description}</Text>
              </HStack>
                <Image
                  h={"40%"}
                  w={"80%"}
                  src={ads.imageUrls[currentAdIndex]}
                />
            </VStack>
          ))}
        </HStack>
      </Grid>
    </>
  );
};

export default Answerpage;
