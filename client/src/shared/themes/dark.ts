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
      default: '#202124',
      paper: '#303134'
    }
  },
  typography: {
    allVariants: {
      color: '#ffffff'
    }
  }
})