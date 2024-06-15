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
  const {userProfile} = useContext(AppContext)


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
        <VStack w={"80%"}>
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
            <Heading size={"md"}>Articles</Heading>
          </HStack>
          <HStack
          w={"100%"} 
          alignItems={"flex-start"}
          >
          <Sidebar />
          <VStack 
          w={"100%"}
          >
          {data.map((item) => (
              <Card
                key={item._id}
                display={"flex"}
                justifyContent={"space-between"}
                width="80%"
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
                        src={userProfile.profileImg?userProfile.profileImg:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}

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
