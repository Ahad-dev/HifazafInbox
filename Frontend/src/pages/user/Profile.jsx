import React, { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { getEmailStats } from '@/services/user.services';

const Profile = () => {
    const { user } = useAuth();
    const [stats,setStats] = useState(null);


    // Mock statistics - replace with actual data from your backend
    // const stats = {
    //     totalEmails: 42,
    //     successfulEmails: 38,
    //     failedEmails: 4,
    //     totalRecipients: 156
    // };

    console.log(stats);

    useEffect(() => {
        getEmailStats()
            .then((data) => {
                setStats(data.stats);
            })
            .catch((error) => {
                console.error("Error fetching email stats:", error);
            }); 
    }
    , []);


    return (
        <div className="min-h-screen bg-gray-100 py-8 mx-auto w-full">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                <span className="text-4xl font-bold text-blue-600">
                                    {user?.email?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{user?.email}</h1>
                                <p className="text-blue-100">Email Marketing User</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* User Information */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Email Address</label>
                                        <p className="mt-1 text-gray-900">{user?.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Account Type</label>
                                        <p className="mt-1 text-gray-900">Standard User</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Member Since</label>
                                        <p className="mt-1 text-gray-900">
                                            {new Date(user?.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Email Statistics</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-2xl font-bold text-blue-600">{stats?.totalEmails}</div>
                                        <div className="text-sm text-gray-600">Total Emails Sent</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-2xl font-bold text-green-600">{stats?.successfulEmails}</div>
                                        <div className="text-sm text-gray-600">Successful Emails</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-2xl font-bold text-red-600">{stats?.failedEmails}</div>
                                        <div className="text-sm text-gray-600">Failed Emails</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-2xl font-bold text-purple-600">{stats?.totalRecipients}</div>
                                        <div className="text-sm text-gray-600">Total Recipients</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Bulk Email Campaign</p>
                                                <p className="text-sm text-gray-500">Sent to 25 recipients</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">2 hours ago</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">New Template Created</p>
                                                <p className="text-sm text-gray-500">Marketing Newsletter</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">1 day ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile
