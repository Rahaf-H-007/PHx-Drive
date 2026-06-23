import LoginForm from '../components/LoginForm'
import LoginHeader from '../components/LoginHeader'
import Logo from '../components/Logo'

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* form */}
      <LoginForm />
    </div>
  )
}
