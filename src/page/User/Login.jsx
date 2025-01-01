import { useRef } from "react"
import { supabase } from "../../supabase"

import { Button, Container, PasswordInput, Space, TextInput } from "@mantine/core"
import { notifications } from '@mantine/notifications';

const Login = () => {

    const emailRef = useRef('')
    const passwordRef = useRef('')

    const handleSignUp = async () => {

        if (!emailRef.current || !passwordRef.current) {
            notifications.show({
                title: 'Login Error',
                message: 'All fields are required',
                className: 'w-5/6 ml-auto',
                position: 'top-right'
            })
            return
        }

        let email = emailRef.current.trim()
        let password = passwordRef.current.trim()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            notifications.show({
                title: 'Login Error',
                message: error.message,
                className: 'w-5/6 ml-auto',
                position: 'top-right'
            })
        }
    }

    return (
        <Container size="sm" className="mt-5">
            <TextInput
                label="Email"
                placeholder="Enter your email"
                onChange={(event) => emailRef.current = event.currentTarget.value}
            />

            <Space h="md" />
            <PasswordInput
                label="Password"
                placeholder="Enter your password"
                onChange={(event) => passwordRef.current = event.currentTarget.value}
            />

            <Space h="md" />
            <Button onClick={handleSignUp} variant="filled" fullWidth radius="md">Log In</Button>
        </Container>
    )
}

export default Login
