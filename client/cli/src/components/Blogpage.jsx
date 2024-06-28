import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HStack,
  Icon,
  Avatar,
  Button,
  Text,
  useToast,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Stack,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@chakra-ui/react";

import { CiSearch } from "react-icons/ci";
import axios from "axios";
import Sidebar from "./Sidebar";
import { AppContext } from "./context/Parentcontext";

const Blogpage = () => {
  const [data, setData] = useState([]);
  const {userProfile,dimensions} = useContext(AppContext)


  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get("https://s53-addarshkumar-capstone-bytebridge.onrender.com/blog");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBlogs();
  }, []);
  return (
    <>
        <VStack w={["100%","100%","80%","80%"]}>
          <HStack mt={"20px"}>
            <InputGroup style={{ marginLeft: "5vw" }}>
              <InputLeftElement>
                <Icon as={CiSearch} />
              </InputLeftElement>
              <Input
                style={{ borderRadius: "25px" }}
                placeholder="search for"
                maxW="xs"
              />
            </InputGroup>
          </HStack>
          <br />
          <HStack>
            <Heading mb={"10px"} size={"md"}>Articles</Heading>
          </HStack>
          <HStack
          w={"100%"} 
          alignItems={"flex-start"}
          >
            <VStack w={"30%"}>
          {dimensions.width > 780 ? <Sidebar /> : ""}

            </VStack>
          <VStack 
           overflow={"scroll"}
           overflowX={"hidden"}
           w={["100%", "100%", "100%", "100%"]}
           h={["70vh", "50vh", "80vh", "80vh"]}
          
          >
          {data.map((item) => (
              <Card
                mt={"20px"}
                key={item._id}
                display={"flex"}
                justifyContent={"space-between"}
                width="80%"
                padding={"10px"}
                direction={{ base: "column", sm: "row" }}
                variant="outline"
              >
                <VStack>
                  <div>
                    <HStack>
                      <Avatar
                        name="Dan Abrahmov"
                        src={item.profileimage?item.profileimage:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}

                      />
                      <Text>
                        {item.name}
                      </Text>
                    </HStack>
                    <br />

                    <div>
                      <Text size="md">{item.heading}</Text>
                    </div>
                    <br />
                    <HStack>
                      <Text>{item.title}</Text>
                    </HStack>
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
        </VStack>

        <HStack></HStack>
      </>
  );
};

export default Blogpage;
