import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Mail,
} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../components/auth/AuthLayout"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false)

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [showCodeModal, setShowCodeModal] = useState(false)
  const [resetCode, setResetCode] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError("")

    if (!email.trim()) {
      setError("لطفاً ایمیل خود را وارد کنید.")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "درخواست بازیابی رمز عبور با خطا مواجه شد."
        )
      }

      setResetCode(data.reset_code)
      setShowCodeModal(true)

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(
          "خطایی در درخواست بازیابی رمز عبور رخ داد."
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-2xl shadow-black/5 sm:p-8">

          {!emailSent ? (
            <>
              {/* Header */}

              <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--primary)/10 text-(--primary)">
                  <KeyRound size={25} />
                </div>

                <h1 className="mt-6 text-2xl font-bold">
                  فراموشی رمز عبور
                </h1>

                <p className="mt-3 text-sm leading-7 text-(--muted)">
                  ایمیل حساب کاربری خود را وارد کنید تا
                  لینک بازیابی رمز عبور برای شما ارسال شود.
                </p>

              </div>


              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

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
                      name="email"
                      type="email"
                      value={email}
                      required
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="example@email.com"
                      className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-11 text-sm outline-none transition-all placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--primary) text-sm font-semibold text-white transition-all hover:bg-(--primary-hover)"
                >
                  ارسال لینک بازیابی

                  <ArrowRight size={17} />

                </button>

              </form>


              {/* Back to Login */}

              <div className="mt-7 text-center">

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-(--primary) transition-colors hover:text-(--primary-hover)"
                >
                  بازگشت به صفحه ورود

                  <ArrowRight size={15} />

                </Link>

              </div>
            </>
          ) : (

            /* Success State */

            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
                <CheckCircle2 size={30} />
              </div>

              <h1 className="mt-6 text-2xl font-bold">
                ایمیل ارسال شد
              </h1>

              <p className="mt-3 text-sm leading-7 text-(--muted)">
                اگر حسابی با این ایمیل وجود داشته باشد،
                لینک بازیابی رمز عبور برای شما ارسال خواهد شد.
              </p>

              <div className="mt-6 rounded-2xl bg-(--background) p-4 text-xs leading-6 text-(--muted)">
                پوشه Spam یا Junk ایمیل خود را نیز بررسی کنید.
              </div>

              <Link
                to="/login"
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--primary) text-sm font-semibold text-white transition-all hover:bg-(--primary-hover)"
              >
                بازگشت به ورود

                <ArrowRight size={17} />

              </Link>

            </div>

          )}

        </div>


        {/* Back to Home */}

        <div className="mt-6 text-center">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-(--muted) transition-colors hover:text-(--foreground)"
          >
            بازگشت به صفحه اصلی

            <ArrowRight size={14} />

          </Link>

        </div>

      </div>


      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-2xl">

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--primary)/10 text-(--primary)">
                <KeyRound size={25} />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                کد بازیابی رمز عبور
              </h2>

              <p className="mt-2 text-sm leading-6 text-(--muted)">
                کد زیر را کپی کنید و در مرحله بعد وارد کنید.
              </p>

            </div>


            <div className="mt-6 rounded-2xl bg-(--background) p-5 text-center">

              <p
                dir="ltr"
                className="select-all text-3xl font-bold tracking-[0.4em"
              >
                {resetCode}
              </p>

            </div>


            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(resetCode)
              }}
              className="mt-4 h-11 w-full rounded-xl border border-(--border) text-sm font-medium transition-colors hover:bg-(--surface-hover)"
            >
              کپی کردن کد
            </button>


            <button
              type="button"
              onClick={() => {
                setShowCodeModal(false)

                navigate(
                  `/reset-password`
                )
              }}
              className="mt-3 h-12 w-full rounded-xl bg-(--primary) text-sm font-semibold text-white transition-colors hover:bg-(--primary-hover)"
            >
              ادامه و تغییر رمز عبور
            </button>

          </div>

        </div>
      )}

    </AuthLayout>
  )
}

export default ForgotPasswordPage