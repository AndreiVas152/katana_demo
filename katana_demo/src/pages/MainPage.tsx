import React, {useEffect, useState} from "react";
import {
    CircularProgress,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack, Button,
} from "@mui/material";
import {useUser} from "../context/UserContext";
import Header from "../components/Header.tsx";

interface Post {
    id: number;
    title: string;
    body: string;
}

const MainPage: React.FC = () => {
    const {user, apiCallCount, incrementApiCallCount} = useUser()

    const [data, setData] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        if (!user) {
            setError("User not found.")
            setLoading(false)
            return
        }

        if (!user.isSubscriber && apiCallCount >= 3) {
            setError("Trial usage limit reached. Please subscribe.")
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")

            if (!res.ok) throw new Error("Failed to fetch data")

            const json = await res.json()
            setData(json)
            if (!user.isSubscriber) incrementApiCallCount()
        } catch (err: any) {
            setError(err.message || "Unknown error")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Stack p={4}>
            <Header/>
            <Typography variant="h4" gutterBottom>
                Data Table
            </Typography>

            {loading && (
                <Stack display="flex" justifyContent="center" mt={4}>
                    <CircularProgress/>
                </Stack>
            )}
            {error && (
                <Typography color="error" mt={2}>
                    {error}
                </Typography>
            )}
            {!loading && !error && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Body</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.body}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Button onClick={fetchData}>Reload</Button>
        </Stack>
    );
};

export default MainPage