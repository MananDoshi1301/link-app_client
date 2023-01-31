import { extendTheme } from '@chakra-ui/react'

const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  gray: {
    50: '#f7fafc',
    900: '#171923',
  },
  blue: {

  }
}

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
}

const fonts = {
  body: "system-ui, sans-serif",
  heading: "Georgia, serif",
  mono: "Menlo, monospace",
}

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

const borderRadius = {
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
}

export const MyTheme = extendTheme({ breakpoints, fonts, fontSizes, fontWeights, colors, borderRadius });