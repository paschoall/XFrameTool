import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormInputText } from './FormInputText';
import AlertDialog from './AlertDialog';


export default function Formulario(props) {
  const { handleSubmit, reset, control } = useForm();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setOpenError(openError)
  }, [openError])

  useEffect(() => {
    setOpen(open)
  }, [open])

  const onSubmit = (data) => {
    setOpen(false)
    setOpenError(false)

    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    fetch(props.fetchlink+id, requestOptions)
    .then(response => {
      if (!response.ok) {
        console.error('Network response was not OK:', response.status, response.statusText);
        return response.text();
      }
      setOpen(true);
      reset();
      return response.json();
    })
    .then(data => console.log('Server response:', data))
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      setOpenError(true);
    });
  }

  const handleClose = () => {
    setOpen(false);
    navigate(0);
  };

  return (
    <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
      <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component='h1' variant='h4' align='center' m={2}>
          {props.formTitle}
        </Typography>
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormInputText
                name="name"
                control={control}
                label="Name"
                defaultV={props.nome}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                multiline
                name="description"
                control={control}
                label="Description"
                defaultV={props.descricao}
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/*<Button
              variant='contained'
              onClick={() => reset()}
              sx={{ mt: 3, ml: 1 }}
            >
              Resetar
            </Button>*/}
            <Button
              variant='outlined'
              onClick={() => handleClose()}
              sx={{ mt: 3, ml: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              onClick={handleSubmit(onSubmit)}
              sx={{ mt: 3, ml: 1 }}
            >
              Edit
            </Button>
          </Box>
          <AlertDialog
            open={openError}
            title='Error in Editing'
            message="Error editing variable"
          />
          <AlertDialog
            open={open}
            title='Successful update'
            message='The variable was edited successfully!'
          />
        </React.Fragment>
      </Paper>
    </Container>
  );
}