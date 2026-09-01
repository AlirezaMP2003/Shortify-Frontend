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
  X,
} from "lucide-react"

import { useEffect, useState } from "react"

import Cookies from "js-cookie"

import { useTheme } from "../../contexts/ThemeContext"


interface MeResponse {
  id: string
  name: string
  email: string
}


interface ApiErrorResponse {
  detail?: string
}


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


function Settings() {

  const { theme, setTheme } = useTheme()



  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [profileLoading, setProfileLoading] =
    useState(true)

  const [profileSaving, setProfileSaving] =
    useState(false)

  const [profileError, setProfileError] =
    useState("")

  const [profileSuccess, setProfileSuccess] =
    useState("")


  const [currentPassword, setCurrentPassword] =
    useState("")

  const [newPassword, setNewPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")


  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false)

  const [showNewPassword, setShowNewPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)


  const [passwordLoading, setPasswordLoading] =
    useState(false)

  const [passwordError, setPasswordError] =
    useState("")

  const [passwordSuccess, setPasswordSuccess] =
    useState("")



  const [showDeleteModal, setShowDeleteModal] =
    useState(false)

  const [deleteLoading, setDeleteLoading] =
    useState(false)

  const [deleteError, setDeleteError] =
    useState("")




  useEffect(() => {

    const loadProfile = async () => {

      try {

        setProfileLoading(true)
        setProfileError("")


        const token =
          Cookies.get("access_token")


        if (!token) {

          throw new Error(
            "دسترسی شما منقضی شده است. لطفاً دوباره وارد شوید."
          )

        }


        const response = await fetch(
          `${API_BASE_URL}/api/v1/auth/me`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            credentials: "include",
          }
        )


        const data: MeResponse | ApiErrorResponse =
          await response.json()


        if (!response.ok) {

          throw new Error(
            "detail" in data && data.detail
              ? data.detail
              : "دریافت اطلاعات حساب با خطا مواجه شد."
          )

        }


        const user =
          data as MeResponse


        setName(user.name)
        setEmail(user.email)

      } catch (error) {

        if (error instanceof Error) {

          setProfileError(
            error.message
          )

        } else {

          setProfileError(
            "خطایی در دریافت اطلاعات حساب رخ داد."
          )

        }

      } finally {

        setProfileLoading(false)

      }

    }


    loadProfile()

  }, [])



  const handleSaveProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()


    setProfileError("")
    setProfileSuccess("")


    if (!name.trim() || !email.trim()) {

      setProfileError(
        "نام و ایمیل را وارد کنید."
      )

      return

    }


    try {

      setProfileSaving(true)


      const token =
        Cookies.get("access_token")


      if (!token) {

        throw new Error(
          "دسترسی شما منقضی شده است. لطفاً دوباره وارد شوید."
        )

      }


      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/profile`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          credentials: "include",

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
          }),
        }
      )


      const data:
        MeResponse | ApiErrorResponse =
        await response.json()


      if (!response.ok) {

        throw new Error(
          "detail" in data && data.detail
            ? data.detail
            : "ذخیره اطلاعات حساب با خطا مواجه شد."
        )

      }



      const user =
        data as MeResponse


      setName(user.name)
      setEmail(user.email)


      setProfileSuccess(
        "اطلاعات حساب با موفقیت ذخیره شد."
      )

    } catch (error) {

      if (error instanceof Error) {

        setProfileError(
          error.message
        )

      } else {

        setProfileError(
          "خطایی در ذخیره اطلاعات حساب رخ داد."
        )

      }

    } finally {

      setProfileSaving(false)

    }

  }



  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()


    setPasswordError("")
    setPasswordSuccess("")



    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      setPasswordError(
        "لطفاً تمام فیلدهای رمز عبور را وارد کنید."
      )

      return

    }



    if (newPassword.length < 8) {

      setPasswordError(
        "رمز عبور جدید باید حداقل ۸ کاراکتر باشد."
      )

      return

    }


    if (
      newPassword !== confirmPassword
    ) {

      setPasswordError(
        "رمزهای عبور یکسان نیستند."
      )

      return

    }


    if (
      currentPassword === newPassword
    ) {

      setPasswordError(
        "رمز عبور جدید باید با رمز فعلی متفاوت باشد."
      )

      return

    }


    try {

      setPasswordLoading(true)


      const token =
        Cookies.get("access_token")


      if (!token) {

        throw new Error(
          "دسترسی شما منقضی شده است. لطفاً دوباره وارد شوید."
        )

      }


      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/change-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          credentials: "include",

          body: JSON.stringify({
            current_password:
              currentPassword,

            new_password:
              newPassword,

            confirm_password:
              confirmPassword,
          }),
        }
      )


      const data: {
        message?: string
        detail?: string
      } = await response.json()


      if (!response.ok) {

        throw new Error(
          data.detail ||
          "تغییر رمز عبور با خطا مواجه شد."
        )

      }



      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")


      setPasswordSuccess(
        data.message ||
        "رمز عبور با موفقیت تغییر کرد."
      )

    } catch (error) {

      if (error instanceof Error) {

        setPasswordError(
          error.message
        )

      } else {

        setPasswordError(
          "خطایی در تغییر رمز عبور رخ داد."
        )

      }

    } finally {

      setPasswordLoading(false)

    }

  }


  const handleDeleteAccount = () => {

    setDeleteError("")
    setShowDeleteModal(true)

  }



  const handleConfirmDeleteAccount =
    async () => {

      try {

        setDeleteLoading(true)
        setDeleteError("")


        const token =
          Cookies.get("access_token")


        if (!token) {

          throw new Error(
            "دسترسی شما منقضی شده است. لطفاً دوباره وارد شوید."
          )

        }


        const response = await fetch(
          `${API_BASE_URL}/api/v1/auth/account`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            credentials: "include",
          }
        )


        if (!response.ok) {

          const data:
            ApiErrorResponse =
            await response.json().catch(
              () => ({})
            )


          throw new Error(
            data.detail ||
            "حذف حساب کاربری با خطا مواجه شد."
          )

        }


        Cookies.remove("access_token")


        setShowDeleteModal(false)


        window.location.href = "/"

      } catch (error) {

        if (error instanceof Error) {

          setDeleteError(
            error.message
          )

        } else {

          setDeleteError(
            "خطایی در حذف حساب کاربری رخ داد."
          )

        }

      } finally {

        setDeleteLoading(false)

      }

    }


  if (profileLoading) {

    return (

      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl">

          <div className="flex min-h-96 items-center justify-center">

            <div className="text-sm text-(--muted)">
              در حال دریافت اطلاعات حساب...
            </div>

          </div>

        </div>

      </div>

    )

  }


  return (

    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-2xl font-bold sm:text-3xl">
            تنظیمات
          </h1>

          <p className="mt-2 text-sm text-(--muted)">
            اطلاعات حساب و تنظیمات پنل کاربری خود را مدیریت کنید.
          </p>

        </div>


        {/* Profile */}

        <section className="rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary)">
              <User size={21} />
            </div>


            <div>

              <h2 className="font-bold">
                اطلاعات حساب
              </h2>

              <p className="mt-1 text-sm text-(--muted)">
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
                disabled={profileSaving}
                className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 text-sm outline-none transition-colors focus:border-(--primary) disabled:cursor-not-allowed disabled:opacity-60"
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
                disabled={profileSaving}
                dir="ltr"
                className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 text-left text-sm outline-none transition-colors focus:border-(--primary) disabled:cursor-not-allowed disabled:opacity-60"
              />

            </div>


            {/* Profile Error */}

            {profileError && (

              <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {profileError}
              </div>

            )}


            {/* Profile Success */}

            {profileSuccess && (

              <div className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-500">

                <Check size={16} />

                {profileSuccess}

              </div>

            )}


            {/* Save */}

            <div className="flex justify-end">

              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-(--primary) px-5 text-sm font-semibold text-white transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
              >

                {profileSaving ? (
                  <>
                    در حال ذخیره...
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

        <section className="mt-6 rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary)">
              <Lock size={21} />
            </div>


            <div>

              <h2 className="font-bold">
                تغییر رمز عبور
              </h2>

              <p className="mt-1 text-sm text-(--muted)">
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
                  disabled={passwordLoading}
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 pl-12 text-left text-sm outline-none transition-colors focus:border-(--primary) disabled:cursor-not-allowed disabled:opacity-60"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-(--muted) hover:bg-(--surface-hover)"
                  aria-label={
                    showCurrentPassword
                      ? "مخفی کردن رمز"
                      : "نمایش رمز"
                  }
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
                  disabled={passwordLoading}
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 pl-12 text-left text-sm outline-none transition-colors focus:border-(--primary) disabled:cursor-not-allowed disabled:opacity-60"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-(--muted) hover:bg-(--surface-hover)"
                  aria-label={
                    showNewPassword
                      ? "مخفی کردن رمز"
                      : "نمایش رمز"
                  }
                >

                  {showNewPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}

                </button>

              </div>


              {newPassword &&
                newPassword.length < 8 && (

                  <p className="mt-2 text-xs text-red-500">
                    رمز عبور جدید باید حداقل ۸ کاراکتر باشد.
                  </p>

                )}

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
                  disabled={passwordLoading}
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 pl-12 text-left text-sm outline-none transition-colors focus:border-(--primary) disabled:cursor-not-allowed disabled:opacity-60"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-(--muted) hover:bg-(--surface-hover)"
                  aria-label={
                    showConfirmPassword
                      ? "مخفی کردن رمز"
                      : "نمایش رمز"
                  }
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


            {/* Password Error */}

            {passwordError && (

              <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {passwordError}
              </div>

            )}


            {/* Password Success */}

            {passwordSuccess && (

              <div className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-500">

                <Check size={16} />

                {passwordSuccess}

              </div>

            )}


            {/* Change Password */}

            <div className="flex justify-end">

              <button
                type="submit"
                disabled={
                  passwordLoading ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword ||
                  newPassword.length < 8 ||
                  newPassword !== confirmPassword
                }
                className="h-11 rounded-xl bg-(--primary) px-5 text-sm font-semibold text-white transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
              >

                {passwordLoading
                  ? "در حال تغییر..."
                  : "تغییر رمز عبور"}

              </button>

            </div>

          </form>

        </section>


        {/* Appearance */}

        <section className="mt-6 rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary)">

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

              <p className="mt-1 text-sm text-(--muted)">
                حالت نمایش پنل را انتخاب کنید.
              </p>

            </div>

          </div>


          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Light */}

            <button
              type="button"
              onClick={() =>
                setTheme("light")
              }
              className={`flex items-center gap-4 rounded-xl border p-4 text-right transition-colors ${
                theme === "light"
                  ? "border-(--primary) bg-(--primary)/5"
                  : "border-(--border) hover:bg-(--surface-hover)"
              }`}
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-700 shadow-sm">
                <Sun size={18} />
              </div>


              <div className="flex-1">

                <p className="text-sm font-medium">
                  حالت روشن
                </p>

                <p className="mt-1 text-xs text-(--muted)">
                  مناسب استفاده در طول روز
                </p>

              </div>


              {theme === "light" && (
                <Check
                  size={18}
                  className="text-(--primary)"
                />
              )}

            </button>


            {/* Dark */}

            <button
              type="button"
              onClick={() =>
                setTheme("dark")
              }
              className={`flex items-center gap-4 rounded-xl border p-4 text-right transition-colors ${
                theme === "dark"
                  ? "border-(--primary) bg-(--primary)/5"
                  : "border-(--border) hover:bg-(--surface-hover)"
              }`}
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-sm">
                <Moon size={18} />
              </div>


              <div className="flex-1">

                <p className="text-sm font-medium">
                  حالت تاریک
                </p>

                <p className="mt-1 text-xs text-(--muted)">
                  مناسب استفاده در شب
                </p>

              </div>


              {theme === "dark" && (
                <Check
                  size={18}
                  className="text-(--primary)"
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


              <p className="mt-2 max-w-2xl text-sm leading-6 text-(--muted)">
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


      {/* Delete Account Modal */}

      {showDeleteModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget &&
              !deleteLoading
            ) {
              setShowDeleteModal(false)
            }

          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            className="w-full max-w-md rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-2xl sm:p-7"
          >

            {/* Modal Icon */}

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">

              <Trash2 size={22} />

            </div>


            {/* Modal Content */}

            <div className="mt-5">

              <h2
                id="delete-account-title"
                className="text-lg font-bold"
              >
                حذف حساب کاربری
              </h2>


              <p className="mt-3 text-sm leading-7 text-(--muted)">
                آیا مطمئن هستید که می‌خواهید حساب کاربری خود را حذف کنید؟
                تمام لینک‌ها، آمار و اطلاعات حساب شما حذف خواهند شد.
                این عملیات قابل بازگشت نیست.
              </p>

            </div>


            {/* Delete Error */}

            {deleteError && (

              <div className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {deleteError}
              </div>

            )}


            {/* Modal Actions */}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-(--border) px-5 text-sm font-medium transition-colors hover:bg-(--surface-hover) disabled:cursor-not-allowed disabled:opacity-50"
              >

                <X size={16} />

                انصراف

              </button>


              <button
                type="button"
                disabled={deleteLoading}
                onClick={
                  handleConfirmDeleteAccount
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <Trash2 size={16} />

                {deleteLoading
                  ? "در حال حذف..."
                  : "بله، حذف حساب"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}


export default Settings