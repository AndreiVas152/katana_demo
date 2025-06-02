import React, {PropsWithChildren} from "react";
import {useUser} from "../../context/UserContext.tsx";
import {Navigate} from "react-router-dom";



const ProtectedRoute: React.FC<PropsWithChildren> = ({children}) => {
    const {user} = useUser();

    return user? <>{children}</> : <Navigate to="/login" replace/>
}

export default ProtectedRoute