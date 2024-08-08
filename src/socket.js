// src/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000'; //^ backend url 

const socket = io(SOCKET_URL, {
    autoConnect: false,
});

export default socket;



// ! so io is imorted from socket that take 2 thing one is url of backend where is the server and auto connected false