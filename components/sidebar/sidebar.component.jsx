import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase.utils';

import { auth } from "../../utils/firebase/firebase.utils";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import User from "../user/user.component";

import { Avatar, Button, Grid } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import styles from './sidebar.module.scss';
import { useEffect } from 'react';

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const [snapshot, loading, error] = useCollection(collection(db, 'chats'));
    const chats = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}));

    const chatExists = (e) => {
        chats
        ?.find(chat => {
            if((chat.users.includes(user.email) && chat.users.includes(e))){
                return false;
            } return true;
        }
        );
    }

    const newChat = async () => {
        const input = prompt('Enter email of that recipent: ');
        if(chatExists(input) == false && (input != user.email)){
            await addDoc(collection(db, 'chats'), { users: [user.email, input]})
        }
    }

    return(
        <Grid
            sx ={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            height: '100vh',
            borderRight: '1px solid #F5F5F5'
        }}>
            <Grid
                style ={{
                    display: 'flex',
                    height: '81px',
                    width: '100%',
                    alignItems: 'center',
                    padding: '1em',
                    borderBottom: '1px solid #F5F5F5'
            }}>
                <Grid 
                    container 
                    alignItems='center'
                    sx = {{
                        fontWeight: '500', 
                        flexDirection: 'row'
                    }}
                >
                    <Avatar src = {user.photoURL} sx = {{marginRight: '1em'}}/>
                    <div>{user.displayName}</div>
                </Grid>
                <KeyboardDoubleArrowLeftIcon 
                    style = {{
                        borderRadius: '50%', 
                        backgroundColor: '#F5F5F5', 
                        cursor: 'pointer'
                    }} 
                    onClick = {signOutUser}
                    />
            </Grid> 

            <Button 
                variant = 'contained' 
                style = {{
                    alignSelf: 'center',
                    backgroundColor: 'white', 
                    color: 'black', 
                    width: '80%',
                    margin: '2em 0'
                }}
                onClick = {newChat}
                >
                    New Chat
            </Button> 

            <Grid className={styles.chats}>
                {
                    chats?.filter(chat => chat.users.includes(user.email)).map(chat => (
                        <User key = {Math.random()} props = {chat}/>
                    ))
                }
            </Grid>        
        </Grid>
    )
}

export default Sidebar;