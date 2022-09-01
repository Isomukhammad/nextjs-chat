import Head from "next/head";

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from "../../utils/firebase/firebase.utils";

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";


const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return(
        <>
        <Head>
            <title>Login</title>
        </Head> 

        <Grid
            container
            spacing = {0}
            direction = 'column'
            alignItems='center'
            justifyContent='center'
            style = {{minHeight: '100vh'}}
        >
            <Grid
                container
                direction = 'column'
                alignItems='center'
                style = {{
                    backgroundColor: '#757575', 
                    width: 'fit-content', 
                    padding: '2em', 
                    borderRadius: '1.5em',  
                    gap: '2em'                  
                }}
            >
                <Box sx = {{
                    backgroundColor: '#2196F3',
                    objectFit: 'contain', 
                    width: 'fit-content', 
                    borderRadius: '1.5em', 
                    padding: '1em'
                }}>
                    <ChatBubbleOutlineOutlinedIcon style = {{
                        width: '100px', 
                        height: '100px', 
                        color: '#FFFFFF'
                    }}/>
                </Box>
                <Button 
                    variant="text" 
                    sx = {{
                        backgroundColor: 'white',
                        color: 'black',
                        fontWeight: 700,
                        textTransform: 'none',
                        borderRadius: '.5em'
                    }}
                    onClick = {() => signInWithGoogle('', {prompt: 'select_account'})}
                >
                    Sign In With Google
                </Button>
            </Grid>
        </Grid>
        </>
    )
}

export default Login;