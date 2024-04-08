import {createContext,useEffect,useState } from "react";
import axios from "axios";

export const AppContext=createContext();
const AppProvider=({children})=>{
    const [data,setData]=useState([]);

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
        <AppContext.Provider value={{data}}>{children}</AppContext.Provider>
    )
}
export default AppProvider;
