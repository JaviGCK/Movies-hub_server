import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/homePages/HomePage"

export const RouterPaths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<HomePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
