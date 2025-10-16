import { Outlet } from "react-router-dom"
import Navbar from "../../feature/Navbar"

export const AppLayout = () => {

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}