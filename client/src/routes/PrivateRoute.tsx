import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? children : <Navigate to="/" />;
};
