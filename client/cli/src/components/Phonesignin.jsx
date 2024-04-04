import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { Button,HStack,Input, VStack } from '@chakra-ui/react';
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebaseauth/config';


const Phonesignin = () => {
  const [phone,setPhone]=useState("");
  const [user,setUser]=useState(null);
  const [otp,setOtp]=useState("");
  const navigate=useNavigate()

  const sendOtp=async()=>{
    try{
        const recaptcha=new RecaptchaVerifier(auth,"recaptcha",{});
        const confirmation=await signInWithPhoneNumber(auth,phone,recaptcha);
        setUser(confirmation)
    }
    catch(err){
        console.log(err);
    }

  }

  const verifyOtp=async()=>{
    try{
       const data=await user.confirm(otp);
    navigate("/")
    }
    catch(err){
        console.log(err)
    }
  }

  return (
   <>
   <VStack>
<label>Enter phone number</label>
<HStack>

 <PhoneInput
  
  country={'india'}
  value={phone}
  onChange={(phone)=>setPhone("+" + phone)}
/>
</HStack>
<br />
<Button onClick={sendOtp} colorScheme='blue'>
 Send Otp
</Button>
<div id='recaptcha'></div>
<br />
<Input onChange={(e)=>setOtp(e.target.value)} maxW={"xs"}></Input>

<Button onClick={verifyOtp}>verify otp</Button>
   </VStack>
   </>

  )
}

export default Phonesignin