import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";

const Verifyemail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.post(`http://localhost:4000/verify/${token}`);
        Cookies.set("token", res.data.token);
        toast({
          description: res.data.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        toast({
          description: err.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };
    verifyUser();
  }, [token, navigate, toast]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
};

export default Verifyemail;
