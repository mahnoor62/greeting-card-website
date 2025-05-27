import PropTypes from 'prop-types';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';

import {
  Avatar,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  useMediaQuery,
  Container,
  Collapse
} from '@mui/material';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Button from '@mui/material/Button';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import NextLink from 'next/link';
import * as React from 'react';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { Layout as AuthLayout } from '../auth/layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
import { useRouter } from 'next/router';

export const TopNav = (props) => {
  const router = useRouter();
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: '#2f2f2f',
          position: 'sticky',
          top: 0,
          paddingTop: 2,
          paddingBottom: 2,
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Container>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            // spacing={1}
            sx={{
              minHeight: TOP_NAV_HEIGHT,
              // px: 1,
              width: '100%'
            }}
          >
            {/*<Button*/}
            {/*  startIcon={*/}
            {/*    <SvgIcon>*/}
            {/*      <ArrowBackIcon/>*/}
            {/*    </SvgIcon>*/}
            {/*  }*/}
            {/*  onClick={() => router.back()}*/}
            {/*  sx={{ position: 'absolute', left:0 }}*/}
            {/*></Button>*/}
            {/*<img src={`${WEB_URL}/logo3.png`} alt="Logo" style={{ height: 80, paddingBottom: 5 }}/>*/}
            {lgUp ? (
              <>
                <Button
                  startIcon={
                    <SvgIcon>
                      <ArrowBackIcon/>
                    </SvgIcon>
                  }
                  onClick={() => router.back()}
                  sx={{ position: 'absolute', left: 0 }}
                ></Button>
                {/*<NextLink href="/contact">*/}
                <img src={`${WEB_URL}/logo3.png`} alt="Logo"
                     style={{ height: 80, paddingBottom: 5 }}/>
                {/*</NextLink>*/}
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >

                  <NextLink href="/dashboard">
                    <Button
                      startIcon={
                        <SvgIcon>
                          <ChartBarIcon/>
                        </SvgIcon>
                      }
                    >
                      Dashboard
                    </Button>
                  </NextLink>
                  <NextLink href="/players">
                    <Button
                      startIcon={
                        <SvgIcon>
                          <AccessibilityIcon/>
                        </SvgIcon>
                      }
                    >
                      Players
                    </Button>
                  </NextLink>
                  <NextLink href="/account">
                    <Button
                      startIcon={
                        <SvgIcon>
                          <UserIcon/>
                        </SvgIcon>
                      }
                    >
                      Account
                    </Button>
                  </NextLink>
                  <Avatar
                    onClick={accountPopover.handleOpen}
                    ref={accountPopover.anchorRef}
                    sx={{
                      cursor: 'pointer',
                      height: 40,
                      width: 40
                    }}
                    src={`${WEB_URL}/blank-profile.webp`}
                  />
                  <AccountPopover
                    anchorEl={accountPopover.anchorRef.current}
                    open={accountPopover.open}
                    onClose={accountPopover.handleClose}
                  />
                </Stack>
              </>
            ) : (
              <Box
                sx={{
                  backgroundColor: '#2f2f2f',
                  display: 'flex',
                  alignItems: 'center', // Center items vertically
                  justifyContent: 'flex-end', // Center items horizontally
                  width: '100%'
                }}
              >
                <IconButton onClick={() => setOpen(!open)} sx={{ p: 0 }}>
                  <SvgIcon fontSize="large">
                    <Bars3Icon/>
                  </SvgIcon>
                </IconButton>
              </Box>
            )}
          </Stack>
        </Container>
      </Box>
      <Collapse in={!lgUp && open}>
        <>
          <Box
            sx={{
              backgroundColor: '#2f2f2f',
              display: 'flex',
              alignItems: 'center', // Center items vertically
              width: '100%'
            }}
          >
            <Button
              startIcon={
                <SvgIcon>
                  <ArrowBackIcon/>
                </SvgIcon>
              }
              onClick={() => router.back()}
              // style={{justifyContent: 'flex-start'}}
            ></Button>
            <img src={`${WEB_URL}/logo3.png`} alt="Logo"
                 style={{ height: '50px', marginLeft: 'auto' }}/>
          </Box>
          <Box
            sx={{
              backgroundColor: '#2f2f2f',
              padding: '10px',
              textAlign: 'right'
            }}
          >
            <NextLink href="/dashboard">
              <Button
                startIcon={
                  <SvgIcon>
                    <ChartBarIcon/>
                  </SvgIcon>
                }
              >
                Dashboard
              </Button>
            </NextLink>
            <NextLink href="/players">
              <Button
                startIcon={
                  <SvgIcon>
                    <AccessibilityIcon/>
                  </SvgIcon>
                }
              >
                Players
              </Button>
            </NextLink>
            <NextLink href="/account">
              <Button
                startIcon={
                  <SvgIcon>
                    <UserIcon/>
                  </SvgIcon>
                }
              >
                Account
              </Button>
            </NextLink>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 25,
                width: 25,
                marginLeft: 'auto',
              }}
              src={`${WEB_URL}/blank-profile.webp`}
            />
            <AccountPopover
              anchorEl={accountPopover.anchorRef.current}
              open={accountPopover.open}
              onClose={accountPopover.handleClose}
            />
          </Box>
        </>
      </Collapse>
      {/*<AccountPopover*/}
      {/*  anchorEl={accountPopover.anchorRef.current}*/}
      {/*  open={accountPopover.open}*/}
      {/*  onClose={accountPopover.handleClose}*/}
      {/*/>*/}
    </>
  );
};

TopNav.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};