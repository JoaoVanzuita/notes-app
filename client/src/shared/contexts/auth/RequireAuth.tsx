import { Login } from '../../../pages'
import { useAuthContext } from './AuthContext'

interface IRequireAuthProps {
  children: React.ReactNode
}

export const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext()

  if(isAuthenticated){
    return<>{children}</>
  }

  return <Login />
}