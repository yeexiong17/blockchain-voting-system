import { useEffect, useRef } from "react"
import { supabase } from "../../supabase"

import { Button, Container, PasswordInput, Space, TextInput } from "@mantine/core"
import { notifications } from '@mantine/notifications'
import { useAuth } from "../../Context"

const Registration = () => {

    const emailRef = useRef('')
    const nameRef = useRef('')
    const passwordRef = useRef('')
    const confirmPasswordRef = useRef('')
    const { voteState, setVoteState, auth, toggle, setAuth, setUserData, setIdentificationNumber, setWalletAddress, setHasRegistered } = useAuth()


    useEffect(() => {
        const voterId = localStorage.getItem('id')
        const voterWallet = localStorage.getItem('walletAddress')

        const checkConnectedAccount = async () => {
            const connectedAccount = await getConnectedAccount()

            if (connectedAccount === voterWallet) {
                setIdentificationNumber(voterId)
                setWalletAddress(voterWallet)
                setHasRegistered(true)
            }
            else {
                localStorage.removeItem('walletAddress')
                localStorage.removeItem('id')
            }
        }
        checkConnectedAccount()

        const getConnectedAccount = async () => {
            try {
                const accounts = await window.ethereum.request({ method: "eth_accounts" })

                if (accounts.length > 0) {
                    console.log("Connected account:", accounts[0])
                    return accounts[0]
                } else {
                    console.log("No accounts are connected.")
                    return null
                }
            } catch (error) {
                console.error("Error checking connected account:", error)
                return null
            }
        }
    }, [])

    const handleSignUp = async () => {

        if (!emailRef.current || !passwordRef.current || !confirmPasswordRef.current || !nameRef.current) {
            notifications.show({
                title: 'Registration Error',
                message: 'All fields are required',
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })
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
            notifications.show({
                title: 'Registration Error',
                message: error.message,
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })
        }
    }

    return (
        <Container size="sm" className="mt-5">
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
        </Container>
    )
}

export default Registration
