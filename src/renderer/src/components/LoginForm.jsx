import { useNavigate } from 'react-router-dom'
import LoginButton from './LoginButton'
import LoginDemo from './LoginDemo'
import LoginHeader from './LoginHeader'
import Logo from './Logo'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function LoginForm() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      const result = await window.api.login(email, password)

      if (!result.success) {
        throw new Error(result.error || 'Login failed')
      }

      setUser({ user: result.user, owner: result.owner })
      navigate('/settings', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="mt-5 p-8 sm:mx-auto sm:w-full sm:max-w-sm border border-base-200 rounded-md shadow-[0_8px_48px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_48px_rgba(255,255,255,0.06)]">
      <Logo />
      <LoginHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-base-content">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@pharaonx.com"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md bg-base-100 px-3 py-1.5 text-base text-base-content outline-1 -outline-offset-1 outline-base-300 placeholder:text-base-content/40 focus:outline-2 focus:-outline-offset-2 focus:outline-[#b31313] sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-base-content">
              Password
            </label>
          </div>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md bg-base-100 px-3 py-1.5 pr-10 text-base text-base-content outline-1 -outline-offset-1 outline-base-300 placeholder:text-base-content/40 focus:outline-2 focus:-outline-offset-2 focus:outline-[#b31313] sm:text-sm/6"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50 hover:text-base-content/70"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <LoginButton isLoading={isLoading} />
      </form>

      <LoginDemo />
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  )
}
