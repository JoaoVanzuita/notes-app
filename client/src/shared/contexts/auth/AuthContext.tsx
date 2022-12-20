import { createContext, useContext, useEffect, useState } from 'react'
import { ResponseError } from '../../services/api/errors'
import { UsersService } from '../../services/api/users'
import { User } from '../../types'

export type TAuthContext = {
  isAuthenticated: boolean
  getLoggedIn: () => Promise<User | ResponseError>
  signin: (email: string, password: string) => Promise<ResponseError | void>
  signout: () => Promise<ResponseError | void>
}

export const AuthContext = createContext({} as TAuthContext)

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {

    UsersService.getLoggedIn().then(result => {

      setIsAuthenticated(!(result instanceof ResponseError))
    })
  }, [])

  const signin = async (name: string, password: string) => {
    const result = await UsersService.login({ name, password })

    if(result){
      setIsAuthenticated(false)
      return result
    }

    setIsAuthenticated(true)
  }

  const signout = async () => {

    const result = await UsersService.logout()

    if(!result){
      setIsAuthenticated(false)
      return
    }

    if(result.statusCode === 401){
      setIsAuthenticated(false)
      return
    }

    setIsAuthenticated(true)
    return result
  }

  const getLoggedIn = async () => await UsersService.getLoggedIn()

  return (
    <AuthContext.Provider value={ {isAuthenticated, getLoggedIn, signin, signout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}