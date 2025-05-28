import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  useMediaQuery,
  Container,
  Collapse, Typography, Drawer
} from '@mui/material';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import Link from 'next/link';
import * as React from 'react';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import GavelIcon from '@mui/icons-material/Gavel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import LoginIcon from '@mui/icons-material/Login';
import PhoneIcon from '@mui/icons-material/Phone';

const TOP_NAV_HEIGHT = 64;
let WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

export const LandingNav = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const isContact = pathname === '#contact';
  // const [isScrolled, setIsScrolled] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  let webUrl = '#';
  let WEB_URL = '';
  if (pathname !== '/') {
    webUrl = '/';
    WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

  }


  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > window.innerHeight * 0.10) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };
  //
  //   window.addEventListener('scroll', handleScroll);
  //
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <>
      <Box
        component="header"
        sx={{
          // display:isContact ? 'none':'block',
          // bgcolor:'#d8c0ca',
          backgroundColor: '#1a1d25 !important',
          // boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.appBar,
          width: '100% !important',
          position: 'sticky',
          pt: 0,
          top: 0
        }}
      >
        {lgUp ? (
          <Box sx={{ width: '100% !important' }}>
            <Box
              sx={{
                // bgcolor:'yellow',
                display: 'flex',
                pl: '3%',
                pr: '3%',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100% !important',
                backgroundColor: '#1a1d25 !important'
              }}
            >
              <NextLink href="/"  passHref legacyBehavior>
              <Box
                component="img"
                src={`${WEB_URL}/logo3.png`}
                alt="logo"
                sx={{
                  width: {
                    xs: '10%',
                    md: '10%',
                    lg: '10%'
                  },
                  pb: 2,
                  height: 'auto'
                }}
              />
              </NextLink>
              <Typography
                gutterBottom
                variant="h3"
                // padding="10px"
                sx={{
                  // bgcolor:'red',
                  textAlign: 'center',
                  fontWeight: 900,
                  pt: 1,
                  ml: 10,
                  color: '#c09b9b'
                }}
              >
                Greetings Card
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center' }}>
                <Link href={`${webUrl}contact`} passHref scroll={true}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: '20px !important',
                      borderColor: '#333333 !important',
                      color: '#dcdbdb', // Optional: button text color same as border
                      '&:hover': {
                        borderColor: '#dcdbdb', // Keeps same color on hover
                        backgroundColor: 'rgba(220, 219, 219, 0.1)' // Optional subtle hover
                      }
                    }}
                  >
                    Contact Us
                  </Button>

                </Link>
                {/*<Link href="/login">*/}
                <Button
                  sx={{
                    px: 3,
                    borderRadius: '20px !important',
                    backgroundColor: '#c165a0',
                    color: 'white'
                  }}
                >
                  Log In
                </Button>
                {/*</Link>*/}
              </Box>
            </Box>
          </Box>
        ) : (
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              pl: 2,
              width:'100%',
              display: 'flex',
              justifyContent:'flex-end'
            }}
          >
            <SvgIcon fontSize="large" sx={{ alignText: 'right' }}>
              <Bars3Icon/>
            </SvgIcon>
          </IconButton>
        )}

        <Drawer
          anchor="right"
          sx={{
            '& .MuiDrawer-paper': {
              // bgcolor: '#d8c0ca',
              backgroundColor: '#1a1d25 !important'
            }
          }}
          open={open}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250, p: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <NextLink href="/"  passHref legacyBehavior>
              <img src={`${WEB_URL}/logo3.png`} alt="Logo" style={{ height: 50, marginTop: '20px' }}/></NextLink>
            <Box
              sx={{
                mt: 5,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                flexDirection: 'column'
              }}
            >
              <Link href={`${webUrl}contact`} passHref scroll={true}>
                <Button
                    variant="outlined"
                    sx={{
                      width: '100%',
                      borderRadius: '20px !important',
                      borderColor: '#333333 !important',
                      color: '#dcdbdb', // Optional: button text color same as border
                      '&:hover': {
                        borderColor: '#dcdbdb', // Keeps same color on hover
                        backgroundColor: 'rgba(220, 219, 219, 0.1)' // Optional subtle hover
                      }
                    }}
                  >
                  Contact Us
                </Button>

              </Link>
              {/*<NextLink href="#contact" passHref scroll={true}>*/}
              {/*  <Button*/}
              {/*    variant="outlined"*/}
              {/*    sx={{*/}
              {/*      width: '100%',*/}
              {/*      borderRadius: '20px !important',*/}
              {/*      borderColor: '#333333 !important',*/}
              {/*      color: '#dcdbdb', // Optional: button text color same as border*/}
              {/*      '&:hover': {*/}
              {/*        borderColor: '#dcdbdb', // Keeps same color on hover*/}
              {/*        backgroundColor: 'rgba(220, 219, 219, 0.1)' // Optional subtle hover*/}
              {/*      }*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    Contact Us*/}
              {/*  </Button>*/}
              {/*</NextLink>*/}
              {/*<NextLink href="/login">*/}
              <Button
                sx={{
                  px: 3,
                  borderRadius: '20px !important',
                  backgroundColor: '#c165a0',
                  color: 'white'
                }}
              >
                Log In
              </Button>
              {/*</NextLink>*/}
            </Box>
          </Box>
        </Drawer>
      </Box>

    </>
  );
};
export default LandingNav;