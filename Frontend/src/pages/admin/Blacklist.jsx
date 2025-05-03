import React, { useState, useEffect } from 'react';
import { SparklesText } from "../../components/magicui/sparkles-text";
import { ShineBorder } from "../../components/magicui/shine-border";
import { RainbowButton } from "../../components/magicui/rainbow-button";
import { getBlacklistUsers, blacklistUser, unblacklistUser } from '../../services/admin.services';

const Blacklist = () => {
    const [blacklistedUsers, setBlacklistedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlacklistedUsers();
    }, []);

    const fetchBlacklistedUsers = async () => {
        try {
            const data = await getBlacklistUsers();
            setBlacklistedUsers(data.blacklistedUsers);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blacklisted users:', error);
            setLoading(false);
        }
    };

    const handleUnblacklist = async (userId) => {
        try {
            await unblacklistUser(userId);
            fetchBlacklistedUsers();
        } catch (error) {
            console.error('Error unblacklisting user:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-8">
            <SparklesText className="text-3xl font-bold mb-8" >
            Blacklist Management
            </SparklesText>
            
            <div className="relative">
                <ShineBorder
                    shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    borderWidth={2}
                />
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Blacklisted Since
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {blacklistedUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={user.pic}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {new Date(user.blacklistedAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className=" cursor-pointer bg-gradient-to-l from-purple-500 via-pink-400 to-orange-400 rounded-xl px-3 py-2 text-white   " 
                                                onClick={() => handleUnblacklist(user._id)}
                                                
                                            >
                                                Unblacklist
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blacklist; 