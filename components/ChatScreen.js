import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Message from "./Message";
import { useState, useRef } from "react";
import firebase from "firebase";
import { TextField } from "@material-ui/core"; 
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";


function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");    
    const endofMessageRef =  useRef(null)
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .orderBy("timestamp", "asc")
    );

    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email','==', getRecipientEmail(chat.users, user))
    );

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message    
                    key= {message.id}
                    user= {message.data().user}
                    message= {{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime()
                        
                    }}
                />
            ));
        } else {
            return JSON.parse(messages).map(message=> (
                <Message key={message.id} user={message.user} message={message}/>
            ));
        };
    };

    const scrollToBottom = () => {
        endofMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const sendMessage = (e) => {
        e.preventDefault();

        //update the last seen message
        db.collection('users').doc(user.uid).set(
            {
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            }, 
            {merge: true});
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
        scrollToBottom();
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();  
    const recipientEmail = getRecipientEmail(chat.users, user);
    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}
                
                <HeaderInformation>
                    
                    <h3>{recipientEmail}</h3>
                    { recipientSnapshot ? (
                        <p>Last active: {' '} 
                        {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()} /> 
                        ): (
                            "unavailable"
                        )}
                        </p>
                    ): (
                        <p>Loading last active ...</p>
                    )}
                        
                </HeaderInformation>
                <HeaderIcon>
                    <IconButton>
                        <AttachFileIcon/>
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcon>
            </Header>
            <MessageContainer>
                {/* show messages */}
                {showMessages()}
                <endofMessage ref={endofMessageRef} />
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon />
                
                <TextField value={input} onChange={(e) => setInput(e.target.value)}   variant="outlined" fullWidth="true" />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <MicIcon />
            </InputContainer>
                
           
        </Container>
    )
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11 px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;
    
    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color: gray;
    }
`;

const HeaderIcon = styled.div``;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;

const endofMessage = styled.div`
    margin-bottom: 50px;
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index:100;
`;

const Input = styled.div`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`;
