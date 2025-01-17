import { useEffect, useState } from "react"

import CommonLayout from "../../components/CommonLayout"
import { IconUserUp } from '@tabler/icons-react'
import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core'
import { contract } from "../../blockchainContract"
import { useAuth } from "../../Context"

const icons = {
    up: IconUserUp,
}

const data = [
    { label: 'Candidate 1', stats: '100', progress: 72, color: 'blue', icon: 'up' },
    { label: 'Candidate 2', stats: '200', progress: 72, color: 'blue', icon: 'up' },
    { label: 'Candidate 3', stats: '120', progress: 72, color: 'blue', icon: 'up' }
]

const Result = () => {

    const [candidateData, setCandidateData] = useState([])
    const { toggle } = useAuth()

    useEffect(() => {
        getAllCandidate()
    }, [])

    const getAllCandidate = async () => {
        try {
            toggle()
            const candidateData = await contract.methods.getCandidateList().call()
            console.log(candidateData)
            setCandidateData(candidateData)
        } catch (error) {
            console.error('Error fetching candidates:', error)
        } finally {
            toggle()
        }
    }

    // const stats = candidateData.map((stat) => {
    //     const Icon = icons[stat.icon]
    //     return (
    //         <Paper withBorder radius="md" p="xs" key={stat.label}>
    //             <Group>
    //                 <RingProgress
    //                     size={80}
    //                     roundCaps
    //                     thickness={8}
    //                     sections={[{ value: stat.progress, color: stat.color }]}
    //                     label={
    //                         <Center>
    //                             <Icon size={20} stroke={1.5} />
    //                         </Center>
    //                     }
    //                 />

    //                 <div>
    //                     <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
    //                         {stat.name}
    //                     </Text>
    //                     <Text fw={700} size="xl">
    //                         {stat.voteCount.toString()}
    //                     </Text>
    //                 </div>
    //             </Group>
    //         </Paper>
    //     )
    // })

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
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                {stats}
            </SimpleGrid>
        </CommonLayout>
    )
}

export default Result
