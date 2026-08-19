import LinkOptions from "../../components/dashboard/create-link/LinkOptions"
import UrlPreview from "../../components/dashboard/create-link/UrlPreview"
import LinkCreatedSuccess from "../../components/dashboard/create-link/LinkCreatedSuccess"

import { useState } from "react"

import {
  validateCreateLinkForm,
  type ValidationErrors,
} from "../../utils/createLinkValidation"

export interface CreateLinkFormData {
  originalUrl: string
  title: string
  customSlug: string
  expiresAt: string
  password: string
}

function CreateLink() {
  const [formData, setFormData] = useState<CreateLinkFormData>({
    originalUrl: "",
    title: "",
    customSlug: "",
    expiresAt: "",
    password: "",
  })

  const [errors, setErrors] = useState<ValidationErrors>({})

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
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdLink, setCreatedLink] = useState<{
    shortUrl: string
    originalUrl: string
  } | null>(null)

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const validationErrors = validateCreateLinkForm(
      formData.originalUrl,
      formData.customSlug
    )

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      // Mock API
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      )

      const generatedSlug =
        formData.customSlug.trim() ||
        Math.random().toString(36).substring(2, 8)

      setCreatedLink({
        shortUrl: `shortify.ir/${generatedSlug}`,
        originalUrl: formData.originalUrl,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (createdLink) {
    return (
      <LinkCreatedSuccess
        shortUrl={createdLink.shortUrl}
        originalUrl={createdLink.originalUrl}
        onCreateAnother={() => {
          setCreatedLink(null)

          setFormData({
            originalUrl: "",
            title: "",
            customSlug: "",
            expiresAt: "",
            password: "",
          })

          setErrors({})
        }}
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

          <p className="mt-2 text-sm text-[var(--muted)]">
            لینک خود را کوتاه کنید و آن را به راحتی مدیریت کنید.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Main Form */}

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

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
                  placeholder="https://example.com/your-page"
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-left text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                />

                <p className="mt-2 text-xs text-[var(--muted)]">
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
                  placeholder="مثلاً لینک صفحه محصول"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
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

          <UrlPreview
            customSlug={formData.customSlug}
            originalUrl={formData.originalUrl}
          />


          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              className="h-12 rounded-xl border border-[var(--border)] px-6 text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-8 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
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