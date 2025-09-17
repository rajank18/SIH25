// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"

import { SignIn } from "@clerk/clerk-react"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<SignIn path="/login" routing="path" signUpUrl="/register" />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
