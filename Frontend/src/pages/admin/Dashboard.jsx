import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllEmailsSend,
  getRiskEmails,
  getBlacklistUsers,
} from "../../services/admin.services";
import { SparklesText } from "../../components/magicui/sparkles-text";
import { ShineBorder } from "../../components/magicui/shine-border";
import { RainbowButton } from "../../components/magicui/rainbow-button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmails: 0,
    riskEmails: 0,
    blacklistedUsers: 0,
    recentEmails: [],
  });
  const [loading, setLoading] = useState(true);
  console.log(stats);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [emailsResponse, riskEmailsResponse, blacklistResponse] =
          await Promise.all([
            getAllEmailsSend(),
            getRiskEmails(),
            getBlacklistUsers(),
          ]);

        setStats({
          totalEmails: emailsResponse.emails.length,
          riskEmails: riskEmailsResponse.riskEmails.length,
          blacklistedUsers: blacklistResponse.blacklistedUsers.length,
          recentEmails: emailsResponse.emails.slice(0, 5),
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          <SparklesText>Admin Dashboard</SparklesText>
        </h1>
        <RainbowButton onClick={() => navigate("/admin/profile")}>
          View Profile
        </RainbowButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* <span className="relative"> */}
        <div className="relative rounded-3xl flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm">
            <ShineBorder
            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            borderWidth={2}
            />
            <h3 className="text-lg font-semibold mb-2">Total Emails Sent</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalEmails}</p>
        </div>
        <div className="relative rounded-3xl flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm">
            <ShineBorder
            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            borderWidth={2}
            />
            <h3 className="text-lg font-semibold mb-2">Risk Emails</h3>
            <p className="text-3xl font-bold text-red-600">{stats.riskEmails}</p>
        </div>
        <div className="relative rounded-3xl flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm">
            <ShineBorder
            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            borderWidth={2}
            />
            <h3 className="text-lg font-semibold mb-2">Blacklist Users </h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.blacklistedUsers}</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Emails</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentEmails.map((email) => (
                <tr
                  key={email._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/admin/email/${email._id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={email.senderId.pic}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {email.senderId.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {email.senderId.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{email.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(email.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        email.status === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {email.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
