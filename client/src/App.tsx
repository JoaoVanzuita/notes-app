import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from './shared/contexts/auth/RequireAuth'
import { Home, Login, ManageAccount, Register } from './pages'

export const App = () => {

  return (
    <Routes>
      <Route path='/' element={<RequireAuth><Home/></RequireAuth>}/>
      <Route path='/manage-account' element={<RequireAuth><ManageAccount/></RequireAuth>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}
