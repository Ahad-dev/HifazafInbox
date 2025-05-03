import React from "react";
import { Button } from "./components/ui/button";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { UserDashboard } from "./pages/user";
import Emails from "./pages/user/Emails";
import PrivateUserRoute from "./components/PrivateUserRoute";
import Profile from "./pages/user/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import RiskEmailReview from "./pages/admin/RiskEmailReview";
import AdminProfile from "./pages/admin/Profile";
import PrivateAdminRoute from "./components/admin/PrivateAdminRoute";
import Blacklist from "./pages/admin/Blacklist";
import EmailDetail from './pages/admin/EmailDetail';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateUserRoute />}>
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/emails" element={<Emails />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateAdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/risk-review" element={<RiskEmailReview />} />
          <Route path="/admin/blacklist" element={<Blacklist />} />
          <Route path="/admin/email/:emailId" element={<EmailDetail />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
        <Route
          path="/about"
          element={
            <div className="flex h-screen w-screen items-center justify-center bg-slate-100">
              <Button>About</Button>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
