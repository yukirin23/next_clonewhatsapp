import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { auth, provider } from "../firebase"

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo>
                    <WhatsAppIcon />
                </Logo>                
                <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7)
`;

const Logo = styled.div`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;
