import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"

import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"

import DashboardPage from "./pages/dashboard/DashboardPage"
import LinksPage from "./pages/dashboard/LinksPage"
import CreateLinkPage from "./pages/dashboard/CreateLinkPage"
import LinkDetailsPage from "./pages/dashboard/LinkDetailsPage"
import LinkAnalyticsPage from "./pages/dashboard/LinkAnalyticsPage"
import EditLinkPage from "./pages/dashboard/EditLinkPage"
import ApiPage from "./pages/dashboard/ApiPage"
import SettingsPage from "./pages/dashboard/SettingsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path="links" element={<LinksPage />} />

          <Route
            path="links/new"
            element={<CreateLinkPage />}
          />

          <Route
            path="links/:id"
            element={<LinkDetailsPage />}
          />

          <Route
            path="links/:id/analytics"
            element={<LinkAnalyticsPage />}
          />

          <Route
            path="links/:id/edit"
            element={<EditLinkPage />}
          />

          <Route
            path="api"
            element={<ApiPage />}
          />

          <Route
            path="settings"
            element={<SettingsPage />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App