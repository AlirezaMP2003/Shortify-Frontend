import {
  BarChart3,
  Check,
  Link2,
  QrCode,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

function Features() {
  const features = [
    {
      icon: BarChart3,
      title: "تحلیل دقیق لینک‌ها",
      description:
        "تعداد کلیک‌ها و اطلاعات مربوط به عملکرد لینک‌ها را در یک داشبورد حرفه‌ای مشاهده کنید.",
      className: "md:col-span-2",
    },
    {
      icon: ShieldCheck,
      title: "اعتبارسنجی و امنیت",
      description:
        "هر لینک قبل از کوتاه شدن بررسی می‌شود تا از ایجاد لینک‌های نامعتبر و مشکوک جلوگیری شود.",
      className: "",
    },
    {
      icon: Link2,
      title: "لینک‌های سفارشی",
      description:
        "برای لینک‌های خود شناسه‌های کوتاه و قابل تشخیص ایجاد کنید.",
      className: "",
    },
    {
      icon: QrCode,
      title: "QR Code",
      description:
        "برای هر لینک کوتاه شده یک QR Code اختصاصی ایجاد کنید.",
      className: "",
    },
    {
      icon: Zap,
      title: "سریع و قابل اعتماد",
      description:
        "لینک‌های شما با سرعت بالا ایجاد و کاربران به مقصد اصلی هدایت می‌شوند.",
      className: "",
    },
  ]

  return (
    <section
      id="features"
      className="scroll-mt-24 px-6 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="max-w-2xl">

          <div className="flex items-center gap-2 text-sm font-semibold text-(--primary)">

            <Sparkles size={16} />

            امکانات Shortify

          </div>

          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            بیشتر از یک کوتاه‌کننده لینک
          </h2>

          <p className="mt-5 leading-8 text-(--muted)">
            ابزارهایی که برای مدیریت حرفه‌ای لینک‌ها نیاز دارید،
            در یک پلتفرم سریع و ساده در اختیار شماست.
          </p>

        </div>


        {/* Features Grid */}

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className={`group rounded-3xl border border-(--border) bg-(--surface) p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 ${feature.className}`}
              >

                {/* Icon */}

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--primary)/10 text-(--primary) transition-transform duration-300 group-hover:scale-110">

                  <Icon size={23} />

                </div>


                {/* Content */}

                <h3 className="mt-7 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-(--muted)">
                  {feature.description}
                </p>


                {/* Special content for Analytics */}

                {feature.title === "تحلیل دقیق لینک‌ها" && (
                  <div className="mt-8">

                    <div className="flex h-28 items-end gap-2 rounded-2xl bg-(--background) p-5">

                      {[35, 50, 42, 64, 55, 72, 61, 84, 70, 92].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-md bg-(--primary)/60 transition-colors group-hover:bg-(--primary)"
                            style={{
                              height: `${height}%`,
                            }}
                          />
                        ),
                      )}

                    </div>

                  </div>
                )}


                {/* Special content for Security */}

                {feature.title === "اعتبارسنجی و امنیت" && (
                  <div className="mt-8 space-y-3 rounded-2xl bg-(--background) p-5">

                    {[
                      "بررسی ساختار URL",
                      "بررسی دامنه",
                      "بررسی مقصد لینک",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-xs"
                      >

                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">

                          <Check
                            size={12}
                            className="text-green-500"
                          />

                        </div>

                        <span>
                          {item}
                        </span>

                      </div>
                    ))}

                  </div>
                )}


                {/* Special content for Custom Links */}

                {feature.title === "لینک‌های سفارشی" && (
                  <div className="mt-8 rounded-2xl bg-(--background) p-5 text-center">

                    <span className="text-sm text-(--muted)">
                      sho.rt/
                    </span>

                    <span className="text-sm font-bold text-(--primary)">
                      summer-sale
                    </span>

                  </div>
                )}


                {/* Special content for QR */}

                {feature.title === "QR Code" && (
                  <div className="mt-8 flex items-center justify-center rounded-2xl bg-(--background) py-7">

                    <QrCode
                      size={82}
                      strokeWidth={1.2}
                      className="text-(--foreground)"
                    />

                  </div>
                )}


                {/* Special content for Speed */}

                {feature.title === "سریع و قابل اعتماد" && (
                  <div className="mt-8 rounded-2xl bg-(--background) p-5">

                    <div className="flex items-center justify-between">

                      <span className="text-xs text-(--muted)">
                        Response time
                      </span>

                      <span className="text-sm font-bold text-green-500">
                        42ms
                      </span>

                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-(--border)">

                      <div className="h-full w-[85%] rounded-full bg-green-500" />

                    </div>

                  </div>
                )}

              </div>
            )
          })}

        </div>

      </div>
    </section>
  )
}

export default Features