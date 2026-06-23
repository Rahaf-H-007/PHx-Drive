import LoginButton from './LoginButton'
import LoginDemo from './LoginDemo'
import LoginHeader from './LoginHeader'
import Logo from './Logo'

export default function LoginForm() {
  return (
    <div className="mt-5 p-8 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-100 rounded-md shadow-[0_8px_48px_rgba(0,0,0,0.1)]">
      {/* first part */}
      <Logo />

      <LoginHeader />

      <form action="#" method="POST" className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
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
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#b31313] sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#b31313] sm:text-sm/6"
            />
          </div>
        </div>

        {/* button */}
        <LoginButton />
      </form>

      {/* login demo line */}
      <LoginDemo />
    </div>
  )
}
