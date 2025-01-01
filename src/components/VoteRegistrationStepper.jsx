import { useState } from 'react'
import { Stepper, Button, Group, Stack, Input } from '@mantine/core'
import { notifications } from '@mantine/notifications'

const VoteRegistrationStepper = () => {
    const [active, setActive] = useState(0)
    const [highestStepVisited, setHighestStepVisited] = useState(false)
    const [walletAddress, setWalletAddress] = useState(null)
    const [identificationNumber, setIdentificationNumber] = useState(null)

    const handleStepChange = (step) => {
        setHighestStepVisited(false)

        if ((!walletAddress && step == 1) || (!identificationNumber && step == 2)) {
            notifications.show({
                title: 'Step Error',
                message: 'Please complete current step before proceeding',
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })
            return
        }

        if (step == 3) {
            setHighestStepVisited(true)
            return
        }

        setActive(step)
    }

    const handleStepBack = (step) => {
        if (step == 0) {
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

    return (
        <>
            <Stepper active={active} onStepClick={setActive}>
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
                                placeholder="Enter identification number"
                                onChange={(event) => setIdentificationNumber(event.currentTarget.value)}
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
            </Stepper>

            <Group justify="right" className='mt-20'>
                {
                    active != 0
                    && <Button className='w-full' variant="default" onClick={() => handleStepBack(active)}>
                        Back
                    </Button>
                }
                <Button className='w-full' onClick={() => handleStepChange(active + 1)}>{active == 2 ? 'Complete Register' : 'Next step'}</Button>
            </Group>
        </>
    )
}

export default VoteRegistrationStepper