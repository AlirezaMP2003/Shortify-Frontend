import type { CreateLinkFormData } from "../../../pages/dashboard/CreateLinkPage"
import type { ValidationErrors } from "../../../utils/createLinkValidation"

interface LinkOptionsProps {
  formData: CreateLinkFormData
  errors: ValidationErrors
  onChange: (
    field: keyof CreateLinkFormData,
    value: string
  ) => void
}

function LinkOptions({
  formData,
  errors,
  onChange,
}: LinkOptionsProps) {
  return (
    <section className="rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

      <div className="mb-6">

        <h2 className="font-bold">
          تنظیمات پیشرفته
        </h2>

        <p className="mt-1 text-xs text-(--muted)">
          تنظیمات اختیاری لینک کوتاه‌شده را مشخص کنید.
        </p>

      </div>


      <div className="space-y-6">

        {/* Custom Slug */}

        <div>

          <label
            htmlFor="customSlug"
            className="mb-2 block text-sm font-medium"
          >
            Slug سفارشی
          </label>

          <div className="flex overflow-hidden rounded-xl border border-(--border) bg-(--background) focus-within:border-(--primary)">

            <span
              dir="ltr"
              className="flex items-center border-l border-(--border) px-3 text-sm text-(--muted)"
            >
              shortify.ir/
            </span>

            <input
              id="customSlug"
              type="text"
              value={formData.customSlug}
              onChange={(event) =>
                onChange(
                  "customSlug",
                  event.target.value
                )
              }
              placeholder="my-link"
              dir="ltr"
              className="h-12 min-w-0 flex-1 bg-transparent px-4 text-left text-sm outline-none placeholder:text-(--muted)"
            />

          </div>

          {errors.customSlug && (
                <p className="mt-2 text-xs text-red-500">
                    {errors.customSlug}
                </p>
          )}

          <p className="mt-2 text-xs text-(--muted)">
            اگر خالی باشد، یک شناسه کوتاه به صورت خودکار ایجاد می‌شود.
          </p>

        </div>


        {/* Expiration */}

        <div>

          <label
            htmlFor="expires_at"
            className="mb-2 block text-sm font-medium"
          >
            تاریخ انقضا
          </label>

          <select
            id="expires_at"
            value={formData.expires_at}
            onChange={(event) =>
              onChange(
                "expires_at",
                event.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 text-sm outline-none transition-colors focus:border-(--primary)"
          >

            <option value="">
              بدون انقضا
            </option>

            <option value="1d">
              ۱ روز
            </option>

            <option value="7d">
              ۷ روز
            </option>

            <option value="30d">
              ۳۰ روز
            </option>

          </select>

        </div>


        {/* Password */}

        <div>

          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium"
          >
            رمز عبور
          </label>

          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(event) =>
              onChange(
                "password",
                event.target.value
              )
            }
            placeholder="اختیاری"
            className="h-12 w-full rounded-xl border border-(--border) bg-(--background) px-4 text-sm outline-none transition-colors placeholder:text-(--muted) focus:border-(--primary)"
          />

          {errors.password && (
            <p className="mt-2 text-xs text-red-500">
            {errors.password}
            </p>
          )}

          <p className="mt-2 text-xs text-(--muted)">
            کاربران برای دسترسی به لینک باید این رمز را وارد کنند.
          </p>

        </div>

      </div>

    </section>
  )
}

export default LinkOptions