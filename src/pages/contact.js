import Head from 'next/head';
import {
  Card,
  CardContent,
  Container,
  Typography, IconButton,
  Grid, Box, TextField, InputLabel, OutlinedInput, FormControl, SvgIcon, useTheme, useMediaQuery
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as React from 'react';
import NextLink from 'next/link';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import LandingNav from './landingLayout';
import jwt from 'jsonwebtoken';
import { alpha, styled } from '@mui/material/styles';
import { sign } from 'jsonwebtoken';
import InputBase from '@mui/material/InputBase';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const demoUser = {
//   user: 'demo',
//   token: 'demoToken123'
// };

const Contact = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const [games, setGames] = useState([]);

  // Fetch all games
  // useEffect(() => {
  //   // const token = generateJWTToken(demoUser);
  //   const fetchGames = async () => {
  //     try {
  //       const demoUserInfo = JSON.parse(window.localStorage.getItem('demoUser'));
  //       const token = demoUserInfo ? demoUserInfo.token : null;
  //       const response = await axios.get(API_BASE_URL + '/api/game/get-all-games', {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'x-access-token': token
  //         }
  //       });
  //       setGames(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.response.data.msg);
  //     }
  //   };
  //   fetchGames();
  // }, []);

  const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  // const createUser = async (slug) => {
  //   try {
  //     const response = await axios.get(API_BASE_URL + `/api/temporary-user/create/${slug}`, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     const userId = response.data.data.userId;
  //     window.localStorage.setItem('tempUserId', userId);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data.msg);
  //   }
  // };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
      // fontFamily: 'Open Sans',
      fontWeight: 700,
      lineHeight: '17.6px',
      letterSpacing: '0%',
      fontSize: '16px',
      borderRadius: 10,
      position: 'relative',
      // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F3F6F9',
      border: '1px solid',
      borderColor: 'white',
      width: '100%',
      padding: '10px 12px',
      color: 'white',
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      '&:focus': {
        // boxShadow: '#C595FF 0 0 0 0.2rem ',
        borderColor: 'white'
      }
    }
  }));
  return (
    <>
      <Head>
        <title>Contact | {APP_NAME}</title>
      </Head>
      {/*<LandingNav/>*/}
      <Box
        id="contact"
        sx={{
          overflowX: 'hidden',
          overflowY: 'hidden',
          width: '100%',
          height: '100%',
          // minHeight: '100vh',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          // backgroundColor: '#e6e6e7 !important'
          backgroundColor: '#1a1d25 !important'
        }}>
        <Container

          data-aos="zoom-out"
          data-aos-duration="600"
          data-aos-easing="ease-in"

          sx={{ width: '100%', mt: 5, mb: 5 }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Typography gutterBottom variant="h4" padding="10px" sx={{
                // textAlign: 'center',
                fontWeight: 900,
                color: 'white'
                // color:''
              }}>
                Contact Us
              </Typography>
              <Typography gutterBottom variant="body1" padding="10px" sx={{
                // textAlign: 'center',
                // fontWeight:900,
                // color: 'grey'
                fontSize: '1.3rem',
                color: 'white'
              }}>
                Feel free to use the form or drop us an email Old fashioned cell phone work too
              </Typography>
              <Box>
                <Box sx={{ mt: 5, display: 'flex', gap: 2, height: '100%', alignItems: 'center' }}>
                  <PhoneIcon sx={{
                    color: '#c165a0'
                  }}/>
                  {/*<Box component='image' src={`${WEB_URL}/phone.png`}  />*/}
                  <Typography variant="body1" sx={{
                    fontWeight: '900',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    alignItems: 'center',
                    color: 'white',
                    height: '100%'
                  }}>+1 (555) 123-4567</Typography>
                </Box>
                <Box sx={{ mt: 5, display: 'flex', gap: 2, height: '100%', alignItems: 'center' }}>
                  <EmailIcon sx={{
                    color: '#c165a0'
                  }}/>
                  {/*<img src={`${WEB_URL}/mail.png`}/>*/}
                  <Typography variant="body1" sx={{
                    fontWeight: '900',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.3rem',
                    alignItems: 'center',
                    height: '100%'
                  }}>john.doe@example.com</Typography>
                </Box>
                <Box sx={{ mt: 5, display: 'flex', gap: 2, height: '100%', alignItems: 'center' }}>
                  <LocationOnIcon sx={{
                    color: '#c165a0'
                  }}/>
                  {/*<img src={`${WEB_URL}/location.png`}/>*/}
                  <Typography variant="body1" sx={{
                    fontWeight: '900',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    color: 'white',
                    alignItems: 'center',
                    height: '100%'
                  }}>123 Main Street, Springfield, IL 62704, USA</Typography>
                </Box>
                <Box sx={{ mt: 5, display: 'flex', gap: 2, height: '100%', alignItems: 'center' }}>
                  <EmailIcon sx={{
                    color: '#c165a0'
                  }}/>
                  {/*<img src={`${WEB_URL}/location.png`}/>*/}
                  <Typography variant="body1" sx={{
                    fontWeight: '900',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    color: 'white',
                    alignItems: 'center',
                    height: '100%'
                  }}>Contact Us With On Social Media</Typography>
                </Box>
                <Box sx={{
                  mt: 5,
                  mb: 5,
                  display: 'flex',
                  gap: 3,
                  height: '100%',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  alignItems: 'center',
                  ml: { md: 5 }
                }}>
                  <PinterestIcon sx={{
                    color: '#c165a0'
                  }}/>
                  <FacebookOutlinedIcon sx={{
                    color: '#c165a0'
                  }}/>
                  <YouTubeIcon sx={{
                    color: '#c165a0'
                  }}/>
                  <InstagramIcon sx={{
                    color: '#c165a0'
                  }}/>
                  {/*<img src={`${WEB_URL}/pinterst.png`} style={{*/}
                  {/*  width: isSmallScreen ? '10%' : ''*/}
                  {/*}}/>*/}
                  {/*<img src={`${WEB_URL}/facebook.png`} style={{*/}
                  {/*  width: isSmallScreen ? '10%' : ''*/}
                  {/*}}/>*/}
                  {/*<img src={`${WEB_URL}/tiktok.png`} style={{*/}
                  {/*  width: isSmallScreen ? '10%' : ''*/}
                  {/*}}/>*/}
                  {/*<img src={`${WEB_URL}/youtube.png`} style={{*/}
                  {/*  width: isSmallScreen ? '10%' : ''*/}
                  {/*}}/>*/}
                  {/*<img src={`${WEB_URL}/instagram.png`} style={{*/}
                  {/*  width: isSmallScreen ? '10%' : ''*/}
                  {/*}}/>*/}
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                // component="form"
                sx={{
                  mt: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  flexDirection: 'column'
                }}
                // noValidate
                // autoComplete="off"
              >
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input1"
                    sx={{
                      // fontFamily: 'Open Sans',
                      fontWeight: 700,
                      lineHeight: '17.6px',
                      letterSpacing: '0%',
                      fontSize: '20px',
                      width: '100% !important',
                      // color: 'black !important',
                      color: 'white !important'
                    }}
                  >
                    Full Name
                  </InputLabel>
                  <BootstrapInput
                    placeholder="First Last"
                    id="bootstrap-input1"
                    sx={{
                      color: 'black !important',
                      '& input::placeholder': {
                        color: 'grey !important',
                        opacity: 1 // important for some browsers to show color
                      }
                    }}
                  />
                </FormControl>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input2"
                    sx={{
                      // fontFamily: 'Open Sans',
                      fontWeight: 700,
                      lineHeight: '17.6px',
                      letterSpacing: '0%',
                      fontSize: '20px',
                      width: '100% !important',
                      color: 'white !important'
                    }}
                  >
                    Email
                  </InputLabel>
                  <BootstrapInput
                    placeholder="example@gmail.com"
                    id="bootstrap-input2"
                    sx={{
                      // color: 'black !important',
                      '& input::placeholder': {
                        color: 'grey !important',
                        opacity: 1 // important for some browsers to show color
                      }
                    }}
                  />
                </FormControl>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input3"
                    sx={{
                      // fontFamily: 'Open Sans',
                      fontWeight: 700,
                      lineHeight: '17.6px',
                      letterSpacing: '0%',
                      fontSize: '20px',
                      width: '100% !important',
                      color: 'white !important'
                    }}
                  >
                    Phone Number
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Enter your phone number"
                    id="bootstrap-input3"
                    sx={{
                      // color: 'black !important',
                      '& input::placeholder': {
                        color: 'grey !important',
                        opacity: 1 // important for some browsers to show color
                      }
                    }}
                  />
                </FormControl>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel
                    shrink

                    htmlFor="bootstrap-input4"
                    sx={{
                      // fontFamily: 'Open Sans',
                      fontWeight: 700,
                      lineHeight: '17.6px',
                      letterSpacing: '0%',
                      fontSize: '20px',
                      width: '100% !important',
                      color: 'white !important'
                    }}
                  >
                    Message
                  </InputLabel>
                  <BootstrapInput
                    multiline
                    rows={5}
                    placeholder="Type your message...."
                    id="bootstrap-input4"
                    sx={{
                      // color: 'grey !important',
                      '& textarea::placeholder': {
                        color: 'grey !important',
                        opacity: 1 // important for some browsers to show color
                      }
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid md={12} xs={12}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                mt: 5
              }}>
                <NextLink href="/term">
                  <Button
                    size="large"
                    fullwidth
                    // variant='conatined'
                    sx={{
                      // px: 6,
                      minWidth: '270px',// horizontal padding (left and right)
                      // py: 2,
                      // borderRadius: '30px !important',
                      backgroundColor: '#c165a0',
                      color: 'white',
                      width: '100% !important'
                      // boxShadow: '0px 4px 12px #d8c0ca',
                      // '&:hover': {
                      //   backgroundColor: '#c165a0',
                      //   boxShadow: '0px 6px 16px #d8c0ca'
                      // }
                    }}
                  >
                    Submit
                  </Button>
                </NextLink></Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default Contact;