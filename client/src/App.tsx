import { Navigate, Route, Routes } from 'react-router-dom'
import { Home, ManageAccount, Login, Register } from './pages'
import { RequireAuth } from './shared/contexts/auth/RequireAuth'
import './App.css'

export const App = () => {

  return (
    <Routes>
      <Route path='/' element={<RequireAuth><Home/></RequireAuth>}/>
      <Route path='/manage-account' element={<RequireAuth><ManageAccount/></RequireAuth>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='*' element={<Navigate to={'/'} />}/>
    </Routes>
  )
}
