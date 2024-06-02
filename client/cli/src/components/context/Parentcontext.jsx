import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseauth/config";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [photoURL, setPhotoUrl] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhotoUrl(user.photoURL);
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://s53-addarshkumar-capstone-bytebridge.onrender.com/question");
        setData(res.data.questions);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getUserPosts = async () => {
      const res = await axios.get(
        "https://s53-addarshkumar-capstone-bytebridge.onrender.com/userposts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestion(res.data.questions.questions_id);
      setAnswer(res.data.answers.answers_id);
      setUserProfile(res.data);
    };
    getUserPosts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize, false);
    window.addEventListener("load", handleResize, false);

    return () => {
      window.removeEventListener("resize", handleResize, false);
      window.removeEventListener("load", handleResize, false);
    };
  }, []);

  const handleLogout = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (isUser) {
      try {
        await signOut(auth);
        setPhotoUrl("");
        setIsUser(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  let token = "";

  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (tokenCookie) {
    token = tokenCookie.split("=")[1];
  } else {
    console.error("Token cookie not found");
  }

  return (
    <AppContext.Provider value={{ data, setImageUrl, imageUrl, photoURL, setPhotoUrl, isUser, handleLogout, answer, setAnswer, question, userProfile, dimensions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
