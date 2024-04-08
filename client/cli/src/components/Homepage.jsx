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
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { AppContext } from "./context/Parentcontext";

const Homepage = () => {
  const { data } = useContext(AppContext);
  const [selected, setSelected] = useState("all");

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
              w={["90%", "none", "none", "none"]}
            >
              Create Account
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

      <HStack m={"5%"} alignItems="flex-start"
      justifyContent={"space-between"}
      >
        <Sidebar />
        <VStack 
         w={["80%","80%","80%","80%"]}
        >
          <HStack
            w={["80%","80%","100%","100%"]}
            cursor={"pointer"}
          >
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
                  backgroundColor: selected == "recent" ? "orange" : "white",
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

            <VStack
              onClick={() => {
                handleFocus("trending");
              }}
            >
              <Text>Trending</Text>
              <div
                style={{
                  width: "166px",
                  height: "4px",
                  backgroundColor: selected == "trending" ? "orange" : "white",
                }}
              ></div>

            </VStack>
             </HStack>
            
            <VStack 
            overflow={"scroll"}
            overflowX={"hidden"}
            w={["80%","80%","100%","100%"]}
            h={["50vh","50vh","70vh","70vh"]}
            >
            
            {data &&
              data.map((item) => (
                <HStack
                 w={["80%","80%","100%","100%"]}
                  key={item._id}
                  className="card-component"
                  padding={"20px"}
                >
                  <Card
                   w={["80%","80%","100%","100%"]}

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
                            src={item.profileimage.length > 0 ? item.profileimage : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                          />
                          <Text>
                            {item.username} <br />
                          </Text>
                        </HStack>
                        <br />

                        <div>
                          <Text size="md">{item.question}</Text>
                        </div>
                        <br />
                      <HStack>
                        <Button backgroundColor="black" color="white">Answer</Button>
                        <Text cursor={"pointer"}>View answer</Text>
                      </HStack>
                      </div>
                    </VStack>
                   
                  </Card>
                </HStack>
              ))}
            </VStack>
        </VStack>
      </HStack>
    </>
  );
};

export default Homepage;
