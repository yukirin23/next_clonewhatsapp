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

function ChatScreen({ chat, messages}) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .orderBy("timestamp", "asc")
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
        }
    };

    return (
        <Container>
            <Header>
                <Avatar />
                <HeaderInformation>
                    <h3>Rec Emails</h3>
                    <p>Last seen ...</p>
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
                <endofMessage/>
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon />
                <Input />
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

const MessageContainer = styled.div``;

const endofMessage = styled.div``;

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
