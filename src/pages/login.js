import { useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import toast from 'react-hot-toast';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useMounted } from '../hooks/use-mounted';

import * as React from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn, user, isAuthenticated } = useAuth();
  const isMounted = useMounted();

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
        formik.resetForm(); // Reset the form immediately
      } catch (err) {
        toast.error(err.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);

      }
      toast.dismiss(loading);
      setLoading(false);
    }

  });

  return (
    <>
      <Head>
        <title>
          Login | {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Log in to your account
                {/*<NextLink*/}
                {/*  component={NextLink}*/}
                {/*  href="/register"*/}
                {/*  underline="hover"*/}
                {/*  variant="subtitle2"*/}
                {/*  style={{color: '#add540'}}*/}
                {/*>*/}
                {/*  Register*/}
                {/*</NextLink>*/}
              </Typography>
              {/*<Typography*/}
              {/*  color="text.secondary"*/}
              {/*  variant="body2"*/}
              {/*>*/}
              {/*  Don&apos;t have an account?*/}
              {/*  &nbsp;*/}
              {/*  <NextLink*/}
              {/*    component={NextLink}*/}
              {/*    href="/register"*/}
              {/*    underline="hover"*/}
              {/*    variant="subtitle2"*/}
              {/*    style={{color: '#add540'}}*/}
              {/*  >*/}
              {/*    Register*/}
              {/*  </NextLink>*/}
              {/*</Typography>*/}
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
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
              </Stack>
              {
                loading && <Box sx={{ textAlign: 'center', mt: 5 }}><CircularProgress/></Box>
              }
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              {/*<NextLink href={'/forget'} style={{*/}
              {/*  display: 'flex',*/}
              {/*  justifyContent: 'right',*/}
              {/*  alignItems: 'right',*/}
              {/*  marginTop: '10px',*/}
              {/*  color: '#add540'*/}
              {/*}}>forget password?</NextLink>*/}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 ,'&:hover': {
                    // borderColor: '#dcdbdb', // Keeps same color on hover
                    backgroundColor: '#c165a0' // Optional subtle hover
                  }}}
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
              >
                Login
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
