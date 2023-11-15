import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:9000");
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
