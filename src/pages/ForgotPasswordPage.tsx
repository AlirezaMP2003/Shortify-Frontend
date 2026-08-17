import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Mail,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import AuthLayout from "../components/auth/AuthLayout"

function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setEmailSent(true)
  }

  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl shadow-black/5 sm:p-8">

          {!emailSent ? (
            <>
              {/* Header */}

              <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  <KeyRound size={25} />
                </div>

                <h1 className="mt-6 text-2xl font-bold">
                  فراموشی رمز عبور
                </h1>

                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
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
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="example@email.com"
                      className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-11 text-sm outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)]"
                >
                  ارسال لینک بازیابی

                  <ArrowRight size={17} />

                </button>

              </form>


              {/* Back to Login */}

              <div className="mt-7 text-center">

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
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

              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                اگر حسابی با این ایمیل وجود داشته باشد،
                لینک بازیابی رمز عبور برای شما ارسال خواهد شد.
              </p>

              <div className="mt-6 rounded-2xl bg-[var(--background)] p-4 text-xs leading-6 text-[var(--muted)]">
                پوشه Spam یا Junk ایمیل خود را نیز بررسی کنید.
              </div>

              <Link
                to="/login"
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)]"
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
            className="inline-flex items-center gap-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            بازگشت به صفحه اصلی

            <ArrowRight size={14} />

          </Link>

        </div>

      </div>

    </AuthLayout>
  )
}

export default ForgotPasswordPage