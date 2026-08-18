import { BarChart3 } from "lucide-react"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function ClicksChart() {
  const clickData = [
    {
      day: "شنبه",
      clicks: 420,
    },
    {
      day: "یکشنبه",
      clicks: 580,
    },
    {
      day: "دوشنبه",
      clicks: 710,
    },
    {
      day: "سه‌شنبه",
      clicks: 640,
    },
    {
      day: "چهارشنبه",
      clicks: 890,
    },
    {
      day: "پنجشنبه",
      clicks: 760,
    },
    {
      day: "جمعه",
      clicks: 1120,
    },
  ]

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="font-bold">
            تعداد کلیک‌ها
          </h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            عملکرد لینک‌ها در ۷ روز گذشته
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

          <BarChart3 size={19} />

        </div>

      </div>


      <div className="mt-8 h-64 w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={clickData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >

            <defs>

              <linearGradient
                id="clickGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.3}
                />

                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>


            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="4 4"
              vertical={false}
            />


            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--muted)",
                fontSize: 11,
              }}
              dy={10}
            />


            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--muted)",
                fontSize: 11,
              }}
              width={40}
            />


            <Tooltip
              cursor={{
                stroke: "var(--primary)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                boxShadow:
                  "0 10px 30px rgba(0, 0, 0, 0.08)",
                direction: "rtl",
              }}
              labelStyle={{
                color: "var(--foreground)",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "var(--primary)",
              }}
              formatter={(value) => [
                `${Number(value).toLocaleString("fa-IR")} کلیک`,
                "تعداد",
              ]}
            />


            <Area
              type="monotone"
              dataKey="clicks"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#clickGradient)"
              activeDot={{
                r: 6,
                strokeWidth: 3,
                stroke: "var(--surface)",
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default ClicksChart