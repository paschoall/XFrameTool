
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

import jwt from 'jwt-decode'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import AlertDialog from '../components/AlertDialog';
import Footer from '../components/Footer';
import { asyncLogin } from '../store/reducers/userSlice';

export default function Login({ setToken }) {
  const currentUser = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logIn = React.useCallback((token, user) => {
    dispatch(asyncLogin(token, user));
  }, [dispatch]);

  useEffect(() => {
    setOpenError(openError)
  }, [openError])

  useEffect(() => {
    setOpen(open)
  }, [open])

  const handleSubmit = (event) => {
    setOpenError(false)

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }

    requestOptions.headers.Authorization = 'Basic ' + btoa(data.get('username') + ":" + data.get('password'))

    fetch('/auth', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json()
      })
      .then(data => {
        setToken(data.token)
        const decodedtoken = jwt(data.token)
        const user = {
          username: decodedtoken.username,
          isLoggedIn: true,
          roles: decodedtoken.roles,
        }
        logIn(data.token, user)
        navigate('/admin-page/gerenciar-variaveis', { replace: true })
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        setOpenError(true)
      });
  };

  if (currentUser.isLoggedIn) {
    if(currentUser.roles.includes('admin') ){
      return <Navigate to="/admin-page/gerenciar-variaveis" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Typography component={Link} to='/signup' variant="body2">
                  {"Don't have an account? Register"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <AlertDialog
          open={openError}
          title='Login error'
          message='Username or password is invalid'
        />
      </Container>
      <Footer />
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
