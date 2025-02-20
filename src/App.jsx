import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./auth/SignIn";
import Nav from "./components/Nav";
import DashBoard from "./pages/DashBoard";
import MovieManagement from "./pages/MovieManagement";
import TheatreAdminManagement from "./pages/TheatreAdminManagement";
import Global from "./components/globalController/Global";
import LocationControll from "./pages/LocationControll";
import GeneralSettings from "./pages/GeneralSettings";
import VerifyOtp from "./auth/VerifyOtp";
import ResendOtp from "./auth/ResendOtp";
import ForgotPassword from "./auth/ForgotPassword";
import RecoverPassword from "./auth/RecoverPassword";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/otp" element={<VerifyOtp />} />
      <Route path="/resend-otp" element={<ResendOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<RecoverPassword />} />

      <Route element={<Nav />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/movie-management" element={<MovieManagement />} />
        <Route path="/theatre-admin" element={<TheatreAdminManagement />} />
        <Route path="/location" element={<LocationControll />} />
        <Route path="/settings" element={<GeneralSettings />} />
        <Route path="/movie-detail/:id" element={<MovieDetailPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Route>
  )
);

const App = () => {
  return (
    <Global>
      <RouterProvider router={router} />
    </Global>
  );
};

export default App;
