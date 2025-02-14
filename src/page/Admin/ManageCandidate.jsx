import { useEffect, useState } from "react"

import { IconPlus } from "@tabler/icons-react"
import { Button, Group, Modal, ScrollArea, Space, Stack, Table, Text, TextInput } from "@mantine/core"

import CommonLayout from "../../components/CommonLayout"
import { supabase } from "../../supabase"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import { contract, initialization } from '../../blockchainContract'
import { useAuth } from "../../Context"

const ManageCandidate = () => {
    const [opened, { open, close }] = useDisclosure(false)
    const [candidateName, setCandidateName] = useState('')
    const [candidate, setCandidate] = useState([])
    const { toggle } = useAuth()

    useEffect(() => {
        getAllCandidate()
    }, [])

    const candidateRow = candidate.map((item, index) => {
        return (
            <Table.Tr key={index} >
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Text size="sm" fw={500}>
                            {item.name}
                        </Text>
                    </Group>
                </Table.Td>
            </Table.Tr >
        )
    })

    const getAllCandidate = async () => {
        try {
            toggle()
            await initialization()

            const candidateData = await contract().getCandidateList()
            if (!candidateData || candidateData.length === 0) {
                console.log("No candidates found.");
            }
            console.log(candidateData)

            setCandidate(candidateData)
        } catch (error) {
            console.error('Error fetching candidates:', error)
        } finally {
            toggle()
        }
    }

    const handleCreateNewCandidate = async () => {
        try {
            toggle()
            await contract().addCandidate(candidateName)

            notifications.show({
                title: 'Candidate Added Successfully',
                message: `Candidate ${candidateName} added successfully!`,
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'green'
            })

            setCandidateName('')
            close()
            getAllCandidate()
        } catch (error) {
            notifications.show({
                title: 'Add Candidate Error',
                message: error.reason || "Unknown Error Has Occured",
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
            <Stack>
                <p className='font-bold text-2xl'>Manage Candidate</p>

                <Stack>
                    <ScrollArea h={300} className='mt-5'>
                        <Table miw={800} verticalSpacing="sm" stickyHeader>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th w={40}></Table.Th>
                                    <Table.Th>Candidate Name</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{candidateRow}</Table.Tbody>
                        </Table>
                    </ScrollArea>
                    <Modal opened={opened} onClose={close} title="New Admin">
                        <TextInput
                            required
                            label="Name"
                            placeholder="John Doe"
                            value={candidateName}
                            onChange={(event) => setCandidateName(event.currentTarget.value)}
                            radius="md"
                        />
                        <Space h="md" />
                        <Button onClick={() => handleCreateNewCandidate()}>Add Candidate</Button>
                    </Modal>
                    <Button className='ml-auto' onClick={open}>
                        <IconPlus stroke={2} />
                        New Candidate
                    </Button>
                </Stack>
            </Stack>
        </CommonLayout>
    )
}

export default ManageCandidate
