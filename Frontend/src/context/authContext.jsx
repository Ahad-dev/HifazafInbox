import { createContext } from "react";

import { useState } from "react";

import { useEffect } from "react";

import { verifyUser } from "../services/auth.services";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    console.log(user,loading,authenticated);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { user,success } = await verifyUser();
                setUser(user);
                setAuthenticated(success);
            } catch (error) {
                setUser(null);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async ()=>{
        try {
            const { data } = await axios.get("/api/auth/login");
            // Redirect to the authentication URL
            window.location.href = data.url;
        
        } catch (error) {
            console.error("Error during login:", error);
            // Handle error (e.g., show a notification to the user)
        }
    }
    const logout = async ()=>{
        try{
            const {data} = await axios.get("/api/auth/logout");
            if(data.success){
                setUser(null);
                setAuthenticated(false);
            }

        }catch(err){
            console.error("Error during logout:", err);
        }

    }
    return (
        <AuthContext.Provider value={{ user, loading ,authenticated,login,logout}}>
        {children}
        </AuthContext.Provider>
    );
    }

export { AuthContext };
export default AuthProvider;