import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Nav from "./components/Nav";
import DashBoard from "./pages/DashBoard";
import EventManagement from "./pages/EventManagement";
import UserManagement from "./pages/UserManagement";
import MovieManagement from "./pages/MovieManagement";
import TheatreAdminManagement from "./pages/TheatreAdminManagement";
import TheatreManagement from "./pages/TheatreManagement";
import Global from "./components/globalController/Global";
import Tickets from "./pages/Tickets";
import LocationControll from "./pages/LocationControll";
import News from "./pages/News";
import Ads from "./pages/Ads";
import GeneralSettings from "./pages/GeneralSettings";
import Report from "./pages/Report";
import ScreenManagement from "./pages/ScreenManagement";
import ClassManagement from "./pages/ClassManagement";
import SeatBlockingManagement from "./pages/SeatBlockingManagement";
import SeatingRowManagement from "./pages/SeatingRowManagement";
import VerifyOtp from "./auth/VerifyOtp";
import ResendOtp from "./auth/ResendOtp";
import ForgotPassword from "./auth/ForgotPassword";
import RecoverPassword from "./auth/RecoverPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/otp" element={<VerifyOtp />} />
      <Route path="/resend-otp" element={<ResendOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<RecoverPassword />} />

      <Route element={<Nav />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/event-management" element={<EventManagement />} />
        <Route path="/class" element={<ClassManagement />} />
        <Route path="/movie-management" element={<MovieManagement />} />
        <Route path="/row-management" element={<SeatingRowManagement />} />
        <Route path="/movie-management" element={<MovieManagement />} />
        <Route path="/seat-blocking" element={<SeatBlockingManagement />} />
        <Route path="/theatre-admin" element={<TheatreAdminManagement />} />
        <Route path="/theatre-management" element={<TheatreManagement />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/location" element={<LocationControll />} />
        <Route path="/news" element={<News />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/report" element={<Report />} />
        <Route path="/screen-ctrl" element={<ScreenManagement />} />
        <Route path="/settings" element={<GeneralSettings />} />
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
