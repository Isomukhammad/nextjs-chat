import { useAuthState } from 'react-firebase-hooks/auth'

import { Avatar, Grid, Typography } from "@mui/material";
import { auth } from '../../utils/firebase/firebase.utils';
import getOtherEmail from '../../utils/getOtherEmail';

const Topbar = ({email}) => {
    // const {users} = email;
    // const user = useAuthState(auth)
    console.log(email, 'Email');

    return (
        <Grid
            container
            alignItems='center'
            p = '1em' 
            sx ={{backgroundColor: '#F5F5F5', height: '80px'}}>
            <Avatar src = ''/>
            <Typography variant="h4" paddingLeft= {".5em"} >Hello</Typography>
        </Grid>
    )
}

export default Topbar;