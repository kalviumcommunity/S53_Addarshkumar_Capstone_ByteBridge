import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./context/Parentcontext";
import axios from "axios";
import Sidebar from "./Sidebar";
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

const Blogpreview = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { dimensions } = useContext(AppContext);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get(`https://s53-addarshkumar-capstone-bytebridge.onrender.com/blog/${id}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBlogs();
  }, []);
  return (
    <>
      <VStack mt={"50px"} w={["100%", "100%", "80%", "80%"]}>
        <HStack w={"100%"} alignItems={"flex-start"}>
          <VStack w={"30%"}>{dimensions.width > 780 ? <Sidebar /> : ""}</VStack>
         
            <Card
              mt={"20px"}
              display={"flex"}
              justifyContent={"space-between"}
              width="80%"
              padding={"10px"}
              direction={{ base: "column", sm: "row" }}
              variant="outline"
            >
              <VStack>
                <VStack>
                <Image
                  w={["none", "none", "none", "50vw"]}
                  h={["none", "none", "none", "40vh"]}
                  src={data.image}
                  objectFit="cover"
                  alt="blog image"
                />
                </VStack>
                <VStack>
                  <div>
                 
                    <br />

                    <div>
                      <Heading size="md">{data.heading}</Heading>
                    </div>
                    <br />
                    <HStack>
                      <Text>{data.title}</Text>
                    </HStack>
                  </div>
                </VStack>
              </VStack>
            </Card>
        </HStack>
      </VStack>
    </>
  );
};

export default Blogpreview;
