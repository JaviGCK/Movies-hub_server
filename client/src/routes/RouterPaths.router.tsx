import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { MovieDetailPage } from "../pages/MovieDetailPage";
import { useAuth0 } from "@auth0/auth0-react";

export const RouterPaths = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                </Route>
                {isAuthenticated ? (
                    <Route path='movie/:id' element={<MovieDetailPage />} />
                ) : (
                    <Route path='movie/:id' element={<Navigate to="/" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

