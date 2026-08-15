import { Mail } from "lucide-react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer
      id="about"
      className="border-t border-[var(--border)] bg-[var(--surface)]"
    >

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] font-bold text-white">
                S
              </div>

              <span className="text-xl font-bold">
                Shortify
              </span>

            </Link>


            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted)]">
              یک پلتفرم مدرن برای کوتاه کردن، مدیریت و
              تحلیل لینک‌ها؛ سریع، امن و قابل اعتماد.
            </p>


            {/* Social */}

            <div className="mt-6 flex items-center gap-3">

                <a
                    href="#"
                    aria-label="GitHub"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                >
                    GH
                </a>

                <a
                    href="#"
                    aria-label="Twitter"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                >
                    X
                </a>

                <a
                    href="#"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                >
                    in
                </a>

                <a
                    href="#"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                >
                    IG
                </a>

            </div>

          </div>


          {/* Product */}

          <div>

            <h3 className="font-semibold">
              محصول
            </h3>

            <ul className="mt-5 space-y-4 text-sm text-[var(--muted)]">

              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  امکانات
                </a>
              </li>

              <li>
                <a
                  href="#analytics"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  تحلیل‌ها
                </a>
              </li>

              <li>
                <a
                  href="#api"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  API
                </a>
              </li>

            </ul>

          </div>


          {/* Company */}

          <div>

            <h3 className="font-semibold">
              شرکت
            </h3>

            <ul className="mt-5 space-y-4 text-sm text-[var(--muted)]">

              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  درباره ما
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  تماس با ما
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  حریم خصوصی
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  قوانین و شرایط
                </Link>
              </li>

            </ul>

          </div>

        </div>


        {/* Bottom */}

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--border)] pt-7 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} Shortify. تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-2">

            <Mail size={15} />

            <span dir="ltr">
              support@shortify.ir
            </span>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer