import { useAuthState } from 'react-firebase-hooks/auth'

import { Avatar, Grid, Typography } from "@mui/material";
import { auth } from '../../utils/firebase/firebase.utils';
import getOtherEmail from '../../utils/getOtherEmail';
import { useEffect } from 'react';
import { useState } from 'react';

const Topbar = ({email}) => {
    const [user] = useAuthState(auth);
    const [profile, setProfile] = useState('');
    useEffect(() => {
        if(email != null){
            setProfile(getOtherEmail(email.users, user))
        }
    }, [user, email]);

    return (
        <Grid
            container
            alignItems='center'
            p = '1em' 
            sx ={{backgroundColor: '#F5F5F5', height: '80px'}}>
            <Avatar src = ''/>
            <Typography variant="h4" paddingLeft= {".5em"} >{profile}</Typography>
        </Grid>
    )
}

export default Topbar;