import Head from 'next/head';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Link as MuiLink, Card
} from '@mui/material';
import NextLink from 'next/link';

const AboutUs = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('mobile'));
  // const isIpadScreen = useMediaQuery((theme) => theme.breakpoints.up('ipad'));
  const isIpadScreen = useMediaQuery((theme) =>  theme.breakpoints.between('ipad', 'ipadPro'));
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('large'));
  const isLaptopScreen = useMediaQuery((theme) => theme.breakpoints.up('laptop'));
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
        <title>About Us | {APP_NAME}</title>
      </Head>
      <Box

        sx={{
          overflowX: 'hidden',
          overflowY: 'hidden',
          position: 'relative',
          width: '100%',
          height: {md: '100%', xs:'100%' },
          // height: 700,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 10, mb: 10
        }}
      >


        {
          (isMobile || isLaptopScreen) && (

            <Card
              sx={{ml:2, mr:2,
                // width: 500,
                // width: 600,
                width: 800,
                // height:'100%',
                height: {md: 800, xs:900 },
                borderRadius: {md: 15, xs:7 },
                position: 'relative',
                zIndex: 2,
                overflow: 'visible',
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
                px: {md:10, xs:1}
                // px: 5
              }}
            >
              <Box

                data-aos="zoom-in"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                sx={{ mt: 3 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  align="center"
                  mb={1}
                >
                  About Us
                </Typography>
                <Typography gutterBottom variant="body1" sx={{
                  textAlign: 'center',
                  color:'grey'
                }}>
                  About Us Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip.
                </Typography>
              </Box>
              {/* Text Half-Outside on Left */}
              <Box
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                sx={{
                  position: 'absolute',
                  left: {md: - 70, xs:'10%'
                  },
                  top: {md: '30.2%', xs:'52%' },
                  // top: {md: '30.2%', xs:'60%' },
                  width: {md: 400, xs:'80%' },
                  backgroundColor: '#fff',
                  p: 3,
                  boxShadow: 3,
                  zIndex: 3
                }}
              >
                <Typography variant="body1" sx={{  fontWeight:900,  fontSize: {md: '23px' }}}>
                  At{' '}
                  <MuiLink component={NextLink} href="#" underline="hover" color="primary">
                    Greeting Cards
                  </MuiLink>
                  , we believe in the power of heartfelt connections. Our mission is to bring joy, love,
                  and warmth through beautifully crafted greeting cards for every occasion.
                  Whether you&apos;re celebrating a birthday, anniversary, or simply want to say &quot;thank
                  you&quot;, our designs speak from the heart. Each card is thoughtfully created with
                  unique artwork and meaningful messages. We value creativity, quality, and personal touch.
                </Typography>
              </Box>

              {/* Baby Image Half-Outside on Right */}
              <Box
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                component="img"
                src={`${WEB_URL}/babe.png`}
                alt="baby image"
                sx={{
                  position: 'absolute',
                  right: {md: - 100, xs:20
                  },
                  top: {md: '23%', xs:'23%' },
                  width: {
                    md:'75%',
                    xs:'90%'
                  },
                  zIndex: 2
                }}
              />

              {/* Balloon Overlays */}
              <Box
                data-aos="zoom-in-up"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                component="img"
                src={`${WEB_URL}/tlb.gif`}
                alt="top left balloon"
                sx={{ position: 'absolute', bottom: {md: 0, xs:'20%' }, left: {md: '78%', xs:'50%' }, width: {md: '50%', xs:'70%' }, zIndex: 4 }}
              />
              <Box
                data-aos="zoom-in-down"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                component="img"
                src={`${WEB_URL}/trb.gif`}
                alt="top right balloon"
                sx={{ position: 'absolute', top: {md: '25%', xs:'25%' }, right: {md: - 150, xs:-30 }, width: {md: '30%', xs:'50%' }, zIndex: 4 }}
              />
              <Box
                data-aos="zoom-in-up"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                component="img"
                src={`${WEB_URL}/blb.gif`}
                alt="bottom left balloon"
                sx={{ position: 'absolute', bottom: {md: '2%', xs:'20%'}, left: {md: '20%', xs:'-20%' }, width: {md: '50%' , xs:'70%'}, zIndex: 4 }}
              />
              <Box
                data-aos="zoom-in-down"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                component="img"
                src={`${WEB_URL}/brb.gif`}
                alt="bottom right balloon"
                sx={{ position: 'absolute', top: {md:'15%', xs:'25%'}, right: {md:'27%', xs:'63%'}, width: {md: '50%' , xs:'50%'}, zIndex: 4 }}
              />
            </Card>



              )
        }

        {
            isIpadScreen && (

            <Card
              sx={{ml:2, mr:2,
                width: 500,
                // height:'100%',
                height: 600,
                borderRadius: {md: 15, xs:7 },
                position: 'relative',
                zIndex: 2,
                overflow: 'visible',
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
                px: 3
                // px: 5
              }}
            >
              <Box
                data-aos="zoom-in"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                sx={{ mt: 3 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  align="center"
                  mb={1}
                >
                  About Us
                </Typography>
                <Typography gutterBottom variant="body1" sx={{
                  textAlign: 'center',
                  color:'grey'
                }}>
                  About Us Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </Box>
              {/* Text Half-Outside on Left */}
              <Box
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                sx={{
                  position: 'absolute',
                  left: '-15%',
                  top: '37%',
                  // top: {md: '30.2%', xs:'60%' },
                  width: 330,
                  backgroundColor: '#fff',
                  p: 3,
                  boxShadow: 3,
                  zIndex: 3
                }}
              >
                <Typography variant="body1" sx={{  fontWeight:900,  fontSize: {md: '20px' }}}>
                  At{' '}
                  <MuiLink component={NextLink} href="#" underline="hover" color="primary">
                    Greeting Cards
                  </MuiLink>
                  , we believe in the power of heartfelt connections. Our mission is to bring joy, love,
                  and warmth through beautifully crafted greeting cards for every occasion.
                  Whether you&apos;re celebrating a birthday, anniversary, or simply want to say &quot;thank
                  you&quot;, our designs speak from the heart. Each card is thoughtfully created with
                  unique artwork and meaningful messages. We value creativity, quality, and personal touch.
                </Typography>
              </Box>

              {/* Baby Image Half-Outside on Right */}
              <Box
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                component="img"
                src={`${WEB_URL}/babe.png`}
                alt="baby image"
                sx={{
                  position: 'absolute',
                  right: '-15%',
                  top: '35%',
                  width: '70%',
                  zIndex: 2
                }}
              />

              {/* Balloon Overlays */}
              <Box
                component="img"
                src={`${WEB_URL}/tlb.gif`}
                alt="top left balloon"
                sx={{ position: 'absolute', bottom: '8%', left: '87%', width: '40%', zIndex: 4 }}
              />
              <Box
                component="img"
                src={`${WEB_URL}/trb.gif`}
                alt="top right balloon"
                sx={{ position: 'absolute', top: '30%', right: '-30%', width: '40%', zIndex: 4 }}
              />
              <Box
                component="img"
                src={`${WEB_URL}/blb.gif`}
                alt="bottom left balloon"
                sx={{ position: 'absolute', bottom: '10%', left: '35%', width:'40%', zIndex: 4 }}
              />
              <Box
                component="img"
                src={`${WEB_URL}/brb.gif`}
                alt="bottom right balloon"
                sx={{ position: 'absolute', top: '28%', right: '18%', width: '50%', zIndex: 4 }}
              />
            </Card>



          )
        }

        {
          isIpadPro && (

            <Card
              sx={{ml:2, mr:2,
                // width: 500,
                // width: 600,
                width: 800,
                // height:'100%',
                height: {md: 800, xs:900 },
                borderRadius: {md: 15, xs:7 },
                position: 'relative',
                zIndex: 2,
                overflow: 'visible',
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
                px: {md:10, xs:1}
                // px: 5
              }}
            >
              <Box

                data-aos="zoom-in"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                sx={{ mt: 3 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  align="center"
                  mb={1}
                >
                  About Us
                </Typography>
                <Typography gutterBottom variant="body1" sx={{
                  textAlign: 'center',
                  color:'grey'
                }}>
                  About Us Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </Box>
              {/* Text Half-Outside on Left */}
              <Box
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                sx={{
                  position: 'absolute',
                  left: {md: - 70, xs:'10%'
                  },
                  top: '26%',
                  // top: {md: '30.2%', xs:'60%' },
                  width: {md: 400, xs:'80%' },
                  backgroundColor: '#fff',
                  p: 3,
                  boxShadow: 3,
                  zIndex: 3
                }}
              >
                <Typography variant="body1" sx={{  fontWeight:900,  fontSize: {md: '23px' }}}>
                  At{' '}
                  <MuiLink component={NextLink} href="#" underline="hover" color="primary">
                    Greeting Cards
                  </MuiLink>
                  , we believe in the power of heartfelt connections. Our mission is to bring joy, love,
                  and warmth through beautifully crafted greeting cards for every occasion.
                  Whether you&apos;re celebrating a birthday, anniversary, or simply want to say &quot;thank
                  you&quot;, our designs speak from the heart. Each card is thoughtfully created with
                  unique artwork and meaningful messages. We value creativity, quality, and personal touch.
                </Typography>
              </Box>

              {/* Baby Image Half-Outside on Right */}
              <Box
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-easing="ease-in"
                component="img"
                src={`${WEB_URL}/babe.png`}
                alt="baby image"
                sx={{
                  position: 'absolute',
                  right:'-7%',
                  top: {md: '23%', xs:'23%' },
               width:'70%',
                  zIndex: 2
                }}
              />

              {/* Balloon Overlays */}
              <Box
                component="img"
                src={`${WEB_URL}/tlb.gif`}
                alt="top left balloon"
                sx={{ position: 'absolute', bottom: '8%', left: '80%', width: '40%', zIndex: 4 }}
              />
              <Box
                component="img"
                src={`${WEB_URL}/trb.gif`}
                alt="top right balloon"
                sx={{ position: 'absolute', top: '22%', right:'-15%', width: '30%', zIndex: 4 }}
              />
              <Box
                component="img"
                src={`${WEB_URL}/blb.gif`}
                alt="bottom left balloon"
                sx={{ position: 'absolute', bottom: '10%', left: '27%', width: '35%', zIndex: 4 }}
              />
              <Box
                component="img"
                src={`${WEB_URL}/brb.gif`}
                alt="bottom right balloon"
                sx={{position: 'absolute', top: '12%', right: '28%', width: '50%', zIndex: 4 }}
              />
            </Card>

          )
        }


      </Box>

    </>
  );
};

export default AboutUs;
