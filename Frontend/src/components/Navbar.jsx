import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RainbowButton } from './magicui/rainbow-button'
import { ShineBorder } from './magicui/shine-border'
import { AuthContext } from "../context/authContext"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { NavMenuBar } from './NavMenuBar'
import { SparklesText } from './magicui/sparkles-text'

const Navbar = () => {
    const { login, authenticated, loading, user } = useContext(AuthContext)
    const location = useLocation();

    const navItems = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Contact", link: "/contact" },
    ];

    return (
        !loading && (
            <nav className="font-helvetica p-4 shadow-md text-black relative z-10 bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        <SparklesText>HifazatIbox</SparklesText>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.link}
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                    location.pathname === item.link
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {!authenticated ? (
                        <RainbowButton
                            className="text-black hover:scale-105 transition-all duration-300 ease-in-out"
                            variant=""
                            size="lg"
                            onClick={() => login()}
                        >
                            <ShineBorder
                                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                borderWidth={2}
                            />
                            Sign in
                        </RainbowButton>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <NavMenuBar userRole={user.userRole}>
                                <Avatar className="ring-2 ring-blue-500 ring-offset-2">
                                    <AvatarImage src={user.pic} alt="@shadcn" />
                                    <AvatarFallback>
                                        {user?.email?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </NavMenuBar>
                        </div>
                    )}
                </div>
            </nav>
        )
    )
}

export default Navbar