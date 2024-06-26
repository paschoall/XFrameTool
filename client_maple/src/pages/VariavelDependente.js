import React from 'react';
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
} from '@mui/material';
import Footer from '../components/Footer';
import Metric from '../components/Metric'
import Instrument from '../components/Instrument'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation, useNavigate } from 'react-router-dom';

const VariavelDependente = () => {
  const [data, setData] = useState([{}])
  const [metrics, setMetrics] = useState([{}])
  const [instruments, setInstruments] = useState([{}])
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [metricInstrument, setMetricInstrument] = useState([{}]);
  const [references, setReferences] = useState([{}]);
  const [vdReferences, setVdReferences] = useState([{}]);
  const [openMore, setOpenMore] = useState(false);

  const variable_id = id

  useEffect(() => {
    fetch('/dependent_variable/' + id).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [id])

  useEffect(() => {
    fetch('/metrics').then(
      res => res.json()
    ).then(
      data => {
        setMetrics(data)
      }
    )
  }, [id])

  useEffect(() => {
    try {
      fetch('/instruments').then(
        res => res.json()
      ).then(
        data => {
          setInstruments(data);
        }
      )
    } catch (error) {
      console.error("Erro na chamada assíncrona de /instruments:", error);
    }
  }, [id])
  


  useEffect(() => {
    fetch('/metric_instrument_relationships').then(
      res => res.json()
    ).then(
      data => {
        setMetricInstrument(data);
      }
    )
  }, [])

  useEffect(() => {
    fetch('/references').then(
      res => res.json()
    ).then(
      data => {
        setReferences(data);
      }
    )
  }, [])

  useEffect(() => {
    fetch('/vd_references').then(
      res => res.json()
    ).then(
      data => {
        setVdReferences(data);
      }
    )
  }, [])

  const handleClose = () => {
    setOpenMore(false);
  };
  const handleClickMore = (event, more_id) => {
    setSelectedIndex(more_id)
    setOpenMore(true)
  }

  const navigate = useNavigate();
  const location = useLocation();

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
            mt: 7,
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          {(
            !(location.pathname === '/catalogo-variaveis-dependentes') &&
            <Button
              xs={'none'}
              size="large"
              onClick={() => navigate(-1)}
              sx={{
                display: { xs: 'none', md: 'flex' },
                position: 'relative',
                marginLeft: '0.9rem',
                top: '15px',
                color: 'gray',
                borderRadius: '100%',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.grey[200],
                },
              }}
            >
              <ChevronLeftIcon fontSize="large" />
            </Button>
          )}
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
                    {
                      (typeof metricInstrument.data === 'undefined' || Object.keys(metricInstrument.data).length === 0) ? (
                        <p></p>
                      ) : (
                        metricInstrument.data.filter(({ id_vd }) => id_vd.toString() === variable_id).map((data, i) => {
                          return (
                            <Grid key={i} item xs={12} md={6} lg={6}>
                              <Paper
                                // component={Button}
                                sx={{
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  height: '100%',
                                  width: '100%',
                                  textTransform: 'none',
                                  alignItems: 'flex-start',
                                }}
                              >
                                <Typography variant="body1" gutterBottom>
                                {(
                                  data['id_metric'] === 0 ? '' :
                                  (metrics.data && metrics.data.find(({ id }) => id.toString() === data['id_metric'].toString())['name'])
                                )}
                                {(
                                  data['id_instrument'] === 0 ? '' :
                                  (instruments.data && instruments.data.find(({ id }) => id.toString() === data['id_instrument'].toString())['name'])
                                )}  
                                </Typography>
                                <Grid
                                  container spacing={2}
                                  rowSpacing={1}
                                  sx={{
                                    margin: '0.5rem 0 0 -0.5rem'
                                  }}
                                >
                                  <Button onClick={(event) => handleClickMore(event, data.id)}>More Details
                                    <AddCircleRoundedIcon
                                      sx={{
                                        mt: '-5px',
                                        ml: '5px',
                                        fontSize: '16px',
                                        textAlign: 'center',
                                      }}
                                    />
                                  </Button>
                                </Grid>
                              </Paper>
                            </Grid>
                          )
                        }
                        )
                      )
                    }
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
                      <Grid container spacing={2}>
                        {(typeof vdReferences.data === 'undefined' || Object.keys(vdReferences.data).length === 0 || typeof references.data === 'undefined') ? (
                          <p></p>
                        ) : (
                          vdReferences.data.filter(({ id_vd }) => id_vd.toString() === variable_id).map((data, i) => {
                            return (
                              <Grid container item key={i} xs={12} md={12} lg={12} spacing={3} alignItems="flex-start" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                <Grid item xs={6} md={6} lg={6} zeroMinWidth>
                                  {references.data.find(o => o.id === data.id_ref).referencia_bib}
                                </Grid>
                                <Grid item xs={6} md={6} lg={6} zeroMinWidth>
                                  {"Available in: "}
                                  <a
                                    target="_blank"
                                    rel='noreferrer'
                                    href={((references.data.find(o => o.id === data.id_ref).referencia.includes("//")) ? ("") : ("//")) +
                                      references.data.find(o => o.id === data.id_ref).referencia}
                                    style={{ textDecoration: 'none' }}
                                  >
                                    <ListItemText primary={references.data.find(o => o.id === data.id_ref).referencia} />
                                  </a>
                                </Grid>
                              </Grid>
                            )
                          }
                          )
                        )
                        }
                      </Grid>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />

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
            {(typeof metricInstrument.data === 'undefined' || Object.keys(metricInstrument.data).length === 0) ? (
              <Typography variant="h4" gutterBottom>
                Loading...
              </Typography>
            ) : (metricInstrument.data.filter(({ id }) => id === selectedIndex).map((data, i) => {
              return (
                (data['id_instrument'] === 0) ?
                  (
                    <>
                      <Typography>
                        <Metric key={i} id={data['id_metric']} />
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography>
                        <Instrument key={i} id={data['id_instrument']} />
                      </Typography>
                    </>
                  )
              )
            })
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
}

export default VariavelDependente;