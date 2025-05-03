import React, { useState, useEffect } from 'react';
import { RainbowButton } from '../../components/magicui/rainbow-button';
import { SparklesText } from '../../components/magicui/sparkles-text';
import {ShineBorder } from '../../components/magicui/shine-border';
import AdminSidebar from '../../components/admin/AdminSidebar';
import useAuth from "../../hooks/useAuth"

const ADMIN_PERMISSIONS = [
    "Moniter Emails",
    "Review Emails",
    "Blacklsit Managment"
]

const Profile = () => {
    const {user:adminData} = useAuth()
    console.log(adminData)


    return (
            <div className=" flex-1 p-8">
                <SparklesText className="text-3xl font-bold mb-8" >
                    Admin Profile
                </SparklesText>
                
                <div className="relative">
                    <ShineBorder
                        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                        borderWidth={2}
                    />
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                                <div className="space-y-4">
                                    <div className='rounded-full overflow-hidden object-cover w-[fit-content]'>
                                        <img src={adminData.pic} height={100} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Name</label>
                                        <p className="mt-1 text-gray-900">{adminData.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Email</label>
                                        <p className="mt-1 text-gray-900">{adminData.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Role</label>
                                        <p className="mt-1 text-gray-900">{adminData.userRole}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Last Login</label>
                                        <p className="mt-1 text-gray-900">
                                            {new Date(adminData.lastLogin).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Permissions</h3>
                                <div className="space-y-2">
                                    {ADMIN_PERMISSIONS.map((permission, index) => (
                                        <div key={index} className="flex items-center">
                                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                            <span className="text-gray-700">{permission}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Security Settings</h3>
                            <div className="space-y-4">
                                <RainbowButton className="w-full md:w-auto">
                                    Change Password
                                </RainbowButton>
                                <RainbowButton className="w-full md:w-auto ml-0 md:ml-4">
                                    Enable Two-Factor Authentication
                                </RainbowButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Profile; 