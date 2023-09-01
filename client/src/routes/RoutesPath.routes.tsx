import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/login/LoginPage';
import { PrivateRoute } from './PrivateRoute';

interface RoutesPathProps {
    children: React.ReactNode;
}

export const RoutesPath: React.FC<RoutesPathProps> = ({ children }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <PrivateRoute>
                    <Route path="/home" element={<HomePage />} />
                </PrivateRoute>
            </Routes>
        </BrowserRouter>
    );
};
