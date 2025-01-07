import { useEffect, useState } from "react"

import { IconDots, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react"
import { ActionIcon, Button, Divider, Group, Menu, Modal, ScrollArea, Space, Stack, Table, Text, TextInput } from "@mantine/core"

import CommonLayout from "../../components/CommonLayout"
import { supabase } from "../../supabase"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import { contract } from '../../blockchainContract'
import { useAuth } from "../../Context"

const ManageVoter = () => {
    const [selection, setSelection] = useState(['1'])
    const [voterData, setVoterData] = useState([])
    const [opened, { open, close }] = useDisclosure(false)
    const [candidateName, setCandidateName] = useState('')
    const [candidate, setCandidate] = useState([])
    const { toggle } = useAuth()

    useEffect(() => {
        fetchAllAdmin()
        getAllCandidate()
    }, [])

    const fetchAllAdmin = async () => {
        toggle()
        const { data, error } = await supabase.from('users').select().eq('role', 'user')
        toggle()
        setVoterData(data)
        if (error) {
            notifications.show({
                title: 'User Fetch Error',
                message: error.message,
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })

            return
        }
    }

    const toggleRow = (id) => {
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        )
    }

    const toggleAll = () => {
        setSelection((current) => (current.length === voterData.length ? [] : voterData.map((item) => item.id)))
    }

    const rows = voterData.map((item, index) => {
        return (
            <Table.Tr key={item.id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Text size="sm" fw={500}>
                            {item.name}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>{item.email}</Table.Td>
                <Table.Td>{new Date(item.created_at).toISOString().slice(0, 19).replace('T', ' ')}</Table.Td>
                <Table.Td>
                    <Group gap={0} justify="flex-end">
                        <ActionIcon variant="subtle" color="gray">
                            <IconPencil size={16} stroke={1.5} />
                        </ActionIcon>
                        <Menu
                            transitionProps={{ transition: 'pop' }}
                            withArrow
                            position="bottom-end"
                            withinPortal
                        >
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDots size={16} stroke={1.5} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconTrash size={16} stroke={1.5} />} color="red">
                                    Terminate contract
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Table.Td>
            </Table.Tr>
        )
    })

    const candidateRow = candidate.map((item, index) => {
        return (
            <Table.Tr key={index} >
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Text size="sm" fw={500}>
                            {item}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Group gap={0} justify="flex-end">
                        <ActionIcon variant="subtle" color="gray">
                            <IconPencil size={16} stroke={1.5} />
                        </ActionIcon>
                        <Menu
                            transitionProps={{ transition: 'pop' }}
                            withArrow
                            position="bottom-end"
                            withinPortal
                        >
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDots size={16} stroke={1.5} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconTrash size={16} stroke={1.5} />} color="red">
                                    Terminate contract
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Table.Td>
            </Table.Tr >
        )
    })

    const getAllCandidate = async () => {
        try {
            const candidatesCount = await contract.methods.getCandidatesCount().call()

            const candidates = []

            for (let i = 0; i < candidatesCount; i++) {
                const candidate = await contract.methods.candidates(i).call()
                candidates.push(candidate)
            }

            setCandidate(candidates)
        } catch (error) {
            console.error('Error fetching candidates:', error)
        }
    }

    const handleCreateNewCandidate = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

            const admin = await contract.methods.admin().call()

            if (accounts[0].toLowerCase() !== admin.toLowerCase()) {
                throw new Error('Only the admin can add candidates.')
            }

            toggle()
            await contract.methods.addCandidate(candidateName).send({ from: accounts[0] })
            toggle()

            notifications.show({
                title: 'Candidate Added Successfully',
                message: `Candidate ${candidateName} added successfully!`,
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'green'
            })

            setCandidateName('')
            close()
            await getAllCandidate()
        } catch (error) {
            notifications.show({
                title: 'Add Candidate Error',
                message: `Failed to add new candidate: ${candidateName}`,
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })
        }
    }

    return (
        <CommonLayout>
            <Stack>
                <p className='font-bold text-2xl'>Manage Voter</p>
                <Stack>
                    <ScrollArea className='mt-5 h-3/4'>
                        <Table miw={200} verticalSpacing="sm" stickyHeader>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th w={40}></Table.Th>
                                    <Table.Th>Voter Address</Table.Th>
                                    <Table.Th>Created At</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </ScrollArea>

                    <Stack>
                        <ScrollArea h={300} className='mt-5'>
                            <Table miw={800} verticalSpacing="sm" stickyHeader>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th w={40}></Table.Th>
                                        <Table.Th>Candidate Name</Table.Th>
                                        <Table.Th>Created At</Table.Th>
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
            </Stack>
        </CommonLayout>
    )
}

export default ManageVoter
