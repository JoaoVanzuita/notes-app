import { Box, Icon, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useAppThemeContext } from '../contexts'

interface IBasePageLayoutProps{
  children: React.ReactNode
  title: string
  toolbar?: React.ReactNode
}

export const BasePageLayout: React.FC<IBasePageLayoutProps> = ({children, title, toolbar}) => {
  const theme = useTheme()
  const { toggleTheme }  = useAppThemeContext()

  return(
    <Box height='100%' display='flex' flexDirection='column' gap={1}>

      <Box position='absolute' top='5px' right='10px'>
        <List component='nav'>
          <ListItemButton onClick={toggleTheme} component={Paper}>
            <ListItemIcon>
              <Icon>dark_mode</Icon>
            </ListItemIcon>
            <ListItemText primary='Alternar tema' />
          </ListItemButton>
        </List>
      </Box>

      <Box padding={1} height={theme.spacing(12)} display='flex' alignItems='center' gap={1}>

        <Typography
          paddingLeft={5}
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='elipses'
          variant='h4'
        >
          {title}
        </Typography>

      </Box>

      {toolbar && <Box>
        {toolbar}
      </Box>}

      <Box flex={1} overflow='auto' justifyContent='center' display='flex'>
        {children}
      </Box>

    </Box>
  )
}