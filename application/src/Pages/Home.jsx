import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {AuthContext} from "../Context/AuthContext/AuthContextProvider"
import {CartContext} from "../Context/CartContext/CartContextProvider"
import { Box, Button, Grid, GridItem, Heading, Img, Text } from "@chakra-ui/react";


const getData=()=>{
    return axios.get("https://fakestoreapi.com/products")

}


// 0. axios should be used for making network requests;

// 1. API request should be made to `https://fakestoreapi.com/products` on mount and get the data and the same data should be displayed in the form of cards ( 3 per row in large screens, 2 per row  in medium screens and 1 per row  in small screen  )

// 2. loading, error and data state should be maintained; show proper loading indicator and error state when required;

// 3. each product card should atleast contain product image, title , price and a add to cart button;

// 4. cart data is maintained in the cart context and based on the cart data if the product is already added to the cart, then the add to cart button should be disabled for that particular product;

// 5. clicking on add to cart button will add the product to the cart; this cart is maintained in the cart context; as useReducer has been used for state management in cart context; you need to dispatch some add_to_cart action to add new product to the cart.

const Home = () => {
  const[data,setData]=useState([]);
  const[loading,setLoading]=useState(false)
  const{handleClick}=useContext(CartContext)
  const{authState}=useContext(AuthContext)

  useEffect(()=>{
    setLoading(true)
    getData()
    .then((res)=>{
      console.log(res)
      setData(res)
      setLoading(false)
    }).catch((err)=>{
      setLoading(false);
      console.log(err)
    })
  },[])
  if(loading){
    return <Heading>Loading....</Heading>
  }
  return <Box>
    <Text>Token:{authState.token}</Text>
    {data?.data?.map((item)=>(
      
      <Grid templateColumns='repeat(3, 1fr)'  gap={4} key={item.id} width="full">
        <GridItem colSpan={{base:1,lg:3,md:2}}>
        <Box>
        <Img width={"150px"} src={item.image} alt="Product_Avatar"/>
        <Text>{item.title}</Text>
        <Text>{item.price}</Text>
        <Button onClick={()=>handleClick({item})} >Add to Cart</Button>
        </Box>
        </GridItem>
      </Grid>
      
    ))}
  </Box>;
};

export default Home;
