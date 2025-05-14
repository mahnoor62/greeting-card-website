import Head from 'next/head';
import {
  Card,
  CardContent,
  Container,
  Typography,
  Grid, Box
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const demoUser = {
//   user: 'demo',
//   token: 'demoToken123'
// };

const Page = () => {
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
  return (
    <>
      <Head>
        <title>Homepage | {APP_NAME}</title>
      </Head>
      <LandingNav/>
      <Box sx={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        // bgcolor:'#eee3ea',
        backgroundImage: `url(${WEB_URL}/bg1.png)`,
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
        <Contact/>
      </Box>
      <Footer/>
    </>
  );
};
export default Page;