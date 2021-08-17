import styled from "styled-components";
import Sidebar from "../../components/sidebar";
import ChatScreen from "../../components/ChatScreen";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail"

function Chatid({ chat, messages }) {
    const [user] =  useAuthState(auth);

    return (
        <Container>
            <head>
                <title>Chat with { getRecipientEmail(chat.users, user) }</title>
            </head>            
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    )
}

export default Chatid;

// Server side rendering

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id);

    // prep the messages on the serverTimestamp
    const messageRes = await ref
        .collection('messages')
        .orderBy("timestamp", "asc")
        .get();

    const messages = messageRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    // prep the chat
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    };

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
};

const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-::-webkit-scrollbar {
        display: None;
    }

    --ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;
