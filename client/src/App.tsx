import { Navigate, Route, Routes } from 'react-router-dom'
import { Home, ManageAccount, Login, Register } from './pages'
import { RequireAuth } from './shared/contexts/auth/RequireAuth'
import { useAuthContext } from './shared/contexts/auth/AuthContext'
import './App.css'

export const App = () => {
  const { isAuthenticated } = useAuthContext()

  return (
    <Routes>
      <Route path='/' element={<RequireAuth><Home/></RequireAuth>}/>
      <Route path='/manage-account' element={<RequireAuth><ManageAccount/></RequireAuth>}/>
      {!isAuthenticated && <Route path='/login' element={<Login/>}/>}
      {!isAuthenticated && <Route path='/register' element={<Register/>}/>}
      <Route path='*' element={<Navigate to={'/'} />}/>
    </Routes>
  )
}