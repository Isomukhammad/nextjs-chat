import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from "../../utils/firebase/firebase.utils";

import { Grid } from "@mui/material";
import styles from './messages.module.scss';

const Messages = ({props}) => {
    const [user] = useAuthState(auth);
    const {email} = user; 
    
    return(
        <>
        {props?.map(prop => (
            <div key = {Math.random()} className = {`${styles.message} ${email === prop.sender ? styles.yourmessage : styles.friendmessage}`}>{prop.text}</div>
        ))}
        </>
    )
}

export default Messages