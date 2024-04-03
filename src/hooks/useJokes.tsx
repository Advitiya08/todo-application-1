import { JokeResponseModel } from "@/Interface/JokeResponseModel";
import axios from "axios";
import { useEffect, useState } from "react";

export const useJokes: Function=()=>{
    const initialiseJoke=()=>{
        axios.get<JokeResponseModel>('https://v2.jokeapi.dev/joke/Programming')
        .then((res)=>{
          setJoke(res.data) 
        
        }) 
        .catch((err)=>console.error(`error in response ${err}`)).finally(()=>setIsLoading(false));
      }
    const [joke,setJoke]=useState<JokeResponseModel|null>(null)
    const [isLoading,setIsLoading]=useState<boolean>(false)
      const fetchMoreJokes:Function=()=>{
        setIsLoading(false)
        initialiseJoke();
      }
    useEffect(()=>{
        setIsLoading(true)
        initialiseJoke();

    },[])
    return {joke,isLoading,fetchMoreJokes};
}