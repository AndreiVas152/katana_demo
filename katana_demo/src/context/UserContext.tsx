import {User} from "../types/User.ts";
import {createContext, useContext, useEffect, useState} from "react";


interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    apiCallCount: number;
    incrementApiCallCount: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUserState] = useState<User | null>(null)
    const [apiCallCount, setApiCallCount] = useState<number>(0)

    useEffect(() => {
        const userJson = localStorage.getItem("user")
        if (userJson) {
            const parsedUser = JSON.parse(userJson)
            setUserState(parsedUser)

            if (!parsedUser.isSubscriber && parsedUser.trialUsesCount) {
                setApiCallCount(parsedUser.trialUsesCount)
            }
        }
    }, []);

    const setUser = (user: User) => {
        const newUser = {
            ...user,
            apiCallCount: 0
        }
        localStorage.setItem("user", JSON.stringify(newUser))
        setUserState(newUser)
        setApiCallCount(0)
    }

    const clearUser = () => {
        localStorage.removeItem("user")
        setUserState(null)
        setApiCallCount(0)
    }

    const incrementApiCallCount = () => {
        if (!user) return

        const updatedUser = {
            ...user,
            apiCallCount: (user.apiCallCount ?? 0) + 1,
        };
        setUserState(updatedUser);
        setApiCallCount(updatedUser.apiCallCount)
        localStorage.setItem("user", JSON.stringify(updatedUser));

    };


    return (
        <UserContext.Provider
            value={{user, setUser, clearUser, apiCallCount, incrementApiCallCount}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext)
    if (!context) throw new Error("useUser must be used within a UserProvider")
    return context
}