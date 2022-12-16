import { Box, Button, Card, CardActions, CardContent, Icon, LinearProgress, Link, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import * as yup from 'yup'

import { useAppThemeContext } from '../shared/contexts'
import { UsersService } from '../shared/services/api/users'
import { ResponseError } from '../shared/types'

const loginSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  password: yup.string().min(8).required()
})

export const Login = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const {toggleTheme} = useAppThemeContext()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = async () => {

    const response = await UsersService.login({name, password})

    if(response instanceof ResponseError){
      alert(`Status: ${response.statusCode} - Message: ${response.message}`)
    }
  }

  return(
    <Box width='100vw' height='100vh' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>

      <Box position='absolute' top='0' right='0'>
        <List component='nav'>
          <ListItemButton onClick={toggleTheme} component={Paper}>
            <ListItemIcon>
              <Icon>dark_mode</Icon>
            </ListItemIcon>
            <ListItemText primary='Alternar tema' />
          </ListItemButton>
        </List>
      </Box>

      <Card>

        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h5' align='center'>
              Login
            </Typography>

            <TextField fullWidth label='Nome de usuário' type='text'
              value={name}
              error={!!nameError}
              disabled={isLoading}
              helperText={nameError}
              onChange={ev => setName(ev.currentTarget.value)}
              onKeyDown={() => setNameError('')}
            />
            <TextField fullWidth label='Senha' type='password'
              value={password}
              error={!!passwordError}
              disabled={isLoading}
              helperText={passwordError}
              onChange={ev => setPassword(ev.currentTarget.value)}
              onKeyDown={() => setPasswordError('')}
            />
          </Box>


        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>

            <Button disabled={isLoading} variant='contained' onClick={handleSubmit}>
              Entrar
            </Button>

          </Box>
        </CardActions>

        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' paddingTop={1} paddingBottom={1}>
          <Typography variant='caption'>
            Ainda não possui uma conta? <Link underline='hover' href='/register' >Cadastrar</Link>
          </Typography>
        </Box>

        {isLoading && <LinearProgress variant='indeterminate'/>}
      </Card>
    </Box>
  )
}