import { Routes, Route } from "react-router-dom"
import ErrorPage from "../pages/Error"
import { Login } from "../pages/Login"
import { Signup } from "../pages/Signup"

export const Router = () => {

  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      
      {/* <Route path="about" element={<About />} /> */}

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
