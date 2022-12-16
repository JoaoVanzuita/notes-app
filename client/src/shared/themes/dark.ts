import { createTheme } from '@mui/material'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7066E0',
      dark: '#5c50de',
      light: '#766dde',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#202124'
    }
  },
  typography: {
    allVariants: {
      color: '#ffffff'
    }
  }
})