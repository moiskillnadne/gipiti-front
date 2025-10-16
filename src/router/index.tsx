import { Routes, Route, Navigate } from 'react-router-dom'
import ErrorPage from '../pages/Error'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { PrivateRoute } from '../feature/PrivateRoute'
import { AppLayout } from '../widget/AppLayout'

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path='/protected' element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="profile" element={<div>Profile</div>} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
