import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HStack,
  Image,
  Button,
  Text,
  VStack,
  Card,
  Avatar,
  Box,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { AppContext } from "./context/Parentcontext";

const Homepage = () => {
  const { data, dimensions,selected,setSelected } = useContext(AppContext);

  const handleFocus = (option) => {
    setSelected(option);
  };
  return (
    <>
      <HStack
        display={["flex", "flex", "flex", "flex"]}
        flexDirection={["column-reverse", "column-reverse", "row", "row"]}
        mt="20px"
        justifyContent="space-evenly"
      >
        <VStack alignItems="start">
          <Text
            mt={["30px", "30px", "none", "none"]}
            fontWeight="600"
            fontSize={["18px", "20px", "40px", "40px"]}
          >
            Welcome to Byte Bridge
          </Text>
          <Text fontSize={["12px", "15px", "none", "none"]}>
            Your Hub for Coding Knowledge! Ask questions, share insights, <br />
            and engage with peers in a supportive learning community.
          </Text>
          <Link to="/signup">
            <Button
              colorScheme="blue"
              mt="20px"
              ml={"10px"}
              w={["90%", "none", "none", "none"]}
            >
              Create New Account
            </Button>
          </Link>
        </VStack>
        <Image
          loading="lazy"
          src="/Home.svg"
          alt="image"
          boxSize={["70%", "60%", "40%", "40%"]}
        />
      </HStack>

      <HStack m={"5%"} alignItems="flex-start" justifyContent={"space-between"}>
        {dimensions.width > 780 ? <Sidebar /> : ""}
        <VStack w={["100%", "80%", "80%", "80%"]}>
          <HStack w={["80%", "80%", "100%", "100%"]} cursor={"pointer"}>
            {dimensions.width > 480 ? (
              <>
                <VStack
                  onClick={() => {
                    handleFocus("all");
                  }}
                >
                  <Text>All questions</Text>
                  <div
                    style={{
                      width: "166px",
                      height: "4px",
                      backgroundColor: selected == "all" ? "orange" : "white",
                    }}
                  ></div>
                </VStack>
                <VStack
                  onClick={() => {
                    handleFocus("recent");
                  }}
                >
                  <Text>Recent questions</Text>
                  <div
                    style={{
                      width: "166px",
                      height: "4px",
                      backgroundColor:
                        selected == "recent" ? "orange" : "white",
                    }}
                  ></div>
                </VStack>

                <VStack
                  onClick={() => {
                    handleFocus("most");
                  }}
                >
                  <Text>Most answered</Text>
                  <div
                    style={{
                      width: "166px",
                      height: "4px",
                      backgroundColor: selected == "most" ? "orange" : "white",
                    }}
                  ></div>
                </VStack>
              </>
            ) : (
              ""
            )}

            <VStack
              onClick={() => {
                handleFocus("trending");
              }}
            ></VStack>
          </HStack>

          <VStack
            overflow={"scroll"}
            overflowX={"hidden"}
            w={["100%", "100%", "100%", "100%"]}
            h={["70vh", "50vh", "70vh", "70vh"]}
          >
            {data.length > 0 ? (
              data.map((item) => (
                <HStack
                  w={["100%", "100%", "100%", "100%"]}
                  key={item._id}
                  className="card-component"
                  padding={"20px"}
                >
                  <Card
                    w={["100%", "80%", "100%", "100%"]}
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
                              item.profileimage
                                ? item.profileimage
                                : "https://firebasestorage.googleapis.com/v0/b/fir-authentication-cfa82.appspot.com/o/profilePictures%2F5d48a117-b576-418b-906d-248995591154?alt=media&token=00e4d952-e926-4066-a9c5-0c99f67a1926"
                            }
                          />
                          <Text>
                            {item.username} <br />
                          </Text>
                        </HStack>
                        <br />

                        <div>
                          <Text size="md">{item.question}</Text>
                          <img
                            src={item.questionImage ? item.questionImage : ""}
                            alt=""
                          />
                        </div>
                        <br />
                        <HStack>
                          <Link to={`/answerpage/${item._id}`}>
                            {" "}
                            <Button backgroundColor="black" color="white">
                              Answer
                            </Button>
                          </Link>
                          <Text>{item.answer_id.answers.length}</Text>
                          <Link to={`/answerpage/${item._id}`}>
                            <Text cursor={"pointer"}>View answer</Text>
                          </Link>
                        </HStack>
                      </div>
                    </VStack>
                  </Card>
                </HStack>
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
          </VStack>
        </VStack>
      </HStack>
    </>
  );
};

export default Homepage;
