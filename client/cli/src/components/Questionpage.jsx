import { Textarea, Button, VStack, Text,useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';

const Questionpage = () => {
    const toast=useToast();
    const [value, setValue] = useState("");

    let token = "";

const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));

if (tokenCookie) { 
    token = tokenCookie.split('=')[1];
} else {
    console.error("Token cookie not found");
}

    const postData = async () => {
        const data = {
            question: value,
        };

        try {
            const res = await axios.post(
                "http://localhost:4000/question",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                toast({
                    description:`${res.data.message}`,
                    status: "success",
                    position: "top",
                    duration: 4000,
                    isClosable: true,
                    colorScheme: "blue",
                  });
              
        } catch (error) {
            console.error("Error while posting question:", error);
        }
    }

    return (
        <>
            <VStack>
                <Text fontSize={"25px"} fontWeight={"600"}>
                    You can post your questions from here
                </Text>

                <Textarea onChange={(e) => setValue(e.target.value)} maxW={["80%", "80%", "60%", "50%"]} />
                <Button onClick={postData} colorScheme='blue'>post</Button>
            </VStack>
        </>
    )
}

export default Questionpage;
