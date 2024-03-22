import React from 'react';
import io from 'socket.io-client';

export const socket = io.connect(process.env.REACT_APP_SOCKET_URL, {
  path: '/socket.io',
  autoConnect: false,
  transports: ['websocket'],
});
socket.on('connect_error', (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message);

  // some additional description, for example the status code of the initial HTTP response
  console.log(err.description);

  // some additional context, for example the XMLHttpRequest object
  console.log(err.context);
});
export const SocketContext = React.createContext();
