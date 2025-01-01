import { useRef } from "react"
import { supabase } from "../../supabase"
import { Button, Container, PasswordInput, Space, TextInput } from "@mantine/core"

const Registration = () => {

    const emailRef = useRef('')
    const nameRef = useRef('')
    const passwordRef = useRef('')
    const confirmPasswordRef = useRef('')

    const handleSignUp = async () => {

        if (!emailRef.current || !passwordRef.current || !confirmPasswordRef.current || !nameRef.current) {
            alert('Please fill in all the fields!')
            return
        }

        let name = nameRef.current.trim()
        let email = emailRef.current.trim()
        let password = passwordRef.current.trim()

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    email
                }
            }
        })

        if (error) {
            alert('Sign up', error.message)
        }
    }

    return (

        <Container size="sm" className="mt-5">
            <div className="">
                <TextInput
                    label="Name"
                    description="Example: John Doe"
                    placeholder="Enter your name"
                    onChange={(event) => nameRef.current = event.currentTarget.value}
                />

                <Space h="md" />
                <TextInput
                    label="Email"
                    description="Example: user1@gmail.com"
                    placeholder="Enter your email"
                    onChange={(event) => emailRef.current = event.currentTarget.value}
                />

                <Space h="md" />
                <PasswordInput
                    label="Password"
                    description="Password must be at least 8 characters long | Example: Abc@1234"
                    placeholder="Create your password"
                    onChange={(event) => passwordRef.current = event.currentTarget.value}
                />

                <Space h="md" />
                <PasswordInput
                    label="Confirm Password"
                    description="Both password and confirmation password must be the same"
                    placeholder="Confirm your password"
                    onChange={(event) => confirmPasswordRef.current = event.currentTarget.value}
                />

                <Space h="md" />
                <Button onClick={handleSignUp} variant="filled" fullWidth radius="md">Sign Up</Button>
            </div>


        </Container>

    )
}

export default Registration
