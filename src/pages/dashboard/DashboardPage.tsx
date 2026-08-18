import DashboardHeader from "../../components/dashboard/DashboardHeader"
import StatsGrid from "../../components/dashboard/StatsGrid"
import ClicksChart from "../../components/dashboard/ClicksChart"
import TopLinks from "../../components/dashboard/TopLinks"
import RecentLinks from "../../components/dashboard/RecentLinks"

function DashboardPage() {
  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl space-y-6">

        <DashboardHeader />

        <StatsGrid />

        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <ClicksChart />
          <TopLinks />
        </section>

        <RecentLinks />

      </div>

    </div>
  )
}

export default DashboardPage