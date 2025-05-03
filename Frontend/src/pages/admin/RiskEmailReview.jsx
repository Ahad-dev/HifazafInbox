import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RainbowButton } from '../../components/magicui/rainbow-button';
import { SparklesText } from '../../components/magicui/sparkles-text';
import {ShineBorder } from '../../components/magicui/shine-border';
import { getRiskEmails, getEmailById, blacklistUser } from '../../services/admin.services';
import { MdArrowBack } from 'react-icons/md';

const RiskEmailReview = () => {
    const navigate = useNavigate();
    const [riskEmails, setRiskEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [emailDetails, setEmailDetails] = useState(null);

    console.log(riskEmails)

    useEffect(() => {
        fetchRiskEmails();
    }, []);

    const fetchRiskEmails = async () => {
        try {
            const data = await getRiskEmails();
            setRiskEmails(data.riskEmails);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching risk emails:', error);
            setLoading(false);
        }
    };

    const handleViewEmail = async (emailId) => {
        try {
            const { email } = await getEmailById(emailId);
            const riskEmail = riskEmails.find((email) => email.emailId === emailId);
            setEmailDetails({ ...email, riskAnalysis: riskEmail });
            setSelectedEmail(emailId);
        } catch (error) {
            console.error('Error fetching email details:', error);
        }
    };

    const handleBlacklistUser = async (userId) => {
        try {
            await blacklistUser(userId);
            alert('User has been blacklisted successfully');
            fetchRiskEmails();
        } catch (error) {
            console.error('Error blacklisting user:', error);
            alert('Failed to blacklist user');
        }
    };

    const handleBackToList = () => {
        setSelectedEmail(null);
        setEmailDetails(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
            <div className=" flex-1 p-8">
                <SparklesText text="Risk Email Review" className="text-3xl font-bold mb-8" />
                
                {!selectedEmail ? (
                    <div className="relative">
                        <ShineBorder
                            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            borderWidth={2}
                        />
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg shadow-lg">
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
                                            Risk Level
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {riskEmails.map((email) => (
                                        <tr key={email._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={email.senderId.pic}
                                                            alt={email.senderId }
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
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    email.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                                                    email.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {email.riskLevel}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="flex items-center justify-center  gap-4 cursor-pointer mb-4 bg-gradient-to-l from-purple-500 via-pink-400 to-orange-400 rounded-xl p-3 text-white   " 
                                                    onClick={() => handleViewEmail(email.emailId)}
                                                    
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <ShineBorder
                            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            borderWidth={2}
                        />
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="mb-4">
                                <button className="flex items-center justify-center  gap-4 cursor-pointer mb-4 bg-gradient-to-l from-purple-500 via-pink-400 to-orange-400 rounded-xl p-3 text-white   " onClick={handleBackToList} >
                                    <MdArrowBack/>
                                    Back to List
                                </button>
                            </div>
                            {emailDetails && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700">Sender Information</h3>
                                            <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                                <div className="flex items-center">
                                                    <img
                                                        className="h-12 w-12 rounded-full"
                                                        src={emailDetails.senderId.pic}
                                                        alt=""
                                                    />
                                                    <div className="ml-4">
                                                        <p className="text-gray-900 font-medium">{emailDetails.senderId.name}</p>
                                                        <p className="text-gray-600">{emailDetails.senderId.email}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <button 
                                                        className="flex items-center justify-center w-full  gap-4 cursor-pointer mb-4 bg-gradient-to-l from-red-500 to-orange-400 rounded-xl p-3 text-white   "
                                                        onClick={() => handleBlacklistUser(emailDetails.senderId._id)}
                                                    >
                                                        Blacklist User
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700">Email Details</h3>
                                            <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-900">Subject: {emailDetails.subject}</p>
                                                <p className="text-gray-600">Date: {new Date(emailDetails.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">Risk Analysis</h3>
                                        <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center mb-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    emailDetails.riskAnalysis.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                                                    emailDetails.riskAnalysis.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    Risk Level: {emailDetails.riskAnalysis.riskLevel}
                                                </span>
                                                <span className="ml-4 text-gray-600">
                                                    Score: {emailDetails.riskAnalysis.riskScore}
                                                </span>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className="font-medium text-gray-700">Flagged Words:</h4>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {emailDetails.riskAnalysis.flaggedWords.map((word, index) => (
                                                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                                            {word}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-700">Summary:</h4>
                                                <p className="mt-2 text-gray-600">{emailDetails.riskAnalysis.reasonSummary}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">Email Content</h3>
                                        <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                            <p className="whitespace-pre-wrap text-gray-600">{emailDetails.body}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
    );
};

export default RiskEmailReview; 