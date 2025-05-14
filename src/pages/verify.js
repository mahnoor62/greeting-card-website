import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CircularProgress, Link } from '@mui/material';
import toast from 'react-hot-toast';
import NextLink from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function Page() {

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { token } = router.query;

  const verify = async () => {

    try {
      if (token) {

        const response = await axios.post(API_BASE_URL + '/api/user/verify',
          {
            token
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

      }

      toast.success('Your account is successfully verified');
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.msg);
    }
    setLoading(false);
  };

  useEffect(() => {
    verify();
  }, [token]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Box sx={{ minWidth: 300 }}>
        <Card variant="outlined">
          <CardContent>
            <Box
              href="/"
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <img src="/logo3.png" alt="Logo"
                   style={{ height: 200 }}/>
            </Box>
            <Typography variant="h5" component="div"
                        sx={{ display: 'flex', justifyContent: 'center' }}>
              {
                loading ? 'Verification In Process...' : 'Account Verified'
              }
            </Typography>
            {
              loading && <Box sx={{ textAlign: 'center', mt: 5 }}><CircularProgress/></Box>
            }
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <NextLink href={'/login'}>
              <Button variant="outlined" disabled={loading} fullWidth>Login</Button>
            </NextLink>

          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}

