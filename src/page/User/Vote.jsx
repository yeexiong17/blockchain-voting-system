import { useEffect, useState } from "react"

import { Button, Group, Radio, Space, Stack, Text } from "@mantine/core"
import CommonLayout from "../../components/CommonLayout"

import classes from '../../styles/radio.module.css'
import { contract } from "../../blockchainContract"
import { useAuth } from "../../Context"

const Vote = () => {

    const [value, setValue] = useState(null)
    const [candidate, setCandidate] = useState([])
    const { toggle } = useAuth()

    useEffect(() => {
        getAllCandidate()
    }, [])

    const getAllCandidate = async () => {
        try {
            toggle()
            const candidatesCount = await contract.methods.getCandidatesCount().call()

            const candidates = []

            for (let i = 0; i < candidatesCount; i++) {
                const candidate = await contract.methods.candidates(i).call()
                candidates.push(candidate)
            }

            setCandidate(candidates)
            toggle()
        } catch (error) {
            console.error('Error fetching candidates:', error)
        }
    }

    const submitVote = () => {

    }

    const cards = candidate.map((item, index) => (
        <Radio.Card className={classes.root} radius="md" value={item} key={index}>
            <Group wrap="nowrap" align="flex-start">
                <Radio.Indicator />
                <div className="flex items-center">
                    <Text className={classes.label}>{item}</Text>
                </div>
            </Group>
        </Radio.Card>
    ))

    return (
        <CommonLayout>
            <Radio.Group
                value={value}
                onChange={setValue}
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
            <Button>
                Confirm
            </Button>
        </CommonLayout>
    )
}

export default Vote
