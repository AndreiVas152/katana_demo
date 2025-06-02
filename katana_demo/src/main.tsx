import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import {createTheme} from "@mui/material";
import {UserProvider} from "./context/UserContext.tsx";

const root = createRoot(document.getElementById("root")!)

const theme = createTheme()

root.render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <App/>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>,
)