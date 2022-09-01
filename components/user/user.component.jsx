import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth'

import getOtherEmail from "../../utils/getOtherEmail";
import { auth } from '../../utils/firebase/firebase.utils';

import { Avatar, Grid } from "@mui/material";

const User = ({props}) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const {id, users} = props;

    const redirect = (id) => {
        router.push(`/chat/${id}`);
    }

    return(
        <Grid 
            onClick = {() => redirect(id)}
            sx = {[
                (theme) => ({
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light,
                    },
                  }),
            ]}
            style = {{
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
                padding: '1em 1em',
                cursor: 'pointer',
            }}
        >
                <Avatar src = '' sx = {{marginEnd: '1em'}}/>
                <div>{getOtherEmail(users, user)}</div>
        </Grid>
    )
}

export default User;