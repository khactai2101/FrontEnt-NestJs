import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as io from "socket.io-client";
const socket = io.connect("https://nestjs-c3hh.onrender.com");
type Props = {};
const VerifyLogin = (props: Props) => {
  const params = useParams();
  const token: any = params.token;

  useEffect(() => {
    localStorage.setItem("accessToken", token);
    socket.emit("message", "Click!");
  }, []);

  setTimeout(() => {
    window.close();
  }, 800);
  return <div></div>;
};

export default VerifyLogin;
