import React from "react";
import io from "socket.io-client";


export const socket = io.connect(process.env.REACT_APP_SOCKET_URL);
export const SocketContext = React.createContext();