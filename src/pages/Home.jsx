// src/components/Home.js
import React, { useEffect, useState } from 'react';
import socket from '../socket';
import styles from "../styles/Home.module.css"
import Card from '../components/Card';
import ChatRoom from '../components/ChatRoom';


//* here socket.connect() is used to connect the socket client to server send confirmation that a user is connected and at server we can listen it on socket.on(cnnection) these are default messags of socket 

//* use socket.on(connect) to get to kno connection event


const Home = () => {

    const [name, setName] = useState("");

    const [showNameCard, setShowNameCard] = useState(true)
    const [showRoomCard, setShowRoomCard] = useState(false)
    const [showChatRoom, setShowChatRoom] = useState(false)

    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);



    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (name.trim() !== "") {
            setShowNameCard(false)
            setShowRoomCard(true)
        }
        else {
            alert("Please enter your name")
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message !== "" && room != "") {
            socket.emit("send message", { room, message, senderName: name })
        }
        setMessage("");
    };

    const joinRoom = () => {
        if (room != '') {
            socket.emit('join room', room);
            setShowRoomCard(false)
            setShowChatRoom(true)
        }
    }

    const leaveRoom = () => {
        if (room !== "") {
            socket.emit('leave room', room);
            setShowNameCard(true);
            setShowChatRoom(false);
            setShowRoomCard(false)
            setMessages([])
            setName("")
            setRoom("")
        }
    };


    useEffect(() => {
        //when  mount
        socket.connect();

        // Log the connection event
        socket.on('connect', () => {
            console.log('Connected:', socket.id);
        });

        // Listen for new messages from the server
        socket.on('new message', ({ message, senderId, senderName }) => {
            setMessages((prevMessages) => [...prevMessages, { message, senderId, senderName }]);
        });

        // Cleanup on unmount
        return () => {
            //^ to disconnect the socket
            socket.off('connect');
            socket.off('new message');
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div className={styles.home}>
            <div className={styles.heading}>
                <h1>
                    Welcome to One-Time Chat
                </h1>
            </div>
            {showNameCard &&
                <div className={styles.cardSection}>
                    <Card
                        heading={"Start quick and anonymous chat"}
                        inputLabel={"Enter name"}
                        state={name}
                        setState={setName}
                        onClickFunction={handleNameSubmit}
                    />
                </div>
            }

            {
                showRoomCard &&
                <div className={styles.cardSection}>
                    <Card
                        heading={"Create or enter chat rrom id"}
                        inputLabel={"Enter room id"}
                        state={room}
                        setState={setRoom}
                        onClickFunction={joinRoom}
                    />
                </div>
            }

            {
                showChatRoom &&
                <div className={styles.chatSection}>
                    <ChatRoom
                        currentUser={socket.id}
                        senderName={name}
                        message={message}
                        setMessage={setMessage}
                        messages={messages}
                        setMessages={setMessages}
                        sendMessage={sendMessage}
                        leaveRoom={leaveRoom}
                    />
                </div>
            }
        </div>
    );
};


export default Home;
