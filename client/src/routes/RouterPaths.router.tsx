import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { MovieDetailPage } from "../pages/MovieDetailPage"


export const RouterPaths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<HomePage />} />
                        <Route path='movie/:id' element={<MovieDetailPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
