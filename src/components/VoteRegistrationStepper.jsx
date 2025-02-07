import { useState } from 'react'
import { Stepper, Button, Group, Stack, Input, Space, ScrollArea } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useAuth } from '../Context'
import { contract, initialization } from '.././blockchainContract'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'

const VoteRegistrationStepper = () => {
    const [active, setActive] = useState(0)
    const [highestStepVisited, setHighestStepVisited] = useState(false)
    const [idError, setIdError] = useState('')

    const { walletAddress, setWalletAddress, identificationNumber, setIdentificationNumber, hasRegistered, setHasRegistered, toggle } = useAuth()

    const handleStepChange = (step) => {
        setHighestStepVisited(false)

        if (!walletAddress && step === 1) {
            notifications.show({
                title: 'Step Error',
                message: 'Please complete current step before proceeding',
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })
            return
        }

        if (step === 2) {
            const error = validateMalaysianIC(identificationNumber)
            if (error) {
                notifications.show({
                    title: 'Invalid IC Number',
                    message: error,
                    className: 'w-5/6 ml-auto',
                    position: 'top-right',
                    color: 'red'
                })
                return
            }
        }

        if (step === 3) {
            setHighestStepVisited(true)
            return
        }

        setActive(step)
    }

    const handleStepBack = (step) => {
        if (step === 0) {
            return
        }

        setActive(step - 1)
    }

    const shouldAllowSelectStep = (step) => highestStepVisited >= step && active !== step

    const handleConnectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            if (!accounts || accounts.length === 0) {
                notifications.show({
                    title: 'Connect Wallet Error',
                    message: 'No accounts found. Please connect to MetaMask',
                    className: 'w-5/6 ml-auto',
                    position: 'top-right',
                    color: 'red'
                })
                setWalletAddress(null)
                return
            }

            notifications.show({
                title: 'Wallet Connected',
                message: 'Wallet connected successfully',
                className: 'w-5/6 ml-auto',
                position: 'top-right',
            })

            setWalletAddress(accounts[0])
        } catch (error) {
            if (error.code === 4001) {
                notifications.show({
                    title: 'Connect Wallet Error',
                    message: 'Please connect to MetaMask',
                    className: 'w-5/6 ml-auto',
                    position: 'top-right',
                    color: 'red'
                })
            } else {
                notifications.show({
                    title: 'Connect Wallet Error',
                    message: error.message || 'An unknown error occurred',
                    className: 'w-5/6 ml-auto',
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }

    const hashIdentificationNumber = (id) => {
        const cleanId = id.replace(/[\s-]/g, '').toLowerCase()
        return ethers.keccak256(ethers.toUtf8Bytes(cleanId))
    }

    const checkIfUserRegistered = async (id) => {
        try {
            await initialization()
            const hashedId = hashIdentificationNumber(id)
            const isRegistered = await contract().isVoterRegistered(walletAddress, hashedId)
            if (isRegistered) {
                localStorage.setItem('walletAddress', walletAddress)
                localStorage.setItem('id', identificationNumber)
                setHasRegistered(true)
                notifications.show({
                    title: 'Already Registered',
                    message: 'You are already registered as a voter.',
                    className: 'w-5/6 ml-auto',
                    position: 'top-right',
                    color: 'green',
                })
            }
            return isRegistered
        } catch (error) {
            notifications.show({
                title: 'Already Registered',
                message: error.reason || "Unknown error has occurred",
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red',
            })
        }
    }

    const handleVoterRegistration = async () => {
        let cleanId = identificationNumber.trim()

        try {
            toggle()
            const userRegistered = await checkIfUserRegistered(cleanId)
            if (userRegistered) return

            await initialization()
            const hashedId = hashIdentificationNumber(cleanId)
            await contract().addVoter(hashedId)

            localStorage.setItem('walletAddress', walletAddress)
            localStorage.setItem('id', identificationNumber)
            setHasRegistered(true)

            notifications.show({
                title: 'Voter Registration',
                message: 'You have successfully registered as a voter.',
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'green',
            })
        } catch (error) {
            notifications.show({
                title: 'Voter Registration Error',
                message: error.reason || "Unknown error has occurred",
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red',
            })
        } finally {
            toggle()
        }
    }

    const validateMalaysianIC = (ic) => {
        const cleanIC = ic.replace(/[\s-]/g, '')

        if (!/^\d{12}$/.test(cleanIC)) {
            return 'IC number must be 12 digits'
        }

        const year = parseInt(cleanIC.substring(0, 2))
        const month = parseInt(cleanIC.substring(2, 4))
        const day = parseInt(cleanIC.substring(4, 6))

        if (month < 1 || month > 12) {
            return 'Invalid month in IC number'
        }

        const daysInMonth = new Date(2000 + year, month, 0).getDate()
        if (day < 1 || day > daysInMonth) {
            return 'Invalid day in IC number'
        }

        return ''
    }

    const handleICChange = (event) => {
        const value = event.currentTarget.value
        setIdentificationNumber(value)

        if (value) {
            const error = validateMalaysianIC(value)
            setIdError(error)
        } else {
            setIdError('')
        }
    }

    return (

        hasRegistered
            ? (
                <>
                    <p className='font-bold'>You have been registered. Please proceed to vote</p>

                    <Space h={10} />

                    <p>Account Details:</p>
                    <ScrollArea h={100}>
                        <p><span className='font-bold'>Wallet Address: </span>{walletAddress}</p>
                        <p><span className='font-bold'>Identification Number: </span>{identificationNumber}</p>
                    </ScrollArea>

                    <Space h={30} />
                    <Link to='/vote' className='px-4 py-2 text-white bg-blue-500 rounded'>Go to vote</Link>
                </>
            )
            : <>
                <Stepper size='sm' active={active} onStepClick={setActive}
                    styles={() => ({
                        step: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        stepBody: {
                            margin: '8px 0 0',
                        },
                        stepLabel: {
                            textAlign: 'center',
                        },
                        stepDescription: {
                            textAlign: 'center',
                        },
                    })}
                >
                    <Stepper.Step
                        label="First Step"
                        description="Connect Wallet"
                        allowStepSelect={shouldAllowSelectStep(0)}
                    >
                        <Stack className='mt-10'>
                            <p>Wallet Address: <span className='font-bold'>{walletAddress ?? 'Wallet Not Connected'}</span></p>

                            <Button
                                disabled={walletAddress}
                                variant="filled"
                                onClick={() => handleConnectWallet()}
                            >
                                {
                                    walletAddress ? 'Connected' : 'Connect Wallet'
                                }
                            </Button>
                        </Stack>
                    </Stepper.Step>
                    <Stepper.Step
                        label="Second Step"
                        description="Verify ID"
                        allowStepSelect={shouldAllowSelectStep(1)}
                    >
                        <Stack className='mt-10'>
                            <p className='mb-0'>Enter Identification Number:</p>
                            <div className='w-72'>
                                <Input
                                    value={identificationNumber}
                                    placeholder="YYMMDD-PB-XXXX"
                                    onChange={handleICChange}
                                    error={idError}
                                    description="Format: YYMMDD-PB-XXXX (e.g., 900101-14-5566)"
                                />
                            </div>
                        </Stack>
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Stack className='mt-10'>
                            <p>Wallet Address: <span className='font-bold'>{walletAddress}</span></p>
                            <p>Identification Number: <span className='font-bold'>{identificationNumber}</span></p>
                        </Stack>
                    </Stepper.Completed>
                </Stepper >

                <Group justify="right" className='mt-20'>
                    {
                        active != 0
                        && <Button className='w-full' variant="default" onClick={() => handleStepBack(active)}>
                            Back
                        </Button>
                    }
                    {
                        active == 2
                            ? <Button className='w-full' onClick={() => handleVoterRegistration()}>Complete Register</Button>
                            : <Button className='w-full' onClick={() => handleStepChange(active + 1)}>Next step</Button>
                    }
                </Group>
            </>

    )
}

export default VoteRegistrationStepper