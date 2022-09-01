import { useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    useCollectionData, 
    useDocumentData
} from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { collection, doc, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../utils/firebase/firebase.utils";

import Messages from "../../components/messages/messages.component";
import Sidebar from "../../components/sidebar/sidebar.component";
import Topbar from "../../components/topbar/topbar.component";

import { 
    Avatar, 
    FormControl, 
    Grid,  
    TextField, 
    Typography 
} from "@mui/material";
import styles from './chat.module.scss';
import getOtherEmail from "../../utils/getOtherEmail";
import Bottombar from "../../components/bottombar/bottombar.component";
import { useEffect } from "react";

const Chat = () => {
    const router = useRouter();
    const {id} = router.query;
    
    const q = query(collection(db, 'chats', id, 'messages'), orderBy('timestamp'));
    const [messages] = useCollectionData(q);

    const [chat] = useDocumentData(doc(db, 'chats', id));
    const bottomOfChat = useRef();

    useEffect(() => {
        setTimeout(
            bottomOfChat.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            }), 100)
    }, [messages]);
    return(
        <>
        <Head>
                 <title>Chat App</title>
        </Head>

        <Grid
            container 
            style = {{
                height: '100vh'
            }}>
            <Sidebar/>
            <div className={styles.chat}>
                <Topbar email = {chat}/>
                
                <Grid className={styles.messages} flex = '1' overflow = 'scroll'>
                    <Messages key = {Math.random()} props = {messages}/>
                    <div ref = {bottomOfChat}></div>
                </Grid>

                <Bottombar/>
            </div>
        </Grid>
        </>
    )
}

export default Chat;