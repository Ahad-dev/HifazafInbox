import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { authenticated, loading, isAdmin, isUser } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!authenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole === 'admin' && !isAdmin()) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole === 'user' && !isUser()) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 