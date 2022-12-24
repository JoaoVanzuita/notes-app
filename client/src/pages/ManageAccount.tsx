import { Box, Card, CardContent, Typography, TextField, CardActions, Button, LinearProgress, useTheme, IconButton, InputAdornment, Alert, Grid, Snackbar } from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../shared/contexts/auth/AuthContext'
import { BasePageLayout } from '../shared/layouts/BasePageLayout'
import { ResponseError } from '../shared/services/api/errors'
import { UsersService } from '../shared/services/api/users'
import { Toolbar } from '../shared/components'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Swal from 'sweetalert2'
import * as yup from 'yup'

const updateAccountSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null])
})

export const ManageAccount = () => {
  const { signout } = useAuthContext()
  const theme = useTheme()
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const { getLoggedIn } = useAuthContext()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const fetchUser = useCallback(async () => {

    setIsLoading(true)

    const result = await getLoggedIn()

    if(result instanceof ResponseError){

      Swal.fire({
        titleText: `Ocorreu um erro - Código: ${result.statusCode}`,
        text: result.message,
        icon: 'error',
        background: alertBackground,
        color: alertColor
      })

      return
    }

    setIsLoading(false)
    setName(result.name)

  },[])

  useEffect(() => {
    fetchUser()
  },[])

  const handleSubmit = async () => {
    setIsLoading(true)

    updateAccountSchema.validate({name, password, confirmPassword}, { abortEarly: false })
      .then(async (validData) => {

        const result = await UsersService.updateById({name: validData.name, password: validData.password})
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

        setShowSuccessAlert(true)
        fetchUser()
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

  const handleDeleteAccount = async () => {

    await Swal.fire({
      titleText: 'Tem certeza de que deseja excluir sua conta?',
      text: 'Suas notas serão excluídas e você não poderá recuperá-las',
      icon: 'warning',
      background: alertBackground,
      color: alertColor,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir'
    }).then(async (result) => {

      if(result.isConfirmed){
        const resultDelete = await UsersService.deleteById()

        if(resultDelete instanceof ResponseError){
          Swal.fire({
            titleText: `Ocorreu um erro - Código: ${resultDelete.statusCode}`,
            text: resultDelete.message,
            icon: 'error',
            background: alertBackground,
            color: alertColor
          })
          return
        }

        const resultLogout = await signout()

        if(resultLogout){

          if(resultLogout instanceof ResponseError){
            Swal.fire({
              titleText: `Ocorreu um erro - Código: ${resultLogout.statusCode}`,
              text: resultLogout.message,
              icon: 'error',
              background: alertBackground,
              color: alertColor
            })
            navigate('/login')
          }
        }
      }
    })
  }

  return(
    <BasePageLayout
      title='Gerenciar conta'
      toolbar={<Toolbar
        showButtonBack
        showButtonDelete

        onClickButtonDeleteAccount={handleDeleteAccount}
        onClickButtonBack={() => navigate('/home')}
      />}
    >
      <Grid container display='flex' alignItems='center' justifyContent='center' alignContent='center' >
        <Snackbar open={showSuccessAlert} autoHideDuration={3000} onClose={() => setShowSuccessAlert(false)}>
          <Alert onClose={() => setShowSuccessAlert(false)} severity='success' sx={{ width: '100%' }}>
          Informações atualizadas com sucesso!
          </Alert>
        </Snackbar>

        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>

          <Card>

            <CardContent>
              <Box width={300} display='flex' justifyContent='center' flexDirection='column' gap={3}>
                <Typography variant='h5' align='center'>
                Gerenciar conta
                </Typography>

                <TextField fullWidth name='name' label='Nome de usuário' type='text'
                  value={name}
                  error={!!nameError}
                  disabled={isLoading}
                  helperText={nameError}
                  onChange={ev => setName(ev.currentTarget.value)}
                  onKeyDown={() => setNameError('')}
                />
                <TextField fullWidth name='password' label='Senha'
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
                <TextField fullWidth name='confirmPassword' label='Confirmar senha'
                  type={showConfirmPass ? 'text' : 'password'}
                  value={confirmPassword}
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

            {isLoading && <LinearProgress variant='indeterminate'/>}

          </Card>

        </Box>
      </Grid>
    </BasePageLayout>
  )
}