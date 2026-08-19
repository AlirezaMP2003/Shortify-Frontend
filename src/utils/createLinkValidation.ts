export interface ValidationErrors {
  originalUrl?: string
  customSlug?: string
}

export function validateOriginalUrl(
  value: string
): string | undefined {
  const url = value.trim()

  if (!url) {
    return "لطفاً لینک مقصد را وارد کنید."
  }

  if (url.length > 2048) {
    return "طول لینک نمی‌تواند بیشتر از ۲۰۴۸ کاراکتر باشد."
  }

  let parsedUrl: URL

  try {
    parsedUrl = new URL(url)
  } catch {
    return "لینک واردشده معتبر نیست."
  }

  if (
    parsedUrl.protocol !== "http:" &&
    parsedUrl.protocol !== "https:"
  ) {
    return "فقط لینک‌های HTTP و HTTPS قابل استفاده هستند."
  }

  if (!parsedUrl.hostname) {
    return "دامنه لینک معتبر نیست."
  }

  return undefined
}


export function validateCustomSlug(
  value: string
): string | undefined {
  const slug = value.trim()

  // اختیاری است
  if (!slug) {
    return undefined
  }

  if (slug.length < 3) {
    return "Slug باید حداقل ۳ کاراکتر باشد."
  }

  if (slug.length > 50) {
    return "Slug نمی‌تواند بیشتر از ۵۰ کاراکتر باشد."
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    return "Slug فقط می‌تواند شامل حروف انگلیسی، اعداد، - و _ باشد."
  }

  if (/^[-_]/.test(slug)) {
    return "Slug نمی‌تواند با - یا _ شروع شود."
  }

  if (/[-_]$/.test(slug)) {
    return "Slug نمی‌تواند با - یا _ تمام شود."
  }

  return undefined
}


export function validateCreateLinkForm(
  originalUrl: string,
  customSlug: string
): ValidationErrors {
  const errors: ValidationErrors = {}

  const urlError = validateOriginalUrl(originalUrl)

  if (urlError) {
    errors.originalUrl = urlError
  }

  const slugError = validateCustomSlug(customSlug)

  if (slugError) {
    errors.customSlug = slugError
  }

  return errors
}