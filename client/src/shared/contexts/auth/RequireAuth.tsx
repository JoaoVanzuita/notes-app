import { Login } from '../../../pages'

interface IRequireAuthProps {
  children: React.ReactNode
}

export const RequireAuth: React.FC<IRequireAuthProps> = ({ children } ) => {

  //TODO: verificar se usuário está logado com isAuthenticated de AuthContext

  return <Login />
}