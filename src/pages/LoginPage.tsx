import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import AuthLayout from "../components/auth/AuthLayout"

import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError("")

    if (!email.trim() || !password) {
      setError("ایمیل و رمز عبور را وارد کنید.")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || "ورود با خطا مواجه شد."
        )
      }

      Cookies.set(
        "access_token",
        data.access_token,
        {
          expires: 7,
          sameSite: "lax",
        }
      )

      navigate("/dashboard")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("خطایی در ورود رخ داد.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        {/* Card */}

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl shadow-black/5 sm:p-8">

          {/* Header */}

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <LockKeyhole size={25} />
            </div>

            <h1 className="mt-6 text-2xl font-bold">
              ورود به حساب
            </h1>

            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              برای ادامه وارد حساب Shortify خود شوید.
            </p>

          </div>


          {/* Form */}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                ایمیل
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@email.com"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-11 text-sm outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  رمز عبور
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </Link>

              </div>


              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="رمز عبور خود را وارد کنید"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-11 pl-12 text-sm outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  aria-label={
                    showPassword
                      ? "مخفی کردن رمز عبور"
                      : "نمایش رمز عبور"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* Remember */}

            <div className="flex items-center gap-2">

              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-[var(--border)] accent-[var(--primary)]"
              />

              <label
                htmlFor="remember"
                className="cursor-pointer text-xs text-[var(--muted)]"
              >
                مرا به خاطر بسپار
              </label>

            </div>

            {error && (
              <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {error}
              </p>
            )}


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "در حال ورود..." : "ورود"}

              {!loading && <ArrowLeft size={17} />}
            </button>

          </form>


          {/* Divider */}

          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-[var(--border)]" />

            <span className="text-xs text-[var(--muted)]">
              یا
            </span>

            <div className="h-px flex-1 bg-[var(--border)]" />

          </div>


          {/* Register */}

          <p className="text-center text-sm text-[var(--muted)]">

            حساب کاربری ندارید؟

            <Link
              to="/register"
              className="mr-1 font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
            >
              ثبت‌نام کنید
            </Link>

          </p>

        </div>


        {/* Back */}

        <div className="mt-6 text-center">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            بازگشت به صفحه اصلی

            <ArrowLeft size={14} />

          </Link>

        </div>

      </div>

    </AuthLayout>
  )
}

export default LoginPage