import { useState } from "react"

import { Group, Radio, Stack, Text } from "@mantine/core"
import CommonLayout from "../../components/CommonLayout"

import classes from '../../styles/radio.module.css'

const data = [
    { name: 'Candidate 1' },
    { name: 'Candidate 2' },
    { name: 'Candidate 3' },
]

const cards = data.map((item) => (
    <Radio.Card className={classes.root} radius="md" value={item.name} key={item.name}>
        <Group wrap="nowrap" align="flex-start">
            <Radio.Indicator />
            <div className="flex items-center">
                <Text className={classes.label}>{item.name}</Text>
                <Text className={classes.description}>{item.description}</Text>
            </div>
        </Group>
    </Radio.Card>
))

const Vote = () => {

    const [value, setValue] = useState(null)

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

            <Text fz="xs" mt="md">
                CurrentValue: {value || '–'}
            </Text>
        </CommonLayout>
    )
}

export default Vote
