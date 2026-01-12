// index.jsx
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import './pdf-worker.jsx';
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout/Layout.jsx";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Cta from "./components/Cta/Cta";
import FeaturedJobs from "./components/FeaturedJobs/FeaturedJobs";
import LatestJobs from "./components/LatestJobs/LatestJobs";
import PageNotFount from "./components/PageNotFount/PageNotFount";
import Register from "./components/Forms/Register.jsx";

import Lenis from "lenis";
import FindJob from "./components/findJob/FindJob.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import BrowseCompanies from "./BrowseCompanies/BrowseCompanies.jsx";
import MyProfile from "./components/myProfile/MyProfile.jsx";
import HRLayout from "./Layout/Hrlayout.jsx";

import HRDashboard from "./Hr/HRDashboard.jsx";
import JobUpload from "./Hr/JobUpload.jsx";
import HrCheck from "./protect/Hrcheck.jsx";
import ArrayInputField from "./components/Forms/ArrayInputField.jsx";
import NotificationToasty from "./components/Notification-Toasty/NotificationToasty.jsx";
import Profile from "./components/myProfile/semiComponent/Profile.jsx";
import ResumePage from "./components/myProfile/semiComponent/ResumePage.jsx";
import CompanyProfile from "./Hr/CompanyProfile.jsx";
import ViewCandidateDetail from "./Hr/ViewCandidateDetail.jsx";

// --- Lenis smooth scroll setup ---
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- Main Layout ---
export const MainLayout = () => (
  <>
    <Home />
    <Brands />
    <Categories />
    <Cta />
    <FeaturedJobs />
    <LatestJobs />
  </>
);

// --- Router ---
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainLayout />} />
        <Route path="find-jobs" element={<FindJob />} />
        <Route path="all-jobs" element={<FindJob />} />
        <Route path="notifi" element={<NotificationToasty />} />
        <Route path="companies" element={<BrowseCompanies />} />
        <Route path="arrData" element={<ArrayInputField />} />
        <Route path="edit-profile" element={<Profile />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="*" element={<PageNotFount />} />
      </Route>

      <Route path="/my-profile" element={<MyProfile />} />

      {/* HR protected routes */}
      <Route element={<HrCheck />}>
        <Route path="/hr" element={<HRLayout />}>
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="add-job" element={<JobUpload />} />
          <Route path="shortlisted" element={<PageNotFount />} />
          <Route path="interviews" element={<PageNotFount />} />
          <Route path="messages" element={<PageNotFount />} />
          <Route path="company" element={<CompanyProfile />} />
          <Route path="statistics" element={<PageNotFount />} />

        </Route>
       <Route path="/candidates/:candidateId/:ApplicationId" element={<ViewCandidateDetail />} />
      </Route>
    </>
  )
);

// --- Theme wrapper ---
const ThemeWrapper = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      {children}
    </div>
  );
};

// --- Render ---
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <RouterProvider router={router} />
      </ThemeWrapper>
    </Provider>
  </StrictMode>
);
