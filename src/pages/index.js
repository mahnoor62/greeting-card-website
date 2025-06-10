import Head from 'next/head';
import {
  Card,
  CardContent,
  Container,
  Typography,
  Grid, Box, TextField, CircularProgress
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

import { sign } from 'jsonwebtoken';
import Footer from '../components/footer';
import Contact from './contact';
import Clients from '../components/client';
import PopularCards from '../components/popularCards';
import Section2 from '../components/section2';
import AboutUs from '../components/about';
import Section1 from '../components/section1';
import QRCodeGenerator from '../components/qrCode';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useAuth } from '../hooks/use-auth';
import { useMounted } from '../hooks/use-mounted';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;





const Page = () => {

  return (
    <>
      <Head>
        <title>Homepage | {APP_NAME}</title>
      </Head>
      <LandingNav/>
      <Box sx={{
        // overflowX: 'hidden',
        // overflowY: 'hidden',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        // bgcolor:'#eee3ea',
        backgroundImage: {
          xs: `url(${WEB_URL}/portrate.png)`,
          md: `url(${WEB_URL}/bg1.png)`,
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/*<Container sx={{ my: { md: '150px', xs: '100px' } }}>*/}
        {/*</Container>*/}
        <Section1/>
        <Section2/>
        <PopularCards/>
        <AboutUs/>
        <Clients/>
        {/*<div style={{ padding: '20px', background: '#fff' }}>*/}
        {/*  <QRCodeGenerator value={text} size={200} />*/}
        {/*  <p>{text}</p>*/}
        {/*</div>*/}
        <Contact/>
      </Box>
      <Footer/>



    </>
  );
};
export default Page;