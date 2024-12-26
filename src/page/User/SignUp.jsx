import { useRef } from "react"
import { supabase } from "../../supabase"
import { Button, Container, PasswordInput, Space, TextInput } from "@mantine/core"

const SignUp = () => {

    const emailRef = useRef('')
    const nameRef = useRef('')
    const passwordRef = useRef('')

    const handleSignUp = async () => {

        if (!emailRef.current || !passwordRef.current || !nameRef.current) {
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
                    name
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
                    description="Input description"
                    placeholder="Enter your name"
                    onChange={(event) => nameRef.current = event.currentTarget.value}
                />

                <Space h="md" />
                <TextInput
                    label="Email"
                    description="Input description"
                    placeholder="Enter your email"
                    onChange={(event) => emailRef.current = event.currentTarget.value}
                />

                <Space h="md" />
                <PasswordInput
                    label="Password"
                    description="Input description"
                    placeholder="Create your password"
                    onChange={(event) => passwordRef.current = event.currentTarget.value}
                />

                <Space h="md" />
                <Button onClick={handleSignUp} variant="filled" fullWidth radius="md">Sign Up</Button>
            </div>


        </Container>

    )
}

export default SignUp
