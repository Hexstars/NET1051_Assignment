import Home from "./Admin/layouts/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LogIn from "./Admin/layouts/pages/Authentication/LogIn"

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/*Các route con nằm trong Index*/}
          <Route path="/" element={<LogIn />}>
          
          </Route>
          
          <Route path="/log-in" element={<LogIn />}/>
          
          {/*Các route không nằm trong Index*/}
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>
  )
}

