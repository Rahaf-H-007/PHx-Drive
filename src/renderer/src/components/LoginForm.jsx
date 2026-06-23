import LoginButton from './LoginButton'

export default function LoginForm() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        <span className="font-bold">Demo:</span> rahaf.hazem@pharaonx.com / PHx2026!
      </p>
    </div>
  )
}
