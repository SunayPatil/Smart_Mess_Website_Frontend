import React from 'react';
import io from 'socket.io-client';

export const socket = io.connect(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket'], // forces websockets only
});
export const SocketContext = React.createContext();
