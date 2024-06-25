import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorMessage,
  Text,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { imageDb } from "./firebaseauth/config";
import Loginpage from "./Loginpage";

const Adsformpage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  const [totalImages, setTotalImages] = useState(1);
  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState("");


  useEffect(() => {
    axios
      .get("https://s53-addarshkumar-capstone-bytebridge.onrender.com/api/getkey")
      .then((res) => {
        setKey(res.data.key);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let token = "";

  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    token = tokenCookie.split("=")[1];
  } else {
    console.error("Token cookie not found");
  }
  
  const checkoutHandler = async (amount, formData) => {
    
    try {
      const { data: { order } } = await axios.post("https://s53-addarshkumar-capstone-bytebridge.onrender.com/checkout", { amount });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Addarsh",
        description: "razorpay",
        image: "",
        order_id: order.id,
        prefill: {
          name: "Addarsh",
          email: "adarshkumar834003@gmail.com",
          contact: "1234567890",
        },
        notes: {
          address: "razorpay",
        },
        theme: {
          color: "#3399cc",
        },
        payment_capture: 1,
        handler: async function (response) {
          toast({
            title: "Payment Success",
            description: "Your payment was successful!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          await axios.post("https://s53-addarshkumar-capstone-bytebridge.onrender.com/ad-data", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("Form Data Submitted:", formData);
        },
        modal: {
          ondismiss: function () {
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const inc = () => {
    if (totalImages < 4) {
      setTotalImages(totalImages + 1);
    }
  };

  const dec = () => {
    if (totalImages > 1) {
      setTotalImages(totalImages - 1);
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const urls = [];
    try {
      for (let image of imageFiles) {
        if (image) {
          const imageRef = ref(imageDb, `Adimages/${uuidv4()}`);
          await uploadBytes(imageRef, image);
          const newImageUrl = await getDownloadURL(imageRef);
          urls.push(newImageUrl);
        }
      }
      return urls;
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const urls = await handleUpload(); 
    const formData = {
      ...data,
      imageUrls: urls,
    };
    await checkoutHandler(10, formData);
  };

  return (
    <>
    {
      token.length>0?(
        <HStack mt={"30px"} justifyContent={"center"}>
        <VStack>
          <Text mt={"20px"}>Choose The Number Of Images You Want To Show.</Text>
  
          <HStack mt={"20px"} justifyContent={"center"}>
            <Icon onClick={dec} as={FaChevronLeft} />
            <Button colorScheme="blue">{totalImages}</Button>
            <Icon onClick={inc} as={FaChevronRight} />
          </HStack>
  
          {Array.from({ length: totalImages }).map((_, index) => (
            <FormControl key={index} mt="30px" isInvalid={errors[`image${index}`]}>
              <FormLabel>Ad Image {index + 1}</FormLabel>
              <Input
                type="file"
                aria-label={`Image ${index + 1}`}
                {...register(`image${index}`, { required: `Image ${index + 1} is required` })}
                onChange={(e) => handleImageChange(e, index)}
              />
              <FormErrorMessage>{errors[`image${index}`] && errors[`image${index}`].message}</FormErrorMessage>
            </FormControl>
          ))}
  
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="30px" minW={["xs", "sm", "md", "md"]} isInvalid={errors.category}>
              <FormLabel>Ad Category</FormLabel>
              <Input type="text" aria-label="Ad category" {...register("category", { required: "Ad category is required" })} />
              <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
            </FormControl>
  
            <FormControl mt="30px" isInvalid={errors.description}>
              <FormLabel>Ad Description</FormLabel>
              <Input type="text" aria-label="Ad description" {...register("description", { required: "Ad description is required" })} />
              <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
            </FormControl>
  
            <FormControl mt="30px" isInvalid={errors.startDate}>
              <FormLabel>Start Date</FormLabel>
              <Input type="date" aria-label="Start date" {...register("startDate", { required: "Start date is required" })} />
              <FormErrorMessage>{errors.startDate && errors.startDate.message}</FormErrorMessage>
            </FormControl>
  
            <FormControl mt="30px" isInvalid={errors.endDate}>
              <FormLabel>End Date</FormLabel>
              <Input type="date" aria-label="End date" {...register("endDate", { required: "End date is required" })} />
              <FormErrorMessage>{errors.endDate && errors.endDate.message}</FormErrorMessage>
            </FormControl>
  
            <Button isLoading={isLoading} type="submit" mt="30px" colorScheme="blue">
              Proceed
            </Button>
          </form>
        </VStack>
        <Image h={"80%"} w={"40vw"} src="https://fuse-client.vercel.app/About_Img/About.svg" />
      </HStack>
      ):(
        <Loginpage />
      )
    }
    </>
    
  );
};

export default Adsformpage;
