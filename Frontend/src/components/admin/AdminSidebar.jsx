import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard, MdSecurity, MdLogout } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { motion } from "framer-motion";
import { IoMdMenu } from "react-icons/io";
import useAuth from '@/hooks/useAuth';

const AdminSideBarData = [
    {
        title: "Dashboard",
        icon: <MdDashboard />,
        link: "/admin",
    },
    {
        title: "Risk Review",
        icon: <MdSecurity />,
        link: "/admin/risk-review",
    },
    {
        title: "Blacklist",
        icon: <MdSecurity />,
        link: "/admin/blacklist",
    },
    {
        title: "Profile",
        icon: <AiFillProfile />,
        link: "/admin/profile",
    },
];

const AdminSidebar = () => {
    const [open, setOpen] = React.useState(true);
    const { user, logout } = useAuth();
    const location = useLocation();
    const toggle = () => setOpen(!open);

    return (
        <motion.div
            initial={{ x: -50, width: open ? "250px" : "70px" }}
            animate={{ x: 0, width: open ? "250px" : "70px" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-screen bg-gray-800 text-white relative"
        >
            {/* Admin Profile Section */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                        <span className="text-lg font-semibold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    {open && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.email}</p>
                            <p className="text-xs text-gray-400">Administrator</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <div className="absolute -right-3 top-4">
                <button
                    onClick={toggle}
                    className="bg-gray-800 text-gray-400 hover:text-white rounded-full p-1 border border-gray-700 hover:border-gray-600 focus:outline-none transition-colors"
                >
                    <IoMdMenu className="text-xl" />
                </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-4">
                    {AdminSideBarData.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.link}
                                className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
                                    location.pathname === item.link
                                        ? 'bg-purple-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {open && (
                                    <span className="text-sm font-medium">{item.title}</span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 w-full p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                >
                    <MdLogout className="text-xl" />
                    {open && <span className="text-sm font-medium">Logout</span>}
                </button>
            </div>
        </motion.div>
    );
};

export default AdminSidebar; 