import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import Cookies from "js-cookie"

import LinkOptions from "../../components/dashboard/create-link/LinkOptions"

import {
  validateCreateLinkForm,
  type ValidationErrors,
} from "../../utils/createLinkValidation"


export interface EditLinkFormData {
  originalUrl: string
  title: string
  customSlug: string
  expires_at: string
  password: string
}


interface LinkApiResponse {
  id: string
  short_url: string
  original_url: string
  title: string
  clicks: number
  status: string
  created_at: string
  expires_at: string | null
}


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


function EditLinkPage() {

  const { id } = useParams()

  const navigate = useNavigate()


  const [formData, setFormData] =
    useState<EditLinkFormData>({
      originalUrl: "",
      title: "",
      customSlug: "",
      expires_at: "",
      password: "",
    })


  const [errors, setErrors] =
    useState<ValidationErrors>({})


  const [isLoading, setIsLoading] =
    useState(true)


  const [isSaving, setIsSaving] =
    useState(false)


  const [loadError, setLoadError] =
    useState("")


  const [submitError, setSubmitError] =
    useState("")


  useEffect(() => {

    const loadLink = async () => {

      if (!id) {

        setLoadError(
          "شناسه لینک معتبر نیست."
        )

        setIsLoading(false)

        return
      }


      try {

        setIsLoading(true)
        setLoadError("")


        const token =
          Cookies.get("access_token")


        if (!token) {

          throw new Error(
            "دسترسی شما منقضی شده است. لطفاً دوباره وارد شوید."
          )

        }


        const response = await fetch(
          `${API_BASE_URL}/api/v1/links/${id}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },

            credentials: "include",
          }
        )


        const data: LinkApiResponse =
          await response.json()


        if (!response.ok) {

          throw new Error(
            data &&
            "detail" in data
              ? String(
                  (
                    data as unknown as {
                      detail: string
                    }
                  ).detail
                )
              : "دریافت اطلاعات لینک با خطا مواجه شد."
          )

        }

        const shortUrl =
          data.short_url || ""

        const customSlug =
          shortUrl.includes("/")
            ? shortUrl.split("/").pop() || ""
            : shortUrl


        setFormData({

          originalUrl:
            data.original_url,

          title:
            data.title,

          customSlug,

          expires_at: "",

          password: "",

        })

      } catch (error) {

        if (error instanceof Error) {

          setLoadError(
            error.message
          )

        } else {

          setLoadError(
            "خطایی در دریافت اطلاعات لینک رخ داد."
          )

        }

      } finally {

        setIsLoading(false)

      }

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


    setSubmitError("")

  }


  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()


    if (!id) {

      setSubmitError(
        "شناسه لینک معتبر نیست."
      )

      return
    }


    setSubmitError("")



    const validationErrors =
      validateCreateLinkForm(
        formData.originalUrl,
        formData.customSlug,
        formData.password
      )


    setErrors(validationErrors)


    if (
      Object.keys(validationErrors).length > 0
    ) {

      return

    }


    try {

      setIsSaving(true)


      const token =
        Cookies.get("access_token")


      if (!token) {

        throw new Error(
          "دسترسی شما منقضی شده است. لطفاً دوباره وارد شوید."
        )

      }


      const requestBody = {

        original_url:
          formData.originalUrl.trim(),

        title:
          formData.title.trim(),

        custom_slug:
          formData.customSlug.trim(),

        expires_at:
          formData.expires_at,

        password:
          formData.password,

      }


      const response = await fetch(
        `${API_BASE_URL}/api/v1/links/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          credentials: "include",

          body: JSON.stringify(
            requestBody
          ),
        }
      )


      const data =
        await response.json().catch(
          () => null
        )


      if (!response.ok) {


        if (
          response.status === 409
        ) {

          setErrors((prev) => ({
            ...prev,

            customSlug:
              data?.detail ||
              "این Slug قبلاً استفاده شده است.",
          }))

          return
        }


        throw new Error(
          data?.detail ||
          "ویرایش لینک با خطا مواجه شد."
        )

      }


      navigate(
        `/dashboard/links/${id}`
      )

    } catch (error) {

      if (error instanceof Error) {

        setSubmitError(
          error.message
        )

      } else {

        setSubmitError(
          "خطایی در ویرایش لینک رخ داد."
        )

      }

    } finally {

      setIsSaving(false)

    }

  }


  if (isLoading) {

    return (

      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="flex min-h-96 items-center justify-center">

            <div className="text-sm text-(--muted)">
              در حال بارگذاری اطلاعات لینک...
            </div>

          </div>

        </div>

      </div>

    )

  }



  if (loadError) {

    return (

      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">

            <h2 className="font-bold text-red-500">
              دریافت اطلاعات لینک ناموفق بود
            </h2>


            <p className="mt-2 text-sm text-red-500">
              {loadError}
            </p>


            <Link
              to="/dashboard/links"
              className="mt-6 inline-flex rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-(--primary-hover)"
            >
              بازگشت به لینک‌ها
            </Link>

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
              className="text-sm text-(--muted) transition-colors hover:text-(--foreground)"
            >
              ← بازگشت به لینک‌های من
            </Link>

          </div>


          <h1 className="text-2xl font-bold sm:text-3xl">
            ویرایش لینک
          </h1>


          <p className="mt-2 text-sm text-(--muted)">
            اطلاعات لینک خود را ویرایش کنید.
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
                  placeholder="https://example.com/your-page"
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 text-left text-sm outline-none transition-colors placeholder:text-(--muted) focus:border-(--primary)"
                />


                <p className="mt-2 text-xs text-(--muted)">
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


          {/* Submit Error */}

          {submitError && (

            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-500">
              {submitError}
            </div>

          )}


          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/dashboard/links/${id}`
                )
              }
              className="h-12 cursor-pointer rounded-xl border border-(--border) px-6 text-sm font-medium transition-colors hover:bg-(--surface-hover)"
            >
              انصراف
            </button>


            <button
              type="submit"
              disabled={isSaving}
              className="h-12 cursor-pointer rounded-xl bg-(--primary) px-8 text-sm font-semibold text-white transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? "در حال ذخیره..."
                : "ذخیره تغییرات"}
            </button>

          </div>

        </form>

      </div>

    </div>

  )

}


export default EditLinkPage