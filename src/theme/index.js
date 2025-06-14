import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { createComponents } from './create-components';
import { createShadows } from './create-shadows';
import { createTypography } from './create-typography';

export function createTheme() {
  const palette = createPalette();
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        tablet: 768,
        custom: 790,
        // surfaceDuo: 540,
        // ipad: 1025,
        // laptop: 1280,
        laptop: 1536,
        large: 1540,
        xxl: 2560,
        xxxl: 3000,
        '4k': 3840,
        '5k': 5120,
        largeLaptop: 1920,
        xs: 0,
        sm: 600,
        md: 900,
        mobileCover: 800,
        // ipad: 1025,
        mobile: 767,
        ipad: 768,
        ipadPro: 1024,
        surfacePro: 912,
        lg: 1200,
        xl: 2000
      }
    },
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography
  });
}
