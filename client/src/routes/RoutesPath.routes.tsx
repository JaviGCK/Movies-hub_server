import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/login/LoginPage';
import { useAuth0 } from '@auth0/auth0-react';

export const RoutesPath = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                    path="/home"
                    element={isAuthenticated ? <HomePage /> : <LoginPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

