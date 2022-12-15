import { createTheme } from '@mui/material'

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#7066E0',
      dark: '#5c50de',
      light: '#766dde',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f6f3',
      paper: '#ffffff'
    }
  }
})