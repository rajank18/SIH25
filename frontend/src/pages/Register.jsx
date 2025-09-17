// register.jsx
import React from 'react'
import { SignUp } from '@clerk/clerk-react'

export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp path="/register" routing="path" signInUrl="/login" />
    </div>
  )
}
