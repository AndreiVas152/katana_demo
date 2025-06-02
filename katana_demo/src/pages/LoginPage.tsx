import React from "react";
import * as Yup from 'yup';
import {Button, FormControlLabel, Stack, Switch, TextField, Typography} from "@mui/material";
import {Field, FieldProps, Form, Formik, FormikProvider, useFormik} from "formik";
import {Navigate, useNavigate} from "react-router-dom";
import {User} from "../types/User.ts";
import {useUser} from "../context/UserContext.tsx";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    password: Yup.string().required("Password is required")
})


export const LoginPage: React.FC = () => {

    const navigate = useNavigate();

    const {setUser, user} = useUser()

    const handleSubmit = (values: User) => {
        setUser(values)
        navigate("/main")}

    const formik = useFormik<User>({
        initialValues: {
            email: "",
            password: "",
            isSubscriber: false,
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => handleSubmit(values)
    })

    if(user) return <Navigate to="/main" replace/>

    return (
        <Stack margin={12}>
            <Typography variant={"h5"} mb={2}>Login</Typography>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <Field name="email">
                        {({field, meta}: FieldProps<User>) => (
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>
                    <Field name="password">
                        {({field, meta}: FieldProps<User>) => (
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{mt: 2}}
                    >
                        Login
                    </Button>
                    <Field name="isSubscriber">
                        {({field}: FieldProps<boolean>) => (
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={field.value}
                                        onChange={() => formik.setFieldValue("isSubscriber", !field.value)}
                                        name="isSubscriber"
                                        color="primary"
                                    />
                                }
                                label={field.value ? "Subscriber" : "Trial User"}/>
                        )}
                    </Field>
                </Form>
            </FormikProvider>
        </Stack>
    )
}