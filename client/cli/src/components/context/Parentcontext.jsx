import {createContext,useEffect,useState } from "react";
import axios from "axios";
import {ref,getDownloadURL,listAll} from "firebase/storage";
import { imageDb } from "../firebaseauth/config";


export const AppContext=createContext();
const AppProvider=({children})=>{
    const [data,setData]=useState([]);
    const [imageUrl,setImageUrl]=useState([])

    useEffect(()=>{
      listAll(ref(imageDb,"files")).then((imgs)=>{
        imgs.items.forEach((val)=>{
          getDownloadURL(val).then(url=>{
            setImageUrl(data=>[...data,url])
          })
        })
      })
    },[])

    const getData=async()=>{
        try{
            const res =await axios.get("http://localhost:4000/question");
            setData(res.data.questions);
          }
          catch(err){
            console.log(err);
          }
    }
    useEffect(()=>{
        getData()
      },[])
    
    return(
        <AppContext.Provider value={{data,imageUrl}}>{children}</AppContext.Provider>
    )
}
export default AppProvider;
