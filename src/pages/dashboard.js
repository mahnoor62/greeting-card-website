import Head from 'next/head';
import {
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as React from 'react';
import NextLink from 'next/link';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const Page = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [games, setGames] = useState({ yourGames: [], recommendedGames: [], comingSoonGames: [] });

  // Fetch all games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = window.localStorage.getItem('token');
        const response = await axios.get(API_BASE_URL + '/api/user/game/all', {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        });
        setGames(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
      }
    };
    fetchGames();
  }, []);

  const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <>
      <Head>
        <title>
          Dashboard | {APP_NAME}
        </title>
      </Head>
      <Container sx={{ my: '50px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography gutterBottom variant="h4" padding="10px">
                Dashboards
              </Typography>
            </Box>
          </Grid>

          {/*{/ Paid games of user /}*/}
          {games.yourGames.length > 0 ? (
            <Grid item xs={12} sx={{ marginBottom: '80px' }}>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h6"
                  padding="10px"
                >
                  Your Games
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                {games.yourGames.map((userGame, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 200 }}
                        image={userGame && userGame.slug ? (API_BASE_URL
                          + '/'
                          + userGame.slug
                          + '.png') : ''}
                        title={userGame.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {userGame && userGame.name ? userGame.name : ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {userGame && userGame.description ? userGame.description : ''}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <NextLink href={
                          userGame && userGame.isPending
                            ? '' // Set href to undefined when button is disabled
                            : {
                              pathname: '/customize',
                              query: {
                                game: userGame && userGame.slug ? userGame.slug : '',
                                name: userGame && userGame.name ? userGame.name : ''
                              }
                            }
                        }
                                  style={{ flexGrow: '1' }}>
                          <Button sx={{ margin: 'auto', width: '100%' }}
                                  variant="contained"
                                  disabled={userGame && userGame.isPending}
                          >
                            {userGame && userGame.isPending ? 'Pending' : 'View'}
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : ''}

          {/*    {/ Recommended games /}*/}
          {games.recommendedGames.length > 0 ? (
            <Grid item xs={12} sx={{ marginBottom: { md: '80px', sm: '40px' } }}>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h6"
                  padding="10px"
                >
                  Recommended Games
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                {games.recommendedGames.map((recommendedGame, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 200 }}
                        image={recommendedGame && recommendedGame.slug ? (API_BASE_URL
                          + '/'
                          + recommendedGame.slug
                          + '.png') : ''}
                        title={recommendedGame.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {recommendedGame && recommendedGame.name ? recommendedGame.name : ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {recommendedGame && recommendedGame.description
                            ? recommendedGame.description
                            : ''}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <NextLink href={{
                          pathname: '/customize',
                          query: {
                            game: recommendedGame && recommendedGame.slug
                              ? recommendedGame.slug
                              : ''
                          }
                        }}
                                  style={{ flexGrow: '1' }}>
                          <Button sx={{ margin: 'auto', width: '100%' }}
                                  variant="contained">Buy</Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : null}

          {/*    {/ Displaying games with launch === false /}*/}
          {games.comingSoonGames.length > 0 ? (
            <Grid item xs={12} sx={{ marginBottom: '80px' }}>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h6"
                  padding="10px"
                >
                  Coming Soon Games
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                {games.comingSoonGames.map((comingSoonGame, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 200 }}
                        image={`${WEB_URL}/coming-soon.jpg`}
                        // image={comingSoonGame && comingSoonGame.slug ? (API_BASE_URL
                        //   + '/'
                        //   + comingSoonGame.slug
                        //   + '.jpg') : ''}
                        title={comingSoonGame.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {comingSoonGame && comingSoonGame.name ? comingSoonGame.name : ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {comingSoonGame && comingSoonGame.description
                            ? comingSoonGame.description
                            : ''}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button sx={{ margin: 'auto', width: '100%' }}
                                variant="contained">Coming Soon</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;