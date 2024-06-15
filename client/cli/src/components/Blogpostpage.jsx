import { HStack,VStack,Text,Input,Textarea,Button,useToast } from '@chakra-ui/react'
import React,{useContext, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BlogPostpage = () => {
  const toast = useToast();
  const navigate=useNavigate();

    let token = "";

    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
  
    if (tokenCookie) {
      token = tokenCookie.split("=")[1];
    } else {
      console.error("Token cookie not found");
    }
    const [data,setData]=useState({
        heading:"",
        title:"",
        image:""
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setData({
            ...data,
            [name]:value
        })
    }

    const handleSubmit=async()=>{
        try{
            
            const res=await axios.post("https://s53-addarshkumar-capstone-bytebridge.onrender.com/blog",{
                heading:data.heading,
                title:data.title,
                image:data.image
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            toast({
              description: `${res.data.message}`,
              status: "success",
              position: "top",
              duration: 4000,
              isClosable: true,
              colorScheme: "blue",
            });
            setTimeout(()=>{
              navigate("/blogpage")
            })
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <>
    <VStack
    height={'100vh'}
    backgroundImage={"./postpage.svg"}
    backgroundSize={"cover"}
    >
    <Text
    mt={"10vh"}
    fontSize={"25px"}
    fontWeight={"500"}
    >
     Post Your Blog
    </Text>

    <Text
    >
     
   Share your voice, inspire others! Contribute
    your story and be part of our vibrant <br />
     blogging community. Let's inspire together!
    </Text>

    <VStack
    boxShadow={
        "-10px 11px 14px 6px rgba(255,224,181,0.81)"
    }
    p={"20px"}
    mt={"10vh"}
    alignItems={"center"}
    >
    <div>
        <Text mb='8px'>Heading </Text>
        <Input onChange={handleChange} name='heading' minW={"md"} placeholder='Heading' />
        <br />
        <Text mb='8px'>Share your blogs</Text>
      <Textarea
        name='title'
        onChange={handleChange}
        placeholder='Write your post here'
        size='sm'
        minW={'md'}
      />
      <br />
      <Text mb='8px'>Add image </Text>
        <Input onChange={handleChange} name='image' minW={"md"} placeholder='Add url of image' />
        <br /> <br />
        <HStack
        justifyContent={"center"}
        >
       <Button
       
       onClick={handleSubmit} colorScheme='blue'>
        Add
       </Button>

        </HStack>
        </div>
    </VStack>

    </VStack>
    </>
  )
}

export default BlogPostpage