import React from 'react'
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage.tsx";
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";
import MainPage from "./pages/MainPage.tsx";

function App() {

    return (
        <Routes>
            <Route path="/main" element={
                <ProtectedRoute>
                    <MainPage/>
                </ProtectedRoute>}/>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    )
}

export default App
