import { useState } from "react"

import CommonLayout from "../../components/CommonLayout"
import { IconUserUp } from '@tabler/icons-react'
import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core'

const icons = {
    up: IconUserUp,
}

const data = [
    { label: 'Candidate 1', stats: '100', progress: 72, color: 'blue', icon: 'up' },
    { label: 'Candidate 2', stats: '200', progress: 72, color: 'blue', icon: 'up' },
    { label: 'Candidate 3', stats: '120', progress: 72, color: 'blue', icon: 'up' }
]

const Result = () => {

    const [result, setResult] = useState([])

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon]
        return (
            <Paper withBorder radius="md" p="xs" key={stat.label}>
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: stat.progress, color: stat.color }]}
                        label={
                            <Center>
                                <Icon size={20} stroke={1.5} />
                            </Center>
                        }
                    />

                    <div>
                        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                            {stat.label}
                        </Text>
                        <Text fw={700} size="xl">
                            {stat.stats}
                        </Text>
                    </div>
                </Group>
            </Paper>
        )
    })

    return (
        <CommonLayout>
            {
                result.length != 0
                    ? <p>Result is not release yet!</p>
                    : <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        {stats}
                    </SimpleGrid>
            }
        </CommonLayout>
    )
}

export default Result
