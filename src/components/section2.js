import Head from 'next/head';
import {
  Card,
  CardContent,
  Container,
  Typography, Tab, IconButton, Menu,
  Grid, Box, useMediaQuery, useTheme, Button, MenuItem, Select
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as React from 'react';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Section2 = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  const [value, setValue] = useState('1');
  const [anchorEls, setAnchorEls] = useState({});

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

  const card = [
    {
      url: `${WEB_URL}/card1.png`,
      alt: 'card-1'
    },
    {
      url: `${WEB_URL}/card2.png`,
      alt: 'card-2'
    },
    {
      url: `${WEB_URL}/card3.png`,
      alt: 'card-3'
    },
    {
      url: `${WEB_URL}/card4.png`,
      alt: 'card-4'
    },
    {
      url: `${WEB_URL}/card5.png`,
      alt: 'card-5'
    },
    {
      url: `${WEB_URL}/card6.png`,
      alt: 'card-6'
    },
    {
      url: `${WEB_URL}/card7.png`,
      alt: 'card-7'
    },
    {
      url: `${WEB_URL}/card8.png`,
      alt: 'card-8'
    }
  ];

  return (
    <>
      <Head>
        <title>Homepage | {APP_NAME}</title>
      </Head>
      <Box sx={{
        overflowX: 'hidden',
        width: '100%',
        height: { md: '100%', xs: '100%', lg: '100%', xl: '100%' },
        // minHeight: '100vh'
      }}>
        <Container
          data-aos="zoom-out"
          data-aos-duration="600"
          data-aos-easing="ease-in"
          sx={{
            pt: 5, pb: 5,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: 'column', height: '100%'
          }}
        >
          <Button size="large" sx={{
            mb: {md: 10, xs:5 },
            px: { lg: 6 },
            py: 2,
            borderRadius: '30px !important',
            minWidth: '250px',
            fontSize: { md: '2rem', xs: '20px' },
            // backgroundColor: '#ffecc8',
            backgroundColor: '#1a1d25 !important',
            color: '#c09b9b',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              backgroundColor: '#1a1d25 !important',
              color: '#c09b9b'
            }
          }}>
            Design Your Own Card
          </Button>

          <Grid container>
            <Grid md={12} xs={12}>
              <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <TabContext value={value} sx={{ width: '100%', overflow:'hidden' }}>
                  <Box sx={{
                    bgcolor: 'rgba(232, 207,222, 0.8 )',
                    // bgcolor: '#e8cfde',
                    p: { md: 2, xs: 1 },
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: {md: '800px', xs:'450px' },
                    display: 'flex',
                    flexDirection: { md: 'row', xs: 'row' },
                    justifyContent: { md: 'space-around', xs: 'center' },
                    gap: 1
                  }}>
                    {tabData.map((tab) => (
                      <Box key={tab.value} sx={{ position: 'relative' }}>
                        <Box
                          onClick={() => handleTabClick(tab.value)}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            height: '100%',
                            alignItems: 'center',
                            gap: 0,
                            p: { xs: 0.5},
                            px: { md: 2},
                            py: { md: 1},
                            borderRadius: '12px',
                            fontWeight: 900,
                            // fontSize: '16px',
                            cursor: 'pointer',
                            // bgcolor:'red',
                            // bgcolor: value === tab.value ? 'rgba(232, 207,222, 0.8 )' : 'transparent',
                            bgcolor: value === tab.value ? '#c165a0' : 'transparent',
                            // bgcolor: value === tab.value ? '#c570a6' : 'transparent',
                            color: value === tab.value ? 'white' : 'black'
                            // p:value === tab.value ? 2:1
                          }}
                        >
                          <Typography sx={{
                            fontSize: { md: '22px', xs: '12px' },
                            fontWeight: 900
                          }}>{tab.label}</Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent switching tab
                              handleDropdownClick(e, tab.value);
                            }}
                            sx={{ color: value === tab.value ? 'white' : 'black', p: 0}}
                          >
                            <ArrowDropDownIcon/>
                          </IconButton>
                        </Box>
                        <Menu
                          anchorEl={anchorEls[tab.value]}
                          open={Boolean(anchorEls[tab.value])}
                          onClose={() => handleClose(tab.value)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                          }}

                        >
                          {tab.options.map((option, i) => (
                            <MenuItem key={i} onClick={() => handleClose(tab.value)}>
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Box>
                    ))}
                  </Box>

                  <TabPanel value="1" sx={{ width: '100%' }}>
                    <Grid container
                          sx={{ mt: 5, mb: 5, height: '100%', width: '100%' }}>
                      {
                        card && card.map((image, index) => {
                          return (
                            <Grid md={4} lg={3} xs={4} key={index} sx={{
                              p: { md: 1, xs: 0 },
                              // display: 'flex',
                              // justifyContent: 'center',
                              // alignItems: 'center',
                              width: '100%'
                            }}>
                              <Box
                                component="img"
                                src={image.url}
                                alt={image.alt}
                                sx={{
                                  width: '100%',
                                  maxWidth: '100%',
                                  height: 'auto',
                                  display: 'block',
                                  mx: 'auto'
                                }}
                              />
                            </Grid>
                          );
                        })
                      }
                    </Grid>
                    {/*<Grid container  sx={{ mt: 5,mb:5, height:'100%', width:'100%', pl:'0 !important' }}>*/}
                    {/*  {*/}
                    {/*    card && card.map((image, index) => {*/}
                    {/*      return (*/}
                    {/*        <Grid md={6} lg={3} xs={4} key={index} sx={{p: {md: 2, xs:0 }, display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>*/}
                    {/*          <Box*/}
                    {/*            component="img"*/}
                    {/*            src={image.url}*/}
                    {/*            alt={image.alt}*/}
                    {/*            sx={{*/}
                    {/*              width: {*/}
                    {/*                xs: '80%',*/}
                    {/*                md: '70%',*/}
                    {/*                // lg: '100%',*/}
                    {/*                lg:'100%',*/}
                    {/*                xl:'100%'*/}
                    {/*              },*/}
                    {/*              maxWidth: '100%',*/}
                    {/*              height: 'auto',*/}
                    {/*              display: 'block',*/}
                    {/*              mx: 'auto'*/}
                    {/*            }}*/}
                    {/*          />*/}
                    {/*        </Grid>*/}
                    {/*      );*/}
                    {/*    })*/}
                    {/*  }*/}
                    {/*</Grid>*/}
                  </TabPanel>
                  <TabPanel value="2" sx={{ mt: 5, mb: 5 }}>Card Type content goes here</TabPanel>
                  <TabPanel value="3" sx={{ mt: 5, mb: 5 }}>Price content goes here</TabPanel>
                  <TabPanel value="4" sx={{ mt: 5, mb: 5 }}>Sorted By content goes here</TabPanel>
                </TabContext>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </>
  );
};
export default Section2;