import { Box, Icon, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useAppThemeContext } from '../contexts'

interface IBasePageLayoutProps{
  children: React.ReactNode
  title: string
  toolbar?: React.ReactNode
}

export const BasePageLayout: React.FC<IBasePageLayoutProps> = ({children, title, toolbar}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { toggleTheme }  = useAppThemeContext()


  return(
    <Box height='100%' display='flex' flexDirection='column' gap={1}>

      <Box display='flex'
        gap={1}
        alignItems='center'
        justifyContent='space-between'>


        <Box padding={1} height={theme.spacing(smDown ? 6 : 8)} display='flex' alignItems='center' gap={1}>

          <Typography
            paddingLeft={theme.spacing(smDown ? 4 : 6)}
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='elipses'
            variant='h4'
          >
            {title}
          </Typography>

        </Box>
        <Box padding={1}>
          <List component='nav'>
            <ListItemButton onClick={toggleTheme} component={Paper}>
              <ListItemIcon>
                <Icon>dark_mode</Icon>
              </ListItemIcon>
              {!smDown && <ListItemText primary='Alternar tema'/>}
            </ListItemButton>
          </List>
        </Box>
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