import {Box, Button, Container, TextField, Typography} from '@mui/material'
import * as React from 'react'

import {LoginInput, useLogin} from '@/lib/auth'

type LoginFormProps = {
    onSuccess: () => void
}

export const LoginForm = ({onSuccess}: LoginFormProps) => {
    const login = useLogin({onSuccess})
    const [formData, setFormData] = React.useState<LoginInput>({
        username: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login.mutate(formData)
    }

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 4,
                    p: 3,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: 1,
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    User Login
                </Typography>

                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Submit
                </Button>
            </Box>
        </Container>
    )
}
