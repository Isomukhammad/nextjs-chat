import { useEffect, useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../utils/firebase/firebase.utils';

import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

import Login from '../components/login/login-component';

import { CircularProgress, Grid } from '@mui/material';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  if(loading){
    return(
      <Grid container alignItems={'center'} justifyContent = 'center' height = '100vh'>
        <CircularProgress/>
      </Grid>
    )
  }

  if (!user) {
    return(
      <Login/>
    )
  }

  return <Component {...pageProps} />
}

export default MyApp
