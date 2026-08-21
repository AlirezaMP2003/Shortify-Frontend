import {
  Check,
  Eye,
  EyeOff,
  Lock,
  Moon,
  Save,
  Sun,
  Trash2,
  User,
} from "lucide-react"

import { useState } from "react"

import { useTheme } from "../../contexts/ThemeContext"


function Settings() {
  const { theme, setTheme } = useTheme()

  const [name, setName] = useState("کاربر Shortify")
  const [email, setEmail] = useState("user@example.com")

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false)

  const [showNewPassword, setShowNewPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [saved, setSaved] = useState(false)


  const handleSaveProfile = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }


  const handleChangePassword = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      return
    }

    if (newPassword !== confirmPassword) {
      return
    }

    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }


  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید حساب کاربری خود را حذف کنید؟ این عملیات قابل بازگشت نیست."
    )

    if (!confirmed) {
      return
    }

    console.log("Delete account")
  }


  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-2xl font-bold sm:text-3xl">
            تنظیمات
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            اطلاعات حساب و تنظیمات پنل کاربری خود را مدیریت کنید.
          </p>

        </div>


        {/* Profile */}

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

              <User size={21} />

            </div>


            <div>

              <h2 className="font-bold">
                اطلاعات حساب
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                اطلاعات شخصی حساب خود را مدیریت کنید.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleSaveProfile}
            className="mt-6 space-y-5"
          >

            {/* Name */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                نام
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-sm outline-none transition-colors focus:border-[var(--primary)]"
              />

            </div>


            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                ایمیل
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                dir="ltr"
                className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-left text-sm outline-none transition-colors focus:border-[var(--primary)]"
              />

            </div>


            <div className="flex justify-end">

              <button
                type="submit"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
              >

                {saved ? (
                  <>
                    <Check size={16} />
                    ذخیره شد
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    ذخیره تغییرات
                  </>
                )}

              </button>

            </div>

          </form>

        </section>


        {/* Password */}

        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

              <Lock size={21} />

            </div>


            <div>

              <h2 className="font-bold">
                تغییر رمز عبور
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                برای امنیت بیشتر، از یک رمز عبور قوی استفاده کنید.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleChangePassword}
            className="mt-6 space-y-5"
          >

            {/* Current Password */}

            <div>

              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-medium"
              >
                رمز عبور فعلی
              </label>

              <div className="relative">

                <input
                  id="currentPassword"
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(
                      event.target.value
                    )
                  }
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 pl-12 text-left text-sm outline-none transition-colors focus:border-[var(--primary)]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-hover)]"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

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

                <input
                  id="newPassword"
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(
                      event.target.value
                    )
                  }
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 pl-12 text-left text-sm outline-none transition-colors focus:border-[var(--primary)]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-hover)]"
                >
                  {showNewPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
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
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 pl-12 text-left text-sm outline-none transition-colors focus:border-[var(--primary)]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-hover)]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
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


            <div className="flex justify-end">

              <button
                type="submit"
                disabled={
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword
                }
                className="h-11 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                تغییر رمز عبور
              </button>

            </div>

          </form>

        </section>


        {/* Appearance */}

        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

              {theme === "dark" ? (
                <Moon size={21} />
              ) : (
                <Sun size={21} />
              )}

            </div>


            <div>

              <h2 className="font-bold">
                ظاهر برنامه
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                حالت نمایش پنل را انتخاب کنید.
              </p>

            </div>

          </div>


          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Light */}

            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex items-center gap-4 rounded-xl border p-4 text-right transition-colors ${
                theme === "light"
                  ? "border-[var(--primary)] bg-[var(--primary)]/5"
                  : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
              }`}
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-700 shadow-sm">
                <Sun size={18} />
              </div>


              <div className="flex-1">

                <p className="text-sm font-medium">
                  حالت روشن
                </p>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  مناسب استفاده در طول روز
                </p>

              </div>


              {theme === "light" && (
                <Check
                  size={18}
                  className="text-[var(--primary)]"
                />
              )}

            </button>


            {/* Dark */}

            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-4 rounded-xl border p-4 text-right transition-colors ${
                theme === "dark"
                  ? "border-[var(--primary)] bg-[var(--primary)]/5"
                  : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
              }`}
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-sm">
                <Moon size={18} />
              </div>


              <div className="flex-1">

                <p className="text-sm font-medium">
                  حالت تاریک
                </p>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  مناسب استفاده در شب
                </p>

              </div>


              {theme === "dark" && (
                <Check
                  size={18}
                  className="text-[var(--primary)]"
                />
              )}

            </button>

          </div>

        </section>

        {/* Danger Zone */}

        <section className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            {/* Icon */}

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">

              <Trash2 size={21} />

            </div>


            {/* Content */}

            <div className="min-w-0 flex-1">

              <h2 className="font-bold text-red-500">
                حذف حساب کاربری
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                با حذف حساب، تمام لینک‌ها، آمار و اطلاعات
                حساب شما حذف خواهند شد. این عملیات قابل بازگشت نیست.
              </p>


              {/* Action */}

              <div className="mt-5">

                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 px-5 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 sm:w-auto"
                >
                  <Trash2 size={16} />
                  حذف حساب
                </button>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  )
}

export default Settings