import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import AuthLayout from "../components/auth/AuthLayout"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const emailFromUrl = searchParams.get("email") || ""

  const [email, setEmail] = useState(emailFromUrl)
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError("")

    if (!email.trim()) {
      setError("لطفاً ایمیل خود را وارد کنید.")
      return
    }

    if (!resetCode.trim()) {
      setError("لطفاً کد بازیابی را وارد کنید.")
      return
    }

    if (resetCode.trim().length !== 6) {
      setError("کد بازیابی باید ۶ رقمی باشد.")
      return
    }

    if (!newPassword) {
      setError("لطفاً رمز عبور جدید را وارد کنید.")
      return
    }

    if (newPassword.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.")
      return
    }

    if (!confirmPassword) {
      setError("لطفاً تکرار رمز عبور را وارد کنید.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("رمزهای عبور یکسان نیستند.")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            reset_code: resetCode.trim(),
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "تغییر رمز عبور با خطا مواجه شد."
        )
      }

      setSuccess(true)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("خطایی در تغییر رمز عبور رخ داد.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout>

        <div className="w-full max-w-md">

          <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-2xl shadow-black/5 sm:p-8">

            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
                <CheckCircle2 size={30} />
              </div>

              <h1 className="mt-6 text-2xl font-bold">
                رمز عبور تغییر کرد
              </h1>

              <p className="mt-3 text-sm leading-7 text-(--muted)">
                رمز عبور شما با موفقیت تغییر کرد.
                اکنون می‌توانید با رمز عبور جدید وارد حساب خود شوید.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--primary) text-sm font-semibold text-white transition-all hover:bg-(--primary-hover)"
              >
                ورود به حساب

                <ArrowRight size={17} />
              </button>

            </div>

          </div>

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

      </AuthLayout>
    )
  }

  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-2xl shadow-black/5 sm:p-8">

          {/* Header */}

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--primary)/10 text-(--primary)">
              <KeyRound size={25} />
            </div>

            <h1 className="mt-6 text-2xl font-bold">
              تغییر رمز عبور
            </h1>

            <p className="mt-3 text-sm leading-7 text-(--muted)">
              کد بازیابی ارسال‌شده را وارد کنید و
              رمز عبور جدید خود را تعیین کنید.
            </p>

          </div>


          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

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
                  name="email"
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


            {/* Reset Code */}

            <div>

              <label
                htmlFor="resetCode"
                className="mb-2 block text-sm font-medium"
              >
                کد بازیابی
              </label>

              <div className="relative">

                <KeyRound
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--muted)"
                />

                <input
                  id="resetCode"
                  name="resetCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={resetCode}
                  onChange={(event) =>
                    setResetCode(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="کد ۶ رقمی"
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-11 text-left text-sm tracking-[0.3em outline-none transition-all placeholder:text-(--muted) placeholder:tracking-normal focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />

              </div>

            </div>


            {/* New Password */}

            <div>

              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium"
              >
                رمز عبور جدید
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--muted)"
                />

                <input
                  id="newPassword"
                  name="newPassword"
                  type={
                    showNewPassword ? "text" : "password"
                  }
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(event.target.value)
                  }
                  placeholder="حداقل ۸ کاراکتر"
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-11 pl-12 text-left text-sm outline-none transition-all placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((prev) => !prev)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-(--muted) transition-colors hover:text-(--foreground)"
                  aria-label={
                    showNewPassword
                      ? "مخفی کردن رمز عبور"
                      : "نمایش رمز عبور"
                  }
                >
                  {showNewPassword ? (
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
                تکرار رمز عبور جدید
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--muted)"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="رمز عبور را دوباره وارد کنید"
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-11 pl-12 text-left text-sm outline-none transition-all placeholder:text-(--muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
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
                newPassword !== confirmPassword && (
                  <p className="mt-2 text-xs text-red-500">
                    رمزهای عبور یکسان نیستند.
                  </p>
                )}

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
              disabled={
                loading ||
                !email.trim() ||
                !resetCode.trim() ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--primary) text-sm font-semibold text-white transition-all hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                "در حال تغییر رمز عبور..."
              ) : (
                <>
                  تغییر رمز عبور
                  <ArrowRight size={17} />
                </>
              )}
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

    </AuthLayout>
  )
}

export default ResetPasswordPage
