import { Box, Button, Card, CardActions, CardContent, Icon, IconButton, InputAdornment, LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { useAppThemeContext } from '../shared/contexts'
import { UsersService } from '../shared/services/api/users'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const registerSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null])
})

export const Register = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const [ isLoading, setIsLoading ] = useState(false)
  const {toggleTheme} = useAppThemeContext()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const navigate = useNavigate()

  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    registerSchema.validate({name, password, confirmPassword}, { abortEarly: false })
      .then(async (validData) => {

        const result = await UsersService.register({name: validData.name, password: validData.password})
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

        navigate('/login')
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
          if(error.path === 'confirmPassword'){
            setConfirmPasswordError(error.message)
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
          <Box width={300} display='flex' justifyContent='center' flexDirection='column' gap={3}>
            <Typography variant='h5' align='center'>
              Cadastro
            </Typography>

            <TextField fullWidth name='userName' label='Nome de usuário' type='text'
              value={name}
              error={!!nameError}
              disabled={isLoading}
              helperText={nameError}
              onChange={ev => setName(ev.currentTarget.value)}
              onKeyDown={() => setNameError('')}
            />
            <TextField fullWidth name='password' label='Senha'
              value={password}
              type={showPass ? 'text' : 'password'}
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
            <TextField fullWidth name='confirmPassword' label='Confirmar senha'
              value={confirmPassword}
              type={showConfirmPass ? 'text' : 'password'}
              error={!!confirmPasswordError}
              disabled={isLoading}
              helperText={confirmPasswordError}
              onChange={ev => setConfirmPassword(ev.currentTarget.value)}
              onKeyDown={() => setConfirmPasswordError('')}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='end'>
                    <IconButton
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                    >
                      {showConfirmPass ? <Visibility /> : <VisibilityOff />}
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
              Salvar
            </Button>

          </Box>
        </CardActions>

        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' paddingTop={1} paddingBottom={1}>
          <Typography variant='subtitle1'>
            Já possui uma conta? <Button variant='text' onClick={() => navigate('/login')}>Entrar</Button>
          </Typography>
        </Box>

        {isLoading && <LinearProgress variant='indeterminate'/>}

      </Card>

    </Box>
  )
}