import React, { useContext, useState } from "react";
import axios from "axios";
import { Box, Heading, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext/AuthContextProvider";

// 0. axios should be used for making network requests;

// 1. input boxes which takes email and password from the user

// 2. in this page you should get the auth state from auth context and based on auth state;if user is already logged in then user should be redirected to home page

// 3. network request (POST) should be made to api endpoint `https://reqres.in/api/login` with email and password details;

// 4. button should not allow additional click till API call is complete; user should see loading indicator till API call is complete;

// 5. upon successful login, login success action is dispatched with token we get back as response and the authentication status and token is updated in the context API. user then gets redirected to home page;

// 6. Proper Alert should be displayed to user upon unsuccessful API call. the message can be `Something went wrong. please refresh.`

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate()
  const {userLogin}=useContext(AuthContext);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const payload={
      email,
      password
    }
    axios.post("https://reqres.in/api/login", payload).then((res)=>{
      console.log(res.data.token);
      userLogin(res.data.token)
      navigate("/")
    }).catch((err)=>{
      console.log(err);
    })

  }



  return <Box paddingTop={"100px"}>
    <Heading>Login</Heading>
    <form onSubmit={handleSubmit}>
      <Input width={"250px"} type="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br/>
      <Input width={"250px"} type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/><br/>
      <Input width={"250px"} type="submit"/>
      
    </form>

  </Box>;
};

export default Login;
