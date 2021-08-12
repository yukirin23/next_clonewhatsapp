import { Avatar, IconButton } from '@material-ui/core'
import styled from "styled-components"
import ChatIcon from '@material-ui/icons/chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search';

function Sidebar() {
    return (
        <Container>
            <Header>
                <UserAvatar />


                <IconContainer>
                    <IconButton>
                         <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>      
                </IconContainer>
            </Header>    
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>
            <SidebarButton>Start a new chat</SidebarButton>        
        </Container>
    )
}

export default Sidebar;

const Container = styled.div``;
const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    backgroup-color: white;
    z-index:1;
    justify-content:space-between;
    /* align-items: center; */
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;
const IconContainer = styled.div``;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;

`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex:1;
`;

const SidebarButton = styled.button`
    width:100%auto;
    
`;