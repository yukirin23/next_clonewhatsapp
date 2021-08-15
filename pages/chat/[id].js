import styled from "styled-components";
import Sidebar from "../../components/sidebar";
import ChatScreen from "../../components/ChatScreen";


function Chat() {
    return (
        <Container>
            <head>
                <title>Chat</title>
            </head>            
            <Sidebar />
            <ChatContainer>
                <ChatScreen />
            </ChatContainer>
        </Container>
    )
}

export default Chat;

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
