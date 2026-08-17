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
import { Link } from "react-router-dom"
import AuthLayout from "../components/auth/AuthLayout"

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        {/* Card */}

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl shadow-black/5 sm:p-8">

          {/* Header */}

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <User size={25} />
            </div>

            <h1 className="mt-6 text-2xl font-bold">
              ساخت حساب کاربری
            </h1>

            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              برای شروع استفاده از Shortify حساب خود را ایجاد کنید.
            </p>

          </div>


          {/* Form */}

          <form className="mt-8 space-y-5">

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
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  id="name"
                  type="text"
                  placeholder="نام خود را وارد کنید"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-11 text-sm outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
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
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-11 text-sm outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
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
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="حداقل ۸ کاراکتر"
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
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="رمز عبور را دوباره وارد کنید"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-11 pl-12 text-sm outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
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

            </div>


            {/* Terms */}

            <div className="flex items-start gap-2">

              <input
                id="terms"
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--border)] accent-[var(--primary)]"
              />

              <label
                htmlFor="terms"
                className="cursor-pointer text-xs leading-6 text-[var(--muted)]"
              >
                با{" "}
                <Link
                  to="/terms"
                  className="font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                >
                  قوانین و شرایط
                </Link>{" "}
                و{" "}
                <Link
                  to="/privacy"
                  className="font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                >
                  حریم خصوصی
                </Link>{" "}
                Shortify موافقم.
              </label>

            </div>


            {/* Submit */}

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)]"
            >
              ایجاد حساب

              <ArrowLeft size={17} />

            </button>

          </form>


          {/* Security Note */}

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-[var(--background)] p-4">

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-500/10">

              <Check
                size={15}
                className="text-green-500"
              />

            </div>

            <p className="text-xs leading-6 text-[var(--muted)]">
              اطلاعات حساب شما به صورت امن نگهداری خواهد شد.
            </p>

          </div>


          {/* Login */}

          <div className="mt-7 text-center">

            <p className="text-sm text-[var(--muted)]">

              قبلاً حساب ساخته‌اید؟

              <Link
                to="/login"
                className="mr-1 font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
              >
                وارد شوید
              </Link>

            </p>

          </div>

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

export default RegisterPage