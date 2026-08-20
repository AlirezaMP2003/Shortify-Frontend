import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import LinkOptions from "../../components/dashboard/create-link/LinkOptions"
import UrlPreview from "../../components/dashboard/create-link/UrlPreview"

import {
  validateCreateLinkForm,
  type ValidationErrors,
} from "../../utils/createLinkValidation"


export interface EditLinkFormData {
  originalUrl: string
  title: string
  customSlug: string
  expiresAt: string
  password: string
}


function EditLinkPage() {
  const { id } = useParams()
  const navigate = useNavigate()


  const [formData, setFormData] = useState<EditLinkFormData>({
    originalUrl: "",
    title: "",
    customSlug: "",
    expiresAt: "",
    password: "",
  })


  const [errors, setErrors] = useState<ValidationErrors>({})

  const [isLoading, setIsLoading] = useState(true)

  const [isSaving, setIsSaving] = useState(false)


  /*
   * Mock API
   *
   * فعلاً اطلاعات لینک را شبیه‌سازی می‌کنیم.
   * بعداً این بخش با GET API جایگزین می‌شود.
   */

  useEffect(() => {
    const loadLink = async () => {
      setIsLoading(true)

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      )


      setFormData({
        originalUrl: "https://example.com/product/123",
        title: "صفحه محصول",
        customSlug: "product-123",
        expiresAt: "",
        password: "",
      })


      setIsLoading(false)
    }


    loadLink()
  }, [id])


  const handleChange = (
    field: keyof EditLinkFormData,
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


    setIsSaving(true)


    try {
      /*
       * Mock API
       *
       * بعداً:
       * PUT /api/links/:id
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      )


      console.log("Updated Link:", {
        id,
        ...formData,
      })


      navigate(`/dashboard/links/${id}`)
    } finally {
      setIsSaving(false)
    }
  }


  if (isLoading) {
    return (
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="flex min-h-96 items-center justify-center">

            <div className="text-sm text-[var(--muted)]">
              در حال بارگذاری اطلاعات لینک...
            </div>

          </div>

        </div>

      </div>
    )
  }


  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">

          <div className="mb-3">

            <Link
              to="/dashboard/links"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              ← بازگشت به لینک‌های من
            </Link>

          </div>


          <h1 className="text-2xl font-bold sm:text-3xl">
            ویرایش لینک
          </h1>


          <p className="mt-2 text-sm text-[var(--muted)]">
            اطلاعات لینک خود را ویرایش کنید.
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
                  آدرس صفحه‌ای که کاربران به آن هدایت می‌شوند.
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
              onClick={() =>
                navigate(`/dashboard/links/${id}`)
              }
              className="h-12 rounded-xl border border-[var(--border)] px-6 text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
            >
              انصراف
            </button>


            <button
              type="submit"
              disabled={isSaving}
              className="h-12 rounded-xl bg-[var(--primary)] px-8 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}


export default EditLinkPage