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
import ResetPasswordPage from "./pages/ResetPasswordPage"

import ProtectedRoute from "./routes/ProtectedRoute"
import GuestRoute from "./routes/GuestRoute"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LandingPage />} />

          {/* Guest Routes */}

          <Route element={<GuestRoute />}>

            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/register"
              element={<RegisterPage />}
            />

          </Route>


          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />


          {/* Protected Routes */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/dashboard"
              element={<DashboardLayout />}
            >

              <Route
                index
                element={<DashboardPage />}
              />

              <Route
                path="links"
                element={<LinksPage />}
              />

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

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App