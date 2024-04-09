import { Textarea, Button, VStack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';

const Questionpage = () => {
    const [value, setValue] = useState("");

    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
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
