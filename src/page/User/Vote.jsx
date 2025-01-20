import { useEffect, useState } from "react"

import { Button, Group, Radio, Space, Stack, Text } from "@mantine/core"
import CommonLayout from "../../components/CommonLayout"

import classes from '../../styles/radio.module.css'
import { contract, initialization } from "../../blockchainContract"
import { useAuth } from "../../Context"

const Vote = () => {

    const [candidate, setCandidate] = useState([])
    const [candidateSelection, setCandidateSelection] = useState(null)
    const { toggle, voteState } = useAuth()

    useEffect(() => {
        getAllCandidate()
    }, [])

    const getAllCandidate = async () => {
        try {
            toggle()
            await initialization()
            const candidateData = await contract().getCandidateList()

            setCandidate(candidateData)
            toggle()
        } catch (error) {
            console.error('Error fetching candidates:', error)
        }
    }

    const submitVote = async () => {
        console.log(candidateSelection)
    }

    const cards = candidate.map((item, index) => {
        return (
            <Radio.Card className={classes.root} radius="md" value={item[0]} key={index} >
                <Group wrap="nowrap" align="flex-start">
                    <Radio.Indicator />
                    <div className="flex items-center">
                        <Text className={classes.label}>{item.name}</Text>
                    </div>
                </Group>
            </Radio.Card >
        )
    })

    return (
        <CommonLayout>
            {
                voteState == "Ongoing"
                    ? <>
                        <Radio.Group
                            value={candidateSelection}
                            onChange={setCandidateSelection}
                            label="Pick the candidate that you want to vote"
                            description="*Each person can only vote for one candidate*"
                            styles={() => ({
                                description: {
                                    color: 'red'
                                }
                            })}
                        >
                            <Stack pt="md" gap="xs">
                                {cards}
                            </Stack>
                        </Radio.Group>

                        <Space h="md" />
                        <Button onClick={() => submitVote()}>
                            Confirm
                        </Button>
                    </>
                    : <p className="font-bold text-xl">Vote has not started yet!</p>
            }
        </CommonLayout>
    )
}

export default Vote
