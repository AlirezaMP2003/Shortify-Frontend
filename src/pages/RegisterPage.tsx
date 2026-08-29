import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import AuthLayout from "../components/auth/AuthLayout"

const API_BASE_URL = "http://localhost:8000"

function RegisterPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [termsAccepted, setTermsAccepted] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError("")

    if (!name.trim()) {
      setError("لطفاً نام خود را وارد کنید.")
      return
    }

    if (!email.trim()) {
      setError("لطفاً ایمیل خود را وارد کنید.")
      return
    }

    if (password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.")
      return
    }

    if (password !== confirmPassword) {
      setError("رمزهای عبور یکسان نیستند.")
      return
    }

    if (!termsAccepted) {
      setError("لطفاً قوانین و شرایط را بپذیرید.")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || "ثبت نام با خطا مواجه شد."
        )
      }

      Cookies.set("access_token", data.access_token, {
        expires: 7,
        sameSite: "lax",
      })

      navigate("/dashboard")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("خطایی در ثبت نام رخ داد.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-2xl shadow-black/5 sm:p-8">

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--primary)/10 text-(--primary)">
              <User size={25} />
            </div>

            <h1 className="mt-6 text-2xl font-bold">
              ساخت حساب کاربری
            </h1>

            <p className="mt-2 text-sm leading-7 text-(--muted)">
              برای شروع استفاده از Shortify حساب خود را ایجاد کنید.
            </p>

          </div>

          <form
            onSubmit={handleRegister}
            className="mt-8 space-y-5"
          >

            {/* Name */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                نام
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--muted)"
                />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="نام خود را وارد کنید"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-11 text-sm outline-none transition-all placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />

              </div>

            </div>


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
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--muted)"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="example@email.com"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-11 text-sm outline-none transition-all placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                رمز عبور
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--muted)"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="حداقل ۸ کاراکتر"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-11 pl-12 text-sm outline-none transition-all placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-(--muted) transition-colors hover:text-(--foreground)"
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


            {/* Confirm Password */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                تکرار رمز عبور
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--muted)"
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="رمز عبور را دوباره وارد کنید"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-11 pl-12 text-sm outline-none transition-all placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-(--muted) transition-colors hover:text-(--foreground)"
                  aria-label={
                    showConfirmPassword
                      ? "مخفی کردن رمز عبور"
                      : "نمایش رمز عبور"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {confirmPassword &&
                password !== confirmPassword && (
                  <p className="mt-2 text-xs text-red-500">
                    رمزهای عبور یکسان نیستند.
                  </p>
                )}

            </div>


            {/* Terms */}

            <div className="flex items-start gap-2">

              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) =>
                  setTermsAccepted(event.target.checked)
                }
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-(--border) accent-(--primary)"
              />

              <label
                htmlFor="terms"
                className="cursor-pointer text-xs leading-6 text-(--muted)"
              >
                با{" "}
                <Link
                  to="/terms"
                  className="font-medium text-(--primary) hover:text-(--primary-hover)"
                >
                  قوانین و شرایط
                </Link>{" "}
                و{" "}
                <Link
                  to="/privacy"
                  className="font-medium text-(--primary) hover:text-(--primary-hover)"
                >
                  حریم خصوصی
                </Link>{" "}
                Shortify موافقم.
              </label>

            </div>


            {/* Error */}

            {error && (
              <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-500">
                {error}
              </div>
            )}


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--primary) text-sm font-semibold text-white transition-all hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                "در حال ایجاد حساب..."
              ) : (
                <>
                  ایجاد حساب
                  <ArrowLeft size={17} />
                </>
              )}
            </button>

          </form>


          <div className="mt-6 flex items-start gap-3 rounded-xl bg-(--background) p-4">

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-500/10">

              <Check
                size={15}
                className="text-green-500"
              />

            </div>

            <p className="text-xs leading-6 text-(--muted)">
              اطلاعات حساب شما به صورت امن نگهداری خواهد شد.
            </p>

          </div>


          <div className="mt-7 text-center">

            <p className="text-sm text-(--muted)">

              قبلاً حساب ساخته‌اید؟

              <Link
                to="/login"
                className="mr-1 font-semibold text-(--primary) transition-colors hover:text-(--primary-hover)"
              >
                وارد شوید
              </Link>

            </p>

          </div>

        </div>


        <div className="mt-6 text-center">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-(--muted) transition-colors hover:text-(--foreground)"
          >
            بازگشت به صفحه اصلی

            <ArrowLeft size={14} />

          </Link>

        </div>

      </div>

    </AuthLayout>
  )
}

export default RegisterPage