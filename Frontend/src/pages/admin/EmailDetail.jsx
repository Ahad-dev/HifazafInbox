import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SparklesText } from '../../components/magicui/sparkles-text';
import { ShineBorder} from '../../components/magicui/shine-border';
import { getEmailById, blacklistUser } from '../../services/admin.services';
import { MdArrowBack, MdAttachFile } from 'react-icons/md';

const EmailDetail = () => {
    const { emailId } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmailDetails();
    }, [emailId]);

    const fetchEmailDetails = async () => {
        try {
            const { email } = await getEmailById(emailId);
            setEmail(email);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching email details:', error);
            setLoading(false);
        }
    };

    const handleBlacklistUser = async (userId) => {
        try {
            await blacklistUser(userId);
            alert('User has been blacklisted successfully');
        } catch (error) {
            console.error('Error blacklisting user:', error);
            alert('Failed to blacklist user');
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
            <div className="flex items-center justify-between mb-8">
                <SparklesText text="Email Details" className="text-3xl font-bold" />
                <button
                    className="flex items-center justify-center gap-4 cursor-pointer bg-gradient-to-l from-purple-500 via-pink-400 to-orange-400 rounded-xl p-3 text-white"
                    onClick={() => navigate(-1)}
                >
                    <MdArrowBack />
                    Back
                </button>
            </div>

            <div className="relative">
                <ShineBorder
                    shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    borderWidth={2}
                />
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {email && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">Sender Information</h3>
                                    <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src={email.senderId.pic}
                                                alt={email.senderId.name}
                                            />
                                            <div className="ml-4">
                                                <p className="text-gray-900 font-medium">{email.senderId.name}</p>
                                                <p className="text-gray-600">{email.senderId.email}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                className="flex items-center justify-center w-full gap-4 cursor-pointer bg-gradient-to-l from-red-500 to-orange-400 rounded-xl p-3 text-white"
                                                onClick={() => handleBlacklistUser(email.senderId._id)}
                                            >
                                                Blacklist User
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">Email Details</h3>
                                    <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-900">Subject: {email.subject}</p>
                                        <p className="text-gray-600">Date: {new Date(email.createdAt).toLocaleString()}</p>
                                        <p className="text-gray-600">Status: {email.status}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Receivers</h3>
                                <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {email.receiverEmails.map((email, index) => (
                                            <div key={index} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                                    <p className="text-gray-600 text-sm">{email}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {email.attachments && email.attachments.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">Attachments</h3>
                                    <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {email.attachments.map((attachment, index) => (
                                                <div key={index} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                                    <div className="p-2 bg-purple-100 rounded-lg">
                                                        <MdAttachFile className="h-6 w-6 text-purple-600" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 font-medium">{attachment}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Email Content</h3>
                                <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                    <p className="whitespace-pre-wrap text-gray-600">{email.body}</p>
                                </div>
                            </div>

                            {email.riskAnalysis && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">Risk Analysis</h3>
                                    <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center mb-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                email.riskAnalysis.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                                                email.riskAnalysis.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                Risk Level: {email.riskAnalysis.riskLevel}
                                            </span>
                                            <span className="ml-4 text-gray-600">
                                                Score: {email.riskAnalysis.riskScore}
                                            </span>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-700">Flagged Words:</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {email.riskAnalysis.flaggedWords.map((word, index) => (
                                                    <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                                        {word}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-700">Summary:</h4>
                                            <p className="mt-2 text-gray-600">{email.riskAnalysis.reasonSummary}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailDetail; 