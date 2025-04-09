
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import { Route, Routes } from 'react-router-dom'

const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default AuthRoutes
