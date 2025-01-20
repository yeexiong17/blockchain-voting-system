import React, { useEffect, useState } from 'react'
import CommonLayout from '../../components/CommonLayout'
import { Button, Flex, Space, Stack } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { notifications } from '@mantine/notifications'
import { contract, provider } from '../../blockchainContract'
import { useAuth } from '../../Context'

const VoteSetting = () => {

    const { toggle } = useAuth()

    const [endTime, setEndTime] = useState("")

    useEffect(() => {
        console.log(endTime)
    }, [endTime])

    const handleSetEndTime = async () => {
        const date = new Date(endTime)
        const timestamp = Math.floor(date.getTime() / 1000)

        try {
            toggle()
            await contract().setVotingEndTime(timestamp)

            notifications.show({
                title: 'End Time Updated Successfully',
                message: `End time is set to ${timestamp}`,
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'green'
            })

        } catch (error) {
            notifications.show({
                title: 'Failed To Update End Time',
                message: error.reason || "Unknown error has occured",
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })
        } finally {
            toggle()
        }
    }

    const handleStartVote = async () => {
        try {
            toggle()
            await contract().startVote()

            notifications.show({
                title: 'Vote Started Successfully',
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'green'
            });
        } catch (error) {
            notifications.show({
                title: 'Could Not Start Vote',
                message: error.reason || "Unknown error has occured",
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })
        } finally {
            toggle()
        }
    }

    return (
        <CommonLayout>
            <p className='font-bold text-2xl'>Settings</p>
            <Stack>
                <Flex className='mt-6' align="flex-end">
                    <DateTimePicker
                        className='w-1/3'
                        value={endTime}
                        onChange={(value) => setEndTime(value)}
                        valueFormat="DD MMM YYYY hh:mm A"
                        label="Pick end date and time"
                        placeholder="Pick date and time"
                    />
                    <Space w={30} />
                    <Button onClick={() => handleSetEndTime()}>Set Date & Time</Button>
                </Flex>
                <Button onClick={() => handleStartVote()}>Start Vote</Button>
            </Stack>
        </CommonLayout>
    )
}

export default VoteSetting
