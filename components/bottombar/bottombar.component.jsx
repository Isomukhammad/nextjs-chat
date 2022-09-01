import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from 'react-firebase-hooks/auth'

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../utils/firebase/firebase.utils";

import { Button, FormControl, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Bottombar = () => {
    const [input, setInput] = useState('');
    const router = useRouter();
    const {id} = router.query;
    const [user] = useAuthState(auth);

    const sendMessage = (e) => {
        e.preventDefault();
        addDoc(collection(db, `chats/${id}/messages`), {
            text: input,
            sender: user.email,
            timestamp: serverTimestamp()
        })
        setInput('');
    }

    return (
        <form
            onSubmit={sendMessage}
            style ={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '81px',
            padding: '1em',
            gap: '1em'
        }}>
            <TextField id="outlined-basic" label="Write a message" variant="outlined" sx ={{width: '100%'}} value = {input}onChange = {
                (e) => setInput(e.target.value)
            }/>
            <Button type = 'submit' sx = {{borderRadius: '1em', padding: '1em 0'}} onClick = {sendMessage}><SendIcon/></Button>
        </form>
    )
}

export default Bottombar;