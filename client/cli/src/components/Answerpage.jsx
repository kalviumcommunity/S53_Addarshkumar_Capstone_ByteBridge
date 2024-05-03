import React, { useState, useEffect } from "react";
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
  Box
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Answerpage = () => {
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
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
      const res = await axios.post(`https://s53-addarshkumar-capstone-bytebridge.onrender.com/answer/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnswers("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const res = await axios.get(`https://s53-addarshkumar-capstone-bytebridge.onrender.com/answer/${id}`);
        setQuestion(res.data.question);
        setAnswers(res.data.answerArray);
      } catch (err) {
        console.log(err);
      }
    };
    getAnswers();
  }, []);

  return (
    <>
    
      <Container
        overflowY={"scroll"}
        height={"80vh"}
        border={"1px"}
        mt={"50px"}
        maxW={["xs", "xs", "600px", "800px"]}
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
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                />
                <Text>
                  {question.username} <br />
                </Text>
              </HStack>
              <br />

              <div>{question.question}</div>
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
              <VStack>
                <div>
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

                  <div>{item.answer}</div>
                  <br />
                </div>
              </VStack>
            </Card>
          ))
        ) : (
          <Box padding="6" boxShadow="lg" bg="white" w="100%">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
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
    </>
  );
};

export default Answerpage;
