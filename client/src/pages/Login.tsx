import { Box, Button, Card, CardActions, CardContent, Icon, IconButton, InputAdornment, LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppThemeContext } from '../shared/contexts'
import { useAuthContext } from '../shared/contexts/auth/AuthContext'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const loginSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  password: yup.string().min(8).required()
})

export const Login = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const authService = useAuthContext()
  const [ isLoading, setIsLoading ] = useState(false)
  const {toggleTheme} = useAppThemeContext()

  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [showPass, setShowPass] = useState(false)


  const handleSubmit = async () => {
    setIsLoading(true)

    loginSchema.validate({name, password}, { abortEarly: false })
      .then(async (validData) => {

        const result = await authService.signin(validData.name, validData.password)
        setIsLoading(false)

        if(result){

          Swal.fire({
            titleText: `Ocorreu um erro - Código: ${result.statusCode}`,
            text: result.message,
            icon: 'error',
            background: alertBackground,
            color: alertColor
          })

          return
        }

        navigate('/')
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false)

        errors.inner.forEach(error => {
          if(error.path === 'name'){
            setNameError(error.message)
          }
          if(error.path === 'password'){
            setPasswordError(error.message)
          }
        })
      })
  }

  return(
    <Box width='100vw' height='100vh' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>

      <Box position='absolute' top='0' right='0' padding={1}>
        <List component='nav'>
          <ListItemButton onClick={toggleTheme} component={Paper}>
            <ListItemIcon>
              <Icon>dark_mode</Icon>
            </ListItemIcon>
            {!smDown && <ListItemText primary='Alternar tema'/>}
          </ListItemButton>
        </List>
      </Box>

      <Card>

        <CardContent>
          <Box width='100%' display='flex' justifyContent='center' flexDirection='column' gap={3}>
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
            <TextField fullWidth label='Senha'
              type={showPass ? 'text' : 'password'}
              value={password}
              error={!!passwordError}
              disabled={isLoading}
              helperText={passwordError}
              onChange={ev => setPassword(ev.currentTarget.value)}
              onKeyDown={() => setPasswordError('')}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='end'>
                    <IconButton
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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

        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' padding={1}>
          <Typography variant='subtitle1'>
            Ainda não possui uma conta? <Button variant='text' onClick={() => navigate('/register')}>Cadastrar</Button>
          </Typography>
        </Box>

        {isLoading && <LinearProgress variant='indeterminate'/>}
      </Card>
    </Box>
  )
}