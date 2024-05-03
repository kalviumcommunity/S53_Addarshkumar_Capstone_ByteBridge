import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { signInWithPopup, GithubAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth, imageDb } from "../firebaseauth/config";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [photoURL, setPhotoUrl] = useState("");
  const [isUser, setIsUser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setPhotoUrl(user.photoURL);
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  });



  const img_id=localStorage.getItem("img_id");

  useEffect(() => {
    const fetchImageURLs = async () => {
      try {
        const imgs = await listAll(ref(imageDb, "files"));
        const urls = [];
        for (const item of imgs.items) {
          if(item._location.path_==img_id){
            const url = await getDownloadURL(item);
            urls.push(url);

          }
        }
        setImageUrl(urls);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchImageURLs();
  }, []);

  const getData = async () => {
    try {
        const res = await axios.get("https://s53-addarshkumar-capstone-bytebridge.onrender.com/question");

        setData(res.data.questions);
      } 
      catch (err) {
        console.log(err);
      }
    };
    
    
    useEffect(() => {
        getData();

    }, []);

  return (
    <AppContext.Provider value={{ data, imageUrl, photoURL, isUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
