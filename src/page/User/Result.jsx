import { useEffect, useState } from "react"

import CommonLayout from "../../components/CommonLayout"
import { Group, Paper, SimpleGrid, Text } from '@mantine/core'
import { contract, initialization } from "../../blockchainContract"
import { useAuth } from "../../Context"

const Result = () => {

    const [candidateData, setCandidateData] = useState([])
    const { toggle, voteState } = useAuth()

    useEffect(() => {
        getAllCandidate()
    }, [])

    const getAllCandidate = async () => {
        try {
            toggle()
            await initialization()
            const candidateData = await contract().getCandidateList()
            console.log(candidateData)
            setCandidateData(candidateData)
        } catch (error) {
            console.error('Error fetching candidates:', error)
        } finally {
            toggle()
        }
    }

    const stats = candidateData.map((stat, index) => {
        return (
            <Paper withBorder radius="md" p="xs" key={index}>
                <Group>
                    <div>
                        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                            {stat.name}
                        </Text>
                        <Text fw={700} size="xl">
                            {stat.voteCount.toString()}
                        </Text>
                    </div>
                </Group>
            </Paper>
        )
    })

    return (
        <CommonLayout>
            {voteState === "Preparation" ? (
                <div className="text-center mt-5">
                    <Text size="xl" fw={700}>Vote has not started yet!</Text>
                    <Text>Results will be available once the voting begins.</Text>
                </div>
            ) : (
                <SimpleGrid className="mt-5" cols={{ base: 1, sm: 3 }}>
                    {
                        candidateData.length > 0
                            ? stats
                            : <p>No Candidate Being Added Yet!</p>
                    }
                </SimpleGrid>
            )}
        </CommonLayout>
    )
}

export default Result
