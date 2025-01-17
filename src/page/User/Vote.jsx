import { useEffect, useState } from "react"

import { Button, Group, Radio, Space, Stack, Text } from "@mantine/core"
import CommonLayout from "../../components/CommonLayout"

import classes from '../../styles/radio.module.css'
import { contract } from "../../blockchainContract"
import { useAuth } from "../../Context"

const Vote = () => {

    const [value, setValue] = useState(null)
    const [candidate, setCandidate] = useState([])
    const [candidateSelection, , setCandidateSelection] = useState('')
    const { toggle } = useAuth()

    useEffect(() => {
        getAllCandidate()
    }, [])

    const getAllCandidate = async () => {
        try {
            toggle()
            const candidateData = await contract.methods.getCandidateList().call()
            console.log(candidateData)
            setCandidate(candidateData)
            toggle()
        } catch (error) {
            console.error('Error fetching candidates:', error)
        }
    }

    const submitVote = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            await contract.methods.vote(candidateSelection).send({ from: accounts[0] });

            console.log(`You have successfully voted for ${candidateSelection}`);
        } catch (error) {
            console.error('Error voting for candidate:', error.message);
        }
    }

    const cards = candidate.map((item, index) => (
        <Radio.Card className={classes.root} radius="md" value={item} key={index}>
            <Group wrap="nowrap" align="flex-start">
                <Radio.Indicator />
                <div className="flex items-center">
                    <Text className={classes.label}>{item.name}</Text>
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
