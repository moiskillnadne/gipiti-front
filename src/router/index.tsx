import { Routes, Route, Navigate } from 'react-router-dom'
import ErrorPage from '../pages/Error'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
