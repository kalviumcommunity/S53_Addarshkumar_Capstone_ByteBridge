import {
  VStack,
  HStack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Card,
  Avatar,
  Icon,
  Text,
  Button,
  useDisclosure,
  Container,
  Textarea,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import "./Profilepage.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Profilepage = () => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [editStates, setEditStates] = useState({});
  const [currentSelectedId, setCurrentSelectedId] = useState(null);
  const [isQuestion, setIsQuestion] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textAreaRefs = useRef({});

  let token = "";

  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    token = tokenCookie.split("=")[1];
  } else {
    console.error("Token cookie not found");
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(isQuestion ? `https://s53-addarshkumar-capstone-bytebridge.onrender.com/question/${id}` : `https://s53-addarshkumar-capstone-bytebridge.onrender.com/answer/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUserPosts = async () => {
      const res = await axios.get("https://s53-addarshkumar-capstone-bytebridge.onrender.com/userposts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestion(res.data.questions.questions_id);
      setAnswer(res.data.answers.answers_id);
    };
    getUserPosts();
  }, []);

  const handleEditClick = (id) => {
    setEditStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    textAreaRefs.current[id].focus();
  };

  const handleSaveClick = async (id) => {
    try {
      const editedAnswer = textAreaRefs.current[id].value;
      const res = await axios.put(
        `https://s53-addarshkumar-capstone-bytebridge.onrender.com/answer/${id}`,
        { answer: editedAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(res);
      setEditStates((prev) => ({
        ...prev,
        [id]: false,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {isQuestion ? "Are you sure you want to delete your Question?" : "Are you sure you want to delete your Answer?"}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>No</Button>
            <Button
              onClick={() => {
                handleDelete(currentSelectedId);
                onClose();
              }}
              colorScheme="red"
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Tabs>
        <TabList>
          <Tab>Your Questions</Tab>
          <Tab>Your Answers</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {question.length > 0 ? (
              question.map((item) => (
                <Card
                  key={item._id}
                  mt={"50px"}
                  w={["80%", "80%", "60%", "60%"]}
                  className="card"
                  padding={"30px"}
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <VStack w={"100%"} alignItems={"flex-start"}>
                    <div style={{ width: "100%" }}>
                      <HStack>
                        <Avatar
                          name="Dan Abrahmov"
                          src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                        />
                        <Text>
                          {item.username} <br />
                        </Text>
                      </HStack>
                      <br />

                      <div>{item.question}</div>
                      <br />
                      <HStack>
                        <Link to={`/answerpage/${item._id}`}>
                          <Button>
                            <HStack>
                              <Text>View</Text>
                              <Icon boxSize={"5"} as={FaEye} />
                            </HStack>
                          </Button>
                        </Link>
                        <Button colorScheme="red" onClick={() => { setIsQuestion(true); setCurrentSelectedId(item._id); onOpen(); }}>
                          <Text>Delete</Text>
                          <Icon boxSize={"5"} as={MdDelete} />
                        </Button>
                      </HStack>
                    </div>
                  </VStack>
                </Card>
              ))
            ) : (
              <>
                <Box padding="6" boxShadow="lg" bg="white" w="100%">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
                <Box padding="6" boxShadow="lg" bg="white" w="100%">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
                <Box padding="6" boxShadow="lg" bg="white" w="100%">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              </>
            )}
          </TabPanel>
          <TabPanel>
            {answer.length > 0 ? (
              answer.map((item) => (
                <Container
                  mt={"20px"}
                  ml={"20px"}
                  p={"20px"}
                  maxW={["xs", "xs", "600px", "800px"]}
                  border={"1px solid gray"}
                >
                  <Card
                    key={item._id}
                    mt={"50px"}
                    w={["80%", "80%", "100%", "100%"]}
                    className="card"
                    padding={"30px"}
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                  >
                    <VStack w={"100%"} alignItems={"flex-start"}>
                      <div style={{ width: "100%" }}>
                        <HStack>
                          <Avatar
                            name="Dan Abrahmov"
                            src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                          />
                          <Text>
                            {item.question_id.questions[0].username} <br />
                          </Text>
                        </HStack>
                        <br />

                        <div>{item.question_id.questions[0].question}</div>
                        <br />
                        <HStack>
                          <Link
                            to={`/answerpage/${item.question_id.questions[0]._id}`}
                          >
                            <Button>
                              <HStack>
                                <Text>view All Answers</Text>
                                <Icon boxSize={"5"} as={FaEye} />
                              </HStack>
                            </Button>
                          </Link>
                        </HStack>
                      </div>
                    </VStack>
                  </Card>
                  <Card
                    key={item._id}
                    mt={"50px"}
                    w={["80%", "80%", "100%", "100%"]}
                    className="card"
                    padding={"30px"}
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                  >
                    <VStack w={"100%"} alignItems={"flex-start"}>
                      <div style={{ width: "100%" }}>
                        <HStack>
                          <Avatar
                            name="Dan Abrahmov"
                            src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                          />
                          <Text>
                            {item.username} <br />
                          </Text>
                        </HStack>
                        <br />

                        <Textarea
                          readOnly={!editStates[item._id]}
                          defaultValue={item.answer}
                          ref={(el) => {
                            textAreaRefs.current[item._id] = el;
                          }}
                          onChange={(e) => {
                            setAnswer((prev) =>
                              prev.map((answer) =>
                                answer._id === item._id
                                  ? { ...answer, answer: e.target.value }
                                  : answer
                              )
                            );
                          }}
                        />
                        <br />
                        {editStates[item._id] ? (
                          <HStack mt={"20px"}>
                            <Button
                              colorScheme="green"
                              onClick={() => handleSaveClick(item._id)}
                            >
                              <Text>Save</Text>
                            </Button>
                            <Button
                              onClick={() => handleEditClick(item._id)}
                              colorScheme="red"
                            >
                              <Text>Cancel</Text>
                            </Button>
                          </HStack>
                        ) : (
                          <HStack mt={"20px"}>
                            <Button onClick={() => handleEditClick(item._id)}>
                              <HStack>
                                <Text>Edit</Text>
                                <Icon boxSize={"5"} as={FaEdit} />
                              </HStack>
                            </Button>
                            <Button colorScheme="red" onClick={() => { setIsQuestion(false); setCurrentSelectedId(item._id); onOpen(); }}>
                              <Text>Delete</Text>
                              <Icon boxSize={"5"} as={MdDelete} />
                            </Button>
                          </HStack>
                        )}
                      </div>
                    </VStack>
                  </Card>
                </Container>
              ))
            ) : (
              <>
                <Box padding="6" boxShadow="lg" bg="white" w="100%">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
                <Box padding="6" boxShadow="lg" bg="white" w="100%">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
                <Box padding="6" boxShadow="lg" bg="white" w="100%">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Profilepage;
