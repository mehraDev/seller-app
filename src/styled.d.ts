import { DefaultTheme as StyledDefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends StyledDefaultTheme {
    brandColor: {
      primaryBg: string;
      primaryBgHover: string;
      primaryBorder: string;
      primaryBorderHover: string;
      primaryHover: string;
      primary: string;
      primaryActive: string;
      primaryTextHover: string;
      primaryText: string;
      primaryTextActive: string;
    };
    neutralColor: {
      text: string;
      textSecondary: string;
      textTertiary: string;
      textQuaternary: string;
      border: string;
      borderSecondary: string;
      fill: string;
      fillSecondary: string;
      fillTertiary: string;
      fillQuaternary: string;
      bgContainer: string;
      bgElevated: string;
      bgLayout: string;
      bgSpotlight: string;
      bgMask: string;
    };
    font: {
      fontSize: string;
      fontSizeSM: string;
      fontSizeLG: string;
      fontSizeXL: string;
      fontSizeHeading1: string;
      fontSizeHeading2: string;
      fontSizeHeading3: string;
      fontSizeHeading4: string;
      fontSizeHeading5: string;
    };
    lineHeight: {
      lineHeight: string;
      lineHeightSM: string;
      lineHeightLG: string;
      lineHeightHeading1: string;
      lineHeightHeading2: string;
      lineHeightHeading3: string;
      lineHeightHeading4: string;
      lineHeightHeading5: string;
    };
    shadow :{
      boxShadow: string;
      boxShadowSecondary: string;
    }
  }
}
