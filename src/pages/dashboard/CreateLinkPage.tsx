import LinkOptions from "../../components/dashboard/create-link/LinkOptions"
// import UrlPreview from "../../components/dashboard/create-link/UrlPreview"
import LinkCreatedSuccess from "../../components/dashboard/create-link/LinkCreatedSuccess"

import { useState } from "react"
import Cookies from "js-cookie"

import {
validateCreateLinkForm,
type ValidationErrors,
} from "../../utils/createLinkValidation"

export interface CreateLinkFormData {
  originalUrl: string
  title: string
  customSlug: string
  expires_at: string
  password: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function CreateLink() {
  const [formData, setFormData] = useState<CreateLinkFormData>({
  originalUrl: "",
  title: "",
  customSlug: "",
  expires_at: "",
  password: "",
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [createdLink, setCreatedLink] = useState<{
  shortUrl: string
  originalUrl: string
  } | null>(null)

  const handleChange = (
  field: keyof CreateLinkFormData,
  value: string
  ) => {
  setFormData((prev) => ({
  ...prev,
  [field]: value,
  }))


  setErrors((prev) => ({
    ...prev,
    [field]: undefined,
  }))

  setError("")


  }

  const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
  ) => {
  event.preventDefault()

  setError("")

  const validationErrors = validateCreateLinkForm(
    formData.originalUrl,
    formData.customSlug,
    formData.password,
  )

  setErrors(validationErrors)

  if (Object.keys(validationErrors).length > 0) {
    return
  }

  const accessToken = Cookies.get("access_token")

  if (!accessToken) {
    setError("نشست شما منقضی شده است. لطفاً دوباره وارد شوید.")
    return
  }

  try {
    setIsSubmitting(true)

    const response = await fetch(
      `${API_BASE_URL}/api/v1/links`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          original_url: formData.originalUrl.trim(),
          title: formData.title.trim() || null,
          custom_slug:
            formData.customSlug.trim() || null,
          expires_at:
            formData.expires_at || null,
          password:
            formData.password || null,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 409) {
        setErrors({
          customSlug: data.detail || "این Slug قبلاً استفاده شده است.",
        })

        return
      }

      if (response.status === 401) {
        setError(
          "احراز هویت نامعتبر است. لطفاً دوباره وارد شوید."
        )

        return
      }

      throw new Error(
        data.detail || "ساخت لینک با خطا مواجه شد."
      )
    }

    setCreatedLink({
      shortUrl: data.short_url,
      originalUrl: data.original_url,
    })
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError("خطایی در ساخت لینک رخ داد.")
    }
  } finally {
    setIsSubmitting(false)
  }


  }

  const handleCreateAnother = () => {
  setCreatedLink(null)


  setFormData({
    originalUrl: "",
    title: "",
    customSlug: "",
    expires_at: "",
    password: "",
  })

  setErrors({})
  setError("")


  }

  if (createdLink) {
  return ( <LinkCreatedSuccess
      shortUrl={createdLink.shortUrl}
      originalUrl={createdLink.originalUrl}
      onCreateAnother={handleCreateAnother}
    />
  )
  }

  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-2xl font-bold sm:text-3xl">
            ساخت لینک جدید
          </h1>

          <p className="mt-2 text-sm text-(--muted)">
            لینک خود را کوتاه کنید و آن را به راحتی مدیریت کنید.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Main Form */}

          <section className="rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

            <div className="space-y-6">

              {/* Original URL */}

              <div>

                <label
                  htmlFor="originalUrl"
                  className="mb-2 block text-sm font-medium"
                >
                  URL مقصد
                  <span className="mr-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="originalUrl"
                  type="text"
                  value={formData.originalUrl}
                  onChange={(event) =>
                    handleChange(
                      "originalUrl",
                      event.target.value
                    )
                  }
                  required
                  placeholder="https://example.com/your-page"
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 text-left text-sm outline-none transition-colors placeholder:text-(--muted) focus:border-(--primary)"
                />

                <p className="mt-2 text-xs text-(--muted)">
                  آدرس کامل صفحه‌ای که می‌خواهید کاربران به آن هدایت شوند.
                </p>

                {errors.originalUrl && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.originalUrl}
                  </p>
                )}

              </div>


              {/* Title */}

              <div>

                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium"
                >
                  عنوان لینک
                </label>

                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(event) =>
                    handleChange(
                      "title",
                      event.target.value
                    )
                  }
                  required
                  placeholder="مثلاً لینک صفحه محصول"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 text-sm outline-none transition-colors placeholder:text-(--muted) focus:border-(--primary)"
                />

              </div>

            </div>

          </section>


          {/* Advanced Options */}

          <LinkOptions
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />


          {/* Preview */}

          {/* <UrlPreview
            customSlug={formData.customSlug}
            originalUrl={formData.originalUrl}
          /> */}


          {/* General Error */}

          {error && (
            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </p>
          )}


          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={handleCreateAnother}
              className="h-12 rounded-xl border border-(--border) px-6 text-sm font-medium transition-colors hover:bg-(--surface-hover) cursor-pointer"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-(--primary) px-8 text-sm font-semibold text-white transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  در حال ساخت...
                </>
              ) : (
                "ساخت لینک"
              )}
            </button>

          </div>

        </form>

      </div>

    </div>

  )
}

export default CreateLink
