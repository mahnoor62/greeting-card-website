import Head from 'next/head';
import {
  Card,
  CardContent,
  Container,
  Typography, Tab, IconButton, Menu,CircularProgress,
  Grid, Box, useMediaQuery, useTheme, Button, MenuItem, Select
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import LandingNav from './landingLayout';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Editor = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  const [value, setValue] = useState('1');
  const [anchorEls, setAnchorEls] = useState({});
  const [frontCards, setFrontCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const tabData = [
    { label: 'Filter', value: '1', options: ['All', 'Popular', 'New'] },
    { label: 'Card Type', value: '2', options: ['Birthday', 'Wedding', 'Holiday'] },
    { label: 'Price', value: '3', options: ['Low to High', 'High to Low'] },
    { label: 'Sorted by', value: '4', options: ['Recent', 'Top Rated'] }
  ];

  const handleTabClick = (val) => {
    setValue(val);
  };

  const handleDropdownClick = (event, val) => {
    setAnchorEls((prev) => ({ ...prev, [val]: event.currentTarget }));
  };

  const handleClose = (val) => {
    setAnchorEls((prev) => ({ ...prev, [val]: null }));
  };
  const getAllFrontDesignCards = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/cards/get-all-front-design`);
      setFrontCards(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFrontDesignCards();
  }, []);

  return (
    <>
      <Head>
        <title>Homepage | {APP_NAME}</title>
      </Head>

      <Box sx={{
        overflowX: 'hidden',
        overflowY: 'hidden',
        width: '100%',
        height: { md: '100%', xs: '100%', lg: '100%', xl: '100%' }
        // minHeight: '100vh'
      }}>
        <LandingNav/>
        <Container
          data-aos="zoom-in"
          data-aos-duration="600"
          data-aos-easing="ease-in"
          sx={{
            pt: 5, pb: 5,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: 'column', height: '100%'
          }}
        >
          <Button size="large" sx={{
            mb: { md: 10, xs: 3 },
            px: { lg: 6 },
            py: { md: 2, xs: 1 },
            borderRadius: '30px !important',
            minWidth: { md: '250px', xs: '200px' },
            fontSize: { md: '2rem', xs: '15px' },
            // backgroundColor: '#ffecc8',
            backgroundColor: '#1a1d25 !important',
            color: '#c09b9b',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              backgroundColor: '#1a1d25 !important',
              color: '#c09b9b'
            }
          }}>
           Editor
          </Button>

        </Container>
      </Box>

    </>
  );
};
export default Editor;