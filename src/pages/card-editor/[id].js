import Head from 'next/head';
import {
  Card,
  CardContent,
  Container,
  Typography, Tab, IconButton, Menu, CircularProgress,
  Grid, Box, useMediaQuery, useTheme, Button, MenuItem, Select
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import LandingNav from '../landingLayout';
import { useRouter } from 'next/router';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
import NextLink from 'next/link';

const Editor = () => {
    const theme = useTheme();
    const router = useRouter();
    const { id } = router.query;
    const gameIframe = useRef(null);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const hasCalledRef = useRef(false);
    const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
    const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

    const [data, setData] = useState(null);
    const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const getFrontCardDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/cards/get/data/${id}`);
        setData(res.data.data);
        await saveTemplateData();
        // const alreadySaved = localStorage.getItem(`customization_saved_${id}`);
        //
        // if (!alreadySaved) {
        //   await saveCardCustomization();
        //   localStorage.setItem(`customization_saved_${id}`, 'true');
        // }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getFrontCardDetail();
    }, [id]);

    const saveTemplateData = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/api/cards/upload-card-id`, {
          uuid: id
        });

        setCardData(res.data.data);
        localStorage.setItem('userId', res?.data?.data?.userId);
      } catch (error) {
        console.log(error);
      }
    };

    console.log('cardData', cardData);

    useEffect(() => {
      window.UnityLoaded = () => {
        console.log('Unity is loaded and ready from web');
        gameOnLoad();
      };
    }, [data && window?.UnityLoaded]);


  const userId = localStorage.getItem('userId');

    const gameOnLoad = () => {
      const instance = gameIframe.current?.contentWindow?.gameInstance;

      console.log('instance----', instance);
      console.log('data---', data);

      if (instance && data) {

        console.log('✅ Unity gameInstance loaded:', instance);

        instance.SendMessage(
          'JsonDataHandlerAndParser',
          'LoadJsonData',
          JSON.stringify(data)
        );

        gameIframe.current.contentWindow.saveImage = async (array = [], int, index) => {
          console.log('🖼️ Received array:', array);
          console.log('index', index);

          try {
            // Convert the input array to Uint8Array
            const uint8Array = new Uint8Array(array);

            // Convert Uint8Array to a Blob (binary data)
            const blob = new Blob([uint8Array], { type: 'image/png' }); // adjust MIME type if needed

            // Create FormData to send the image as a file
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append('index', index);
            formData.append('image', blob, 'image.png'); // 'image.png' is filename

            // Send POST request with multipart/form-data
            const response = await axios.post(
              `${BASE_URL}/api/cards/upload-image`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            );
            const imagePath = response?.data?.data?.url;
            // Construct full image URL with index as a query param
            // const imageUrl = `${BASE_URL}/${imagePath}?index=${index}`;
            setImage(imagePath);

            console.log('imagePath', imagePath);
            instance.SendMessage(
              'JsonDataHandlerAndParser',
              'LoadImage',
              JSON.stringify(imagePath)
            );
            console.log('✅ Image uploaded successfully:', response);
          } catch (error) {
            console.error('❌ Error uploading image:', error);
          }
        };

        gameIframe.current.contentWindow.UploadVideo = async (gameObjectName, methodName, url) => {
          console.log('gameObjectName', gameObjectName);
          console.log('url', url);
          console.log('methodName', methodName);

          try {
            const blobResponse = await fetch(url);
            const blob = await blobResponse.blob();

            // 2. Convert blob to a File object (you can give a meaningful filename)
            const file = new File([blob], 'recorded-video.mp4', {
              type: blob.type || 'video/mp4'
            });

            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('video', file);

            // Send POST request with multipart/form-data
            const response = await axios.post(
              `${BASE_URL}/api/cards/upload-template-video`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            );
            const videoPath = response?.data?.data?.url;
            setVideo(videoPath);

            instance.SendMessage(
              'JsonDataHandlerAndParser',
              'LoadVideo',
              JSON.stringify(videoPath)
            );

            console.log('videoPath save into db', videoPath);
            // console.log('✅ Image uploaded successfully:', response);
          } catch (error) {
            console.error('❌ Error uploading video:', error);
          }
        };

        //unity developer call this function to send data to me  not in instance this function is call in window
        gameIframe.current.contentWindow.saveData = async (json) => {
          console.log(`Edited Data of ${userId}:`, json);
          localStorage.setItem('savedData', JSON.stringify({
            data: json
          }));
        };

      }
    };

    return (
      <>
        <Head>
          <title>Card Editor | {APP_NAME}</title>
        </Head>

        <Box sx={{
          width: '100%',
          height: '100vh !important',
          overflowY: 'hidden ',
          // overflowX:'hidden',
          // overflowY: 'hidden',
          // minHeight: '100vh !important',
          backgroundImage: {
            xs: `url(${WEB_URL}/portrate.png)`,
            md: `url(${WEB_URL}/bg1.png)`
          },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'

        }}>
          <LandingNav/>
          <Box sx={{ width: '100%', height: '100%' }}>
            {/*<NextLink href="/login" passHref legacyBehavior>*/}
            {/*  <Button size="large" sx={{*/}
            {/*    // backgroundColor: '#ffecc8',*/}
            {/*    // backgroundColor: '#1a1d25 !important',*/}
            {/*    // color: '#c09b9b',*/}
            {/*    // boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',*/}
            {/*    // '&:hover': {*/}
            {/*    //   backgroundColor: '#1a1d25 !important',*/}
            {/*    //   color: '#c09b9b'*/}
            {/*    // }*/}
            {/*  }}>*/}
            {/*    Save*/}
            {/*  </Button>*/}
            {/*</NextLink>*/}
            <iframe
              // onLoad={gameIframe}
              ref={gameIframe}
              onLoad={() => {
                console.log('iframe loaded');
                if (window.UnityLoaded) {
                  window.UnityLoaded();
                }
              }}
              src={`${WEB_URL}/editor/index.html`}
              // title={data.title}
              frameBorder="0"
              style={{
                width: '100%',
                height: '100%'
              }}
            ></iframe>


          </Box>

        </Box>

      </>
    );
  }
;
export default Editor;