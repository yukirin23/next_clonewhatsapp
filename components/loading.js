import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Circle } from "better-react-spinkit";
import styled from "styled-components";

function Loading() {
    return (
        <Center>
            <div>
                <WhatsAppIcon height="200" />
            </div>
            <Circle color="#3CB28" size={100} />
        </Center>
    );
}

export default Loading;

const Center = styled.div`
    display:"grid";
    place-items: "center";
    height: "100vh";
`;