
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
export const RoutesPath = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route index element={<LoginPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
