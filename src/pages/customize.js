import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { Button, SvgIcon, Box, useMediaQuery, IconButton, Collapse } from '@mui/material';
import UpdateButtonColor from '../components/dashboard/game/update-button-color';
import { useEffect, useRef, useState } from 'react';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import UpdateLogo from '../components/dashboard/game/update-logo';
import UpdateBackgroundImage from '../components/dashboard/game/update-bg-image';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import DiamondTwoToneIcon from '@mui/icons-material/DiamondTwoTone';
import GridOnTwoToneIcon from '@mui/icons-material/GridOnTwoTone';
import axios from 'axios';
import { useAuth } from '../hooks/use-auth';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Transaction_Details from './transactions';
import UpdateTitle from '../components/dashboard/game/update-title';
import UpdateBackgroundColor from '../components/dashboard/game/update-background-color';
import TitleIcon from '@mui/icons-material/Title';
import NextLink from 'next/link';
import UpdateBackgroundMusic from '../components/dashboard/game/update-music';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL;

export default function Page() {
  //data coming from transaction api
  const [data, setData] = useState({});
  const { user } = useAuth();
  const route = useRouter();
  const { game: slug, name } = route.query;
  const router = useRouter();
  const { game } = router.query;

  // popup stat
  const [open, setOpen] = useState(false);
  const [bar, setBar] = React.useState(false);
  const gameIframe = useRef(null);
  //accordan :
  const [expanded, setExpanded] = useState('false');
  //copy link buttons
  const [textToCopy, setTextToCopy] = useState('Text to be copied');

  const inputRefPublic = useRef(null);
  const inputRefLeaderboard = useRef(null);
//mdeia query for large screen
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //accordan functions:
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&::before': {
      display: 'none'
    }
  }));
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }}/>}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1)
    }
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)'
  }));

  if (!slug) {
    route.push('/dashboard');
  }
  const User_Game = async () => {

    try {
      const token = window.localStorage.getItem('token');
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.get(API_BASE_URL
        + `/api/game-customization/user-customization/${slug}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        }
      );
      // console.log('response if load', response);
      const data = response.data.data;
      data.backgroundImage = data.backgroundImage && API_BASE_URL + '/' + data.backgroundImage;
      data.logoImage = data.logoImage && API_BASE_URL + '/' + data.logoImage;
      data.slug = slug;
      data.title = data.title ? data.title : game;
      data.backgroundColor = data.backgroundColor;
      data.backgroundMusic = data.backgroundMusic && API_BASE_URL + '/' + data.backgroundMusic;
      data.mode = 'editor';
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    User_Game();
  }, []);

  useEffect(() => {
    gameOnLoad();
  }, [data]);
  const gameOnLoad = () => {

    // to get iframe instance from unity
    setTimeout(() => {
      if (window.frames[0] && window.frames[0].gameInstance) {
        gameIframe.current = window.frames[0];
        gameIframe.current.gameInstance.SendMessage(
          'JavascriptWrapper',
          'ResponseOf_GameDataString',
          JSON.stringify(data)
        );
      }
    }, 2000);
  };

  const API_BASE_URL = process.env.NEXT_PUBLIC_WEB_URL;
  const leaderboardUrl = `${API_BASE_URL}/leaderboard?game=${slug}`;
  const publicUrl = user ? `${API_BASE_URL}/play?game=${slug}&play=${user._id}` : '';

// copy url buttons for public url
  const copyPublic = () => {
    inputRefPublic.current.select();
    document.execCommand('copy');
  };
// copy url button for leaderboard
  const copyLeaderboard = () => {
    inputRefLeaderboard.current.select();
    document.execCommand('copy');
  };
  return (
    <>
      {/*button for modal*/}
      <Transaction_Details
        open={open}
        handleModalPopup={(value) => setOpen(value)}
        game={game}
        setData={setData}
        data={data}
      />
      {
        lgUp ? (

          <Grid container spacing={0} sx={{ height: '100%' }}>
            <Grid item xs={12} md={2} sx={{ padding: '10px', backgroundColor: '#2f2f2f' }}>
              <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} sx={{ height: 'auto' }}>
                  <Grid container>
                    {
                      !data.isPaid && !data.transactionFound && (
                        <div>
                          <Accordion expanded={expanded === 'panel1'}
                                     onChange={handleChange('panel1')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><ColorLensTwoToneIcon/></SvgIcon>}>
                                Set Button Color
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <UpdateButtonColor gameIframe={gameIframe}
                                                 setData={setData}
                                                 data={data} game={game}/>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion expanded={expanded === 'panel2'}
                                     onChange={handleChange('panel2')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><DiamondTwoToneIcon/></SvgIcon>}>
                                Upload Logo
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                <UpdateLogo gameIframe={gameIframe} setData={setData}
                                            data={data} game={game}/>
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion expanded={expanded === 'panel3'}
                                     onChange={handleChange('panel3')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><GridOnTwoToneIcon/></SvgIcon>}>
                                Upload BG
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                  <UpdateBackgroundImage gameIframe={gameIframe} setData={setData}
                                                         data={data} game={game}/>
                                </Grid>
                                <Grid item xs={12} md={12}>

                                  <UpdateBackgroundColor gameIframe={gameIframe} setData={setData}
                                                         data={data} game={game}/>
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion expanded={expanded === 'panel5'}
                                     onChange={handleChange('panel5')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><TitleIcon/></SvgIcon>}>
                                Update Title
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <UpdateTitle gameIframe={gameIframe} setData={setData}
                                           data={data} game={game}
                                           name={name}
                              />
                            </AccordionDetails>
                          </Accordion>
                          <Accordion expanded={expanded === 'panel6'}
                                     onChange={handleChange('panel6')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><LibraryMusicIcon/></SvgIcon>}>
                                Upload Music
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <UpdateBackgroundMusic gameIframe={gameIframe} setData={setData}
                                                     data={data} game={game}/>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      )}

                    {data.isPaid && (
                      <div style={{ height: '100%', width: '100%' }}>
                        <Grid container style={{ height: '100%', width: '100%' }}>
                          <Grid item xs={12} md={12} sx={{
                            margin: { md: '10px', xs: '10px' },
                            height: '100%',
                            width: '100%'
                          }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <Box sx={{ color: '#add540' }}><b>Leaderboard Url:</b></Box>
                              <input
                                ref={inputRefLeaderboard}
                                type="text"
                                value={leaderboardUrl}
                                readOnly
                                style={{
                                  flex: 1,
                                  margin: '10px 0',
                                  padding: '8px',
                                  borderRadius: '4px',
                                  border: '1px solid #ccc'
                                }}
                              />
                              <Button onClick={copyLeaderboard} variant="contained"
                                      sx={{ backgroundColor: '#add540', color: '#fff' }}>Copy
                                URL</Button>
                            </div>
                            <div style={{ height: '100%', width: '100%', marginTop: '50px' }}>
                              <Grid container style={{ height: '100%', width: '100%' }}>
                                <Grid item xs={12} md={12}>
                                  <Box sx={{ color: '#add540' }}><b>Public Url:</b></Box>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <input
                                      ref={inputRefPublic}
                                      type="text"
                                      value={publicUrl}
                                      readOnly
                                      style={{
                                        flex: 1,
                                        margin: '5px 0',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc'
                                      }}
                                    />
                                    <Button onClick={copyPublic} variant="contained"
                                            sx={{ backgroundColor: '#add540', color: '#fff' }}>Copy
                                      URL</Button>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    )
                    }
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={{ width: '100%', marginTop: '200px' }}>
                  {!data.isPaid && !data.transactionFound && (
                    <>
                      <NextLink href={{
                        pathname: '/preview',
                        query: {
                          game: data.slug
                        }
                      }}>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ width: '100%', marginBottom: '10px' }}
                        >
                          Preview
                        </Button>
                      </NextLink>

                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          setOpen(true);
                        }}
                        sx={{ width: '100%' }}
                      >
                        Save
                      </Button>
                    </>
                  )}
                  {data.transactionFound && !data.transactionStatus && (
                    <Button fullWidth disabled variant="contained" sx={{ width: '100%' }}>
                      Pending
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={10} xs={12} sx={{ height: '100%', overflow: 'hidden', width: '100%' }}>
              <iframe
                onLoad={gameOnLoad}
                src={`${BASE_URL}/game/index.html`}
                title={data.title}
                frameBorder="0"
                style={{
                  width: '100%',
                  height: '100%'
                }}
              ></iframe>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={0} sx={{ height: '100%', backgroundColor: '#2f2f2f' }}>
            <Grid item xs={12} md={2} sx={{ padding: '10px', backgroundColor: '#2f2f2f' }}>
              <Grid container sx={{
                height: '100%',
                width: '100%'

              }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setBar(!bar)}
                  sx={{
                    p: 1,
                    width: '100%',
                    backgroundColor: '#2f2f2f',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginBottom: '20px'
                  }}>{!bar ? 'Open Editor' : 'Close Editor'}</Button>

                <Collapse in={!lgUp && bar} style={{ width: '100%' }}>
                  <Grid item xs={12} sx={{ height: 'auto', width: '100%' }}>
                    <Grid container>
                      {!data.isPaid && !data.transactionFound && (
                        <div>
                          <Accordion expanded={expanded === 'panel1'}
                                     onChange={handleChange('panel1')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><ColorLensTwoToneIcon/></SvgIcon>}>
                                Set Button Color
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <UpdateButtonColor gameIframe={gameIframe}
                                                 setData={setData}
                                                 data={data} game={game}/>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion expanded={expanded === 'panel2'}
                                     onChange={handleChange('panel2')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><DiamondTwoToneIcon/></SvgIcon>}>
                                Upload Logo
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                <UpdateLogo gameIframe={gameIframe} setData={setData}
                                            data={data} game={game}

                                />
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion expanded={expanded === 'panel3'}
                                     onChange={handleChange('panel3')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><GridOnTwoToneIcon/></SvgIcon>}>
                                Upload BG
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                  <UpdateBackgroundImage gameIframe={gameIframe} setData={setData}
                                                         data={data} game={game}/>
                                </Grid>
                                <Grid item xs={12} md={12}>

                                  <UpdateBackgroundColor gameIframe={gameIframe} setData={setData}
                                                         data={data} game={game}/>
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion expanded={expanded === 'panel4'}
                                     onChange={handleChange('panel4')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><TitleIcon/></SvgIcon>}>
                                Update Title
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <UpdateTitle gameIframe={gameIframe} setData={setData}
                                           data={data} game={game}/>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion expanded={expanded === 'panel5'}
                                     onChange={handleChange('panel5')}
                                     sx={{ backgroundColor: '#2f2f2f', border: 0, width: '100%' }}>
                            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                              <Button fullWidth sx={{ justifyContent: 'left' }}
                                      startIcon={<SvgIcon><LibraryMusicIcon/></SvgIcon>}>
                                Update Music
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <UpdateBackgroundMusic gameIframe={gameIframe} setData={setData}
                                                     data={data} game={game}/>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      )}
                      {data.isPaid && (
                        <div style={{ height: '100%', width: '100%' }}>
                          <Grid container style={{ height: '100%', width: '100%' }}>
                            <Grid item xs={12} md={12} sx={{
                              margin: { md: '10px', xs: '10px' },
                              height: '100%',
                              width: '100%'
                            }}>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%'
                              }}>
                                <Box sx={{ color: '#add540' }}><b>Leaderboard Url:</b></Box>
                                <input
                                  ref={inputRefLeaderboard}
                                  type="text"
                                  value={leaderboardUrl}
                                  readOnly
                                  style={{
                                    flex: 1,
                                    margin: '10px 0',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc'
                                  }}
                                />
                                <Button fullWidth onClick={copyLeaderboard} variant="contained"
                                        sx={{ backgroundColor: '#add540', color: '#fff' }}>Copy
                                  URL</Button>
                              </div>
                              <div style={{ height: '100%', width: '100%', marginTop: '50px' }}>
                                <Grid container style={{ height: '100%', width: '100%' }}>
                                  <Grid item xs={12} md={12}>
                                    <Box sx={{ color: '#add540' }}><b>Public Url:</b></Box>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <input
                                        ref={inputRefPublic}
                                        type="text"
                                        value={publicUrl}
                                        readOnly
                                        style={{
                                          flex: 1,
                                          margin: '5px 0',
                                          padding: '8px',
                                          borderRadius: '4px',
                                          border: '1px solid #ccc'
                                        }}
                                      />
                                      <Button onClick={copyPublic} variant="contained"
                                              sx={{ backgroundColor: '#add540', color: '#fff' }}>Copy
                                        URL</Button>
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ width: '100%' }}>
                    {!data.isPaid && !data.transactionFound && (
                      <>
                        <NextLink href={{
                          pathname: '/preview',
                          query: {
                            game: data.slug
                          }
                        }}>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{ width: '100%', marginBottom: '5px' }}
                          >
                            Preview
                          </Button>
                        </NextLink>

                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => {
                            setOpen(true);
                          }}
                          sx={{ width: '100%' }}
                        >
                          Save
                        </Button>
                      </>
                    )}
                    {data.transactionFound && !data.transactionStatus && (
                      <Button fullWidth disabled variant="contained" sx={{ width: '100%' }}>
                        Pending
                      </Button>
                    )}
                  </Grid>

                </Collapse>
              </Grid>
            </Grid>
            <Grid item md={10} xs={12} sx={{ height: '100%', overflow: 'hidden', width: '100%' }}>
              <iframe
                onLoad={gameOnLoad}
                src={`${BASE_URL}/game/index.html`}
                title={data.title}
                frameBorder="0"
                style={{
                  width: '100%',
                  height: '100%'
                }}
              ></iframe>
            </Grid>
          </Grid>
        )
      }
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

