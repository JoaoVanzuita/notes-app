import { Card, CardContent, Box, Typography, TextField, CardActions, Button, LinearProgress, useTheme } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toolbar } from '../shared/components'
import { useAuthContext } from '../shared/contexts/auth/AuthContext'
import { BasePageLayout } from '../shared/layouts/BasePageLayout'
import { ResponseError } from '../shared/services/api/errors'
import { UsersService } from '../shared/services/api/users'
import Swal from 'sweetalert2'
import YupPassword from 'yup-password'
import * as yup from 'yup'
YupPassword(yup)

const updateAccountSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'As senhas não coincidem')
})

export const ManageAccount = () => {
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

  const fetchUser = useCallback(async () => {

    setIsLoading(true)

    const result = await getLoggedIn()

    if(result instanceof ResponseError){
      alert('error')
      return
    }

    setIsLoading(false)
    setName(result.name)

  },[])

  useEffect(() => {
    fetchUser()
  },[])

  const handleSubmit = useCallback(async () => {
    setIsLoading(true)

    updateAccountSchema.validate({name, password, confirmPassword}, { abortEarly: false })
      .then(async (validData) => {

        const result = await UsersService.updateById({name: validData.name, password: validData.password})
        setIsLoading(false)

        if(result instanceof ResponseError){

          Swal.fire({
            titleText: `Ocorreu um erro - Código: ${result.statusCode}`,
            text: result.message.toString(),
            icon: 'error',
            background: alertBackground,
            color: alertColor
          })

          return
        }

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
  },[])

  return(
    <BasePageLayout
      title='Gerenciar conta'
      toolbar={<Toolbar
        showButtonSave
        showButtonBack
        showButtonExit

        onClickButtonBack={() => navigate('/home')}
      />}
    >

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
              <TextField fullWidth name='password' label='Senha' type='password'
                value={password}
                error={!!passwordError}
                disabled={isLoading}
                helperText={passwordError}
                onChange={ev => setPassword(ev.currentTarget.value)}
                onKeyDown={() => setPasswordError('')}
              />
              <TextField fullWidth name='confirmPassword' label='Confirmar senha' type='password'
                value={confirmPassword}
                error={!!confirmPasswordError}
                disabled={isLoading}
                helperText={confirmPasswordError}
                onChange={ev => setConfirmPassword(ev.currentTarget.value)}
                onKeyDown={() => setConfirmPasswordError('')}
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
    </BasePageLayout>
  )
}