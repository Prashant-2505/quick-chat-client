import React, { useRef, useEffect } from 'react';
import styles from '../styles/ChatRoom.module.css';

const ChatRoom = ({ currentUser, message, setMessage, messages, sendMessage, leaveRoom }) => {
    const chatEndRef = useRef(null);

    useEffect(() => {
        // Scroll to the last message whenever the messages array changes
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={styles.chatRoom}>
            <div className={styles.chatSection}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${styles.chat_bubble} ${currentUser === msg.senderId ? styles.currentUser : ''}`}
                    >
                        <p className={styles.messageText}>
                            <span className={styles.message}>{msg.message}</span>
                            <span className={styles.userName}>{msg.senderName}</span>
                        </p>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className={styles.sendMessage_input}>
                <div className={styles.message_field}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className={styles.btn}>
                    <button onClick={sendMessage}>Send</button>
                    <button
                        onClick={leaveRoom}
                        className={styles.leave_btn}
                    >
                        Leave
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
