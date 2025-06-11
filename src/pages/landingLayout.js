import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  useMediaQuery,
  Container,
  Collapse, Typography, Drawer, TextField, CircularProgress
} from '@mui/material';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import Link from 'next/link';
import * as React from 'react';
import { useFormik } from 'formik';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import GavelIcon from '@mui/icons-material/Gavel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import LoginIcon from '@mui/icons-material/Login';
import PhoneIcon from '@mui/icons-material/Phone';
import { useAuth } from '../hooks/use-auth';
import { useMounted } from '../hooks/use-mounted';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

const TOP_NAV_HEIGHT = 64;
let WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export const LandingNav = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const pathname = router.pathname;
  const isContact = pathname === '#contact';
  // const [isScrolled, setIsScrolled] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const [open, setOpen] = React.useState(false);
  const [toggle, setToggle] = useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user, isAuthenticated } = useAuth();
  const isMounted = useMounted();
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (state) => () => {
    setToggle(state);
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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      const loading = toast.loading('login in process...');
      setLoading(true);
      try {
        await signIn({ email: values.email, password: values.password });
        toast.success('Login successfully');
        router.push('/checkout');
        formik.resetForm(); // Reset the form immediately
      } catch (err) {
        toast.error(err.message);
        formik.resetForm();
        // setOpen(false);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);

      }
      toast.dismiss(loading);
      setLoading(false);
    }

  });

// register

  const handleClickOpen = () => {
    setRegisterOpen(false); // close register dialog if open
    setOpen(true); // open login dialog
  };

  const handleRegisterClickOpen = () => {
    setOpen(false); // close login dialog if open
    setRegisterOpen(true); // open register dialog
    registerFormik.resetForm();
  };

  // const handleRegisterClickOpen = () => {
  //   setRegisterOpen(true);
  // };
  const handleRegisterClose = () => {
    setRegisterOpen(false);
    registerFormik.resetForm();
  };

  const registerFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required').email('Email is invalid'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      const loading = toast.loading('Registration in process...');
      setLoading(true);
      try {
        await signUp({
          name: values.name,
          email: values.email,
          password: values.password
        });
        toast.success('Check your email for verification');
        setRegisterOpen(false);
        registerFormik.resetForm(); // Reset the form immediately
      } catch (err) {
        toast.error(err.message);
        // setRegisterOpen(false)
        registerFormik.resetForm();
        console.error(err);
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
      toast.dismiss(loading);
      setLoading(false);
      setOpen(false);

    }
  });

  return (
    <>
      {/*<Box sx={{*/}
      {/*  bgcolor: 'black',*/}
      {/*  pl:'3%',pr:'3%',*/}
      {/*  display: 'flex',*/}
      {/*  justifyContent: 'space-between',*/}
      {/*  alignItems: 'center',*/}
      {/*  width: '100%'*/}
      {/*}}>*/}
      {/*  <NextLink href="/" passHref legacyBehavior>*/}
      {/*    <Box sx={{*/}
      {/*      width:350*/}
      {/*    }}>*/}
      {/*    <Box*/}
      {/*      component="img"*/}
      {/*      src={`${WEB_URL}/logo3.png`}*/}
      {/*      alt="logo"*/}
      {/*      sx={{*/}
      {/*        bgcolor: 'yellow',*/}
      {/*        width:'40%',*/}
      {/*        pb: 2,*/}
      {/*        height: 'auto'*/}
      {/*      }}*/}
      {/*    /></Box>*/}
      {/*  </NextLink>*/}
      {/*  <Typography*/}
      {/*    gutterBottom*/}
      {/*    variant="h3"*/}
      {/*    // padding="10px"*/}
      {/*    sx={{*/}
      {/*      // height:'100%',*/}
      {/*      bgcolor: 'red',*/}
      {/*      // textAlign: 'center',*/}
      {/*      fontWeight: 900,*/}
      {/*      pt: 1,*/}
      {/*      // ml: 10,*/}
      {/*      color: '#c09b9b'*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Greetings Card*/}
      {/*  </Typography>*/}
      {/*  <Box sx={{*/}
      {/*    width:250,*/}
      {/*    bgcolor: 'yellow',*/}
      {/*    display: 'flex',*/}
      {/*    justifyContent: 'center',*/}
      {/*    gap: 2,*/}
      {/*    alignItems: 'center',*/}
      {/*    zIndex: 1400*/}
      {/*  }}>*/}
      {/*    <Link href={`${webUrl}contact`} passHref scroll={true}>*/}
      {/*      <Button*/}
      {/*        variant="outlined"*/}
      {/*        sx={{*/}
      {/*          borderRadius: '20px !important',*/}
      {/*          borderColor: '#333333 !important',*/}
      {/*          color: '#dcdbdb', // Optional: button text color same as border*/}
      {/*          '&:hover': {*/}
      {/*            borderColor: '#dcdbdb', // Keeps same color on hover*/}
      {/*            backgroundColor: 'rgba(220, 219, 219, 0.1)' // Optional subtle hover*/}
      {/*          }*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        Contact Us*/}
      {/*      </Button>*/}
      
      {/*    </Link>*/}
      {/*    /!*<Link href="/login">*!/*/}
      {/*    <Button*/}
      {/*      onClick={handleClickOpen}*/}
      {/*      sx={{*/}
      {/*        px: 3,*/}
      {/*        borderRadius: '20px !important',*/}
      {/*        backgroundColor: '#c165a0',*/}
      {/*        color: 'white'*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      Log In*/}
      {/*    </Button>*/}
      {/*    /!*</Link>*!/*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      <Box
        // component="header"
        sx={{
          // display:isContact ? 'none':'block',
          // bgcolor:'#d8c0ca',
          backgroundColor: '#1a1d25 !important',
          // boxShadow: 'none',
          zIndex: 1100,
          // zIndex: (theme) => theme.zIndex.appBar,
          width: '100% !important',
          position: 'sticky',
          pt: 0,
          top: 0
        }}
      >
        {lgUp ? (
          <Box sx={{ width: '100% !important', zIndex: 1400, bgcolor: 'white' }}>
            <Box
              sx={{
                // bgcolor: 'white',
                display: 'flex',
                pl: '3%',
                pr: '3%',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100% !important',
                backgroundColor: '#1a1d25 !important'
              }}
            >
              <NextLink href="/" passHref legacyBehavior>
                <Box sx={{width:250, height:'1005', display:'flex', alignItems:'center'}}>
                <Box
                  component="img"
                  src={`${WEB_URL}/logo3.png`}
                  alt="logo"
                  sx={{
                    // bgcolor: 'yellow',
                    width:'50%',
                    pb: 2,
                    height: 'auto'
                  }}
                /></Box>
              </NextLink>
              <Typography
                gutterBottom
                variant="h3"
                // padding="10px"
                sx={{
                  // bgcolor: 'red',
                  // textAlign: 'center',
                  fontWeight: 900,
                  pt: 1,
                  // ml: 10,
                  color: '#c09b9b'
                }}
              >
                Greetings Card
              </Typography>
              <Box sx={{
                width:250,
                // bgcolor: 'yellow',
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                alignItems: 'center',
                zIndex: 1400
              }}>
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
                  onClick={handleClickOpen}
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
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end'
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
          open={toggle}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250, p: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <NextLink href="/" passHref legacyBehavior>
              <img src={`${WEB_URL}/logo3.png`} alt="Logo"
                   style={{ height: 50, marginTop: '20px' }}/></NextLink>
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
              {/*<NextLink href="/login" passHref  legacyBehavior>*/}
              <Button
                onClick={handleClickOpen}
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

      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: '400px' // Adjust to preferred fixed width
            }
          }}

        >
          <DialogTitle sx={{ m: 0, p: 2, pb: '0 !important' }} id="customized-dialog-title">
            Login<br/>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account?&nbsp;
                <Box
                  onClick={handleRegisterClickOpen}
                  component="span"
                  sx={{ color: '#c165a0', cursor: 'pointer', display: 'inline' }}
                >
                  Register
                </Box>
              </Typography>
            </Box>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500]
            })}
          >
            <CloseIcon/>
          </IconButton>
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <DialogContent dividers sx={{ pb: '0 !important', pt: '0 !important' }}>
              <TextField
                sx={{ mt: 1 }}
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
              <TextField
                sx={{ mt: 1, mb: 1 }}
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
              {
                loading && <Box sx={{ textAlign: 'center', mt: 3 }}><CircularProgress/></Box>
              }
            </DialogContent>
            <DialogActions>
              {/*<Button autoFocus onClick={handleClose}>*/}
              <Button
                // fullWidth
                size="large"
                sx={{
                  '&:hover': {
                    // borderColor: '#dcdbdb', // Keeps same color on hover
                    backgroundColor: '#c165a0' // Optional subtle hover
                  }
                }}
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
              >
                Login
              </Button>
              {/*</Button>*/}
            </DialogActions>
          </form>
        </BootstrapDialog>
      </React.Fragment>


      {/*register*/}
      <React.Fragment>
        <BootstrapDialog
          onClose={handleRegisterClose}
          aria-labelledby="customized-dialog-title"
          open={registerOpen}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: '400px' // Adjust to preferred fixed width
            }
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2, pb: '0 !important' }} id="customized-dialog-title">
            Register<br/> <Typography
            color="text.secondary"
            variant="body2"
          >
            Already have an account?
            &nbsp;
            <Box
              onClick={handleClickOpen}
              // component={NextLink}
              // href="/login"
              underline="hover"
              variant="subtitle2"
              style={{ color: '#c165a0', display: 'inline', cursor: 'pointer' }}
            >
              Log in
            </Box>
          </Typography>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleRegisterClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500]
            })}
          >
            <CloseIcon/>
          </IconButton>
          <form
            noValidate
            onSubmit={registerFormik.handleSubmit}
          >
            <DialogContent sx={{ pt: '0 !important', pb: '0 !important' }}>
              <TextField
                sx={{ mt: 1 }}
                error={!!(registerFormik.touched.name && registerFormik.errors.name)}
                fullWidth
                helperText={registerFormik.touched.name && registerFormik.errors.name}
                label="Name"
                name="name"
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                value={registerFormik.values.name}
              />
              <TextField
                sx={{ mt: 1 }}
                error={!!(registerFormik.touched.email && registerFormik.errors.email)}
                fullWidth
                helperText={registerFormik.touched.email && registerFormik.errors.email}
                label="Email Address"
                name="email"
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                type="email"
                value={registerFormik.values.email}
              />
              <TextField
                sx={{ mt: 1, mb: 1 }}
                error={!!(registerFormik.touched.password && registerFormik.errors.password)}
                fullWidth
                helperText={registerFormik.touched.password && registerFormik.errors.password}
                label="Password"
                name="password"
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                type="password"
                value={registerFormik.values.password}
              />

            </DialogContent>
            <DialogActions>
              {/*<Button autoFocus onClick={handleClose}>*/}
              <Button
                // fullWidth
                size="large"
                // sx={{ mt: 3 }}
                type="submit"
                //disabled button
                disabled={registerFormik.isSubmitting}
                variant="contained"
              >
                Register
              </Button>
              {/*</Button>*/}
            </DialogActions>
          </form>
        </BootstrapDialog>
      </React.Fragment>


    </>
  );
};
export default LandingNav;