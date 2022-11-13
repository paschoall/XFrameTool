import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Footer from '../components/Footer';
import EditForms from '../components/EditForms';
import Metric from '../components/Metric'

const EditVariavelDependente = () => {
  const [data, setData] = useState([{}])
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [metric, setMetrics] = useState([{}]);
  const [openDesc, setOpenDesc] = React.useState(false);
  const [openFt, setOpenFt] = React.useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openRef, setOpenRef] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = useParams();

  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/dependent_variable/' + id).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [id])

  useEffect(() => {
    fetch('/metrics').then(
      res => res.json()
    ).then(
      data => {
        setMetrics(data);
      }
    )
  }, [])

  const handleClickFT = () => {
    navigate('fatores-tratamentos')
  }
  const handleClickRef = () => {
    navigate('ref')
  }

  const handleClickOpenDesc = () => {
    setOpenDesc(true);
  };
  const handleClickMore = (event, more_id) => {
    setSelectedIndex(more_id)
    setOpenMore(true)
  }
  const handleClickOpenFt = () => {
    setOpenFt(true);
  };
  const handleClickOpenRef = () => {
    setOpenRef(true);
  };
  const handleClose = () => {
    setOpenDesc(false);
    setOpenMore(false);
    setOpenFt(false);
    setOpenRef(false);
  };

  return (
    (typeof data.data === 'undefined') ? (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          padding: '20vh',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.grey[800],
        }}
      >
        <Typography variant="h4" gutterBottom>
          Loading...
        </Typography>
      </Box>
    ) : (
      <>
        <CssBaseline />
        <Box
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              {data.data['name']}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Description
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: '0.5rem',
                      fontSize: '1rem',
                      lineHeight: '1.5em',
                      fontWeight: 'normal',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    {data.data['description']}
                  </Typography>
                  <Grid
                    container spacing={2}
                    rowSpacing={1}
                    sx={{
                      margin: '0',
                    }}
                  >
                    <Button onClick={handleClickOpenDesc}>Edit Name and Description</Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={7} lg={7}>
                <Paper
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Metrics and Instruments
                  </Typography>
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={4} lg={4}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <Typography variant="body1" gutterBottom>
                          1 Metric
                        </Typography>
                        <Grid
                          container spacing={2}
                          rowSpacing={1}
                          sx={{
                            margin: '0.5rem 1rem 0 0'
                          }}
                        >
                          <Button onClick={(event) => handleClickMore(event, data.id)}>More</Button>

                          <Button onClick={handleClickFT}>Delete</Button>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid
                    container spacing={2}
                    rowSpacing={1}
                    sx={{
                      margin: '1rem 0 0 0'
                    }}
                  >
                    <Button onClick={handleClickOpenFt}>Add Metrics and Instruments</Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    References
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary={'Lorem Ipsum'} />
                      <Button onClick={handleClickRef}>DELETE</Button>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={'Lorem Ipsum'} />
                      <Button onClick={handleClickRef}>DELETE</Button>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={'Lorem Ipsum'} />
                      <Button onClick={handleClickRef}>DELETE</Button>
                    </ListItem>
                  </List>
                  <Grid
                    container spacing={2}
                    rowSpacing={1}
                    sx={{
                      margin: '0.5rem 0 0 0'
                    }}
                  >
                    <Button onClick={handleClickOpenRef}>Add Reference</Button>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Dialog
          fullScreen={fullScreen}
          open={openDesc}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <EditForms formTitle={'Edit Name and Description'} fetchlink='/dependent_variable/' />
          </DialogContent>
        </Dialog>

        <Dialog
          fullScreen={fullScreen}
          open={openFt}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Add Factors and Treatments"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose Factors
            </DialogContentText>
            <DialogContentText>
              Choose Treatments
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={openRef}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Add Reference"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose Factors
            </DialogContentText>
            <DialogContentText>
              Choose Treatments
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {/* -------------------------------------------------------- */}

        <Dialog
          fullWidth
          open={openMore}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: {
              fullWidth: 'true',
              maxWidth: 'lg',
              maxHeight: '80%',
            }
          }}
        >
          <DialogContent>
            {(typeof metric.data === 'undefined') ? (
              <Typography variant="h4" gutterBottom>
                Loading...
              </Typography>
            ) : (metric.data.filter(({ id }) => id === selectedIndex).map((data, i) => {
              return (
                <>
                  <Typography>
                    {data['id_treatments_array'].split(',').map((id, i) => { return (<Metric key={i} id={id} />) })}
                  </Typography>
                </>
              )
            })
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Footer />
      </>
    )
  );
}

export default EditVariavelDependente;