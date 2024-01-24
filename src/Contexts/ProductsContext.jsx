import { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [productTitle , setProductTitle] = useState([])
  const [productDesc , setProductDesc] = useState("")
  const [productImg , setProductImg] = useState("")
  const [price , setPrice] = useState("")
  const [count , setCount] = useState("")
  const [popularity , setPopularity] = useState("")
  const [sale , setSale] = useState([])
  const [colors , setColors] = useState("")
  const [productUrl , setProductUrl] = useState("")
  return (
    <ProductsContext.Provider
      value={{ productTitle , setProductTitle , productDesc , setProductDesc , productImg , setProductImg , price , setPrice , count , setCount , popularity , setPopularity , sale , setSale , colors , setColors , productUrl , setProductUrl}}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
