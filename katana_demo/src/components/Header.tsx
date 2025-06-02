import {useUser} from "../context/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import {AppBar, Toolbar, Stack, Typography, Button} from "@mui/material";


const Header: React.FC = () => {
    const {user, clearUser, apiCallCount} = useUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        clearUser()
        navigate("/login")
    }

    if (!user) return null

    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Stack>
                    <Typography variant="h6">
                        Welcome, {user.email}
                    </Typography>
                    <Typography variant="body2">
                        Status: {user.isSubscriber ? "Subscriber" : "Trial"}
                    </Typography>
                    {!user.isSubscriber && (
                        <Typography variant="body2" color="warning.main">
                            Trial API calls used: {apiCallCount}/3
                        </Typography>
                    )}
                </Stack>
                <Button style={{backgroundColor: "Background"}} color="primary" onClick={handleLogout}> Log Out</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header