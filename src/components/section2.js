import Head from 'next/head';
import {
  Card,
  CardContent,
  Container,
  Typography, Tab, IconButton, Menu,CircularProgress,Pagination,Stack,
  Grid, Box, useMediaQuery, useTheme, Button, MenuItem, Select
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as React from 'react';
import { useEffect, useState , useMemo} from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import NextLink from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const Section2 = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
  const [allCards, setAllCards] = useState([]);
  const [value, setValue] = useState('2');
  const [anchorEls, setAnchorEls] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [cardFilter, setCardFilter]=useState('All');
  const [cardType, setCardType]=useState('All');
  const [cardPrice, setCardPrice]=useState('Low to High');
  const [cardSorted, setCardSorted]=useState('Ascending');



  // const displayedCards = cards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


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
      setCards(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFrontDesignCards();
  }, []);


  const tabData = [
    // { label: 'Filter', value: '1', options: ['All',  'New'] },
    { label: 'Card Type', value: '2', options: ['All','Birthday', 'Wedding', 'Valentines Day', 'Mothers Day', 'Fathers Day', 'Sister Day', 'Anniversary', 'Marry Christmas'] },
    { label: 'Price', value: '3', options: ['Low to High', 'High to Low'] },
    { label: 'Sorted by', value: '4', options: ['Ascending', 'Descending'] }
  ];

  // const filteredAndSortedCards = useMemo(() => {
  //   let result = [...cards];
  //
  //   // Filter by card type
  //   if (cardType !== 'All') {
  //     result = result.filter(card =>
  //       Array.isArray(card.cardType) &&
  //       card.cardType.some(type => type.toLowerCase() === cardType.toLowerCase())
  //     );
  //   }
  //
  //   // Combined sort: First by price, then by createdAt
  //   result.sort((a, b) => {
  //     const priceA = parseFloat(a.price) || 0;
  //     const priceB = parseFloat(b.price) || 0;
  //
  //     // Sort by price
  //     let priceCompare = 0;
  //     if (cardPrice === 'Low to High') {
  //       priceCompare = priceA - priceB;
  //     } else if (cardPrice === 'High to Low') {
  //       priceCompare = priceB - priceA;
  //     }
  //
  //     // If prices are equal OR no price sort selected, sort by date
  //     if (priceCompare === 0 && cardSorted) {
  //       const dateA = new Date(a.createdAt);
  //       const dateB = new Date(b.createdAt);
  //
  //       if (cardSorted === 'Ascending') {
  //         return dateA - dateB;
  //       } else if (cardSorted === 'Descending') {
  //         return dateB - dateA;
  //       }
  //     }
  //
  //     return priceCompare;
  //   });
  //
  //   return result;
  // }, [cards, cardType, cardPrice, cardSorted]);

  const filteredAndSortedCards = useMemo(() => {
    let result = [...cards];


    // Filter by card type
    if (cardType !== 'All') {
      result = result.filter(card =>
        Array.isArray(card.cardType) &&
        card.cardType.some(type => type.toLowerCase() === cardType.toLowerCase())
      );
    }

       // Sort by price and sortedby

      if (cardPrice === 'Low to High') {
        result.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (cardPrice === 'High to Low') {
        result.sort((a, b) => Number(b.price) - Number(a.price));
      } else if (cardPrice === 'Ascending') {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (cardPrice === 'Descending') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }


    // if (cardPrice === 'Low to High') {
    //   console.log("resultin low", result);
    //   console.log("low to high",   result.sort((a, b) => parseInt(a.price) - parseInt(b.price)));
    //   result.sort((a, b) => a.price - b.price);
    // }
    // if (cardPrice === 'High to Low') {
    //   console.log("result in high", result);
    //   console.log("high to low",     result.sort((a, b) => parseInt(b.price) - parseInt(a.price)))
    //   result.sort((a, b) => b.price - a.price)
    // }
    //
    // // // Sort by date
    // if (cardSorted === 'Ascending') {
    //   result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    // } else if (cardSorted === 'Descending') {
    //   result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // }

    return result;
  }, [cards, cardType, cardPrice, cardSorted]);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const totalPages = Math.ceil(filteredAndSortedCards.length / cardsPerPage);

  const displayedCards = useMemo(() => {
    return filteredAndSortedCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
  }, [filteredAndSortedCards, currentPage]);


  const handleCardType = (tabValue, option) => {
    handleClose(tabValue);

    if (tabValue === '2') {
      setCardType(option);
    } else if (tabValue === '3') {
      setCardPrice(option);
    } else if (tabValue === '4') {
      // setCardSorted(option);
      setCardPrice(option);
    }
  };



  // const handleCardType = (val, selectedOption = null) => {
  //   // if (val === '1' && selectedOption) {
  //   //   setCardFilter(selectedOption);
  //   // }
  //   if (val === '2' && selectedOption) {
  //     setCardType(selectedOption);
  //   }
  //   if (val === '3' && selectedOption) {
  //     setCardPrice(selectedOption);
  //     sortCardsByPrice(selectedOption);
  //   }
  //
  //   if (val === '4' && selectedOption) {
  //     setCardSorted(selectedOption);
  //   }
  //   setAnchorEls((prev) => ({ ...prev, [val]: null }));
  // };
  //
  // const sortCardsByPrice = (order) => {
  //   const sorted = [...cards].sort((a, b) => {
  //     if (order === 'Low to High') {
  //       return a.price - b.price;
  //     } else {
  //       return b.price - a.price;
  //     }
  //   });
  //   setCards(sorted);
  // };
  //
  // useEffect(() => {
  //   if (cardPrice) {
  //     sortCardsByPrice(cardPrice);
  //   }
  // }, [cardPrice]);
  //
  //
  // useEffect(() => {
  //   if (cardSorted === 'Descending') {
  //     const sortedCards = [...cards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //     setCards(sortedCards);
  //   } else if (cardSorted === 'Ascending') {
  //     getAllFrontDesignCards();
  //   }
  // }, [cardSorted]);


  return (
    <>
      <Head>
        <title>Homepage | {APP_NAME}</title>
      </Head>
      <Box sx={{
        width: '100%',
        height: { md: '100%', xs: '100%', lg: '100%', xl: '100%' }
        // minHeight: '100vh'
      }}>
        <Container
          data-aos="zoom-in"
          data-aos-duration="600"
          data-aos-easing="ease-in"
          sx={{
            pt: 2, pb: 5,
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
                <TabContext value={value} sx={{ width: '100%', overflow: 'hidden' }}>
                  <Box sx={{
                    bgcolor: 'rgba(232, 207,222, 0.8 )',
                    // bgcolor: '#e8cfde',
                    p: { md: 2, xs: 1 },
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: { md: '600px', xs: '300px' },
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
                            p: { xs: 1 },
                            px: { md: 2 },
                            py: { md: 1 },
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
                            sx={{ color: value === tab.value ? 'white' : 'black', p: 0 }}
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
                            // <MenuItem key={i} onClick={() => handleClose(tab.value)}>
                            <MenuItem key={i} onClick={() => handleCardType(tab.value, option)}>
                            {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Box>
                    ))}
                  </Box>

                  {/*<TabPanel value="1" sx={{ mt: { lg: 5, xs: 0 }, width: '100%', px: 0 }}>*/}
                  {/*  <Grid container*/}
                  {/*        sx={{*/}
                  {/*          width:'100%'*/}
                  {/*        }}*/}
                  {/*    // sx={{ mt: 5, mb: 5, height: '100%', width: '100%' }}*/}
                  {/*  >*/}

                  {/*    {*/}
                  {/*      loading && (*/}
                  {/*        <Box sx={{ display: 'flex' , width:'100%', justifyContent:'center', alignItems:'center'}}>*/}
                  {/*          <CircularProgress />*/}
                  {/*        </Box>*/}
                  {/*      )*/}
                  {/*    }*/}

                  {/*    {!loading && cards && cards.filter((card) => {*/}
                  {/*      if (cardType === 'All') return true;*/}
                  {/*      return String(card.cardType).toLowerCase() === cardType.toLowerCase();*/}
                  {/*    }).length === 0 && (*/}
                  {/*      <Box sx={{ width: '100%', textAlign: 'center', mt: 3 }}>*/}
                  {/*        <Typography variant="body1">Cards not found</Typography>*/}
                  {/*      </Box>*/}
                  {/*    )}*/}

                  {/*    {*/}
                  {/*      displayedCards && displayedCards.map((data, index) => {*/}
                  {/*        return (*/}
                  {/*          <Grid md={3} lg={3} xs={6} key={index} sx={{*/}
                  {/*            p: { md: 1, xs: 1 },*/}
                  {/*            // display: 'flex',*/}
                  {/*            // justifyContent: 'center',*/}
                  {/*            // alignItems: 'center',*/}
                  {/*            width: '100%'*/}
                  {/*          }}>*/}
                  {/*            <NextLink href="/card-editor" passHref legacyBehavior>*/}
                  {/*            <Box*/}
                  {/*              component="img"*/}
                  {/*              src={`${BASE_URL}/${data?.frontDesign}`}*/}
                  {/*              alt={data?.title}*/}
                  {/*              sx={{*/}
                  {/*                width: '100%',*/}
                  {/*                maxWidth: '100%',*/}
                  {/*                height: 'auto',*/}
                  {/*                display: 'block',*/}
                  {/*                mx: 'auto'*/}
                  {/*              }}*/}
                  {/*            />*/}
                  {/*            </NextLink>*/}
                  {/*          </Grid>*/}
                  {/*        );*/}
                  {/*      })*/}
                  {/*    }*/}
                  {/*  </Grid>*/}
                  {/*</TabPanel>*/}
                  {/*<TabPanel value="2" sx={{ mt: 5, mb: 5 , width:'100%'}}>*/}
                  {/*  <Grid container>*/}
                  {/*    {loading && (*/}
                  {/*      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>*/}
                  {/*        <CircularProgress />*/}
                  {/*      </Box>*/}
                  {/*    )}*/}

                  {/*    {!loading && cards && cards.filter((card) => {*/}
                  {/*      if (cardType === 'All') return true;*/}
                  {/*      return String(card.cardType).toLowerCase() === cardType.toLowerCase();*/}
                  {/*    }).length === 0 && (*/}
                  {/*      <Box sx={{ width: '100%', textAlign: 'center', mt: 3 }}>*/}
                  {/*        <Typography variant="body1">Cards not found</Typography>*/}
                  {/*      </Box>*/}
                  {/*    )}*/}

                  {/*    {!loading && displayedCards && displayedCards*/}
                  {/*      .filter((card) => {*/}
                  {/*        if (cardType === 'All') return true;*/}
                  {/*        return String(card.cardType).toLowerCase() === cardType.toLowerCase();*/}
                  {/*      })*/}
                  {/*      .map((data, index) => (*/}
                  {/*        <Grid md={3} lg={3} xs={6} key={index} sx={{ p: { md: 1, xs: 1 }, width: '100%' }}>*/}
                  {/*          <NextLink href="/card-editor" passHref legacyBehavior>*/}
                  {/*            <Box*/}
                  {/*              component="img"*/}
                  {/*              src={`${BASE_URL}/${data?.frontDesign}`}*/}
                  {/*              alt={data?.title}*/}
                  {/*              sx={{*/}
                  {/*                width: '100%',*/}
                  {/*                maxWidth: '100%',*/}
                  {/*                height: 'auto', // ensure consistent height*/}
                  {/*                display: 'block',*/}
                  {/*                mx: 'auto'*/}
                  {/*              }}*/}
                  {/*            />*/}
                  {/*          </NextLink>*/}
                  {/*        </Grid>*/}
                  {/*      ))}*/}
                  {/*  </Grid>*/}
                  {/*</TabPanel>*/}

                  {/*<TabPanel value="3" sx={{ mt: 5, mb: 5 }}>*/}
                  {/*  <Grid container*/}
                  {/*    // sx={{ mt: 5, mb: 5, height: '100%', width: '100%' }}*/}
                  {/*  >*/}

                  {/*    {*/}
                  {/*      loading && (*/}
                  {/*        <Box sx={{ display: 'flex' , width:'100%', justifyContent:'center', alignItems:'center'}}>*/}
                  {/*          <CircularProgress />*/}
                  {/*        </Box>*/}
                  {/*      )*/}
                  {/*    }*/}

                  {/*    {!loading && cards && cards.filter((card) => {*/}
                  {/*      if (cardType === 'All') return true;*/}
                  {/*      return String(card.cardType).toLowerCase() === cardType.toLowerCase();*/}
                  {/*    }).length === 0 && (*/}
                  {/*      <Box sx={{ width: '100%', textAlign: 'center', mt: 3 }}>*/}
                  {/*        <Typography variant="body1">Cards not found</Typography>*/}
                  {/*      </Box>*/}
                  {/*    )}*/}


                  {/*    {*/}
                  {/*      displayedCards && displayedCards.map((data, index) => {*/}
                  {/*        return (*/}
                  {/*          <Grid md={4} lg={3} xs={6} key={index} sx={{*/}
                  {/*            p: { md: 1, xs: 1 },*/}
                  {/*            // display: 'flex',*/}
                  {/*            // justifyContent: 'center',*/}
                  {/*            // alignItems: 'center',*/}
                  {/*            width: '100%'*/}
                  {/*          }}>*/}
                  {/*            <NextLink href="/card-editor" passHref legacyBehavior>*/}
                  {/*              <Box*/}
                  {/*                component="img"*/}
                  {/*                src={`${BASE_URL}/${data?.frontDesign}`}*/}
                  {/*                alt={data?.title}*/}
                  {/*                sx={{*/}
                  {/*                  width: '100%',*/}
                  {/*                  maxWidth: '100%',*/}
                  {/*                  height: 'auto',*/}
                  {/*                  display: 'block',*/}
                  {/*                  mx: 'auto'*/}
                  {/*                }}*/}
                  {/*              />*/}
                  {/*            </NextLink>*/}
                  {/*          </Grid>*/}
                  {/*        );*/}
                  {/*      })*/}
                  {/*    }*/}
                  {/*  </Grid>*/}
                  {/*</TabPanel>*/}
                  {/*<TabPanel value="4" sx={{ mt: 5, mb: 5 }}>*/}
                  {/*  <Grid container*/}
                  {/*    // sx={{ mt: 5, mb: 5, height: '100%', width: '100%' }}*/}
                  {/*  >*/}

                  {/*    {*/}
                  {/*      loading && (*/}
                  {/*        <Box sx={{ display: 'flex' , width:'100%', justifyContent:'center', alignItems:'center'}}>*/}
                  {/*          <CircularProgress />*/}
                  {/*        </Box>*/}
                  {/*      )*/}
                  {/*    }*/}

                  {/*    {!loading && cards && cards.filter((card) => {*/}
                  {/*      if (cardType === 'All') return true;*/}
                  {/*      return String(card.cardType).toLowerCase() === cardType.toLowerCase();*/}
                  {/*    }).length === 0 && (*/}
                  {/*      <Box sx={{ width: '100%', textAlign: 'center', mt: 3 }}>*/}
                  {/*        <Typography variant="body1">Cards not found</Typography>*/}
                  {/*      </Box>*/}
                  {/*    )}*/}

                  {/*    {*/}
                  {/*      displayedCards && displayedCards.map((data, index) => {*/}
                  {/*        return (*/}
                  {/*          <Grid md={4} lg={3} xs={6} key={index} sx={{*/}
                  {/*            p: { md: 1, xs: 1 },*/}
                  {/*            // display: 'flex',*/}
                  {/*            // justifyContent: 'center',*/}
                  {/*            // alignItems: 'center',*/}
                  {/*            width: '100%'*/}
                  {/*          }}>*/}
                  {/*            <NextLink href="/card-editor" passHref legacyBehavior>*/}
                  {/*              <Box*/}
                  {/*                component="img"*/}
                  {/*                src={`${BASE_URL}/${data?.frontDesign}`}*/}
                  {/*                alt={data?.title}*/}
                  {/*                sx={{*/}
                  {/*                  width: '100%',*/}
                  {/*                  maxWidth: '100%',*/}
                  {/*                  height: 'auto',*/}
                  {/*                  display: 'block',*/}
                  {/*                  mx: 'auto'*/}
                  {/*                }}*/}
                  {/*              />*/}
                  {/*            </NextLink>*/}
                  {/*          </Grid>*/}
                  {/*        );*/}
                  {/*      })*/}
                  {/*    }*/}
                  {/*  </Grid>*/}
                  {/*</TabPanel>*/}
                  <Grid container sx={{ mt: 5, mb: 5 }}>
                    {loading ? (
                      <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        {displayedCards.length === 0 ? (
                          <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Typography>No cards found.</Typography>
                          </Box>
                        ) : (
                          displayedCards.map((data, index) => (
                            <Grid md={3} lg={3} xs={6} key={index} sx={{ p: 1 }}>
                              <NextLink href="/card-editor" passHref legacyBehavior>
                                <Box
                                  component="img"
                                  src={`${BASE_URL}/${data?.frontDesign}`}
                                  alt={data?.title}
                                  sx={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                              </NextLink>
                            </Grid>
                          ))
                        )}
                      </>
                    )}
                  </Grid>

                  <Stack spacing={2}>
                    <Pagination
                      hidePrevButton
                                hideNextButton count={totalPages} page={currentPage}
                                onChange={handlePageChange}
                                sx={{
                                  '& .MuiPaginationItem-root': {
                                    color: 'black',
                                    borderRadius: '4px', // Border-radius applies properly
                                    backgroundColor: 'transparent',
                                    // position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {  // Create a fake gradient border
                                      content: '""',
                                      position: 'absolute',
                                      inset: 0,
                                      padding: '2px', // Border width
                                      borderRadius: '#bd669f',
                                      background: '#bd669f',
                                      mask: 'linear-gradient(black 0 0) content-box, linear-gradient(black 0 0)',
                                      maskComposite: 'exclude'
                                    }
                                  },
                                  '& .MuiPaginationItem-root.Mui-selected': {
                                    borderRadius: '4px', // Apply border-radius
                                    background: '#bd669f',
                                    color: 'white',
                                    // fontFamily: 'Open Sans',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    lineHeight: '21.79px',
                                    letterSpacing: '0px'
                                  }
                                }}
                                variant="outlined" shape="rounded"/>
                  </Stack>
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