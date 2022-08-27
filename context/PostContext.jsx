import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { GetData } from "../api/post";

export const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [specificProduct, setSpecificProduct] = useState();
  const[uploaded,setUploaded]=useState(false)

  const fetchItems = async () => {
    try {
      const result = await GetData();
      setData(result.data.posts.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, [uploaded]);

  return (
    <PostContext.Provider value={{ data, specificProduct, setSpecificProduct,fetchItems,setUploaded }}>
      {children}
    </PostContext.Provider>
  );
};
