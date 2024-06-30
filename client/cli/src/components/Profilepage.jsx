import {
  VStack,
  HStack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Card,
  Avatar,
  Icon,
  Image,
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

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import "./Profilepage.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { AppContext } from "./context/Parentcontext";
import { useRecoilValue } from "recoil";
import { userState } from "../atom";
import Sidebar from "./Sidebar";

import { imageDb, auth } from "./firebaseauth/config";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Loginpage from "./Loginpage";

const Profilepage = () => {
  const { question,ads } = useContext(AppContext);
  const { answer } = useContext(AppContext);
  const { userBlogs } = useContext(AppContext);
  const { userProfile } = useContext(AppContext);
  const [editStates, setEditStates] = useState({});
  const [currentSelectedId, setCurrentSelectedId] = useState(null);
  const [isQuestion, setIsQuestion] = useState(null);
  const [isBlog, setIsBlog] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { photoURL } = useContext(AppContext);
  const isAuthenticated = useRecoilValue(userState);
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const { imageUrl, setImageUrl, dimensions } = useContext(AppContext);
  const [isLoading,setIsLoading]=useState(false);

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

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const imageRef = ref(imageDb, `profilePictures/${uuidv4()}`);
      await uploadBytes(imageRef, image);
      const newImageUrl = await getDownloadURL(imageRef);
      setImageUrl([newImageUrl]);

      const addProfile = await axios.put(
        "https://s53-addarshkumar-capstone-bytebridge.onrender.com/updateUser",
        { profileImg: newImageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(addProfile);
    } catch (err) {
      console.log(err);
    }finally{
      setIsLoading(false);
      window.location.reload()
    }
  };

  useEffect(() => {
    localStorage.setItem("profileimg", imagePath);
  }, [imagePath]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        isQuestion
          ? `https://s53-addarshkumar-capstone-bytebridge.onrender.com/question/${id}`
          : isBlog
          ? `https://s53-addarshkumar-capstone-bytebridge.onrender.com/blog/${id}`
          : `https://s53-addarshkumar-capstone-bytebridge.onrender.com/answer/${id}`
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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
          },
        }
      );
      setEditStates((prev) => ({
        ...prev,
        [id]: false,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleBlogUpdate = async (id) => {
    try {
      const editedBlog = textAreaRefs.current[id].value;

      const res = await axios.put(
        `https://s53-addarshkumar-capstone-bytebridge.onrender.com/blog/${id}`,
        { title: editedBlog },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    token.length>0?(

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
            {isQuestion
              ? "Are you sure you want to delete your Question?"
              : "Are you sure you want to delete your Answer?"}
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
      <HStack p={"20"} h={"30vh"} className="banner">
        <HStack>
          <VStack>
            <Avatar
              boxSize={["30vw", "15vw", "12vw", "10vw"]}
              src={
                isAuthenticated && photoURL ? photoURL : userProfile.profileImg
              }
            />
            <Popover>
              <PopoverTrigger>
                <div>
                  {isAuthenticated && photoURL ? (
                    ""
                  ) : (
                    <HStack cursor={"pointer"}>
                      <Icon as={FaEdit} />
                      <Text>Edit profile pic</Text>
                    </HStack>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent color="white" bg="black">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Change Profile</PopoverHeader>
                <PopoverBody>
                  <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
                  <br /> <br />
                  <Button isLoading={isLoading} colorScheme="green" onClick={handleUpload}>
                    Upload
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </VStack>

          <Text fontSize={"25"} fontWeight={"500"}>
            {userProfile.name}
          </Text>
        </HStack>
      </HStack>
      <Tabs m={"20px"}>
        <TabList>
          <Tab>My Questions</Tab>
          <Tab>My Answers</Tab>
          <Tab>My Blogs</Tab>
          <Tab>My Ads</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HStack alignItems={"flex-start"}>
              <VStack position={"absolute"} top={"15%"} pl={"5%"}>
                {dimensions.width > 780 ? <Sidebar /> : ""}
              </VStack>
              <VStack
                overflow={"scroll"}
                overflowX={"hidden"}
                w={["100%", "100%", "100%", "100%"]}
                h={["70vh", "50vh", "70vh", "70vh"]}
              >
                {question.length > 0 ? (
                  question.map((item, index) => (
                    <Card
                      key={index}
                      mt={"50px"}
                      w={["100%", "100%", "60%", "60%"]}
                      className="card"
                      padding={"30px"}
                      direction={{ base: "column", sm: "row" }}
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

                          <div>{item.question}</div>
                          <img
                            src={item.questionImage ? item.questionImage : ""}
                            alt=""
                          />
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
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                setIsQuestion(true);
                                setCurrentSelectedId(item._id);
                                onOpen();
                              }}
                            >
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
                    <Box padding="6" boxShadow="lg" bg="white" w="60%">
                      <SkeletonCircle size="10" />
                      <SkeletonText
                        mt="4"
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="2"
                      />
                    </Box>
                    <Box padding="6" boxShadow="lg" bg="white" w="60%">
                      <SkeletonCircle size="10" />
                      <SkeletonText
                        mt="4"
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="2"
                      />
                    </Box>
                    <Box padding="6" boxShadow="lg" bg="white" w="60%">
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
              </VStack>
            </HStack>
          </TabPanel>

          <TabPanel>
            <HStack alignItems={"flex-start"}>
              <VStack position={"absolute"} top={"15%"} pl={"5%"}>
                {dimensions.width > 780 ? <Sidebar /> : ""}
              </VStack>
              <VStack
                overflow={"scroll"}
                overflowX={"hidden"}
                w={["100%", "100%", "100%", "100%"]}
                h={["70vh", "50vh", "70vh", "70vh"]}
              >
                {answer.length > 0 ? (
                  answer.map((item, index) => (
                    <Container
                      key={index}
                      mt={"20px"}
                      ml={["none", "none", "none", "none"]}
                      p={"20px"}
                      minW={["280px", "300px", "600px", "800px"]}
                      border={"1px solid gray"}
                    >
                      <Card
                        mt={"50px"}
                        w={["100%", "100%", "100%", "100%"]}
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
                                src={
                                  item.question_id.questions[0].profileimage
                                    ? item.question_id.questions[0].profileimage
                                    : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                                }
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
                        w={["100%", "100%", "100%", "100%"]}
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
                                src={
                                  userProfile.profileImg
                                    ? userProfile.profileImg
                                    : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                                }
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
                                <Button
                                  onClick={() => handleEditClick(item._id)}
                                >
                                  <HStack>
                                    <Text>Edit</Text>
                                    <Icon boxSize={"5"} as={FaEdit} />
                                  </HStack>
                                </Button>
                                <Button
                                  colorScheme="red"
                                  onClick={() => {
                                    setIsQuestion(false);
                                    setCurrentSelectedId(item._id);
                                    onOpen();
                                  }}
                                >
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
                    <Box padding="6" boxShadow="lg" bg="white" w="60%">
                      <SkeletonCircle size="10" />
                      <SkeletonText
                        mt="4"
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="2"
                      />
                    </Box>
                    <Box padding="6" boxShadow="lg" bg="white" w="60%">
                      <SkeletonCircle size="10" />
                      <SkeletonText
                        mt="4"
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="2"
                      />
                    </Box>
                    <Box padding="6" boxShadow="lg" bg="white" w="60%">
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
              </VStack>
            </HStack>
          </TabPanel>

          <TabPanel>
            <HStack>
              <VStack position={"absolute"} top={"15%"} pl={"5%"}>
                {dimensions.width > 780 ? <Sidebar /> : ""}
              </VStack>
              <VStack
                overflow={"scroll"}
                overflowX={"hidden"}
                w={["100%", "100%", "100%", "100%"]}
                h={["70vh", "50vh", "70vh", "70vh"]}
              >
                {userBlogs.map((item) => (
                  <Card
                    mt={"20px"}
                    key={item._id}
                    display={"flex"}
                    justifyContent={"space-between"}
                    width={["100%", "100%", "60%", "60%"]}
                    padding={"10px"}
                    direction={{ base: "column", sm: "row" }}
                    variant="outline"
                  >
                    <VStack>
                      <div>
                        <HStack>
                          <Avatar
                            name="Dan Abrahmov"
                            src={
                              item.profileimage
                                ? item.profileimage
                                : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                            }
                          />
                          <Text>{item.name}</Text>
                        </HStack>
                        <br />

                        <div>
                          <Text size="md">{item.heading}</Text>
                        </div>
                        <br />
                        <VStack>
                          <Textarea
                            readOnly={!editStates[item._id]}
                            defaultValue={item.title}
                            ref={(el) => {
                              textAreaRefs.current[item._id] = el;
                            }}
                          />
                          <br />
                          {editStates[item._id] ? (
                            <HStack mt={"20px"}>
                              <Button
                                colorScheme="green"
                                onClick={() => handleBlogUpdate(item._id)}
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
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  setIsBlog(true);
                                  setCurrentSelectedId(item._id);
                                  onOpen();
                                }}
                              >
                                <Text>Delete</Text>
                                <Icon boxSize={"5"} as={MdDelete} />
                              </Button>
                            </HStack>
                          )}
                        </VStack>
                      </div>
                    </VStack>
                    <VStack>
                      <Image
                        src={item.image}
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "200px" }}
                        alt="Caffe Latte"
                      />
                    </VStack>
                  </Card>
                ))}
              </VStack>
            </HStack>
          </TabPanel>

          <TabPanel>
            <HStack>
              <VStack position={"absolute"} top={"15%"} pl={"5%"}>
                {dimensions.width > 780 ? <Sidebar /> : ""}
              </VStack>
              <VStack
                overflow={"scroll"}
                overflowX={"hidden"}
                w={["100%", "100%", "100%", "100%"]}
                h={["70vh", "50vh", "70vh", "70vh"]}
              >
                {ads.map((item) => (
                  <Card
                    mt={"20px"}
                    key={item._id}
                    display={"flex"}
                    justifyContent={"space-between"}
                    width={["100%", "100%", "60%", "60%"]}
                    padding={"10px"}
                    direction={{ base: "column", sm: "row" }}
                    variant="outline"
                  >
                    <VStack>
                      <div>
                        <HStack>
                          
                          <Text>{item.category}</Text>
                        </HStack>
                        <br />

                        <div>
                          <Text size="md">{item.description}</Text>
                        </div>
                        <br />
                        <HStack>
                          
                          {
                          item.imageUrls.map((e)=>(
                            <Image src={e} />
                          ))
                          }
                         
                        </HStack>
                        <Text>Duration :</Text>
                        <Text>{item.startDate}</Text>
                        <Text>{item.endDate}</Text>
                      </div>
                    </VStack>
                    
                  </Card>
                ))}
              </VStack>
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
    ):(
      <Loginpage />
    )
  );
};

export default Profilepage;
