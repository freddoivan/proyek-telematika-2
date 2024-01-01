import Login from '@/components/Login'
import LoginLayout from '@/components/LoginLayout'
import React from 'react'
import withAuth from '@/components/hoc/withAuth'


export default withAuth(LoginPage, 'auth')
function LoginPage() {
  return <LoginLayout>
    <Login />
  </LoginLayout>
}
