import { Routes, Route } from "react-router-dom"
import ErrorPage from "../pages/Error"
import { Login } from "../pages/Login"
import { Signup } from "../pages/Signup"

export const Router = () => {

  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
