import Head from 'next/head';
import {
  Card,
  CardContent,
  Container,
  Typography,
  Grid, Box, useTheme, useMediaQuery
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as React from 'react';
import NextLink from 'next/link';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import jwt from 'jsonwebtoken';

import { sign } from 'jsonwebtoken';
import Footer from '../components/footer';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Page = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('mobile'));
  const islargeLaptop = useMediaQuery((theme) => theme.breakpoints.only('largeLaptop'));
  const isIpadScreen = useMediaQuery((theme) => theme.breakpoints.between('ipad', 'ipadPro'));
  // const isIpadScreen = useMediaQuery((theme) => theme.breakpoints.only('ipad'));
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('large'));
  const isLaptopScreen = useMediaQuery((theme) => theme.breakpoints.up('laptop'));
  const isXXlUp = useMediaQuery((theme) => theme.breakpoints.up('xxl'));
  const is4KUp = useMediaQuery((theme) => theme.breakpoints.up('4k'));
  // const isExtraLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('xxl'));
  const isIpadPro = useMediaQuery(theme.breakpoints.only('ipadPro'));  // const largeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const extraLargeScreen = useMediaQuery(theme.breakpoints.up('xxl'));

  // const extraLargeQuery = useMediaQuery(theme.breakpoints.between('xxl', 2048));
  // const ultraLargeQuery = useMediaQuery(theme.breakpoints.up(2049));
  const laptop = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const largeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;


  return (
    <>
      <Head>
        <title>Homepage | {APP_NAME}</title>
      </Head>
      <Box
        sx={{
          overflowX: 'hidden',
          overflowY: 'hidden',
          position: 'relative',
          // bgcolor:'black',
          width: '100%',
          // height:'100%',
          height: { md: '50vh', xs: '40vh' , lg:'100vh', xl:'100vh'},
          // minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          // overflow: 'hidden',
          // px: 2,
        }}
      >
        <Container
          // data-aos="zoom-in"
          // data-aos-duration="600"
          // data-aos-easing="ease-in"
          sx={{ position: 'relative', width: '100%', height: '100%' }}>

          {/*<Box*/}
          {/*  component="img"*/}
          {/*  src={`${WEB_URL}/laptop2.png`}*/}
          {/*  alt="laptop"*/}
          {/*  sx={{*/}
          {/*    width: {md:'100%', xs: '70%', ipadPro: '70%' },*/}

          {/*    // width: { xl: '100%', lg: '70%', xs:'70%' , ipad:'60%', ipadPro:'65%'},*/}
          {/*    // display: 'block',*/}
          {/*    position: 'absolute',*/}
          {/*    // height:'100%',*/}
          {/*    top: '50%',*/}
          {/*    left: '50%',*/}
          {/*    transform: 'translate(-50%, -50%)',*/}
          {/*    zIndex: 9*/}
          {/*  }}*/}
          {/*/>*/}



          {/*<Box*/}
          {/*  sx={{*/}
          {/*    position: 'relative',*/}
          {/*    width: { xl: '80%', lg: '70%', xs: '56%', ipad: '48%', ipadPro: '65%' },*/}
          {/*    // mx: 'auto',*/}
          {/*    top: '50%',*/}
          {/*    left: '50%',*/}
          {/*    transform: 'translate(-50%, -50%)'*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Box*/}
          {/*    component="iframe"*/}
          {/*    src="https://www.youtube.com/embed/w0HuAGCryIw?autoplay=1&mute=1&loop=1&playlist=w0HuAGCryIw"*/}
          {/*    title="YouTube video player"*/}
          {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
          {/*    allowFullScreen*/}
          {/*    sx={{*/}
          {/*      position: 'absolute',*/}
          {/*      top: '50%',*/}
          {/*      left: '50%',*/}
          {/*      transform: 'translate(-50%, -50%)',*/}
          {/*      width: '100%',*/}
          {/*      height: '100%',*/}
          {/*      border: 'none',*/}
          {/*      zIndex: 10,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</Box>*/}

          {/*<iframe width="70%" height="450"*/}
          {/*        src="https://www.youtube.com/embed/w0HuAGCryIw?si=DgIa1dWVbF5FpX8y"*/}
          {/*        title="YouTube video player" frameBorder="0"*/}
          {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
          {/*        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>*/}


          {
          (isMobile || isLaptopScreen) &&  !isXXlUp &&   (
              <>
                <Box
                  component="img"
                  src={`${WEB_URL}/laptop2.png`}
                  alt="laptop"
                  sx={{
                    width: {md:'100%', xs: '70%', ipadPro: '70%' },

                    // width: { xl: '100%', lg: '70%', xs:'70%' , ipad:'60%', ipadPro:'65%'},
                    // display: 'block',
                    position: 'absolute',
                    // height:'100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/butterfly.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    right: {md: '-22%', lg:'-33%' , xs:'-20%'},
                    top: {md: '25%',lg:'20%',  xs:'25%' },
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: { md: '50%', xs: '45%' },
                    // width: { md: '45%', xs: '30%' },
                    zIndex: 11,
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/hearts.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    left: '22%',
                    top: {md: '25%',xs:'28%' },
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    // width: { md: '28%', xs: '30%' },
                    width: { md: '33%',lg:'35%',  xs: '40%' },
                    zIndex: 11,
                  }}
                />
                <Box
                  component="iframe"
                  src="https://www.youtube.com/embed/w0HuAGCryIw?si=DgIa1dWVbF5FpX8y"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  sx={{
                    position: 'absolute',
                    borderRadius: '10px',
                    left: '50%',
                    top: { md: '49%',
                      // xl: '49.5%',
                      xs: '50%' },
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: {
                      // xl: '70%',
                      lg: '55%', xs: '55%'
                      // , ipad: '55%', ipadPro: '55%'
                    },
                    // height: { xs: '130px', sm: '400px', md: '571px', xl: '570px'
                    height: {
                      xs: '130px', sm: '400px', lg: '440px'
                      // , xl: '570px'
                      // , ipad:'270px', ipadPro:'360px'
                    }, // ✅ custom heights
                    zIndex: 10,
                    border: 'none'
                  }}
                />
                {/*md: '575px',*/}


                {/*<Box*/}
                {/*  component="video"*/}
                {/*  src={`${WEB_URL}/laptopVideo.mp4`}*/}
                {/*  autoPlay*/}
                {/*  muted*/}
                {/*  loop*/}
                {/*  sx={{*/}
                {/*    position: 'absolute',*/}
                {/*    left:  '50%',*/}
                {/*    top:  '50%',*/}
                {/*    // height:'550px',*/}
                {/*    transform: 'translate(-50%, -50%)',*/}
                {/*    // width:'72.5%',*/}

                {/*    width: { xl: '80%', lg: '70%', xs:'56%' , ipad:'48%', ipadPro:'65%'},*/}
                {/*    // width: { md: '56%', xs: '56%', ipad:'56%' , xl:'100%'},*/}
                {/*    // width: '56%',*/}
                {/*    // height:'100%',*/}
                {/*    zIndex: 10,*/}
                {/*    // borderRadius: '20px',*/}
                {/*    // boxShadow: 3,*/}
                {/*  }} */}
                {/* /> /

                 {/* Bottom Right - Mac */}
                <Box
                  component="img"
                  src={`${WEB_URL}/mack.png`}
                  alt="mac side"
                  sx={{
                    position: 'absolute',
                    bottom: {
                      md: '38%', lg: '42%'
                      // , xl: '49%'
                      , xs: '42%',   laptop: '48%'
                      // , ipadPro:'47%'
                    },
                    right: {
                      md: '-10%', lg: '-10%',
                      // , xl: '-16%',
                      xs: '4%'  ,  laptop: '-1.5%'
                      // , ipadPro:'4.5%'

                    },
                    width: {
                      md: '27%',
                      // , xl: '35%',
                      xs: '20%'
                      // , ipadPro:'20%'
                      // , ipad:'23%', ipadPro:'25%', surfacePro:'22%'
                    },
                    transform: 'translateY(100%)',
                    zIndex: 5
                  }}
                />

                <Box
                  component="img"
                  src={`${WEB_URL}/mobile.png`}
                  alt="mobile side"
                  sx={{
                    display:isLargeScreen ? 'none':'block',
                    position: 'absolute',
                    bottom: {
                      xs: '22%',
                      md: '2%',
                      lg: '14%',
                      // ipadPro:'34%',
                      // ipad:'33%',
                      // isIpadScreen:'100%',
                      laptop: '13%', // 👈 for normal laptops
                      large: '13%',
                      // xl: '33%'
                    },
                    right: {
                      xs: '3%',
                      md: '-10%',
                      lg: '-10%',
                      // ipad:'3%',
                      // ipadPro:'3%',
                      laptop: '-1%', // 👈 for normal laptops
                      large: '-11%',
                      // xl: '-18%'
                    },
                    width: {
                      xs: '15%',
                      md: '15%',
                      lg: '15%',
                      // ipadPro:'15%',
                      laptop: '16%', // 👈 a bit bigger for laptops
                      // xl: '25%'
                    },
                    transform: 'translateY(10%)',
                    zIndex: 5
                  }}
                />

                <Box
                  component="img"
                  src={`${WEB_URL}/card.png`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    bottom: { md: '40%', xl: '50%', xs: '43%', ipadPro: '50%' },
                    left: {
                      md: '-9%', xl: '-18%', xs: '4%', ipadPro: '0.1%'
                      // , ipad:'5%', ipadPro:'1%' , surfacePro:'6%'
                    },
                    width: {
                      md: '25%', xs: '21%'
                      // , xl: '37%'
                      , ipadPro: '25%'
                      // , ipad:'24%', ipadPro:'26%' , surfacePro:'23%'
                    },
                    transform: 'translateY(86%)',
                    zIndex: 4
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/cardBaloons.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    bottom: {xs: '45%', md:'52%' },
                    left: {md: '-1%', xs:'3%' },
                    // width: '18%',
                    width: {xs: '20%', md:'22%' },
                    transform: 'translateY(86%)',
                    zIndex: 4
                  }}
                />
                {/*<img*/}
                {/*  src={`${WEB_URL}/single.gif`}*/}
                {/*  alt="animated balloons"*/}
                {/*  // component="img"*/}
                {/*  // src={`${WEB_URL}/cardBaloons.png`}*/}
                {/*  // alt="card"*/}
                {/*  style={{*/}
                {/*    position: 'absolute',*/}
                {/*    bottom: '65%',*/}
                {/*    left: '10%',*/}
                {/*    // width: 'auto',*/}
                {/*    transform: 'translateY(86%)',*/}
                {/*    zIndex: 4*/}
                {/*  }}*/}
                {/*/>*/}


              </>
            )
          }



          {
            isLargeScreen &&  !isXXlUp  && (

              <Box
                component="img"
                src={`${WEB_URL}/mobile.png`}
                alt="mobile side"
                sx={{
                  position: 'absolute',
                  // bottom: islargeLaptop? '23%': '20%' ,
                  bottom: '20%' ,
                  right: '-2%',
                  width: '17%',
                  transform: 'translateY(10%)',
                  zIndex: 5
                }}
              />
            )
          }


          {/*{*/}
          {/* islargeLaptop && (*/}

          {/*    <Box*/}
          {/*      component="img"*/}
          {/*      src={`${WEB_URL}/mobile.png`}*/}
          {/*      alt="mobile side"*/}
          {/*      sx={{*/}
          {/*        position: 'absolute',*/}
          {/*        bottom: '20%',*/}
          {/*        right: '-1%',*/}
          {/*        width: '17%',*/}
          {/*        transform: 'translateY(10%)',*/}
          {/*        zIndex: 5*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  )*/}
          {/*}*/}

          {
          isIpadScreen && (<>

                <Box
                  component="img"
                  src={`${WEB_URL}/laptop2.png`}
                  alt="laptop"
                  sx={{
                    width: {md:'100%', xs: '70%', ipadPro: '70%' },

                    // width: { xl: '100%', lg: '70%', xs:'70%' , ipad:'60%', ipadPro:'65%'},
                    // display: 'block',
                    position: 'absolute',
                    // height:'100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9
                  }}
                />
              <Box
                component="iframe"
                src="https://www.youtube.com/embed/w0HuAGCryIw?si=DgIa1dWVbF5FpX8y"
                allow="autoplay; encrypted-media"
                allowFullScreen
                sx={{
                  position: 'absolute',
                  borderRadius: '10px',
                  left: '50%',
                  top: '49%',
                  transform: 'translate(-50%, -50%)',
                  // width: { xl: '70%', lg: '71%', xs: '55%'
                  width: {
                    ipad: '55%'
                  },
                  // height: { xs: '130px', sm: '400px', md: '571px', xl: '570px'
                  height: {
                    ipad: '270px'
                  },
                  zIndex: 10,
                  border: 'none'
                }}
              />

                <Box
                  component="img"
                  src={`${WEB_URL}/butterfly.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    right: '-25%',
                    top: '30%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '50%',
                    zIndex: 11,
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/hearts.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    left: '25%',
                    top: '35%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '40%',
                    zIndex: 11,
                  }}
                />
              <Box
                component="img"
                src={`${WEB_URL}/mack.png`}
                alt="mac side"
                sx={{
                  position: 'absolute',
                  bottom: '43%',
                  right: '4%',
                  width: '20%',
                  transform: 'translateY(100%)',
                  zIndex: 5
                }}
              />
              <Box
                component="img"
                src={`${WEB_URL}/mobile.png`}
                alt="mobile side"
                sx={{
                  position: 'absolute',
                  bottom: '16%',
                  right: '3%',
                  width: '15%',
                  transform: 'translateY(10%)',
                  zIndex: 5
                }}
              />
              <Box
                component="img"
                src={`${WEB_URL}/card.png`}
                alt="card"
                sx={{
                  position: 'absolute',
                  bottom: '44%',
                  left: '4%',
                  width: '20%',
                  transform: 'translateY(86%)',
                  zIndex: 4
                }}
              />
                <Box
                  component="img"
                  src={`${WEB_URL}/cardBaloons.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    bottom: '47%',
                    left: '3%',
                    width: '18%',
                    transform: 'translateY(86%)',
                    zIndex: 4
                  }}
                />

            </>
          )
        }
          {
            isIpadPro && (<>
                <Box
                  component="img"
                  src={`${WEB_URL}/laptop2.png`}
                  alt="laptop"
                  sx={{
                    width: {md:'100%', xs: '70%', ipadPro: '70%' },

                    // width: { xl: '100%', lg: '70%', xs:'70%' , ipad:'60%', ipadPro:'65%'},
                    // display: 'block',
                    position: 'absolute',
                    // height:'100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9
                  }}
                />
                <Box
                  component="iframe"
                  src="https://www.youtube.com/embed/w0HuAGCryIw?si=DgIa1dWVbF5FpX8y"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  sx={{
                    position: 'absolute',
                    borderRadius: '10px',
                    left: '50%',
                    top: '49%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '55%',
                    // height: { xs: '130px', sm: '400px', md: '571px', xl: '570px'
                    height: '300px',
                    zIndex: 10,
                    border: 'none'
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/butterfly.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    right: '-23%',
                    top: '30%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '50%',
                    zIndex: 11,
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/hearts.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    left: '25%',
                    top: '30%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '35%',
                    zIndex: 11,
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/mack.png`}
                  alt="mac side"
                  sx={{
                    position: 'absolute',
                    bottom: '42%',
                    right: '4%',
                    width: '20%',
                    transform: 'translateY(100%)',
                    zIndex: 5
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/mobile.png`}
                  alt="mobile side"
                  sx={{
                    position: 'absolute',
                    bottom: '18%',
                    right: '3%',
                    width: '14%',
                    transform: 'translateY(10%)',
                    zIndex: 5
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/card.png`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    bottom: '43%',
                    left: '4%',
                    width: '20%',
                    transform: 'translateY(86%)',
                    zIndex: 4
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/cardBaloons.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    bottom: '47%',
                    left: '3%',
                    width: '19%',
                    transform: 'translateY(86%)',
                    zIndex: 4
                  }}
                />

              </>
            )
          }


          {
          isXXlUp &&   !is4KUp &&  (
              <>
                <Box
                  component="img"
                  src={`${WEB_URL}/laptop2.png`}
                  alt="laptop"
                  sx={{
                    // width: {md:'100%', xs: '70%', ipadPro: '70%' },

                    // width: { xl: '100%', lg: '70%', xs:'70%' , ipad:'60%', ipadPro:'65%'},
                    // display: 'block',
                    position: 'absolute',
                    // height:'100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9
                  }}
                />
                <Box
                  component="iframe"
                  src="https://www.youtube.com/embed/w0HuAGCryIw?si=DgIa1dWVbF5FpX8y"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  sx={{
                    position: 'absolute',
                    borderRadius: '10px',
                    left: '50%',
                    top: '49.5%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '75%',
                    // height: { xs: '130px', sm: '400px', md: '571px', xl: '570px'
                    height: '550px', // ✅ custom heights
                    zIndex: 10,
                    border: 'none'
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/butterfly.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    right: '-70%',
                    top: '22%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '80%',
                    zIndex: 11,
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/hearts.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    left: '20%',
                    top: '25%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '55%',
                    zIndex: 11,
                  }}
                />
                 {/* Bottom Right - Mac */}
                <Box
                  component="img"
                  src={`${WEB_URL}/mack.png`}
                  alt="mac side"
                  sx={{
                    position: 'absolute',
                    bottom: '45%',
                    right: '-14%',
                    width: '30%',
                    transform: 'translateY(100%)',
                    zIndex: 5
                  }}
                />

                <Box
                  component="img"
                  src={`${WEB_URL}/mobile.png`}
                  alt="mobile side"
                  sx={{
                    position: 'absolute',
                    bottom: '33%',
                    right: '-13%',
                    width: '16%',
                    transform: 'translateY(90%)',
                    // transform: 'translateY(10%)',
                    zIndex: 5
                  }}
                />

                <Box
                  component="img"
                  src={`${WEB_URL}/card.png`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    bottom: '48%',
                    left: '-14%',
                    width: '30%',
                    transform: 'translateY(86%)',
                    zIndex: 4
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/cardBaloons.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    bottom: '50%',
                    left: '-16%',
                    width: '30%',
                    transform: 'translateY(86%)',
                    zIndex: 4
                  }}
                />

              </>
            )
          }


          {
            is4KUp &&  (
              <>
                <Box
                  component="img"
                  src={`${WEB_URL}/laptop2.png`}
                  alt="laptop"
                  sx={{
                    // width: {md:'100%', xs: '70%', ipadPro: '70%' },

                    // width: { xl: '100%', lg: '70%', xs:'70%' , ipad:'60%', ipadPro:'65%'},
                    // display: 'block',
                    position: 'absolute',
                    // height:'100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9
                  }}
                />
                <Box
                  component="iframe"
                  src="https://www.youtube.com/embed/w0HuAGCryIw?si=DgIa1dWVbF5FpX8y"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  sx={{
                    position: 'absolute',
                    borderRadius: '10px',
                    left: '50%',
                    top: '49.5%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '75%',
                    // height: { xs: '130px', sm: '400px', md: '571px', xl: '570px'
                    height: '550px', // ✅ custom heights
                    zIndex: 10,
                    border: 'none'
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/butterfly.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    right: '-100%',
                    top: '30%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '100%',
                    zIndex: 11,
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/hearts.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    left: '15%',
                    top: '30%',
                    transform: 'translate(-50%, -50%)',
                    // width: { xl: '70%', lg: '71%', xs: '55%'
                    width: '90%',
                    zIndex: 11,
                  }}
                />
                {/* Bottom Right - Mac */}
                <Box
                  component="img"
                  src={`${WEB_URL}/mack.png`}
                  alt="mac side"
                  sx={{
                    position: 'absolute',
                    bottom: '46%',
                    right: '-14%',
                    width: '30%',
                    transform: 'translateY(100%)',
                    zIndex: 5
                  }}
                />

                <Box
                  component="img"
                  src={`${WEB_URL}/mobile.png`}
                  alt="mobile side"
                  sx={{
                    position: 'absolute',
                    bottom: '33%',
                    right: '-14%',
                    width: '18%',
                    // transform: 'translateY(90%)',
                    transform: 'translateY(10%)',
                    zIndex: 5
                  }}
                />

                <Box
                  component="img"
                  src={`${WEB_URL}/card.png`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    bottom: '52%',
                    left: '-22%',
                    width: '40%',
                    transform: 'translateY(86%)',
                    zIndex: 4
                  }}
                />
                <Box
                  component="img"
                  src={`${WEB_URL}/cardBaloons.gif`}
                  alt="card"
                  sx={{
                    position: 'absolute',
                    bottom: '55%',
                    left: '-25%',
                    width: '40%',
                    transform: 'translateY(86%)',
                    zIndex: 4
                  }}
                />

              </>
            )
          }

        </Container>
      </Box>

    </>
  )
    ;
};
export default Page;

